import { Pool } from "pg";
import { Resend } from "resend";
import Day3TrialReminder from "@/app/emails/Day3TrialReminder";

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

let dataPool: Pool | undefined;
function getDataDb(): Pool {
  if (dataPool) return dataPool;
  const connectionString = getEnv("SUPABASE_URL_DATA");
  if (!connectionString) throw new Error("Missing SUPABASE_URL_DATA Postgres connection string");
  dataPool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  return dataPool;
}

function getResendFrom(): string {
  const from = getEnv("RESEND_FROM");
  return from || "Loft <noreply@loftit.ai>";
}

function getDelayMs(): number {
  const raw = getEnv("RESEND_RATE_DELAY_MS");
  const parsed = raw ? Number(raw) : Number.NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 600;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET() {
  try {
    const db = getDataDb();

    // Compute the 3-day window (UTC)
    // Select users whose created_at is on the day exactly 3 days ago (00:00 to 23:59:59)
    const result = await db.query(
      `with target_day as (
         select date_trunc('day', now() at time zone 'utc' - interval '3 days') as start_utc,
                date_trunc('day', now() at time zone 'utc' - interval '2 days') as end_utc
       )
       select u.id, u.email, u.full_name
       from public.users u, target_day t
       where u.created_at >= t.start_utc and u.created_at < t.end_utc
         and not exists (
           select 1 from public.links l where l.user_id = u.id
         )`
    );

    const users: Array<{ id: string; email: string; full_name?: string | null }> = result.rows || [];

    if (!users.length) {
      return new Response(JSON.stringify({ success: true, processed: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resendKey = getEnv("RESEND_API_KEY");
    if (!resendKey) {
      console.warn("[Cron] RESEND_API_KEY not set. Skipping emails");
      return new Response(JSON.stringify({ success: false, error: "RESEND_API_KEY missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    const resend = new Resend(resendKey);
    const delayMs = getDelayMs();

    let sent = 0;
    for (const user of users) {
      try {
        if (!user.email) continue;
        const name = (user.full_name || "there").toString();
        const res = await resend.emails.send({
          from: getResendFrom(),
          to: user.email,
          subject: "Reminder: Try Loft — your smarter way to save links",
          react: Day3TrialReminder({ username: name, userEmail: user.email }),
        });
        if (res?.data?.id) sent += 1;
      } catch (err) {
        console.error("[Cron] send failed", user.email, err);
      }
      if (delayMs > 0) await sleep(delayMs);
    }

    return new Response(JSON.stringify({ success: true, processed: users.length, sent }), {
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


