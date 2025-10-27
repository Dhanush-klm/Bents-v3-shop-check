import { NextRequest, NextResponse } from 'next/server';
import { render } from '@react-email/components';
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

export async function POST(request: NextRequest) {
  try {
    const { template, variables } = await request.json();

    if (!template || !TEMPLATE_MAP[template]) {
      return NextResponse.json(
        { error: 'Invalid template' },
        { status: 400 }
      );
    }

    const EmailComponent = TEMPLATE_MAP[template];
    const html = await render(EmailComponent(variables));

    return NextResponse.json({ html });
  } catch (error) {
    console.error('Preview error:', error);
    return NextResponse.json(
      { error: 'Failed to generate preview' },
      { status: 500 }
    );
  }
}

