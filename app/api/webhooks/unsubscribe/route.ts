import { Pool } from "pg";
import { Resend } from "resend";
import UnsubscribedAll from "@/app/emails/UnsubscribedAll";
import UnsubscribeActivePaid from "@/app/emails/UnsubscribeActivePaid";

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

function getResendFrom(): string {
  const from = getEnv("RESEND_FROM");
      return from || "Loft <info@loftit.ai>";
}

let dataPool: Pool | undefined;
let mainPool: Pool | undefined;

function getDataDb(): Pool {
  if (dataPool) return dataPool;
  const connectionString = getEnv("SUPABASE_URL_DATA");
  if (!connectionString) throw new Error("Missing SUPABASE_URL_DATA Postgres connection string");
  dataPool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  return dataPool;
}

function getMainDb(): Pool {
  if (mainPool) return mainPool;
  const connectionString = getEnv("SUPABASE_URL");
  if (!connectionString) throw new Error("Missing SUPABASE_URL Postgres connection string");
  mainPool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  return mainPool;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function parseBooleanInput(value: unknown): boolean | undefined {
  if (value === true) return true;
  if (value === false) return false;
  if (typeof value === "string") {
    const v = value.trim().toLowerCase();
    if (v === "true" || v === "1" || v === "yes" || v === "on" || v === "checked") return true;
    if (v === "false" || v === "0" || v === "no" || v === "off" || v === "unchecked") return false;
  }
  return undefined;
}

function getDelayMs(): number {
  const raw = getEnv("RESEND_RATE_DELAY_MS");
  const parsed = raw ? Number(raw) : Number.NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 600;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// CORS helpers
const defaultAllowedOrigins: string[] = (() => {
  const env = getEnv("CORS_ALLOW_ORIGINS");
  if (env) {
    return env
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [
    "https://loftit.ai",
    "https://www.loftit.ai",
    "https://loft.ai",
    "https://www.loft.ai",
    "https://preview--loft-ai.lovable.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ];
})();

function buildCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin");
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (origin && defaultAllowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: buildCorsHeaders(request) });
}

async function findUserIdByEmail(email: string): Promise<string | undefined> {
  const db = getDataDb();
  const result = await db.query(
    `select id from public.users where lower(email) = lower($1) limit 1`,
    [email]
  );
  return result.rows?.[0]?.id as string | undefined;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email") || undefined;
    if (!email) {
      return new Response(JSON.stringify({ error: "Email parameter is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...buildCorsHeaders(request) },
      });
    }
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...buildCorsHeaders(request) },
      });
    }

    const userId = await findUserIdByEmail(email);
    if (!userId) {
      return new Response(JSON.stringify({ error: "User not found for given email" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...buildCorsHeaders(request) },
      });
    }

    const mainDb = getMainDb();
    const res = await mainDb.query(
      `select out_from_marketing, out_from_update from public.users where id = $1`,
      [userId]
    );
    const row = res.rows?.[0] || {};

    return new Response(JSON.stringify({
      out_from_marketing: row.out_from_marketing || null,
      out_from_update: row.out_from_update || null,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...buildCorsHeaders(request) },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...buildCorsHeaders(request) },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email: string | undefined = body?.email;
    // Accept either unsubscribe_* or out_from_* booleans; also accept string values like "true"/"false"
    const unsubscribeMarketingRaw = body?.unsubscribe_marketing ?? body?.out_from_marketing;
    const unsubscribeUpdatesRaw = body?.unsubscribe_updates ?? body?.out_from_updates;
    const unsubscribeMarketing: boolean = parseBooleanInput(unsubscribeMarketingRaw) === true;
    const unsubscribeUpdates: boolean = parseBooleanInput(unsubscribeUpdatesRaw) === true;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email parameter is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...buildCorsHeaders(request) },
      });
    }
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...buildCorsHeaders(request) },
      });
    }

    const userId = await findUserIdByEmail(email);
    if (!userId) {
      return new Response(JSON.stringify({ error: "User not found for given email" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...buildCorsHeaders(request) },
      });
    }

    const mainDb = getMainDb();
    const result = await mainDb.query(
      `update public.users
         set out_from_marketing = case when $2 then now() else null end,
             out_from_update    = case when $3 then now() else null end
       where id = $1
       returning out_from_marketing, out_from_update, full_name`,
      [userId, unsubscribeMarketing, unsubscribeUpdates]
    );

    const row = result.rows?.[0] || {};

    // Log decision for debugging
    console.log("[Unsubscribe] prefs updated", {
      email,
      userId,
      unsubscribeMarketing,
      unsubscribeUpdates,
    });

    // Sync preferences with Resend audiences (best-effort)
    const resendApiKey = getEnv("RESEND_API_KEY");
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const fullName: string | undefined = row.full_name as string | undefined;
      let firstName: string | undefined;
      let lastName: string | undefined;
      if (fullName) {
        const parts = String(fullName).trim().split(/\s+/);
        firstName = parts[0];
        lastName = parts.slice(1).join(" ") || undefined;
      }

      // Updates audience sync
      const updatesAudienceId = getEnv("RESEND_AUDIENCE_UPDATES");
      if (updatesAudienceId) {
        try {
          if (unsubscribeUpdates) {
            await resend.contacts.remove({ audienceId: updatesAudienceId, email });
          } else {
            await resend.contacts.create({
              audienceId: updatesAudienceId,
              email,
              firstName,
              lastName,
              unsubscribed: false,
            });
          }
        } catch (err) {
          console.error("[Resend] updates audience sync failed", err);
        }
        const delayMs = getDelayMs();
        if (delayMs > 0) await sleep(delayMs);
      }

      // Marketing audience sync
      const marketingAudienceId = getEnv("RESEND_AUDIENCE_MARKETING");
      if (marketingAudienceId) {
        try {
          if (unsubscribeMarketing) {
            await resend.contacts.remove({ audienceId: marketingAudienceId, email });
          } else {
            await resend.contacts.create({
              audienceId: marketingAudienceId,
              email,
              firstName,
              lastName,
              unsubscribed: false,
            });
          }
        } catch (err) {
          console.error("[Resend] marketing audience sync failed", err);
        }
        const delayMs = getDelayMs();
        if (delayMs > 0) await sleep(delayMs);
      }
    } else {
      console.warn("[Resend] RESEND_API_KEY not set. Skipping audience sync");
    }

    // If user opted out of both types, send UnsubscribedAll email (best-effort)
    if (unsubscribeMarketing && unsubscribeUpdates) {
      const resendApiKey = getEnv("RESEND_API_KEY");
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        try {
          const delayMs = getDelayMs();
          if (delayMs > 0) await sleep(delayMs);
          // Check subscription status from DATA project
          let subscriptionStatus: string | undefined;
          try {
            const dataDb = getDataDb();
            const subRes = await dataDb.query(
              `select subscription_status from public.users where id = $1 limit 1`,
              [userId]
            );
            subscriptionStatus = subRes.rows?.[0]?.subscription_status as string | undefined;
          } catch (subErr) {
            console.error("[DB] Failed to fetch subscription_status from DATA project", subErr);
          }

          const isActivePaid = (subscriptionStatus || "").toLowerCase() === "active";
          const username = (row.full_name as string | undefined) || "there";

          const sendResult = await resend.emails.send(
            isActivePaid
              ? {
                  from: getResendFrom(),
                  to: email,
                  subject: "You’ll no longer receive Loft updates — but your subscription is still active",
                  react: UnsubscribeActivePaid({ username, userEmail: email }),
                }
              : {
                  from: getResendFrom(),
                  to: email,
                  subject: "You've been unsubscribed from all Loft emails",
                  react: UnsubscribedAll({ username, userEmail: email }),
                }
          );
          if (!sendResult?.data?.id) {
            console.error("[Resend] UnsubscribedAll email send returned no id", sendResult);
          }
        } catch (err) {
          console.error("[Resend] UnsubscribedAll email send failed", err);
        }
      } else {
        console.warn("[Resend] RESEND_API_KEY not set. Skipping UnsubscribedAll email");
      }
    }
    return new Response(JSON.stringify({
      success: true,
      email,
      out_from_marketing: row.out_from_marketing || null,
      out_from_update: row.out_from_update || null,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...buildCorsHeaders(request) },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...buildCorsHeaders(request) },
    });
  }
}


