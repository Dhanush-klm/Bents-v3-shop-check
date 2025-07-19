import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import WelcomeEmail from "@/app/emails/Welcome";
import DeleteEmail from "@/app/emails/Delete";
import { Pool } from "pg";

const resend = new Resend(process.env.RESEND_API_KEY!);
const AUDIENCE_IDS = [
  process.env.RESEND_AUDIENCE_ALL!,
  process.env.RESEND_AUDIENCE_MARKETING!,
  process.env.RESEND_AUDIENCE_UPDATES!,
].filter(Boolean);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function logUserCreated(clerkUserId: string, email: string, firstName: string, lastName: string) {
  await pool.query(
    `INSERT INTO users (clerk_user_id, email, first_name, last_name, account_created, out_from_marketing, out_from_update, account_deleted)
     VALUES ($1, $2, $3, $4, NOW(), NULL, NULL, NULL)
     ON CONFLICT (clerk_user_id) DO UPDATE SET email = EXCLUDED.email, first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name`,
    [clerkUserId, email, firstName, lastName]
  );
}

async function setUserDeleted(clerkUserId: string) {
  await pool.query(
    "UPDATE users SET account_deleted = NOW() WHERE clerk_user_id = $1",
    [clerkUserId]
  );
}

async function setUserOutFromMarketing(clerkUserId: string) {
  await pool.query(
    "UPDATE users SET out_from_marketing = NOW() WHERE clerk_user_id = $1",
    [clerkUserId]
  );
}

async function setUserOutFromUpdate(clerkUserId: string) {
  await pool.query(
    "UPDATE users SET out_from_update = NOW() WHERE clerk_user_id = $1",
    [clerkUserId]
  );
}

async function getEmailByClerkUserId(clerkUserId: string): Promise<string | null> {
  const result = await pool.query(
    "SELECT email FROM users WHERE clerk_user_id = $1 LIMIT 1",
    [clerkUserId]
  );
  return result.rows[0]?.email || null;
}

async function getUserByClerkUserId(clerkUserId: string): Promise<{ email: string, first_name: string, last_name: string } | null> {
  const result = await pool.query(
    "SELECT email, first_name, last_name FROM users WHERE clerk_user_id = $1 LIMIT 1",
    [clerkUserId]
  );
  return result.rows[0] || null;
}

export async function POST(req: NextRequest) {
  const event = await req.json();
  const { type, data } = event;
  console.log("[Clerk Webhook] Event received:", type, data);

  if (type === "user.created") {
    const email = data.email_addresses?.[0]?.email_address;
    const firstName = data.first_name || "";
    const lastName = data.last_name || "";
    const clerkUserId = data.id;
    if (email) {
      for (const audienceId of AUDIENCE_IDS) {
        const addResult = await resend.contacts.create({
          email,
          firstName,
          lastName,
          unsubscribed: false,
          audienceId,
        });
        console.log(`[Resend] API response (add contact, audience ${audienceId}):`, addResult);
        console.log(`[Resend] Added to audience ${audienceId}:`, email);
      }
      await resend.emails.send({
        from: "Loft <noreply@loftit.ai>",
        to: email,
        subject: "Welcome to Loft!",
        react: WelcomeEmail({ username: firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || email, userEmail: email }),
      });
      console.log("[Resend] Welcome email sent to:", email);
      await logUserCreated(clerkUserId, email, firstName, lastName);
    } else {
      console.error("[Webhook] No email found in user.created event");
    }
    return NextResponse.json({ received: true });
  }

  if (type === "user.deleted") {
    const clerkUserId = data.id;
    const user = await getUserByClerkUserId(clerkUserId);
    if (user) {
      const { email, first_name, last_name } = user;
      const username = first_name ? (last_name ? `${first_name} ${last_name}` : first_name) : email;
      for (const audienceId of AUDIENCE_IDS) {
        const removeResult = await resend.contacts.remove({
          email,
          audienceId,
        });
        console.log(`[Resend] API response (remove contact, audience ${audienceId}):`, removeResult);
        console.log(`[Resend] Removed from audience ${audienceId}:`, email);
      }
      await resend.emails.send({
        from: "Loft <noreply@loftit.ai>",
        to: email,
        subject: "Your Loft account has been deleted",
        react: DeleteEmail({ username, userEmail: email }),
      });
      console.log("[Resend] Delete email sent to:", email);
      await setUserDeleted(clerkUserId);
    } else {
      console.error("[Webhook] No user found in Neon DB for user.deleted event");
    }
    return NextResponse.json({ received: true });
  }

  if (type === "user.out_from_marketing") {
    const clerkUserId = data.id;
    await setUserOutFromMarketing(clerkUserId);
    return NextResponse.json({ received: true });
  }

  if (type === "user.out_from_update") {
    const clerkUserId = data.id;
    await setUserOutFromUpdate(clerkUserId);
    return NextResponse.json({ received: true });
  }

  // Ignore other events
  return NextResponse.json({ ignored: true });
}