import { Section, Text, Link } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

interface ProUserWelcomeProps {
  username?: string;
  userEmail?: string;
}

export default function ProUserWelcome({
  username = "there",
  userEmail = "user@example.com",
}: ProUserWelcomeProps) {
  return (
    <EmailLayout 
      userEmail={userEmail}
      headerTitle="Welcome to Loft Pro"
      headerSubtitle="Your smarter way to save links"
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
                  Welcome to <strong>Loft Pro</strong>! 🎉 You now have access to all the advanced features that make saving and organizing your links effortless.
                          </Text>
                          
                          {/* Pro Features */}
                <Text style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Here's what you can do now:
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
                        Unlimited Ask Loft sessions
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
                        AI-powered auto-tagging
                                </Text>
                                <Text style={{
                                  fontSize: '14px',
                        color: LoftColors.textMuted,
                                  margin: '0',
                                }}>
                        Your content gets automatically organized with smart tags
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
                        Curated collections based on your interests and content
                                </Text>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                            }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>📱</span>
                              <div>
                                <Text style={{
                                  fontSize: '16px',
                                  fontWeight: '500',
                        color: LoftColors.text,
                                  margin: '0 0 4px 0',
                                }}>
                        Share sheet integration
                                </Text>
                                <Text style={{
                                  fontSize: '14px',
                        color: LoftColors.textMuted,
                                  margin: '0',
                                }}>
                        Add Loft to your share sheet,{' '}
                        <Link href="https://loftit.ai/ios-share-extension" style={{ color: LoftColors.link, textDecoration: 'underline' }}>
                          click here to learn how
                        </Link>
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
                  href="https://www.youtube.com/shorts/IoQXaCfgXKA"
                  emoji="🎥"
                  className="email-button"
                >
                  Watch Quick Tutorial
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