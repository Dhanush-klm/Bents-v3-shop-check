import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import WelcomeEmail from "@/app/WelcomeEmail";
import DeleteEmail from "@/app/DeleteEmail";
import { Pool } from "pg";

const resend = new Resend(process.env.RESEND_API_KEY!);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function logUserEvent(clerkUserId: string, email: string, eventType: string) {
  await pool.query(
    "INSERT INTO users (clerk_user_id, email, event_type) VALUES ($1, $2, $3)",
    [clerkUserId, email, eventType]
  );
}

async function updateUserEventType(clerkUserId: string, eventType: string) {
  await pool.query(
    "UPDATE users SET event_type = $1, event_date = NOW() WHERE clerk_user_id = $2",
    [eventType, clerkUserId]
  );
}

async function getEmailByClerkUserId(clerkUserId: string): Promise<string | null> {
  const result = await pool.query(
    "SELECT email FROM users WHERE clerk_user_id = $1 ORDER BY event_date DESC LIMIT 1",
    [clerkUserId]
  );
  return result.rows[0]?.email || null;
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
      const addResult = await resend.contacts.create({
        email,
        firstName,
        lastName,
        unsubscribed: false,
        audienceId: AUDIENCE_ID,
      });
      console.log("[Resend] API response (add contact):", addResult);
      console.log("[Resend] Added to audience:", email);
      await resend.emails.send({
        from: "Loft <noreply@loftit.ai>",
        to: email,
        subject: "Welcome to Loft!",
        react: WelcomeEmail({ username: firstName, userEmail: email }),
      });
      console.log("[Resend] Welcome email sent to:", email);
      await logUserEvent(clerkUserId, email, "signed_up");
    } else {
      console.error("[Webhook] No email found in user.created event");
    }
    return NextResponse.json({ received: true });
  }

  if (type === "user.deleted") {
    const clerkUserId = data.id;
    const email = await getEmailByClerkUserId(clerkUserId);
    if (email) {
      const removeResult = await resend.contacts.remove({
        email,
        audienceId: AUDIENCE_ID,
      });
      console.log("[Resend] API response (remove contact):", removeResult);
      console.log("[Resend] Removed from audience:", email);
      await resend.emails.send({
        from: "Loft <noreply@loftit.ai>",
        to: email,
        subject: "Your Loft account has been deleted",
        react: DeleteEmail({ username: email, userEmail: email }),
      });
      console.log("[Resend] Delete email sent to:", email);
      await updateUserEventType(clerkUserId, "deleted");
    } else {
      console.error("[Webhook] No email found in Neon DB for user.deleted event");
    }
    return NextResponse.json({ received: true });
  }

  // Ignore other events
  return NextResponse.json({ ignored: true });
} 