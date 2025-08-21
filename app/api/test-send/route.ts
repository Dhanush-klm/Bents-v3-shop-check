import { Resend } from "resend";

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
    let EmailModule: any;
    try {
      EmailModule = await import(`@/app/emails/${template}`);
    } catch (err) {
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

    // Default subjects for common templates
    const defaultSubjects: Record<string, string> = {
      FreeUserWelcome: "Welcome to Loft!",
      UpgradeConfirmation: "Welcome to Loft Pro! 🎉",
      Delete: "Your Loft account has been deleted",
      SubscriptionRenewalWeek: "Your Loft subscription renews next week",
      SubscriptionRenewalDay: "Your Loft subscription renews tomorrow",
      SubscriptionRenewal: "Your Loft subscription renews in 30 days",
      UnsubscribeActivePaid: "You’ll no longer receive Loft updates — but your subscription is still active",
      UnsubscribedAll: "You've been unsubscribed from all Loft emails",
      Day3TrialReminder: "Reminder: Try Loft — your smarter way to save links",
      Day5TrialEnding: "Your trial is ending soon — keep your Loft flow going",
      Day6TrialEndsTomorrow: "Your Loft trial ends tomorrow",
      Day7TrialEndsToday: "Your Loft trial ends today",
      Week1PostCreation: "Getting started with Loft: 3 ways to make it work for you",
      Week2PostCreation: "Loft tip: Let AI do the heavy lifting",
      Week3PostCreation: "From chaos to clarity: How others use Loft",
      Week4PostCreation: "Save smarter. Search faster. Stay organized",
      FeedbackSurvey30Days: "We'd love your feedback — 30 days with Loft",
      Month1PaidUser: "A month with Loft — here's what's next",
      SubscriptionRenewed: "Your Loft subscription has renewed",
      SubscriptionCancelled: "Your Loft subscription has been cancelled",
      PaymentError: "Payment issue with your Loft subscription",
      ProUserWelcome: "Welcome to Loft Pro!",
      MilestoneEmail: "🎉 You've saved 100 links with Loft!",
      NoActivityReengagement: "We miss you at Loft — jump back in",
      Reactivation: "Welcome back to Loft!",
    };

    const subject = providedSubject || defaultSubjects[template] || `Test: ${template}`;
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


