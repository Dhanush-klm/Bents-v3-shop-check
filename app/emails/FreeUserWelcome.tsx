import { Section, Text, Link } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

interface FreeUserWelcomeProps {
  username?: string;
  userEmail?: string;
}

export default function FreeUserWelcome({
  username = "there",
  userEmail = "user@example.com",
}: FreeUserWelcomeProps) {
  return (
    <EmailLayout 
      userEmail={userEmail}
      headerTitle="Welcome to Loft"
      headerSubtitle="Your smarter way to save links"
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
                            color: '#111827',
                            margin: '0 0 24px 0',
                            lineHeight: '1.5',
                          }}>
                            Hi {username},
                          </Text>
                          <Text style={{
                            fontSize: '16px',
                            color: '#374151',
                            margin: '0 0 24px 0',
                            lineHeight: '1.6',
                          }}>
                            Thanks for joining <strong>Loft</strong> — we&apos;re so excited to have you here!
                          </Text>
                          
                          {/* Free Features */}
                          <Text style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#374151',
                            margin: '0 0 16px 0',
                            lineHeight: '1.6',
                          }}>
                            With Loft Free, you can:
                          </Text>
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
                                  color: '#111827',
                                  margin: '0 0 4px 0',
                                }}>
                                  Save links from anywhere
                                </Text>
                                <Text style={{
                                  fontSize: '14px',
                                  color: '#6b7280',
                                  margin: '0',
                                }}>
                                  Use Loft&apos;s in-app &quot;Link URL&quot; feature or your phone&apos;s share sheet to quickly save content
                                </Text>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              marginBottom: '16px',
                            }}>
                              <span style={{ fontSize: '20px', marginRight: '12px' }}>📂</span>
                              <div>
                                <Text style={{
                                  fontSize: '16px',
                                  fontWeight: '500',
                                  color: '#111827',
                                  margin: '0 0 4px 0',
                                }}>
                                  Organize your content into collections
                                </Text>
                                <Text style={{
                                  fontSize: '14px',
                                  color: '#6b7280',
                                  margin: '0',
                                }}>
                                  Loft creates smart ones for you, and you can add your own anytime.
                                </Text>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              marginBottom: '16px',
                            }}>
                              <span style={{ fontSize: '20px', marginRight: '12px' }}>✨</span>
                              <div>
                                <Text style={{
                                  fontSize: '16px',
                                  fontWeight: '500',
                                  color: '#111827',
                                  margin: '0 0 4px 0',
                                }}>
                                  Use smart search
                                </Text>
                                <Text style={{
                                  fontSize: '14px',
                                  color: '#6b7280',
                                  margin: '0',
                                }}>
                                  To find what you&apos;ve saved
                                </Text>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                            }}>
                              <span style={{ fontSize: '20px', marginRight: '12px' }}>🤖</span>
                              <div>
                                <Text style={{
                                  fontSize: '16px',
                                  fontWeight: '500',
                                  color: '#111827',
                                  margin: '0 0 4px 0',
                                }}>
                                  Try Ask Loft once
                                </Text>
                                <Text style={{
                                  fontSize: '14px',
                                  color: '#6b7280',
                                  margin: '0',
                                }}>
                                  Our AI-powered way to summarize and resurface your content
                                </Text>
                              </div>
                            </div>
                          </div>
                          
                          {/* Upgrade Prompt */}
                          <Text style={{
                            fontSize: '16px',
                            color: '#374151',
                            margin: '0 0 16px 0',
                            lineHeight: '1.6',
                          }}>
                            Want unlimited Ask Loft sessions, AI-powered tagging, and intelligent collections curated for you?
                          </Text>
                          
                <EmailButton
                              href="loft://upgrade"
                  emoji="👉"
                  className="email-button"
                >
                  Upgrade to Loft Pro
                </EmailButton>
                          
                          <Text style={{
                            fontSize: '16px',
                            color: '#374151',
                            margin: '0 0 16px 0',
                            lineHeight: '1.6',
                          }}>
                            Start by saving your first link today:{' '}
                  <Link href="https://www.youtube.com/shorts/IoQXaCfgXKA" style={{ color: LoftColors.link, textDecoration: 'underline' }}>
                              Watch our help video
                            </Link>
                          </Text>
                          
                          <div
                            style={{
                              background: '#fff2',
                              borderRadius: '6px',
                              padding: '8px 16px',
                              display: 'inline-block',
                              margin: '24px 0 8px 0',
                              color: '#6b7280',
                              fontSize: '16px',
                              lineHeight: '1.6',
                              fontFamily: 'inherit',
                            }}
                          >
                            — The Loft Team
                          </div>
                          <Text style={{
                            fontSize: '14px',
                            color: '#9ca3af',
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