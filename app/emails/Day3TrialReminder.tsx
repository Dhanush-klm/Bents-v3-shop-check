import { Section, Text, Link } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

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
    <EmailLayout 
      userEmail={userEmail}
      headerTitle="Getting the most from Loft"
      headerSubtitle="Your trial is going great!"
      headerEmoji="🚀"
    >
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
                  You're 3 days into your <strong>Loft Pro</strong> trial! How has it been going? We want to make sure you're getting the most out of all the features.
                </Text>
                
                {/* Tips Section */}
                <div style={{
                  backgroundColor: '#e0f2fe',
                  border: '1px solid #0891b2',
                  padding: '20px',
                  borderRadius: '8px',
                  margin: '0 0 24px 0',
                }}>
                  <Text style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#0e7490',
                    margin: '0 0 12px 0',
                  }}>
                    💡 Pro tip: Try Ask Loft
                  </Text>
                  <Text style={{
                    fontSize: '14px',
                    color: '#0e7490',
                    margin: '0',
                    lineHeight: '1.5',
                  }}>
                    You can chat with your saved content! Try asking "What articles did I save about productivity?" or "Show me my saved videos from this week."
                  </Text>
                </div>
                
                {/* Feature Highlights */}
                <Text style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Making the most of your trial:
                </Text>
                <div style={{
                  backgroundColor: LoftColors.backgroundGray,
                  padding: '20px',
                  borderRadius: '8px',
                  margin: '0 0 32px 0',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                  }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>📱</span>
                    <div>
                      <Text style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                      }}>
                        Set up the share extension
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                        margin: '0',
                      }}>
                        Save directly from any app with one tap
                      </Text>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                  }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>🏷️</span>
                    <div>
                      <Text style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                      }}>
                        Let AI organize for you
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                        margin: '0',
                      }}>
                        Smart tags and collections are created automatically
                      </Text>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>💬</span>
                    <div>
                      <Text style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                      }}>
                        Chat with your content
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                        margin: '0',
                      }}>
                        Ask Loft questions about what you've saved
                      </Text>
                    </div>
                  </div>
                </div>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Need help getting started?
                </Text>
                
                <EmailButton
                  href={helpUrl}
                  emoji="📖"
                  className="email-button"
                >
                  View Setup Guide
                </EmailButton>
                
                <Text style={{
                  fontSize: '14px',
                  color: LoftColors.textMuted,
                  margin: '16px 0 0 0',
                  textAlign: 'center' as const,
                  lineHeight: '1.5',
                }}>
                  Questions? Just reply to this email — we're here to help!
                </Text>
                
                <div
                  style={{
                    background: '#fff2',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    display: 'inline-block',
                    margin: '24px 0 8px 0',
                    color: LoftColors.textMuted,
                    fontSize: '16px',
                    lineHeight: '1.6',
                    fontFamily: 'inherit',
                  }}
                >
                  — The Loft Team
                </div>
              </td>
            </tr>
          </table>
        </div>
      </Section>
    </EmailLayout>
  );
}