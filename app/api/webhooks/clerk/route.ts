import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import WelcomeEmail from "@/app/WelcomeEmail";
import DeleteEmail from "@/app/DeleteEmail";

const resend = new Resend(process.env.RESEND_API_KEY!);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;

export async function POST(req: NextRequest) {
  const event = await req.json();
  const { type, data } = event;
  console.log("[Clerk Webhook] Event received:", type, data);

  if (type === "user.created") {
    const email = data.email_addresses?.[0]?.email_address;
    const firstName = data.first_name || "";
    const lastName = data.last_name || "";
    if (email) {
      await resend.contacts.create({
        email,
        firstName,
        lastName,
        unsubscribed: false,
        audienceId: AUDIENCE_ID,
      });
      console.log("[Resend] Added to audience:", email);
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
    return NextResponse.json({ received: true });
  }

  if (type === "user.deleted") {
    const email = data.email_addresses?.[0]?.email_address;
    const firstName = data.first_name || "";
    if (email) {
      await resend.contacts.remove({
        email,
        audienceId: AUDIENCE_ID,
      });
      console.log("[Resend] Removed from audience:", email);
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
    return NextResponse.json({ received: true });
  }

  // Ignore other events
  return NextResponse.json({ ignored: true });
} 