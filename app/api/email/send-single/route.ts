import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getEmailSubject } from '@/lib/email-subjects';
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

export async function POST(request: NextRequest) {
  try {
    const { to, template, variables } = await request.json();

    // Validate inputs
    if (!to || !template) {
      return NextResponse.json(
        { error: 'Missing required fields: to, template' },
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

    // Get template component
    const EmailComponent = TEMPLATE_MAP[template];

    // Get subject line
    const subject = getEmailSubject(template);

    // Send email
    const sendResult = await resend.emails.send({
      from: getResendFrom(),
      to,
      subject,
      react: EmailComponent(variables),
    });

    if (!sendResult?.data?.id) {
      console.error("[Send Email] No email ID returned", sendResult);
      return NextResponse.json(
        { error: 'Failed to send email - no ID returned' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      emailId: sendResult.data.id,
      message: 'Email sent successfully',
    });

  } catch (error) {
    console.error('Send email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

