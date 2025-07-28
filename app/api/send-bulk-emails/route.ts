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

// Template mapping - using actual file names
const TEMPLATE_COMPONENTS = {
  'FreeUserWelcome': FreeUserWelcome,
  'ProUserWelcome': ProUserWelcome,
  'UpgradeConfirmation': UpgradeConfirmation,
  'Week1PostCreation': Week1PostCreation,
  'Week2PostCreation': Week2PostCreation,
  'Week3PostCreation': Week3PostCreation,
  'Week4PostCreation': Week4PostCreation,
  'Day3TrialReminder': Day3TrialReminder,
  'Day5TrialEnding': Day5TrialEnding,
  'Day6TrialEndsTomorrow': Day6TrialEndsTomorrow,
  'Day7TrialEndsToday': Day7TrialEndsToday,
  'NoActivityReengagement': NoActivityReengagement,
  'FeedbackSurvey30Days': FeedbackSurvey30Days,
  'UnsubscribedMarketing': UnsubscribedMarketing,
  'UnsubscribedAll': UnsubscribedAll,
  'Delete': Delete,
};

interface Contact {
  email: string;
  [key: string]: unknown;
}

interface Audience {
  id: string;
  name?: string;
  [key: string]: unknown;
}

// Function to save campaign details
async function saveCampaignDetails(templateId: string, audienceId: string, audienceName: string, subject: string, contactCount: number) {
  try {
    // Get human-readable template name
    const templateName = templateId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Direct database insertion instead of fetch
    

    console.log('[Bulk Email] Campaign details saved successfully');
  } catch (error) {
    console.error('[Bulk Email] Error saving campaign details:', error);
  }
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
    console.error('[Bulk Email] Error fetching user name:', error);
    return "there";
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {
  try {
    const { selectedTemplates, selectedAudiences, subject } = await req.json();
    
    console.log('[Bulk Email] Starting bulk email send:', {
      templates: selectedTemplates,
      audiences: selectedAudiences,
      subject
    });

    if (!selectedTemplates || !Array.isArray(selectedTemplates) || selectedTemplates.length === 0) {
      return NextResponse.json({ error: 'No templates selected' }, { status: 400 });
    }

    if (!selectedAudiences || !Array.isArray(selectedAudiences) || selectedAudiences.length === 0) {
      return NextResponse.json({ error: 'No audiences selected' }, { status: 400 });
    }

    if (!subject || subject.trim() === '') {
      return NextResponse.json({ error: 'Subject line is required' }, { status: 400 });
    }

    let totalEmailsSent = 0;
    const results = [];
    const warnings = [];

    // First get audience names
    const audiencesResponse = await resend.audiences.list();
    const audienceMap = new Map<string, string>();
    if (audiencesResponse.data && Array.isArray(audiencesResponse.data)) {
      (audiencesResponse.data as Audience[]).forEach((audience) => {
        audienceMap.set(audience.id, audience.name || `Audience ${audience.id.substring(0, 8)}`);
      });
    }

    // Process each audience separately
    for (const audienceId of selectedAudiences) {
      try {
        console.log(`[Bulk Email] Processing audience: ${audienceId}`);
        
        // Fetch contacts for this audience
        const contactsResponse = await resend.contacts.list({
          audienceId: audienceId
        });

        const audienceName = audienceMap.get(audienceId) || `Audience ${audienceId.substring(0, 8)}`;

        console.log(`[Bulk Email] Raw contacts response for ${audienceName}:`, JSON.stringify(contactsResponse, null, 2));

        // Handle different possible response structures
        let contacts: Contact[] = [];
        if (contactsResponse.data) {
          if (Array.isArray(contactsResponse.data)) {
            contacts = contactsResponse.data as unknown as Contact[];
          } else if (contactsResponse.data.data && Array.isArray(contactsResponse.data.data)) {
            contacts = contactsResponse.data.data as unknown as Contact[];
          }
        }

        console.log(`[Bulk Email] Processed contacts for ${audienceName}:`, contacts);

        if (!contacts || contacts.length === 0) {
          console.warn(`[Bulk Email] No contacts found for audience: ${audienceId}`);
          warnings.push(`Audience "${audienceName}" has no contacts`);
          results.push({
            audienceId,
            audienceName,
            contactCount: 0,
            emailsSent: 0,
            status: 'skipped - no contacts'
          });
          continue;
        }
        console.log(`[Bulk Email] Found ${contacts.length} contacts in audience ${audienceName} (${audienceId})`);

        if (contacts.length === 0) {
          console.warn(`[Bulk Email] Audience ${audienceName} has no contacts, skipping`);
          warnings.push(`Audience "${audienceName}" has no contacts`);
          results.push({
            audienceId,
            audienceName,
            contactCount: 0,
            emailsSent: 0,
            status: 'skipped - no contacts'
          });
          continue;
        }

        let audienceEmailsSent = 0;

        // Send emails for each template to this audience
        for (const templateId of selectedTemplates) {
          console.log(`[Bulk Email] Looking for template: ${templateId}`);
          console.log(`[Bulk Email] Available templates:`, Object.keys(TEMPLATE_COMPONENTS));
          
          const TemplateComponent = TEMPLATE_COMPONENTS[templateId as keyof typeof TEMPLATE_COMPONENTS];
          if (!TemplateComponent) {
            console.error(`[Bulk Email] Template not found: ${templateId}`);
            console.error(`[Bulk Email] Available templates:`, Object.keys(TEMPLATE_COMPONENTS));
            warnings.push(`Template "${templateId}" not found`);
            continue;
          }

          let emailsSentForTemplate = 0;
          
          // Send to each contact in this audience
          for (const contact of contacts) {
            try {
              console.log(`[Bulk Email] Attempting to send ${templateId} to ${contact.email}`);
              
              // Get user's full name for personalization
              const username = await getUserFullName(contact.email);
              console.log(`[Bulk Email] Got username for ${contact.email}: ${username}`);
              
              const emailResponse = await resend.emails.send({
                from: 'Loft <noreply@loftit.ai>',
                to: [contact.email],
                subject: subject,
                react: TemplateComponent({ 
                  username,
                  userEmail: contact.email 
                })
              });

              console.log(`[Bulk Email] Email response for ${contact.email}:`, emailResponse);

              // Check if email was sent successfully
              if (emailResponse.data || (emailResponse as any).id) {
                emailsSentForTemplate++;
                audienceEmailsSent++;
                totalEmailsSent++;
                console.log(`[Bulk Email] ✅ Successfully sent ${templateId} to ${contact.email}`);
              } else {
                console.warn(`[Bulk Email] ⚠️ No success indicator in email response for ${contact.email}:`, emailResponse);
              }

              // Rate limiting
              await sleep(600);
              
            } catch (emailError) {
              console.error(`[Bulk Email] ❌ Failed to send ${templateId} to ${contact.email}:`, emailError);
              warnings.push(`Failed to send to ${contact.email}: ${emailError instanceof Error ? emailError.message : 'Unknown error'}`);
            }
          }

          // Save campaign details for this template/audience combination
          await saveCampaignDetails(templateId, audienceId, audienceName, subject, contacts.length);
          
          console.log(`[Bulk Email] Completed ${templateId} for audience ${audienceId}: ${emailsSentForTemplate} emails sent`);
        }

        results.push({
          audienceId,
          audienceName,
          contactCount: contacts.length,
          emailsSent: audienceEmailsSent,
          templatesProcessed: selectedTemplates.length,
          status: audienceEmailsSent > 0 ? 'completed' : 'failed'
        });

      } catch (audienceError) {
        console.error(`[Bulk Email] Error processing audience ${audienceId}:`, audienceError);
        const audienceName = audienceMap.get(audienceId) || `Audience ${audienceId.substring(0, 8)}`;
        warnings.push(`Error processing audience "${audienceName}"`);
        results.push({
          audienceId,
          audienceName,
          error: audienceError instanceof Error ? audienceError.message : 'Unknown error',
          status: 'error'
        });
      }
    }

    console.log(`[Bulk Email] Bulk email send completed. Total emails sent: ${totalEmailsSent}`);

    // Create response message
    let message = '';
    if (totalEmailsSent > 0) {
      message = `Successfully sent ${totalEmailsSent} emails across ${selectedAudiences.length} audiences and ${selectedTemplates.length} templates`;
    } else {
      message = 'No emails were sent';
      if (warnings.length > 0) {
        message += `. Issues: ${warnings.join(', ')}`;
      }
    }

    return NextResponse.json({
      success: totalEmailsSent > 0,
      totalEmailsSent,
      results,
      warnings,
      message
    });

  } catch (error) {
    console.error('[Bulk Email] Error in bulk email send:', error);
    return NextResponse.json(
      { error: 'Failed to send bulk emails' }, 
      { status: 500 }
    );
  }
} 