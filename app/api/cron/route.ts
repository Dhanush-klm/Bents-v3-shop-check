import { Pool } from "pg";
import { Resend } from "resend";
import Day3TrialReminder from "@/app/emails/Day3TrialReminder";
import Day5TrialEnding from "@/app/emails/Day5TrialEnding";
import Day6TrialEndsTomorrow from "@/app/emails/Day6TrialEndsTomorrow";
import Day7TrialEndsToday from "@/app/emails/Day7TrialEndsToday";
import Week1PostCreation from "@/app/emails/Week1PostCreation";
import Week2PostCreation from "@/app/emails/Week2PostCreation";
import Week3PostCreation from "@/app/emails/Week3PostCreation";
import Week4PostCreation from "@/app/emails/Week4PostCreation";
import FeedbackSurvey30Days from "@/app/emails/FeedbackSurvey30Days";
import Month1PaidUser from "@/app/emails/Month1PaidUser";
import SubscriptionRenewal from "@/app/emails/SubscriptionRenewal";
import SubscriptionRenewalDay from "@/app/emails/SubscriptionRenewalDay";
import SubscriptionRenewalWeek from "@/app/emails/SubscriptionRenewalWeek";

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
      return from || "Loft <info@loftit.ai>";
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
         and lower(coalesce(u.subscription_status, '')) = 'trial'
         and not exists (
           select 1 from public.links l where l.user_id = u.id
         )`
    );

    const users: Array<{ id: string; email: string; full_name?: string | null }> = result.rows || [];
    const processed3Count = users.length;

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

    let sent3 = 0;
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
        if (res?.data?.id) sent3 += 1;
      } catch (err) {
        console.error("[Cron] send failed", user.email, err);
      }
      if (delayMs > 0) await sleep(delayMs);
    }

    // Day 5: users created exactly 5 days ago (UTC day) with no links
    const result5 = await db.query(
      `with target_day as (
         select date_trunc('day', now() at time zone 'utc' - interval '5 days') as start_utc,
                date_trunc('day', now() at time zone 'utc' - interval '4 days') as end_utc
       )
       select u.id, u.email, u.full_name
       from public.users u, target_day t
       where u.created_at >= t.start_utc and u.created_at < t.end_utc
         and lower(coalesce(u.subscription_status, '')) = 'trial'
         and not exists (
           select 1 from public.links l where l.user_id = u.id
         )`
    );
    const users5: Array<{ id: string; email: string; full_name?: string | null }> = result5.rows || [];
    let sent5 = 0;
    for (const user of users5) {
      try {
        if (!user.email) continue;
        const name = (user.full_name || "there").toString();
        const res = await resend.emails.send({
          from: getResendFrom(),
          to: user.email,
          subject: "Your trial is ending soon — keep your Loft flow going",
          react: Day5TrialEnding({ username: name, userEmail: user.email }),
        });
        if (res?.data?.id) sent5 += 1;
      } catch (err) {
        console.error("[Cron] day5 send failed", user.email, err);
      }
      if (delayMs > 0) await sleep(delayMs);
    }

    // Day 6: users created exactly 6 days ago (UTC day) with no links
    const result6 = await db.query(
      `with target_day as (
         select date_trunc('day', now() at time zone 'utc' - interval '6 days') as start_utc,
                date_trunc('day', now() at time zone 'utc' - interval '5 days') as end_utc
       )
       select u.id, u.email, u.full_name
       from public.users u, target_day t
       where u.created_at >= t.start_utc and u.created_at < t.end_utc
         and lower(coalesce(u.subscription_status, '')) = 'trial'
         and not exists (
           select 1 from public.links l where l.user_id = u.id
         )`
    );
    const users6: Array<{ id: string; email: string; full_name?: string | null }> = result6.rows || [];
    let sent6 = 0;
    for (const user of users6) {
      try {
        if (!user.email) continue;
        const name = (user.full_name || "there").toString();
        const res = await resend.emails.send({
          from: getResendFrom(),
          to: user.email,
          subject: "Your Loft trial ends tomorrow",
          react: Day6TrialEndsTomorrow({ username: name, userEmail: user.email }),
        });
        if (res?.data?.id) sent6 += 1;
      } catch (err) {
        console.error("[Cron] day6 send failed", user.email, err);
      }
      if (delayMs > 0) await sleep(delayMs);
    }

    // Day 7: users created exactly 7 days ago (UTC day) with no links
    const result7 = await db.query(
      `with target_day as (
         select date_trunc('day', now() at time zone 'utc' - interval '7 days') as start_utc,
                date_trunc('day', now() at time zone 'utc' - interval '6 days') as end_utc
       )
       select u.id, u.email, u.full_name
       from public.users u, target_day t
       where u.created_at >= t.start_utc and u.created_at < t.end_utc
         and lower(coalesce(u.subscription_status, '')) = 'trial'
         and not exists (
           select 1 from public.links l where l.user_id = u.id
         )`
    );
    const users7: Array<{ id: string; email: string; full_name?: string | null }> = result7.rows || [];
    let sent7 = 0;
    for (const user of users7) {
      try {
        if (!user.email) continue;
        const name = (user.full_name || "there").toString();
        const res = await resend.emails.send({
          from: getResendFrom(),
          to: user.email,
          subject: "Your Loft trial ends today",
          react: Day7TrialEndsToday({ username: name, userEmail: user.email }),
        });
        if (res?.data?.id) sent7 += 1;
      } catch (err) {
        console.error("[Cron] day7 send failed", user.email, err);
      }
      if (delayMs > 0) await sleep(delayMs);
    }

    // Week 1 (7 days ago)
    const resultW1 = await db.query(
      `with target_day as (
         select date_trunc('day', now() at time zone 'utc' - interval '7 days') as start_utc,
                date_trunc('day', now() at time zone 'utc' - interval '6 days') as end_utc
       )
       select u.id, u.email, u.full_name
       from public.users u, target_day t
       where u.created_at >= t.start_utc and u.created_at < t.end_utc`
    );
    const usersW1: Array<{ id: string; email: string; full_name?: string | null }> = resultW1.rows || [];
    let sentW1 = 0;
    for (const user of usersW1) {
      try {
        if (!user.email) continue;
        const name = (user.full_name || "there").toString();
        const res = await resend.emails.send({
          from: getResendFrom(),
          to: user.email,
          subject: "Getting started with Loft — your first week",
          react: Week1PostCreation({ username: name, userEmail: user.email }),
        });
        if (res?.data?.id) sentW1 += 1;
      } catch (err) {
        console.error("[Cron] week1 send failed", user.email, err);
      }
      if (delayMs > 0) await sleep(delayMs);
    }

    // Week 2 (14 days ago)
    const resultW2 = await db.query(
      `with target_day as (
         select date_trunc('day', now() at time zone 'utc' - interval '14 days') as start_utc,
                date_trunc('day', now() at time zone 'utc' - interval '13 days') as end_utc
       )
       select u.id, u.email, u.full_name
       from public.users u, target_day t
       where u.created_at >= t.start_utc and u.created_at < t.end_utc`
    );
    const usersW2: Array<{ id: string; email: string; full_name?: string | null }> = resultW2.rows || [];
    let sentW2 = 0;
    for (const user of usersW2) {
      try {
        if (!user.email) continue;
        const name = (user.full_name || "there").toString();
        const res = await resend.emails.send({
          from: getResendFrom(),
          to: user.email,
          subject: "Loft tips — week 2",
          react: Week2PostCreation({ username: name, userEmail: user.email }),
        });
        if (res?.data?.id) sentW2 += 1;
      } catch (err) {
        console.error("[Cron] week2 send failed", user.email, err);
      }
      if (delayMs > 0) await sleep(delayMs);
    }

    // Week 3 (21 days ago)
    const resultW3 = await db.query(
      `with target_day as (
         select date_trunc('day', now() at time zone 'utc' - interval '21 days') as start_utc,
                date_trunc('day', now() at time zone 'utc' - interval '20 days') as end_utc
       )
       select u.id, u.email, u.full_name
       from public.users u, target_day t
       where u.created_at >= t.start_utc and u.created_at < t.end_utc`
    );
    const usersW3: Array<{ id: string; email: string; full_name?: string | null }> = resultW3.rows || [];
    let sentW3 = 0;
    for (const user of usersW3) {
      try {
        if (!user.email) continue;
        const name = (user.full_name || "there").toString();
        const res = await resend.emails.send({
          from: getResendFrom(),
          to: user.email,
          subject: "Keep your Loft flow going — week 3",
          react: Week3PostCreation({ username: name, userEmail: user.email }),
        });
        if (res?.data?.id) sentW3 += 1;
      } catch (err) {
        console.error("[Cron] week3 send failed", user.email, err);
      }
      if (delayMs > 0) await sleep(delayMs);
    }

    // Week 4 (28 days ago)
    const resultW4 = await db.query(
      `with target_day as (
         select date_trunc('day', now() at time zone 'utc' - interval '28 days') as start_utc,
                date_trunc('day', now() at time zone 'utc' - interval '27 days') as end_utc
       )
       select u.id, u.email, u.full_name
       from public.users u, target_day t
       where u.created_at >= t.start_utc and u.created_at < t.end_utc`
    );
    const usersW4: Array<{ id: string; email: string; full_name?: string | null }> = resultW4.rows || [];
    let sentW4 = 0;
    for (const user of usersW4) {
      try {
        if (!user.email) continue;
        const name = (user.full_name || "there").toString();
        const res = await resend.emails.send({
          from: getResendFrom(),
          to: user.email,
          subject: "Level up with Loft — week 4",
          react: Week4PostCreation({ username: name, userEmail: user.email }),
        });
        if (res?.data?.id) sentW4 += 1;
      } catch (err) {
        console.error("[Cron] week4 send failed", user.email, err);
      }
      if (delayMs > 0) await sleep(delayMs);
    }

    // 30 days feedback survey (30 days ago)
    const result30Days = await db.query(
      `with target_day as (
         select date_trunc('day', now() at time zone 'utc' - interval '30 days') as start_utc,
                date_trunc('day', now() at time zone 'utc' - interval '29 days') as end_utc
       )
       select u.id, u.email, u.full_name
       from public.users u, target_day t
       where u.created_at >= t.start_utc and u.created_at < t.end_utc`
    );
    const users30Days: Array<{ id: string; email: string; full_name?: string | null }> = result30Days.rows || [];
    let sent30Days = 0;
    for (const user of users30Days) {
      try {
        if (!user.email) continue;
        const name = (user.full_name || "there").toString();
        const res = await resend.emails.send({
          from: getResendFrom(),
          to: user.email,
          subject: "We'd love your feedback — 30 days with Loft",
          react: FeedbackSurvey30Days({ 
            username: name, 
            userEmail: user.email,
            surveyUrl: "https://forms.gle/YourSurveyLinkHere" 
          }),
        });
        if (res?.data?.id) sent30Days += 1;
      } catch (err) {
        console.error("[Cron] 30days feedback send failed", user.email, err);
      }
      if (delayMs > 0) await sleep(delayMs);
    }

    // 1 month paid users (30 days ago with paid subscription)
    const result1MonthPaid = await db.query(
      `with target_day as (
         select date_trunc('day', now() at time zone 'utc' - interval '30 days') as start_utc,
                date_trunc('day', now() at time zone 'utc' - interval '29 days') as end_utc
       )
       select u.id, u.email, u.full_name
       from public.users u, target_day t
       where u.created_at >= t.start_utc and u.created_at < t.end_utc
         and lower(coalesce(u.subscription_status, '')) = 'paid'`
    );
    const users1MonthPaid: Array<{ id: string; email: string; full_name?: string | null }> = result1MonthPaid.rows || [];
    let sent1MonthPaid = 0;
    for (const user of users1MonthPaid) {
      try {
        if (!user.email) continue;
        const name = (user.full_name || "there").toString();
        const res = await resend.emails.send({
          from: getResendFrom(),
          to: user.email,
          subject: "A month with Loft — here's what's next",
          react: Month1PaidUser({ 
            username: name, 
            userEmail: user.email
          }),
        });
        if (res?.data?.id) sent1MonthPaid += 1;
      } catch (err) {
        console.error("[Cron] 1month paid user send failed", user.email, err);
      }
      if (delayMs > 0) await sleep(delayMs);
    }

    // Subscription renewal reminders based on subscription_events
    const now = Date.now();
    
    // First: Get all subscription events and do calculations in SQL
    const renewalEventsResult = await db.query(
      `select se.user_id, se.payload,
              (se.payload::jsonb->'event'->>'expiration_at_ms')::bigint as expiration_ms,
              extract(day from (to_timestamp((se.payload::jsonb->'event'->>'expiration_at_ms')::bigint / 1000) - now())) as days_until_expiration
       from public.subscription_events se
       where se.payload::jsonb->'event'->>'expiration_at_ms' is not null
         and (se.payload::jsonb->'event'->>'expiration_at_ms')::bigint > $1`
    , [now]);

    const renewalEvents: Array<{ 
      user_id: string; 
      payload: any; 
      expiration_ms: number; 
      days_until_expiration: number 
    }> = renewalEventsResult.rows || [];

    let sentRenewalWeek = 0;
    let sentRenewalDay = 0;
    let sentRenewal30Day = 0;
    let processedRenewalEvents = 0;

    // Second: Filter only the rows that match our criteria
    const matchedEvents = renewalEvents.filter(event => {
      const days = Math.round(event.days_until_expiration);
      return (days >= 6 && days <= 8) ||    // 7 days before
             (days >= 0 && days <= 2) ||    // 1 day before  
             (days >= 28 && days <= 32);    // 30 days before
    });

    // Third: Get user details for matched events
    if (matchedEvents.length > 0) {
      const userIds = matchedEvents.map(e => e.user_id);
      const usersResult = await db.query(
        `select id, email, full_name 
         from public.users 
         where id = any($1)`,
        [userIds]
      );

      const usersMap = new Map();
      usersResult.rows.forEach(user => {
        usersMap.set(user.id, user);
      });

      // Send emails for matched events
      for (const event of matchedEvents) {
        try {
          const user = usersMap.get(event.user_id);
          if (!user || !user.email) continue;

          const expirationDate = new Date(event.expiration_ms).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });

          const name = (user.full_name || "there").toString();
          const days = Math.round(event.days_until_expiration);
          let emailSent = false;

          // Send appropriate renewal reminder based on days until expiration
          if (days >= 6 && days <= 8) {
            // ~7 days before expiration
            const res = await resend.emails.send({
              from: getResendFrom(),
              to: user.email,
              subject: "Your Loft subscription renews next week",
              react: SubscriptionRenewalWeek({ 
                username: name, 
                userEmail: user.email,
                renewalDate: expirationDate
              }),
            });
            if (res?.data?.id) {
              sentRenewalWeek += 1;
              emailSent = true;
            }
          } else if (days >= 0 && days <= 2) {
            // ~1 day before expiration (0-2 days range)
            const res = await resend.emails.send({
              from: getResendFrom(),
              to: user.email,
              subject: "Your Loft subscription renews tomorrow",
              react: SubscriptionRenewalDay({ 
                username: name, 
                userEmail: user.email,
                renewalDate: expirationDate
              }),
            });
            if (res?.data?.id) {
              sentRenewalDay += 1;
              emailSent = true;
            }
          } else if (days >= 28 && days <= 32) {
            // ~30 days before expiration
            const res = await resend.emails.send({
              from: getResendFrom(),
              to: user.email,
              subject: "Your Loft subscription renews in 30 days",
              react: SubscriptionRenewal({ 
                username: name, 
                userEmail: user.email,
                renewalDate: expirationDate
              }),
            });
            if (res?.data?.id) {
              sentRenewal30Day += 1;
              emailSent = true;
            }
          }

          if (emailSent) {
            processedRenewalEvents += 1;
            if (delayMs > 0) await sleep(delayMs);
          }

        } catch (err) {
          console.error("[Cron] renewal reminder send failed", err);
        }
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      processed3: processed3Count, 
      sent3, 
      processed5: users5.length, 
      sent5, 
      processed6: users6.length, 
      sent6, 
      processed7: users7.length, 
      sent7, 
      processedW1: usersW1.length, 
      sentW1, 
      processedW2: usersW2.length, 
      sentW2, 
      processedW3: usersW3.length, 
      sentW3, 
      processedW4: usersW4.length, 
      sentW4, 
      processed30Days: users30Days.length, 
      sent30Days, 
      processed1MonthPaid: users1MonthPaid.length, 
      sent1MonthPaid,
      processedRenewalEvents,
      sentRenewalWeek,
      sentRenewalDay,
      sentRenewal30Day
    }), {
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


