import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

interface UpgradeConfirmationProps {
  username?: string;
  userEmail?: string;
}

export default function UpgradeConfirmation({
  username = "there",
  userEmail = "user@example.com",
}: UpgradeConfirmationProps) {
  return (
    <EmailLayout 
      userEmail={userEmail}
      headerTitle="Welcome to Loft Pro!"
      headerSubtitle="Your upgrade is complete"
      headerEmoji="🎉"
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
                
                {/* Success Message */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    width: 'fit-content',
                    margin: '0 auto 16px auto',
                  }}
                >
                  <span 
                    style={{
                      fontSize: '28px',
                      fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
                      whiteSpace: 'nowrap',
                      display: 'inline-block',
                    }}
                  >
                    ✨
                  </span>
                </div>
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.primary,
                  margin: '0',
                  lineHeight: '1.4',
                  fontWeight: '500',
                  textAlign: 'center' as const,
                }}>
                  Smarter saving starts now
                </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '24px 0',
                  lineHeight: '1.6',
                  textAlign: 'center' as const,
                }}>
                  🎉 Congratulations! Your <strong>Loft Pro</strong> upgrade is complete. You now have access to unlimited Ask Loft sessions, AI-powered tagging, and intelligent collections.
                </Text>
                
                {/* What's New */}
                <Text style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  What's new for you:
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
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>🤖</span>
                    <div>
                      <Text style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                      }}>
                        Unlimited Ask Loft
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                        margin: '0',
                      }}>
                        Chat with your saved content as much as you want
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
                        Smart auto-tagging
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                        margin: '0',
                      }}>
                        AI automatically organizes your content with relevant tags
                      </Text>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>🧠</span>
                    <div>
                      <Text style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                      }}>
                        Intelligent collections
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                        margin: '0',
                      }}>
                        Curated collections based on your interests and saved content
                      </Text>
                    </div>
                  </div>
                </div>
                
                {/* Next Steps */}
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Ready to explore your new superpowers?
                </Text>
                
                <EmailButton
                  href="https://loftit.ai"
                  emoji="🚀"
                  className="email-button"
                >
                  Open Loft Now
                </EmailButton>
                
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
                <Text style={{
                  fontSize: '14px',
                  color: LoftColors.textLight,
                  margin: '16px 0 0 0',
                  textAlign: 'center' as const,
                  fontStyle: 'italic',
                }}>
                  Link it. Love it. Loft it.
                </Text>
              </td>
            </tr>
          </table>
        </div>
      </Section>
    </EmailLayout>
  );
}