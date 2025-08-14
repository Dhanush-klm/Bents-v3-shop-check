import { Pool } from "pg";
import { Resend } from "resend";
import FreeUserWelcome from "@/app/emails/FreeUserWelcome";

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

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

function getResendFrom(): string {
  const from = getEnv("RESEND_FROM");
  if (from) return from;
  return "Loft <onboarding@resend.dev>";
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
    const payload = (await request.json()) as ClerkUserCreated;

    if (!payload || payload.type !== "user.created") {
      return new Response(null, { status: 204 });
    }

    const user = payload.data;
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

      // Add contact to each audience (ignore failures)
      const audienceResults = await Promise.allSettled(
        audienceIds.map((audienceId) =>
          resend.contacts.create({
            email,
            firstName,
            lastName,
            unsubscribed: false,
            audienceId,
          })
        )
      );
      audienceResults.forEach((result) => {
        if (result.status === "rejected") {
          console.error("[Resend] add to audience failed", result.reason);
        }
      });

      // Send welcome email (ignore failures)
      try {
        const sendResult = await resend.emails.send({
          from: getResendFrom(),
          to: email,
          subject: "Welcome to Loft!",
          react: FreeUserWelcome({ username: firstName || "there", userEmail: email }),
        });
        if (!sendResult?.data?.id) {
          console.error("[Resend] email send returned no id", sendResult);
        }
      } catch (sendErr) {
        console.error("[Resend] email send failed", sendErr);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


