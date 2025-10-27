import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getEmailSubjectWithReplacements } from '@/lib/email-subjects';
import FreeUserWelcome from '@/app/emails/FreeUserWelcome';
import ProTrialWelcome from '@/app/emails/ProTrialWelcome';
import UpgradeConfirmation from '@/app/emails/UpgradeConfirmation';
import Week1PostCreation from '@/app/emails/Week1PostCreation';
import Week2PostCreation from '@/app/emails/Week2PostCreation';
import Week3PostCreation from '@/app/emails/Week3PostCreation';
import Week4PostCreation from '@/app/emails/Week4PostCreation';
import Day3TrialReminder from '@/app/emails/Day3TrialReminder';
import Day5TrialEnding from '@/app/emails/Day5TrialEnding';
import Day6TrialEndsTomorrow from '@/app/emails/Day6TrialEndsTomorrow';
import Day7TrialEndsToday from '@/app/emails/Day7TrialEndsToday';
import NoActivityReengagement from '@/app/emails/NoActivityReengagement';
import FeedbackSurvey30Days from '@/app/emails/FeedbackSurvey30Days';
import Delete from '@/app/emails/Delete';
import PaymentError from '@/app/emails/PaymentError';
import SubscriptionRenewal from '@/app/emails/SubscriptionRenewal';
import SubscriptionRenewalWeek from '@/app/emails/SubscriptionRenewalWeek';
import SubscriptionRenewalDay from '@/app/emails/SubscriptionRenewalDay';
import SubscriptionRenewed from '@/app/emails/SubscriptionRenewed';
import SubscriptionCancelled from '@/app/emails/SubscriptionCancelled';
import Reactivation from '@/app/emails/Reactivation';
import Month1PaidUser from '@/app/emails/Month1PaidUser';
import UnsubscribedAll from '@/app/emails/UnsubscribedAll';
import UnsubscribeActivePaid from '@/app/emails/UnsubscribeActivePaid';
import Anniversary from '@/app/emails/Anniversary';
import MilestoneEmail from '@/app/emails/MilestoneEmail';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TEMPLATE_MAP: Record<string, any> = {
  FreeUserWelcome,
  ProTrialWelcome,
  UpgradeConfirmation,
  Week1PostCreation,
  Week2PostCreation,
  Week3PostCreation,
  Week4PostCreation,
  Day3TrialReminder,
  Day5TrialEnding,
  Day6TrialEndsTomorrow,
  Day7TrialEndsToday,
  NoActivityReengagement,
  FeedbackSurvey30Days,
  Delete,
  PaymentError,
  SubscriptionRenewal,
  SubscriptionRenewalWeek,
  SubscriptionRenewalDay,
  SubscriptionRenewed,
  SubscriptionCancelled,
  Reactivation,
  Month1PaidUser,
  UnsubscribedAll,
  UnsubscribeActivePaid,
  Anniversary,
  MilestoneEmail,
};

function getEnv(name: string): string | undefined {
  return process.env[name];
}

function getResendFrom(): string {
  const from = getEnv("RESEND_FROM");
  if (from) return from;
  return "Loft <info@loftit.ai>";
}

interface Contact {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  unsubscribed: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const { audienceIds, template, variables } = await request.json();

    // Validate inputs
    if (!audienceIds || !Array.isArray(audienceIds) || audienceIds.length === 0) {
      return NextResponse.json(
        { error: 'Missing or invalid audienceIds' },
        { status: 400 }
      );
    }

    if (!template) {
      return NextResponse.json(
        { error: 'Missing template' },
        { status: 400 }
      );
    }

    if (!TEMPLATE_MAP[template]) {
      return NextResponse.json(
        { error: 'Invalid template' },
        { status: 400 }
      );
    }

    // Get Resend API key
    const resendApiKey = getEnv("RESEND_API_KEY");
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey);
    const EmailComponent = TEMPLATE_MAP[template];

    let totalContacts = 0;
    let totalSent = 0;
    const errors: string[] = [];

    // Process each audience
    for (const audienceId of audienceIds) {
      try {
        // Fetch all contacts from this audience
        const contactsResponse = await resend.contacts.list({ audienceId });
        
        if (!contactsResponse.data?.data) {
          errors.push(`No contacts found for audience ${audienceId}`);
          continue;
        }

        const contacts = contactsResponse.data.data as Contact[];
        totalContacts += contacts.length;

        // Send email to each contact
        for (const contact of contacts) {
          // Skip unsubscribed contacts
          if (contact.unsubscribed) {
            continue;
          }

          try {
            // Construct username from contact data
            const username = contact.first_name 
              ? `${contact.first_name}${contact.last_name ? ' ' + contact.last_name : ''}`
              : 'there';

            // Merge contact-specific variables with common variables
            const emailVariables = {
              ...variables, // Common variables like amount, anniversaryDuration
              username,
              userEmail: contact.email,
            };

            // Get subject line with variable replacements for this contact
            const subjectReplacements = {
              ...emailVariables,
              firstName: contact.first_name || username.split(' ')[0],
            };
            const subject = getEmailSubjectWithReplacements(template, subjectReplacements);

            // Send email
            const sendResult = await resend.emails.send({
              from: getResendFrom(),
              to: contact.email,
              subject,
              react: EmailComponent(emailVariables),
            });

            if (sendResult?.data?.id) {
              totalSent++;
            } else {
              errors.push(`Failed to send to ${contact.email}: No ID returned`);
            }

            // Add small delay to respect rate limits
            await new Promise(resolve => setTimeout(resolve, 100));

          } catch (sendError) {
            errors.push(`Failed to send to ${contact.email}: ${sendError instanceof Error ? sendError.message : 'Unknown error'}`);
          }
        }

      } catch (audienceError) {
        errors.push(`Failed to fetch contacts for audience ${audienceId}: ${audienceError instanceof Error ? audienceError.message : 'Unknown error'}`);
      }
    }

    return NextResponse.json({
      success: true,
      totalContacts,
      totalSent,
      errors: errors.length > 0 ? errors : undefined,
      message: `Successfully sent ${totalSent} emails to ${totalContacts} contacts`,
    });

  } catch (error) {
    console.error('Send to audience error:', error);
    return NextResponse.json(
      { error: 'Failed to send emails', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

