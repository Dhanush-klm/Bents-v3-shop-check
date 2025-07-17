// Required env vars: RESEND_API_KEY, RESEND_AUDIENCE_ID
import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import WelcomeEmail from "@/app/WelcomeEmail";
import DeleteEmail from "@/app/DeleteEmail";

const resend = new Resend(process.env.RESEND_API_KEY!);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;

// Helper: Add user to Resend Audience (Contacts)
async function addToAudience(email: string, firstName?: string, lastName?: string) {
  try {
    await resend.contacts.create({
      email,
      firstName,
      lastName,
      unsubscribed: false,
      audienceId: AUDIENCE_ID,
    });
    console.log("[Resend] Added to audience:", email);
  } catch (e) {
    console.error("[Resend] Error adding to audience:", e);
  }
}

// Helper: Remove user from Resend Audience (Contacts)
async function removeFromAudience(email: string) {
  try {
    await resend.contacts.remove({
      audienceId: AUDIENCE_ID,
      email,
    });
    console.log("[Resend] Removed from audience:", email);
  } catch (e) {
    console.error("[Resend] Error removing from audience:", e);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const event = req.body;
  const { type, data } = event;
  console.log("[Clerk Webhook] Event received:", type, data);

  if (type === "user.created") {
    const email = data.email_addresses?.[0]?.email_address;
    const firstName = data.first_name || "";
    if (email) {
      await addToAudience(email, firstName);
      await resend.emails.send({
        from: "Loft <noreply@loftit.ai>",
        to: email,
        subject: "Welcome to Loft!",
        react: WelcomeEmail({ username: firstName, userEmail: email }),
      });
      console.log("[Resend] Welcome email sent to:", email);
    } else {
      console.error("[Webhook] No email found in user.created event");
    }
    return res.status(200).json({ received: true });
  }

  if (type === "user.deleted") {
    const email = data.email_addresses?.[0]?.email_address;
    const firstName = data.first_name || "";
    if (email) {
      await removeFromAudience(email);
      await resend.emails.send({
        from: "Loft <noreply@loftit.ai>",
        to: email,
        subject: "Your Loft account has been deleted",
        react: DeleteEmail({ username: firstName, userEmail: email }),
      });
      console.log("[Resend] Delete email sent to:", email);
    } else {
      console.error("[Webhook] No email found in user.deleted event");
    }
    return res.status(200).json({ received: true });
  }

  // Ignore other events
  return res.status(200).json({ ignored: true });
} 