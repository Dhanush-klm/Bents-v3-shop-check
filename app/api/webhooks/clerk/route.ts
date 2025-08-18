import { Pool } from "pg";
import { Resend } from "resend";
import FreeUserWelcome from "@/app/emails/FreeUserWelcome";
import DeleteEmail from "@/app/emails/Delete";
import UpgradeConfirmation from "@/app/emails/UpgradeConfirmation";
import MilestoneEmail from "@/app/emails/MilestoneEmail";

type ClerkEmailAddress = {
  id: string;
  email_address: string;
};

type ClerkUserCreated = {
  type: string;
  data: {
    id: string;
    created_at: number | string;
    first_name?: string | null;
    last_name?: string | null;
    primary_email_address_id?: string | null;
    email_addresses?: ClerkEmailAddress[];
  };
};

type ClerkUserUpdated = {
  type: string;
  data: {
    id: string;
    first_name?: string | null;
    last_name?: string | null;
    primary_email_address_id?: string | null;
    email_addresses?: ClerkEmailAddress[];
    unsafe_metadata?: {
      subscription?: {
        status?: 'pro' | 'trial' | 'paid' | string;
        upgraded_at?: string; // ISOString
        plan?: 'monthly' | 'yearly';
        platform?: 'ios' | 'android';
        source?: 'revenuecat' | string;
      };
      events?: {
        last_pro_upgrade_at?: string; // ISOString
        last_hundredth_link_at?: string; // ISOString
      };
      milestones?: {
        hundredth_link_at?: string; // ISOString
      };
      [key: string]: unknown;
    };
  };
};

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

function getResendFrom(): string {
  const from = getEnv("RESEND_FROM");
  if (from) return from;
  return "Loft <noreply@loftit.ai>";
}

function getDelayMs(): number {
  const raw = getEnv("RESEND_RATE_DELAY_MS");
  const parsed = raw ? Number(raw) : Number.NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 600;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let pool: Pool | undefined;
function getPostgresPool(): Pool {
  if (pool) return pool;
  const connectionString = getEnv("SUPABASE_URL");
  if (!connectionString) {
    throw new Error("Missing SUPABASE_URL Postgres connection string");
  }
  // Supabase requires SSL in most environments
  pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  return pool;
}

let dataPool: Pool | undefined;
function getDataDb(): Pool {
  if (dataPool) return dataPool;
  const connectionString = getEnv("SUPABASE_URL_DATA");
  if (!connectionString) {
    throw new Error("Missing SUPABASE_URL_DATA Postgres connection string");
  }
  // Supabase requires SSL in most environments
  dataPool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  return dataPool;
}

function extractEmail(user: ClerkUserCreated["data"]): string | undefined {
  const emails = user.email_addresses || [];
  if (!emails.length) return undefined;

  if (user.primary_email_address_id) {
    const primary = emails.find(e => e.id === user.primary_email_address_id);
    if (primary) return primary.email_address;
  }
  return emails[0]?.email_address;
}

export async function POST(request: Request) {
  try {
    const payload: unknown = await request.json();
    console.log("[Webhook] Received payload:", JSON.stringify(payload, null, 2));
    
    const root = payload as { type?: string; data?: unknown } | undefined;
    const type = root?.type;
    console.log("[Webhook] Event type:", type);
    
    if (!payload || !type) {
      console.log("[Webhook] No payload or type, returning 204");
      return new Response(null, { status: 204 });
    }

    // Handle user.created
    if (type === "user.created") {
      const user = (root as ClerkUserCreated).data;
      const clerkId = user.id;
      const email = extractEmail(user);
      const createdAtMs = typeof user.created_at === "string" ? Number(user.created_at) : user.created_at;
      const createdAt = Number.isFinite(createdAtMs) ? new Date(createdAtMs as number) : new Date();
      const firstName = user.first_name || "";
      const lastName = user.last_name || "";
      const fullName = [firstName, lastName].filter(Boolean).join(" ") || null;

      if (!clerkId || !email) {
        return new Response(JSON.stringify({ error: "Missing required fields (id/email) from Clerk payload" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const pg = getPostgresPool();
      await pg.query(
        `insert into public.users (id, email, created_at, full_name)
         values ($1, $2, $3, $4)
         on conflict (id) do update set
           email = excluded.email,
           created_at = excluded.created_at,
           full_name = excluded.full_name`,
        [clerkId, email, createdAt, fullName]
      );

      // Fire-and-forget: add contact to audiences and send welcome email
      const resendApiKey = getEnv("RESEND_API_KEY");
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        const audienceIds = [
          getEnv("RESEND_AUDIENCE_ALL"),
          getEnv("RESEND_AUDIENCE_MARKETING"),
          getEnv("RESEND_AUDIENCE_UPDATES"),
        ].filter(Boolean) as string[];
        if (audienceIds.length === 0) {
          console.warn("[Resend] No audience IDs configured. Set RESEND_AUDIENCE_ALL, RESEND_AUDIENCE_MARKETING, RESEND_AUDIENCE_UPDATES");
        }

        // Add contact to each audience (ignore failures)
        const delayMs = getDelayMs();
        for (const audienceId of audienceIds) {
          try {
            await resend.contacts.create({
              email,
              firstName,
              lastName,
              unsubscribed: false,
              audienceId,
            });
          } catch (err) {
            console.error("[Resend] add to audience failed", err);
          }
          if (delayMs > 0) {
            await sleep(delayMs);
          }
        }

        // Send welcome email (ignore failures)
        try {
          if (delayMs > 0) {
            await sleep(delayMs);
          }
          const sendResult = await resend.emails.send({
            from: getResendFrom(),
            to: email,
            subject: "Welcome to Loft!",
            react: FreeUserWelcome({ username: (fullName || firstName || "there"), userEmail: email }),
          });
          if (!sendResult?.data?.id) {
            console.error("[Resend] email send returned no id", sendResult);
          }
        } catch (sendErr) {
          console.error("[Resend] email send failed", sendErr);
        }
      } else {
        console.warn("[Resend] RESEND_API_KEY not set. Skipping audience add and welcome email");
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Handle user.deleted
    if (type === "user.deleted") {
      const clerkId = (root?.data as { id?: string } | undefined)?.id;
      if (!clerkId) {
        return new Response(JSON.stringify({ error: "Missing user id in user.deleted payload" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const pg = getPostgresPool();
      // Mark account_deleted and get email
      const result = await pg.query(
        `update public.users
         set account_deleted = now()
         where id = $1
         returning email, full_name`,
        [clerkId]
      );
      const email: string | undefined = result.rows?.[0]?.email;
      const fullName: string | undefined = result.rows?.[0]?.full_name || undefined;

      const resendApiKey = getEnv("RESEND_API_KEY");
      if (resendApiKey && email) {
        const resend = new Resend(resendApiKey);
        const audienceIds = [
          getEnv("RESEND_AUDIENCE_ALL"),
          getEnv("RESEND_AUDIENCE_MARKETING"),
          getEnv("RESEND_AUDIENCE_UPDATES"),
        ].filter(Boolean) as string[];
        const delayMs = getDelayMs();
        for (const audienceId of audienceIds) {
          try {
            await resend.contacts.remove({ audienceId, email });
          } catch (err) {
            console.error("[Resend] remove from audience failed", err);
          }
          if (delayMs > 0) {
            await sleep(delayMs);
          }
        }

        // Send account deletion email (ignore failures)
        try {
          if (delayMs > 0) {
            await sleep(delayMs);
          }
          const sendResult = await resend.emails.send({
            from: getResendFrom(),
            to: email,
            subject: "Your Loft account has been deleted",
            react: DeleteEmail({ username: fullName || "there", userEmail: email }),
          });
          if (!sendResult?.data?.id) {
            console.error("[Resend] delete email send returned no id", sendResult);
          }
        } catch (sendErr) {
          console.error("[Resend] delete email send failed", sendErr);
        }
      } else if (!resendApiKey) {
        console.warn("[Resend] RESEND_API_KEY not set. Skipping audience removals");
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Handle user.updated for Pro upgrades
    if (type === "user.updated") {
      console.log("[Webhook] Processing user.updated event");
      
      const userData = (root as ClerkUserUpdated).data;
      const clerkId = userData.id;
      const unsafeMetadata = userData.unsafe_metadata;

      console.log("[Webhook] Clerk ID:", clerkId);
      console.log("[Webhook] Unsafe metadata:", JSON.stringify(unsafeMetadata, null, 2));

      if (!clerkId) {
        console.error("[Webhook] Missing user id in user.updated payload");
        return new Response(JSON.stringify({ error: "Missing user id in user.updated payload" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Check for trigger events
      const subscription = unsafeMetadata?.subscription;
      const events = unsafeMetadata?.events;
      const milestones = unsafeMetadata?.milestones;

      // Pro upgrade detection
      const isProUpgrade = (subscription?.status === 'pro') || 
                          (events?.last_pro_upgrade_at !== undefined);

      // 100th link milestone detection  
      const isHundredthLink = (milestones?.hundredth_link_at !== undefined);

      console.log("[Webhook] Triggers detected - Pro upgrade:", isProUpgrade, "100th link:", isHundredthLink);

      if (!isProUpgrade && !isHundredthLink) {
        console.log("[Webhook] No relevant triggers detected, returning success");
        return new Response(JSON.stringify({ success: true, action: "no_triggers" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      const dataDb = getDataDb();
      
      console.log("[Webhook] Querying SUPABASE_URL_DATA for user:", clerkId);
      
      // Get user details from the data database (no database updates)
      const result = await dataDb.query(
        `select email, full_name 
         from public.users
         where id = $1`,
        [clerkId]
      );
      
      console.log("[Webhook] Database query result:", result.rows);
      
      const userRecord = result.rows?.[0];
      const email = userRecord?.email;
      const fullName = userRecord?.full_name;

      console.log("[Webhook] Extracted email:", email, "fullName:", fullName);

      if (!email) {
        console.error("[Webhook] User not found in database or no email available");
        return new Response(JSON.stringify({ error: "User not found or no email available" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Extract name from Clerk data or database
      const firstName = userData.first_name || "";
      const lastName = userData.last_name || "";
      const clerkFullName = [firstName, lastName].filter(Boolean).join(" ");
      const displayName = clerkFullName || fullName || "there";

      // Send appropriate emails based on triggers
      const resendApiKey = getEnv("RESEND_API_KEY");
      const actions: string[] = [];
      
      console.log("[Webhook] RESEND_API_KEY exists:", !!resendApiKey);
      console.log("[Webhook] Display name:", displayName);
      console.log("[Webhook] Target email:", email);
      
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        const delayMs = getDelayMs();
        
        // Handle Pro upgrade email
        if (isProUpgrade) {
          console.log("[Webhook] Attempting to send upgrade confirmation email");
          try {
            if (delayMs > 0) {
              await sleep(delayMs);
            }
            
            const emailPayload = {
              from: getResendFrom(),
              to: email,
              subject: "Welcome to Loft Pro! 🎉",
              react: UpgradeConfirmation({ username: displayName, userEmail: email }),
            };
            
            console.log("[Webhook] Email payload:", {
              from: emailPayload.from,
              to: emailPayload.to,
              subject: emailPayload.subject,
              username: displayName,
              userEmail: email
            });
            
            const sendResult = await resend.emails.send(emailPayload);
            
            console.log("[Webhook] Resend API response:", sendResult);
            
            if (!sendResult?.data?.id) {
              console.error("[Resend] Upgrade confirmation email send returned no id", sendResult);
              actions.push("upgrade_confirmation_failed");
            } else {
              console.log(`[Resend] Upgrade confirmation email sent to ${email} with id ${sendResult.data.id}`);
              actions.push("upgrade_confirmation_sent");
            }
          } catch (sendErr) {
            console.error("[Resend] Upgrade confirmation email send failed", sendErr);
            actions.push("upgrade_confirmation_failed");
          }
        }
        
        // Handle 100th link milestone email
        if (isHundredthLink) {
          try {
            if (delayMs > 0 && actions.length > 0) {
              await sleep(delayMs);
            }
            
            const sendResult = await resend.emails.send({
              from: getResendFrom(),
              to: email,
              subject: "🎉 You've saved 100 links with Loft!",
              react: MilestoneEmail({ username: displayName, userEmail: email }),
            });
            
            if (!sendResult?.data?.id) {
              console.error("[Resend] 100th link milestone email send returned no id", sendResult);
              actions.push("hundredth_link_email_failed");
            } else {
              console.log(`[Resend] 100th link milestone email sent to ${email} with id ${sendResult.data.id}`);
              actions.push("hundredth_link_email_sent");
            }
          } catch (sendErr) {
            console.error("[Resend] 100th link milestone email send failed", sendErr);
            actions.push("hundredth_link_email_failed");
          }
        }
      } else {
        console.warn("[Resend] RESEND_API_KEY not set. Skipping emails");
        actions.push("resend_api_key_missing");
      }

      return new Response(JSON.stringify({ 
        success: true, 
        actions,
        triggers: {
          pro_upgrade: isProUpgrade,
          hundredth_link: isHundredthLink
        }
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(null, { status: 204 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


