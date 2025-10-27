/**
 * Utility to get email subject from template files
 * This ensures all email sending uses the subject defined in the template file itself
 */

export async function getTemplateSubject(templateName: string): Promise<string> {
  try {
    // Dynamically import the email template
    const templateModule = await import(`@/app/emails/${templateName}`);
    
    // Return the exported subject, or fallback to a default if not found
    return templateModule.subject || `Email from Loft: ${templateName}`;
  } catch (error) {
    console.error(`Failed to load subject for template ${templateName}:`, error);
    return `Email from Loft: ${templateName}`;
  }
}

// Email subjects for all templates
export const EMAIL_SUBJECTS: Record<string, string> = {
  // Trial reminders
  Day3TrialReminder: "Still haven’t tried Loft? Let’s get you started",
  Day5TrialEnding: "Your Loft Pro trial ends in 2 days", 
  Day6TrialEndsTomorrow: "Your Loft Pro trial ends tomorrow",
  Day7TrialEndsToday: "Today’s the last day of your Loft Pro trial",
  
  // Re-engagement
  NoActivityReengagement: "Still here when you're ready",
  Reactivation: "Still thinking about Loft? We haven’t forgotten you",
  MilestoneEmail: "You’ve saved 100 links 🎉",
  
  // Post creation milestones
  Week1PostCreation: "Getting started with Loft: 3 ways to make it work for you",
  Week2PostCreation: "Loft tip: Let AI do the heavy lifting",
  Week3PostCreation: "From chaos to clarity: How others use Loft",
  Week4PostCreation: "Save smarter. Search faster. Stay organized",
  
  // Feedback & paid users
  FeedbackSurvey30Days: "Got a minute? We'd love your thoughts",
  Month1PaidUser: "A month with Loft — here's what's next",
  Anniversary: "{firstName}, thanks for being with Loft 💙",
  
  // Subscription renewals
  SubscriptionRenewal: "Your Loft subscription renews in 30 days",
  SubscriptionRenewalWeek: "Your Loft subscription renews next week",
  SubscriptionRenewalDay: "Your Loft subscription renews tomorrow",
  // Billing
  SubscriptionRenewed: "Your Loft subscription has been renewed",
  SubscriptionCancelled: "Your Loft Pro subscription has been canceled",
  PaymentError: "Trouble processing your Loft subscription",
  // Re-engagement
  // Other templates
  Delete: "You’ve left Loft — but we hope it’s not goodbye 💙",
  UpgradeConfirmation: "You’ve unlocked Loft Pro ✨ Smarter saving starts now",
  ProTrialWelcome: "✨ Your 7-Day Loft Pro Trial Starts Now!",
  FreeUserWelcome: "Welcome to Loft 👋 Your smarter way to save links",
  UnsubscribeActivePaid: "You'll no longer receive Loft updates — but your subscription is still active",
  UnsubscribedAll: "You've unsubscribed — we'll miss you in our inbox"
};

/**
 * Simple function to get email subject by template name
 */
export function getEmailSubject(templateName: string): string {
  return EMAIL_SUBJECTS[templateName] || `Email from Loft: ${templateName}`;
}

/**
 * Get email subject with dynamic replacements (e.g., firstName)
 */
export function getEmailSubjectWithReplacements(templateName: string, replacements: Record<string, string> = {}): string {
  let subject = EMAIL_SUBJECTS[templateName] || `Email from Loft: ${templateName}`;
  
  // Replace placeholders like {firstName}
  Object.keys(replacements).forEach(key => {
    const placeholder = `{${key}}`;
    subject = subject.replace(placeholder, replacements[key] || '');
  });
  
  return subject;
}

/**
 * Get template subject with fallback to subjects map
 */
export async function getTemplateSubjectWithFallback(templateName: string): Promise<string> {
  try {
    const templateModule = await import(`@/app/emails/${templateName}`);
    return templateModule.subject || EMAIL_SUBJECTS[templateName] || `Email from Loft: ${templateName}`;
  } catch (error) {
    console.error(`Failed to load subject for template ${templateName}:`, error);
    return EMAIL_SUBJECTS[templateName] || `Email from Loft: ${templateName}`;
  }
}
