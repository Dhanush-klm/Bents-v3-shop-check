import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

export const subject = "You'll no longer receive Loft updates — but your subscription is still active";

interface UnsubscribeActivePaidProps {
  username?: string;
  userEmail?: string;
  resubscribeUrl?: string;
}

export default function UnsubscribeActivePaid({
  username = "there",
  userEmail = "user@example.com",
  resubscribeUrl = "https://loftit.ai/unsubscribe?email=${userEmail}",
}: UnsubscribeActivePaidProps) {
  return (
    <EmailLayout userEmail={userEmail}>
      
      {/* Main Content */}
      <Section style={{ padding: '0 16px 12px 16px' }}>
        <div
              style={{
            background: '#fff2',
                  borderRadius: '8px',
            padding: '16px',  
            margin: '0 0 12px 0',
            display: 'block',
          }}
        >
          <table width="100%" cellPadding="0" cellSpacing="0" style={{ borderSpacing: '0' }}>
            <tr>
              <td>
                {/* Greeting */}
                <Text style={{
                  fontSize: '18px',
                  color: LoftColors.text,
                  margin: '0 0 24px 0',
                  lineHeight: '1.5',
                }}>
                    Hi {username},
                  </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  You've successfully unsubscribed from Loft's marketing emails.
                  </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                    We totally get it — inboxes get crowded.
                  </Text>
                
                <Text style={{
                        fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  Don't worry — your <strong>Loft subscription is still active</strong>, and you'll continue to have full access to all your saved content, summaries, and smart search features.
                  </Text>
                
                <Text style={{
                      fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                      lineHeight: '1.6',
                }}>
                  You'll still receive important service-related emails (like billing or account updates), but we'll stay out of your inbox for everything else.
                </Text>
                
                        <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                          margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Changed your mind? You can resubscribe anytime here:
                </Text>
                
                <EmailButton
                  href={resubscribeUrl}
                  emoji="👉"
                  className="email-button"
                >
                  Resubscribe to Loft Updates
                </EmailButton>
                
                        <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '32px 0 0 0',
                  lineHeight: '1.6',
                }}>
                  Thanks for being part of Loft — we're glad you're here.
                        </Text>
                
                {/* Signature */}
                        <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '16px 0 0 0',
                  lineHeight: '1.6',
                }}>
                  — The Loft Team
                        </Text>
                      </td>
                    </tr>
                  </table>
        </div>
                </Section>
    </EmailLayout>
  );
}