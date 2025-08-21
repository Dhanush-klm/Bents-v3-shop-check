import { Section, Text, Link } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import TitleSection from "../../components/email/TitleSection";
import { LoftColors } from "../../components/email/EmailStyles";

export const subject = "Still haven't tried Loft? Let's get you started";

interface Day3TrialReminderProps {
  username?: string;
  userEmail?: string;
  helpUrl?: string;
}

export default function Day3TrialReminder({
  username = "there",
  userEmail = "user@example.com",
  helpUrl = "https://loftit.ai/ios-share-extension",
}: Day3TrialReminderProps) {
  return (
    <EmailLayout userEmail={userEmail}>
      <TitleSection 
        title="Still haven't tried Loft?"
        subtitle="Let's get you started"
        emoji="🚀"
      />
      {/* Main Content */}
      <Section style={{ padding: '0 24px 32px 24px' }}>
        <div
              style={{
            background: '#fff2',
                  borderRadius: '8px',
            padding: '24px',
            margin: '0 0 32px 0',
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
                  You signed up for a smarter way to save, but it looks like you haven't saved your first link yet. Don't worry — getting started is easy:
                  </Text>
                  
                {/* Getting Started Steps */}
                  <div style={{
                    backgroundColor: '#f9fafb',
                  padding: '20px',
                    borderRadius: '8px',
                  margin: '0 0 32px 0',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '16px',
                    }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>🔗</span>
                    <div>
                      <Text style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                      }}>
                        Save from any app using your phone's share sheet
                      </Text>
                    </div>
                  </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '16px',
                    }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>🧠</span>
                    <div>
                      <Text style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                      }}>
                        Let Loft auto-summarize and categorize it
                      </Text>
                    </div>
                  </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>🔍</span>
                    <div>
                      <Text style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                      }}>
                        Search and resurface content anytime
                      </Text>
                    </div>
                    </div>
                  </div>
                  
                  <Text style={{ 
                    fontSize: '16px', 
                  color: LoftColors.textSecondary,
                  margin: '0 0 32px 0',
                  lineHeight: '1.6',
                  }}>
                    Your free trial is ticking — make the most of it before it ends!
                  </Text>
                  
                <EmailButton
                      href={helpUrl}
                  emoji="👉"
                  className="email-button"
                >
                  Get Help Getting Started
                </EmailButton>
                
                {/* Signature */}
                <Text style={{
                      fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '32px 0 8px 0',
                      lineHeight: '1.6',
                }}>
                  — The Loft Team
                        </Text>

                        <Text style={{
                          fontSize: '14px',
                  color: LoftColors.textMuted,
                  margin: '32px 0 0 0',
                          textAlign: 'center' as const,
                  fontStyle: 'italic',
                }}>
                  <em>Link it. Love it. Loft it.</em>
                        </Text>
                      </td>
                    </tr>
                  </table>
        </div>
                </Section>
    </EmailLayout>
  );
} 