import { Section, Text, Link } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

interface Week1PostCreationProps {
  username?: string;
  userEmail?: string;
}

export default function Week1PostCreation({
  username = "there",
  userEmail = "user@example.com",
}: Week1PostCreationProps) {
  return (
    <EmailLayout 
      userEmail={userEmail}
      headerTitle="How's Loft working for you?"
      headerSubtitle="Week 1 check-in"
      headerEmoji="👋"
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
                  It's been a week since you joined <strong>Loft</strong>! We hope you're already finding it useful for organizing your digital life.
                </Text>
                
                {/* Quick Tips */}
                <Text style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Quick tips to get the most out of Loft:
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
                        Use the share sheet
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                        margin: '0',
                      }}>
                        Save directly from Safari, YouTube, or any app — no need to copy/paste URLs
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
                        Let Loft organize for you
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                        margin: '0',
                      }}>
                        Our AI automatically creates smart collections and tags your content
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
                        Try smart search
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                        margin: '0',
                      }}>
                        Search by topic, not just title — Loft understands the content of your saves
                      </Text>
                    </div>
                  </div>
                </div>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  Have you tried our share sheet extension yet? It makes saving links incredibly fast: {' '}
                  <Link href="https://loftit.ai/ios-share-extension" style={{ color: LoftColors.link, textDecoration: 'underline' }}>
                    Learn how to set it up
                  </Link>
                </Text>
                
                <EmailButton
                  href="https://loftit.ai"
                  emoji="🚀"
                  className="email-button"
                >
                  Open Loft
                </EmailButton>
                
                <Text style={{
                  fontSize: '14px',
                  color: LoftColors.textMuted,
                  margin: '16px 0 0 0',
                  textAlign: 'center' as const,
                  lineHeight: '1.5',
                }}>
                  Questions or feedback? Just reply to this email — we read every message!
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