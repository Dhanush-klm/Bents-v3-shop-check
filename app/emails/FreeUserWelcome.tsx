import { Section, Text, Link } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import TitleSection from "../../components/email/TitleSection";
import { LoftColors } from "../../components/email/EmailStyles";

export const subject = "Welcome to Loft 👋 Your smarter way to save links";

interface FreeUserWelcomeProps {
  username?: string;
  userEmail?: string;
}

export default function FreeUserWelcome({
  username = "there",
  userEmail = "user@example.com",
}: FreeUserWelcomeProps) {
  return (
    <EmailLayout userEmail={userEmail}>
      <TitleSection 
        title="Welcome to Loft"
        subtitle="Your smarter way to save links"
        emoji="👋"
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
                  Thanks for joining <strong>Loft</strong> — we're so excited to have you here!
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
                                  using our Loft extension or your phone's share sheet
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
                                  you create
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
                                  to find what you've saved
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
                            fontSize: '14px',
                            color: '#6b7280',
                            margin: '16px 0 24px 0',
                            lineHeight: '1.6',
                            textAlign: 'center' as const,
                          }}>
                            to unlock the full experience.
                          </Text>
                          
                          <Text style={{
                            fontSize: '16px',
                            color: '#374151',
                            margin: '0 0 32px 0',
                            lineHeight: '1.6',
                          }}>
                            Start by saving your first link today:{' '}
                            <Link href="https://www.youtube.com/shorts/IoQXaCfgXKA" style={{ color: LoftColors.link, textDecoration: 'underline' }}>
                              link to YouTube help video
                            </Link>
                          </Text>
                          
                          {/* Signature */}
                          <Text style={{
                              fontSize: '16px',
                            color: '#374151',
                            margin: '0 0 8px 0',
                              lineHeight: '1.6',
                          }}>
                            — The Loft Team
                          </Text>

                          <Text style={{
                            fontSize: '14px',
                            color: '#6b7280',
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