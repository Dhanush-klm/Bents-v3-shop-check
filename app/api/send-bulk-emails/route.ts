import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Pool } from "pg";

// Import all email templates
import FreeUserWelcome from "@/app/emails/FreeUserWelcome";
import ProUserWelcome from "@/app/emails/ProUserWelcome";
import UpgradeConfirmation from "@/app/emails/UpgradeConfirmation";
import Week1PostCreation from "@/app/emails/Week1PostCreation";
import Week2PostCreation from "@/app/emails/Week2PostCreation";
import Week3PostCreation from "@/app/emails/Week3PostCreation";
import Week4PostCreation from "@/app/emails/Week4PostCreation";
import Day3TrialReminder from "@/app/emails/Day3TrialReminder";
import Day5TrialEnding from "@/app/emails/Day5TrialEnding";
import Day6TrialEndsTomorrow from "@/app/emails/Day6TrialEndsTomorrow";
import Day7TrialEndsToday from "@/app/emails/Day7TrialEndsToday";
import NoActivityReengagement from "@/app/emails/NoActivityReengagement";
import FeedbackSurvey30Days from "@/app/emails/FeedbackSurvey30Days";
import UnsubscribedMarketing from "@/app/emails/UnsubscribedMarketing";
import UnsubscribedAll from "@/app/emails/UnsubscribedAll";
import Delete from "@/app/emails/Delete";

const resend = new Resend(process.env.RESEND_API_KEY!);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Template mapping
const TEMPLATE_COMPONENTS = {
  'free-user-welcome': FreeUserWelcome,
  'pro-user-welcome': ProUserWelcome,
  'upgrade-confirmation': UpgradeConfirmation,
  'week1-post-creation': Week1PostCreation,
  'week2-post-creation': Week2PostCreation,
  'week3-post-creation': Week3PostCreation,
  'week4-post-creation': Week4PostCreation,
  'day3-trial-reminder': Day3TrialReminder,
  'day5-trial-ending': Day5TrialEnding,
  'day6-trial-tomorrow': Day6TrialEndsTomorrow,
  'day7-trial-today': Day7TrialEndsToday,
  'no-activity-reengagement': NoActivityReengagement,
  'feedback-survey-30days': FeedbackSurvey30Days,
  'unsubscribed-marketing': UnsubscribedMarketing,
  'unsubscribed-all': UnsubscribedAll,
  'delete-account': Delete,
};

interface BulkEmailRequest {
  templateIds: string[];
  audienceId: string;
  subject: string;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getUserFullName(email: string): Promise<string> {
  try {
    const result = await pool.query(
      'SELECT first_name, last_name FROM users WHERE email = $1',
      [email]
    );
    if (result.rows.length > 0) {
      const { first_name, last_name } = result.rows[0];
      if (first_name && last_name) {
        return `${first_name} ${last_name}`;
      } else if (first_name) {
        return first_name;
      } else if (last_name) {
        return last_name;
      }
    }
    return "there";
  } catch (error) {
    console.error('[DB] Error fetching user name:', error);
    return "there";
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: BulkEmailRequest = await req.json();
    const { templateIds, audienceId, subject } = body;

    console.log('[Bulk Email] Starting bulk email send:', { templateIds, audienceId, subject });

    // Validate request
    if (!templateIds || templateIds.length === 0) {
      return NextResponse.json({ error: 'No templates selected' }, { status: 400 });
    }

    if (!audienceId) {
      return NextResponse.json({ error: 'No audience selected' }, { status: 400 });
    }

    if (!subject) {
      return NextResponse.json({ error: 'No subject provided' }, { status: 400 });
    }

    // Get contacts from the selected audience
    console.log('[Bulk Email] Fetching contacts from audience:', audienceId);
    const { data: contactsResponse, error: contactsError } = await resend.contacts.list({
      audienceId,
    });

    if (contactsError) {
      console.error('[Bulk Email] Error fetching contacts:', contactsError);
      return NextResponse.json({ error: 'Failed to fetch audience contacts' }, { status: 500 });
    }

    const contacts = contactsResponse?.data || [];
    if (!contacts || contacts.length === 0) {
      return NextResponse.json({ error: 'No contacts found in selected audience' }, { status: 400 });
    }

    console.log('[Bulk Email] Found contacts:', contacts.length);

    let sentCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    // Send emails to each contact
    for (const contact of contacts) {
      const email = contact.email;
      const username = await getUserFullName(email);

      console.log(`[Bulk Email] Processing contact: ${email} (${username})`);

      // Send each selected template to this contact
      for (const templateId of templateIds) {
        const TemplateComponent = TEMPLATE_COMPONENTS[templateId as keyof typeof TEMPLATE_COMPONENTS];
        
        if (!TemplateComponent) {
          console.error(`[Bulk Email] Template not found: ${templateId}`);
          errors.push(`Template not found: ${templateId}`);
          errorCount++;
          continue;
        }

        try {
          console.log(`[Bulk Email] Sending ${templateId} to ${email}`);

          const { data, error } = await resend.emails.send({
            from: "Loft <noreply@loftit.ai>",
            to: [email],
            subject: subject,
            react: TemplateComponent({
              username,
              userEmail: email,
            }),
          });

          if (error) {
            console.error(`[Bulk Email] Error sending ${templateId} to ${email}:`, error);
            errors.push(`Failed to send ${templateId} to ${email}: ${error.message}`);
            errorCount++;
          } else {
            console.log(`[Bulk Email] Successfully sent ${templateId} to ${email}:`, data?.id);
            sentCount++;
          }

          // Rate limiting - wait between sends
          await sleep(600);

        } catch (error) {
          console.error(`[Bulk Email] Exception sending ${templateId} to ${email}:`, error);
          errors.push(`Exception sending ${templateId} to ${email}: ${(error as Error).message}`);
          errorCount++;
        }
      }
    }

    console.log('[Bulk Email] Bulk send completed:', { sentCount, errorCount, errors: errors.length });

    return NextResponse.json({
      success: true,
      sentCount,
      errorCount,
      totalContacts: contacts.length,
      totalTemplates: templateIds.length,
      errors: errors.slice(0, 10) // Limit errors in response
    });

  } catch (error) {
    console.error('[Bulk Email] Exception in bulk email handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 