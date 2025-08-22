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

// Default subjects for templates that don't have exported subjects yet
// This is a fallback map - prefer adding `export const subject` to template files
export const DEFAULT_SUBJECTS: Record<string, string> = {
  Day3TrialReminder: "Reminder: Try Loft — your smarter way to save links",
  Day5TrialEnding: "Your trial is ending soon — keep your Loft flow going", 
  Day6TrialEndsTomorrow: "Your Loft trial ends tomorrow",
  Day7TrialEndsToday: "Your Loft trial ends today",
  FeedbackSurvey30Days: "hi",
  Month1PaidUser: "A month with Loft — here's what's next",
  SubscriptionRenewalWeek: "Your Loft subscription renews next week",
  SubscriptionRenewalDay: "Your Loft subscription renews tomorrow", 
  SubscriptionRenewal: "Your Loft subscription renews in 30 days",
  Delete: "Your Loft account has been deleted",
  MilestoneEmail: "🎉 You've saved 100 links with Loft!",
  NoActivityReengagement: "Still here when you're ready",
  UnsubscribeActivePaid: "You'll no longer receive Loft updates — but your subscription is still active",
  UnsubscribedAll: "You've been unsubscribed from all Loft emails"
};

/**
 * Get template subject with fallback to default subjects map
 */
export async function getTemplateSubjectWithFallback(templateName: string): Promise<string> {
  try {
    const templateModule = await import(`@/app/emails/${templateName}`);
    return templateModule.subject || DEFAULT_SUBJECTS[templateName] || `Email from Loft: ${templateName}`;
  } catch (error) {
    console.error(`Failed to load subject for template ${templateName}:`, error);
    return DEFAULT_SUBJECTS[templateName] || `Email from Loft: ${templateName}`;
  }
}
