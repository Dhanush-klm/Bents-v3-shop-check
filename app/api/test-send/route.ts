import { Resend } from "resend";
import * as React from "react";
import { getEmailSubject } from "@/lib/email-subjects";

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

function getResendFrom(): string {
  const from = getEnv("RESEND_FROM");
  return from || "Loft <info@loftit.ai>";
}

type RequestBody = {
  to?: string;
  template?: string; // Filename from app/emails without extension, e.g. "FreeUserWelcome"
  subject?: string;
  from?: string;
  props?: Record<string, unknown>;
};

export async function POST(request: Request) {
  try {
    const resendKey = getEnv("RESEND_API_KEY");
    if (!resendKey) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY not set" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = (await request.json()) as RequestBody | undefined;
    const to = body?.to?.trim();
    const template = body?.template?.trim();
    const providedSubject = body?.subject?.trim();
    const from = (body?.from?.trim() || getResendFrom());
    const inboundProps = body?.props || {};

    if (!to || !template) {
      return new Response(JSON.stringify({ error: "Missing required fields: to, template" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Basic allowlist validation for import path safety
    if (!/^[A-Za-z0-9_-]+$/.test(template)) {
      return new Response(JSON.stringify({ error: "Invalid template name" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Dynamically import the email component from app/emails
    let EmailModule: { default?: (props: Record<string, unknown>) => React.ReactElement; subject?: string };
    try {
      EmailModule = await import(`@/app/emails/${template}`);
    } catch {
      return new Response(JSON.stringify({ error: `Template not found: ${template}` }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const EmailComponent = EmailModule?.default;
    if (typeof EmailComponent !== "function") {
      return new Response(JSON.stringify({ error: "Invalid template module (no default component)" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Auto props: derive username from email local-part and set userEmail
    const emailLocalPart = to.split("@")[0] || "there";
    const prettify = (s: string) => s.split(/[._-]+/).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
    const autoProps: Record<string, unknown> = {
      username: prettify(emailLocalPart),
      userEmail: to,
    };

    // Add a couple of sensible defaults for known templates
    if (template === "UnsubscribeActivePaid" || template === "UnsubscribedAll") {
      autoProps["resubscribeUrl"] = `https://loftit.ai/unsubscribe?email=${encodeURIComponent(to)}`;
    }
    if (template === "SubscriptionRenewalWeek" || template === "SubscriptionRenewalDay" || template === "SubscriptionRenewal") {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      const renewalDate = date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
      autoProps["renewalDate"] = renewalDate;
    }

    const mergedProps = { ...autoProps, ...inboundProps };

    // Default subjects for common templates (fallback if template doesn't export subject)

    // Use centralized subject system
    const subject = providedSubject || getEmailSubject(template) || `Test: ${template}`;
    const reactElement = EmailComponent(mergedProps);

    const resend = new Resend(resendKey);
    const sendResult = await resend.emails.send({
      from,
      to,
      subject,
      react: reactElement,
    });

    if (!sendResult?.data?.id) {
      return new Response(JSON.stringify({ success: false, result: sendResult }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ success: true, id: sendResult.data.id, result: sendResult }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


