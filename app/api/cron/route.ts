import { Pool } from "pg";
import { Resend } from "resend";
import Day3TrialReminder from "@/app/emails/Day3TrialReminder";
import Day5TrialEnding from "@/app/emails/Day5TrialEnding";
import Day6TrialEndsTomorrow from "@/app/emails/Day6TrialEndsTomorrow";
import Day7TrialEndsToday from "@/app/emails/Day7TrialEndsToday";
import NoActivityReengagement from "@/app/emails/NoActivityReengagement";
import Week1PostCreation from "@/app/emails/Week1PostCreation";
import Week2PostCreation from "@/app/emails/Week2PostCreation";
import Week3PostCreation from "@/app/emails/Week3PostCreation";
import Week4PostCreation from "@/app/emails/Week4PostCreation";
import FeedbackSurvey30Days from "@/app/emails/FeedbackSurvey30Days";
import Month1PaidUser from "@/app/emails/Month1PaidUser";
import SubscriptionRenewal from "@/app/emails/SubscriptionRenewal";
import SubscriptionRenewalDay from "@/app/emails/SubscriptionRenewalDay";
import SubscriptionRenewalWeek from "@/app/emails/SubscriptionRenewalWeek";
import { getTemplateSubjectWithFallback } from "@/lib/email-subjects";

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

    // Compute the 3-day window (UTC) - using trial_started_at for trial timing
    // Select users whose trial started exactly 3 days ago (00:00 to 23:59:59)
    const result = await db.query(
      `with target_day as (
         select date_trunc('day', now() at time zone 'utc' - interval '3 days') as start_utc,
                date_trunc('day', now() at time zone 'utc' - interval '2 days') as end_utc
       )
       select u.id, u.email, u.full_name
       from public.users u, target_day t
       where u.trial_started_at >= t.start_utc and u.trial_started_at < t.end_utc
         and lower(coalesce(u.subscription_status, '')) = 'trial'
         and u.entitlement_pro_until > now()

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
          subject: await getTemplateSubjectWithFallback("Day3TrialReminder"),
          react: Day3TrialReminder({ username: name, userEmail: user.email }),
        });
        if (res?.data?.id) sent3 += 1;
      } catch (err) {
        console.error("[Cron] send failed", user.email, err);
      }
      if (delayMs > 0) await sleep(delayMs);
    }

    // Day 5: users whose trial started exactly 5 days ago (UTC day)
    const result5 = await db.query(
      `with target_day as (
         select date_trunc('day', now() at time zone 'utc' - interval '5 days') as start_utc,
                date_trunc('day', now() at time zone 'utc' - interval '4 days') as end_utc
       )
       select u.id, u.email, u.full_name
       from public.users u, target_day t
       where u.trial_started_at >= t.start_utc and u.trial_started_at < t.end_utc
         and lower(coalesce(u.subscription_status, '')) = 'trial'
         and u.entitlement_pro_until > now()`
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
          subject: await getTemplateSubjectWithFallback("Day5TrialEnding"),
          react: Day5TrialEnding({ username: name, userEmail: user.email }),
        });
        if (res?.data?.id) sent5 += 1;
      } catch (err) {
        console.error("[Cron] day5 send failed", user.email, err);
      }
      if (delayMs > 0) await sleep(delayMs);
    }

    // Day 6: users whose trial started exactly 6 days ago (UTC day)
    const result6 = await db.query(
      `with target_day as (
         select date_trunc('day', now() at time zone 'utc' - interval '6 days') as start_utc,
                date_trunc('day', now() at time zone 'utc' - interval '5 days') as end_utc
       )
       select u.id, u.email, u.full_name
       from public.users u, target_day t
       where u.trial_started_at >= t.start_utc and u.trial_started_at < t.end_utc
         and lower(coalesce(u.subscription_status, '')) = 'trial'
         and u.entitlement_pro_until > now()`
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
          subject: await getTemplateSubjectWithFallback("Day6TrialEndsTomorrow"),
          react: Day6TrialEndsTomorrow({ username: name, userEmail: user.email }),
        });
        if (res?.data?.id) sent6 += 1;
      } catch (err) {
        console.error("[Cron] day6 send failed", user.email, err);
      }
      if (delayMs > 0) await sleep(delayMs);
    }

    // Day 7: users whose trial started exactly 7 days ago (UTC day)
    const result7 = await db.query(
      `with target_day as (
         select date_trunc('day', now() at time zone 'utc' - interval '7 days') as start_utc,
                date_trunc('day', now() at time zone 'utc' - interval '6 days') as end_utc
       )
       select u.id, u.email, u.full_name
       from public.users u, target_day t
       where u.trial_started_at >= t.start_utc and u.trial_started_at < t.end_utc
         and lower(coalesce(u.subscription_status, '')) = 'trial'
         and u.entitlement_pro_until > now()`
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
          subject: await getTemplateSubjectWithFallback("Day7TrialEndsToday"),
          react: Day7TrialEndsToday({ username: name, userEmail: user.email }),
        });
        if (res?.data?.id) sent7 += 1;
      } catch (err) {
        console.error("[Cron] day7 send failed", user.email, err);
      }
      if (delayMs > 0) await sleep(delayMs);
    }

    // Day 7: ALL users created exactly 7 days ago with zero links (re-engagement)
    const result_7 = await db.query(
      `with target_day as (
         select date_trunc('day', now() at time zone 'utc' - interval '7 days') as start_utc,
                date_trunc('day', now() at time zone 'utc' - interval '6 days') as end_utc
       )
       select u.id, u.email, u.full_name
       from public.users u, target_day t
       where u.created_at >= t.start_utc and u.created_at < t.end_utc
         and u.account_deleted is null
         and lower(coalesce(u.subscription_status, '')) = 'active'
         and u.entitlement_pro_until > now()
         and not exists (
           select 1 from public.links l where l.user_id = u.id
         )`
    );
    const users_7: Array<{ id: string; email: string; full_name?: string | null }> = result_7.rows || [];
    let sent_7 = 0;
    for (const user of users_7) {
      try {
        if (!user.email) continue;
        const name = (user.full_name || "there").toString();
        const res = await resend.emails.send({
          from: getResendFrom(),
          to: user.email,
          subject: await getTemplateSubjectWithFallback("NoActivityReengagement"),
          react: NoActivityReengagement({ username: name, userEmail: user.email }),
        });
        if (res?.data?.id) sent_7 += 1;
      } catch (err) {
        console.error("[Cron] day7 no activity send failed", user.email, err);
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
       where u.created_at >= t.start_utc and u.created_at < t.end_utc
`
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
          subject: await getTemplateSubjectWithFallback("Week1PostCreation"),
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
       where u.created_at >= t.start_utc and u.created_at < t.end_utc
`
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
          subject: await getTemplateSubjectWithFallback("Week2PostCreation"),
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
       where u.created_at >= t.start_utc and u.created_at < t.end_utc
`
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
          subject: await getTemplateSubjectWithFallback("Week3PostCreation"),
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
       where u.created_at >= t.start_utc and u.created_at < t.end_utc
`
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
          subject: await getTemplateSubjectWithFallback("Week4PostCreation"),
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
       where u.created_at >= t.start_utc and u.created_at < t.end_utc
`
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
          subject: "bye",
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
        and lower(coalesce(u.subscription_status, '')) = 'active'
`
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
          subject: await getTemplateSubjectWithFallback("Month1PaidUser"),
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

    // Subscription renewal reminders - using entitlement_pro_until and excluding trial users
    let sentRenewalWeek = 0;
    let sentRenewalDay = 0;
    let sentRenewal30Day = 0;
    let processedRenewalEvents = 0;

    // Get paid users approaching subscription expiration using entitlement_pro_until
    const renewalUsersResult = await db.query(
      `select u.id, u.email, u.full_name, u.entitlement_pro_until,
              (u.entitlement_pro_until::date - now()::date) as days_until_expiration
       from public.users u
       where u.entitlement_pro_until > now()
         and lower(coalesce(u.subscription_status, '')) = 'active'
         and (u.entitlement_pro_until::date - now()::date) in (1, 7, 30)`
    );

    const renewalUsers: Array<{ 
      id: string; 
      email: string; 
      full_name?: string | null;
      entitlement_pro_until: string;
      days_until_expiration: number 
    }> = renewalUsersResult.rows || [];

    // Send emails based on days until expiration
    for (const user of renewalUsers) {
      try {
        if (!user.email) continue;

        const expirationDate = new Date(user.entitlement_pro_until).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        const name = (user.full_name || "there").toString();
        const days = Math.round(user.days_until_expiration);
        let emailSent = false;

        // Send appropriate renewal reminder based on exact days until expiration
        if (days === 30) {
          // Exactly 30 days before expiration
          const res = await resend.emails.send({
            from: getResendFrom(),
            to: user.email,
            subject: await getTemplateSubjectWithFallback("SubscriptionRenewal"),
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
        } else if (days === 7) {
          // Exactly 7 days before expiration
          const res = await resend.emails.send({
            from: getResendFrom(),
            to: user.email,
            subject: await getTemplateSubjectWithFallback("SubscriptionRenewalWeek"),
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
        } else if (days === 1) {
          // Exactly 1 day before expiration
          const res = await resend.emails.send({
            from: getResendFrom(),
            to: user.email,
            subject: await getTemplateSubjectWithFallback("SubscriptionRenewalDay"),
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
        }

        if (emailSent) {
          processedRenewalEvents += 1;
          if (delayMs > 0) await sleep(delayMs);
        }

      } catch (err) {
        console.error("[Cron] renewal reminder send failed", user.email, err);
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
      processed_7: users_7.length, 
      sent_7, 
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


