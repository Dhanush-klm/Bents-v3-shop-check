import { Resend } from "resend";
import { getEmailSubject } from "@/lib/email-subjects";

// Import all email templates
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
import Anniversary from "@/app/emails/Anniversary";
import SubscriptionRenewal from "@/app/emails/SubscriptionRenewal";
import SubscriptionRenewalDay from "@/app/emails/SubscriptionRenewalDay";
import SubscriptionRenewalWeek from "@/app/emails/SubscriptionRenewalWeek";
import FreeUserWelcome from "@/app/emails/FreeUserWelcome";
import ProTrialWelcome from "@/app/emails/ProTrialWelcome";
import MilestoneEmail from "@/app/emails/MilestoneEmail";
import PaymentError from "@/app/emails/PaymentError";
import Reactivation from "@/app/emails/Reactivation";
import SubscriptionCancelled from "@/app/emails/SubscriptionCancelled";
import SubscriptionRenewed from "@/app/emails/SubscriptionRenewed";
import UnsubscribeActivePaid from "@/app/emails/UnsubscribeActivePaid";
import UnsubscribedAll from "@/app/emails/UnsubscribedAll";
import UpgradeConfirmation from "@/app/emails/UpgradeConfirmation";

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

function getResendFrom(): string {
  const from = getEnv("RESEND_FROM");
  return from || "Loft <info@loftit.ai>";
}

// Email template mapping
const emailTemplates = {
  Day3TrialReminder,
  Day5TrialEnding,
  Day6TrialEndsTomorrow,
  Day7TrialEndsToday,
  NoActivityReengagement,
  Week1PostCreation,
  Week2PostCreation,
  Week3PostCreation,
  Week4PostCreation,
  FeedbackSurvey30Days,
  Month1PaidUser,
  Anniversary,
  SubscriptionRenewal,
  SubscriptionRenewalDay,
  SubscriptionRenewalWeek,
  FreeUserWelcome,
  ProTrialWelcome,
  MilestoneEmail,
  PaymentError,
  Reactivation,
  SubscriptionCancelled,
  SubscriptionRenewed,
  UnsubscribeActivePaid,
  UnsubscribedAll,
  UpgradeConfirmation,
};

// Define condition types
interface TrialConditions {
  trial_started_at?: string;
  subscription_status: string;
  entitlement_pro_until?: string;
  has_links: boolean;
  days_since_trial_start: number;
}

interface AccountConditions {
  created_at?: string;
  has_links: boolean;
  days_since_created: number;
}

interface SubscriptionConditions {
  subscription_status: string;
  days_until_expiration: number;
}

// Condition validation functions
function validateDay3TrialReminder(conditions: Record<string, unknown>): { valid: boolean; message: string } {
  const { subscription_status, entitlement_pro_until, has_links, days_since_trial_start } = conditions as unknown as TrialConditions;
  
  if (days_since_trial_start !== 3) {
    return { valid: false, message: "Day3TrialReminder requires exactly 3 days since trial start" };
  }
  if (subscription_status !== "trial") {
    return { valid: false, message: "Day3TrialReminder requires subscription_status to be 'trial'" };
  }
  if (has_links !== false) {
    return { valid: false, message: "Day3TrialReminder requires user to have no links created" };
  }
  if (!entitlement_pro_until || new Date(entitlement_pro_until) <= new Date()) {
    return { valid: false, message: "Day3TrialReminder requires active pro entitlement" };
  }
  
  return { valid: true, message: "Conditions satisfied for Day3TrialReminder" };
}

function validateDay5TrialEnding(conditions: Record<string, unknown>): { valid: boolean; message: string } {
  const { subscription_status, entitlement_pro_until, has_links, days_since_trial_start } = conditions as unknown as TrialConditions;
  
  if (days_since_trial_start !== 5) {
    return { valid: false, message: "Day5TrialEnding requires exactly 5 days since trial start" };
  }
  if (subscription_status !== "trial") {
    return { valid: false, message: "Day5TrialEnding requires subscription_status to be 'trial'" };
  }
  if (has_links !== false) {
    return { valid: false, message: "Day5TrialEnding requires user to have no links created" };
  }
  if (!entitlement_pro_until || new Date(entitlement_pro_until) <= new Date()) {
    return { valid: false, message: "Day5TrialEnding requires active pro entitlement" };
  }
  
  return { valid: true, message: "Conditions satisfied for Day5TrialEnding" };
}

function validateDay6TrialEndsTomorrow(conditions: Record<string, unknown>): { valid: boolean; message: string } {
  const { subscription_status, entitlement_pro_until, has_links, days_since_trial_start } = conditions as unknown as TrialConditions;
  
  if (days_since_trial_start !== 6) {
    return { valid: false, message: "Day6TrialEndsTomorrow requires exactly 6 days since trial start" };
  }
  if (subscription_status !== "trial") {
    return { valid: false, message: "Day6TrialEndsTomorrow requires subscription_status to be 'trial'" };
  }
  if (has_links !== false) {
    return { valid: false, message: "Day6TrialEndsTomorrow requires user to have no links created" };
  }
  if (!entitlement_pro_until || new Date(entitlement_pro_until) <= new Date()) {
    return { valid: false, message: "Day6TrialEndsTomorrow requires active pro entitlement" };
  }
  
  return { valid: true, message: "Conditions satisfied for Day6TrialEndsTomorrow" };
}

function validateDay7TrialEndsToday(conditions: Record<string, unknown>): { valid: boolean; message: string } {
  const { subscription_status, entitlement_pro_until, has_links, days_since_trial_start } = conditions as unknown as TrialConditions;
  
  if (days_since_trial_start !== 7) {
    return { valid: false, message: "Day7TrialEndsToday requires exactly 7 days since trial start" };
  }
  if (subscription_status !== "trial") {
    return { valid: false, message: "Day7TrialEndsToday requires subscription_status to be 'trial'" };
  }
  if (has_links !== false) {
    return { valid: false, message: "Day7TrialEndsToday requires user to have no links created" };
  }
  if (!entitlement_pro_until || new Date(entitlement_pro_until) <= new Date()) {
    return { valid: false, message: "Day7TrialEndsToday requires active pro entitlement" };
  }
  
  return { valid: true, message: "Conditions satisfied for Day7TrialEndsToday" };
}

function validateNoActivityReengagement(conditions: Record<string, unknown>): { valid: boolean; message: string } {
  const { has_links, days_since_created } = conditions as unknown as AccountConditions;
  
  if (days_since_created !== 7) {
    return { valid: false, message: "NoActivityReengagement requires exactly 7 days since account creation" };
  }
  if (has_links !== false) {
    return { valid: false, message: "NoActivityReengagement requires user to have no links created" };
  }
  
  return { valid: true, message: "Conditions satisfied for NoActivityReengagement" };
}

function validateWeek1PostCreation(conditions: Record<string, unknown>): { valid: boolean; message: string } {
  const { days_since_created } = conditions as unknown as AccountConditions;
  
  if (days_since_created !== 7) {
    return { valid: false, message: "Week1PostCreation requires exactly 7 days since account creation" };
  }
  
  return { valid: true, message: "Conditions satisfied for Week1PostCreation" };
}

function validateWeek2PostCreation(conditions: Record<string, unknown>): { valid: boolean; message: string } {
  const { days_since_created } = conditions as unknown as AccountConditions;
  
  if (days_since_created !== 14) {
    return { valid: false, message: "Week2PostCreation requires exactly 14 days since account creation" };
  }
  
  return { valid: true, message: "Conditions satisfied for Week2PostCreation" };
}

function validateWeek3PostCreation(conditions: Record<string, unknown>): { valid: boolean; message: string } {
  const { days_since_created } = conditions as unknown as AccountConditions;
  
  if (days_since_created !== 21) {
    return { valid: false, message: "Week3PostCreation requires exactly 21 days since account creation" };
  }
  
  return { valid: true, message: "Conditions satisfied for Week3PostCreation" };
}

function validateWeek4PostCreation(conditions: Record<string, unknown>): { valid: boolean; message: string } {
  const { days_since_created } = conditions as unknown as AccountConditions;
  
  if (days_since_created !== 28) {
    return { valid: false, message: "Week4PostCreation requires exactly 28 days since account creation" };
  }
  
  return { valid: true, message: "Conditions satisfied for Week4PostCreation" };
}

function validateFeedbackSurvey30Days(conditions: Record<string, unknown>): { valid: boolean; message: string } {
  const { days_since_created } = conditions as unknown as AccountConditions;
  
  if (days_since_created !== 30) {
    return { valid: false, message: "FeedbackSurvey30Days requires exactly 30 days since account creation" };
  }
  
  return { valid: true, message: "Conditions satisfied for FeedbackSurvey30Days" };
}

function validateMonth1PaidUser(conditions: Record<string, unknown>): { valid: boolean; message: string } {
  const { days_since_created, subscription_status } = conditions as unknown as AccountConditions & { subscription_status: string };
  
  if (days_since_created !== 30) {
    return { valid: false, message: "Month1PaidUser requires exactly 30 days since account creation" };
  }
  if (subscription_status !== "paid") {
    return { valid: false, message: "Month1PaidUser requires subscription_status to be 'paid'" };
  }
  
  return { valid: true, message: "Conditions satisfied for Month1PaidUser" };
}

function validateAnniversary(): { valid: boolean; message: string } {
  return { valid: true, message: "Conditions satisfied for Anniversary" };
}

function validateSubscriptionRenewal(conditions: Record<string, unknown>): { valid: boolean; message: string } {
  const { subscription_status, days_until_expiration } = conditions as unknown as SubscriptionConditions;
  
  if (subscription_status !== "active") {
    return { valid: false, message: "SubscriptionRenewal requires subscription_status to be 'active'" };
  }
  if (days_until_expiration !== 30) {
    return { valid: false, message: "SubscriptionRenewal requires exactly 30 days until expiration" };
  }
  
  return { valid: true, message: "Conditions satisfied for SubscriptionRenewal" };
}

function validateSubscriptionRenewalWeek(conditions: Record<string, unknown>): { valid: boolean; message: string } {
  const { subscription_status, days_until_expiration } = conditions as unknown as SubscriptionConditions;
  
  if (subscription_status !== "active") {
    return { valid: false, message: "SubscriptionRenewalWeek requires subscription_status to be 'active'" };
  }
  if (days_until_expiration !== 7) {
    return { valid: false, message: "SubscriptionRenewalWeek requires exactly 7 days until expiration" };
  }
  
  return { valid: true, message: "Conditions satisfied for SubscriptionRenewalWeek" };
}

function validateSubscriptionRenewalDay(conditions: Record<string, unknown>): { valid: boolean; message: string } {
  const { subscription_status, days_until_expiration } = conditions as unknown as SubscriptionConditions;
  
  if (subscription_status !== "active") {
    return { valid: false, message: "SubscriptionRenewalDay requires subscription_status to be 'active'" };
  }
  if (days_until_expiration !== 1) {
    return { valid: false, message: "SubscriptionRenewalDay requires exactly 1 day until expiration" };
  }
  
  return { valid: true, message: "Conditions satisfied for SubscriptionRenewalDay" };
}

// Template validation mapping
const templateValidators: Record<string, (conditions: Record<string, unknown>) => { valid: boolean; message: string }> = {
  Day3TrialReminder: validateDay3TrialReminder,
  Day5TrialEnding: validateDay5TrialEnding,
  Day6TrialEndsTomorrow: validateDay6TrialEndsTomorrow,
  Day7TrialEndsToday: validateDay7TrialEndsToday,
  NoActivityReengagement: validateNoActivityReengagement,
  Week1PostCreation: validateWeek1PostCreation,
  Week2PostCreation: validateWeek2PostCreation,
  Week3PostCreation: validateWeek3PostCreation,
  Week4PostCreation: validateWeek4PostCreation,
  FeedbackSurvey30Days: validateFeedbackSurvey30Days,
  Month1PaidUser: validateMonth1PaidUser,
  Anniversary: validateAnniversary,
  SubscriptionRenewal: validateSubscriptionRenewal,
  SubscriptionRenewalWeek: validateSubscriptionRenewalWeek,
  SubscriptionRenewalDay: validateSubscriptionRenewalDay,
  // For templates without specific conditions, always return valid
  FreeUserWelcome: () => ({ valid: true, message: "Conditions satisfied for FreeUserWelcome" }),
  ProTrialWelcome: () => ({ valid: true, message: "Conditions satisfied for ProTrialWelcome" }),
  MilestoneEmail: () => ({ valid: true, message: "Conditions satisfied for MilestoneEmail" }),
  PaymentError: () => ({ valid: true, message: "Conditions satisfied for PaymentError" }),
  Reactivation: () => ({ valid: true, message: "Conditions satisfied for Reactivation" }),
  SubscriptionCancelled: () => ({ valid: true, message: "Conditions satisfied for SubscriptionCancelled" }),
  SubscriptionRenewed: () => ({ valid: true, message: "Conditions satisfied for SubscriptionRenewed" }),
  UnsubscribeActivePaid: () => ({ valid: true, message: "Conditions satisfied for UnsubscribeActivePaid" }),
  UnsubscribedAll: () => ({ valid: true, message: "Conditions satisfied for UnsubscribedAll" }),
  UpgradeConfirmation: () => ({ valid: true, message: "Conditions satisfied for UpgradeConfirmation" }),
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { template, email, username, conditions, ...templateParams } = body;

    // Validate required fields
    if (!template || !email) {
      return new Response(JSON.stringify({ 
        error: "Missing required fields: template and email" 
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if template exists
    if (!emailTemplates[template as keyof typeof emailTemplates]) {
      return new Response(JSON.stringify({ 
        error: `Template '${template}' not found. Available templates: ${Object.keys(emailTemplates).join(', ')}` 
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate conditions if provided
    if (conditions) {
      const validator = templateValidators[template];
      if (validator) {
        const validation = validator(conditions);
        if (!validation.valid) {
          return new Response(JSON.stringify({ 
            success: false,
            message: "Conditions not satisfied",
            template,
            validation: validation.message,
            providedConditions: conditions
          }), {
            status: 200, // Return 200 but with success: false
            headers: { "Content-Type": "application/json" },
          });
        }
      }
    }

    const resendKey = getEnv("RESEND_API_KEY");
    if (!resendKey) {
      return new Response(JSON.stringify({ 
        error: "RESEND_API_KEY not configured" 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resend = new Resend(resendKey);
    const templateComponent = emailTemplates[template as keyof typeof emailTemplates];
    const name = username || "Test User";

    // Prepare template props based on template type
    const templateProps: Record<string, unknown> = {
      username: name,
      userEmail: email,
    };

    // Add specific props for different templates
    switch (template) {
      case "FeedbackSurvey30Days":
        templateProps.surveyUrl = templateParams.surveyUrl || "https://forms.gle/YourSurveyLinkHere";
        break;
      case "SubscriptionRenewal":
      case "SubscriptionRenewalDay":
      case "SubscriptionRenewalWeek":
        templateProps.renewalDate = templateParams.renewalDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        break;
      case "MilestoneEmail":
        templateProps.milestone = templateParams.milestone || "10 posts created";
        break;
      case "PaymentError":
        templateProps.errorMessage = templateParams.errorMessage || "Payment failed due to insufficient funds";
        break;
      case "Anniversary":
        templateProps.anniversaryDuration = templateParams.anniversaryDuration || "1 year";
        break;
      case "UpgradeConfirmation":
        templateProps.planName = templateParams.planName || "Pro Plan";
        templateProps.price = templateParams.price || "$29/month";
        break;
    }

    // Send the email
    const result = await resend.emails.send({
      from: getResendFrom(),
      to: email,
      subject: getEmailSubject(template),
      react: templateComponent(templateProps),
    });

    if (result?.data?.id) {
      return new Response(JSON.stringify({ 
        success: true,
        message: `Email sent successfully using ${template} template`,
        emailId: result.data.id,
        template,
        recipient: email,
        templateProps,
        conditions: conditions || "No conditions provided - email sent directly"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ 
        error: "Failed to send email",
        details: result
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ 
      error: "Failed to send test email",
      details: message 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// GET endpoint to list available templates and their conditions
export async function GET() {
  const templates = {
    "Day3TrialReminder": {
      condition: "Users whose trial started exactly 3 days ago with no links created",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "Day5TrialEnding": {
      condition: "Users whose trial started exactly 5 days ago with no links created",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "Day6TrialEndsTomorrow": {
      condition: "Users whose trial started exactly 6 days ago with no links created",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "Day7TrialEndsToday": {
      condition: "Users whose trial started exactly 7 days ago with no links created",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "NoActivityReengagement": {
      condition: "Users created 7 days ago with zero links (re-engagement)",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "Week1PostCreation": {
      condition: "Users created exactly 7 days ago",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "Week2PostCreation": {
      condition: "Users created exactly 14 days ago",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "Week3PostCreation": {
      condition: "Users created exactly 21 days ago",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "Week4PostCreation": {
      condition: "Users created exactly 28 days ago",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "FeedbackSurvey30Days": {
      condition: "Users created exactly 30 days ago",
      requiredParams: ["username", "userEmail"],
      optionalParams: ["surveyUrl"]
    },
    "Month1PaidUser": {
      condition: "Paid users created exactly 30 days ago",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "Anniversary": {
      condition: "Users celebrating 6 months or 1 year anniversary",
      requiredParams: ["username", "userEmail"],
      optionalParams: ["anniversaryDuration"]
    },
    "SubscriptionRenewal": {
      condition: "Paid users with subscription expiring in 30 days",
      requiredParams: ["username", "userEmail"],
      optionalParams: ["renewalDate"]
    },
    "SubscriptionRenewalWeek": {
      condition: "Paid users with subscription expiring in 7 days",
      requiredParams: ["username", "userEmail"],
      optionalParams: ["renewalDate"]
    },
    "SubscriptionRenewalDay": {
      condition: "Paid users with subscription expiring in 1 day",
      requiredParams: ["username", "userEmail"],
      optionalParams: ["renewalDate"]
    },
    "FreeUserWelcome": {
      condition: "New free users after signup",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "ProTrialWelcome": {
      condition: "New pro trial users after signup",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "MilestoneEmail": {
      condition: "Users who reach specific milestones",
      requiredParams: ["username", "userEmail"],
      optionalParams: ["milestone"]
    },
    "PaymentError": {
      condition: "Users with payment failures",
      requiredParams: ["username", "userEmail"],
      optionalParams: ["errorMessage"]
    },
    "Reactivation": {
      condition: "Inactive users being reactivated",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "SubscriptionCancelled": {
      condition: "Users who cancel their subscription",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "SubscriptionRenewed": {
      condition: "Users whose subscription was successfully renewed",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "UnsubscribeActivePaid": {
      condition: "Active paid users who unsubscribe",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "UnsubscribedAll": {
      condition: "Users who unsubscribe from all emails",
      requiredParams: ["username", "userEmail"],
      optionalParams: []
    },
    "UpgradeConfirmation": {
      condition: "Users who upgrade their subscription",
      requiredParams: ["username", "userEmail"],
      optionalParams: ["planName", "price"]
    }
  };

  return new Response(JSON.stringify({
    message: "Available email templates for testing",
    templates,
    usage: {
      method: "POST",
      endpoint: "/api/test-email",
      requiredFields: ["template", "email"],
      optionalFields: ["username", "template-specific-params"],
      example: {
        template: "Day5TrialEnding",
        email: "dhanush@klmsolutions.in",
        username: "Dhanush"
      }
    }
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
