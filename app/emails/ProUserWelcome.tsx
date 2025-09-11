import { Section, Text, Link } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

export const subject = "Welcome to Loft Pro ✨ Your smarter, AI-powered way to save links";

interface ProUserWelcomeProps {
  username?: string;
  userEmail?: string;
}

export default function ProUserWelcome({
  username = "there",
  userEmail = "user@example.com",
}: ProUserWelcomeProps) {
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
                  Welcome to <strong>Loft Pro</strong> — we're thrilled you're here! 🎉
                          </Text>
                          
                          <Text style={{
                            fontSize: '16px',
                  color: LoftColors.textSecondary,
                            margin: '0 0 16px 0',
                            lineHeight: '1.6',
                          }}>
                  As a Pro user, you now have access to all of Loft's powerful features to save smarter and find faster:
                          </Text>
                          
                          {/* Pro Features */}
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
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>✅</span>
                              <div>
                                <Text style={{
                                  fontSize: '16px',
                                  fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                                }}>
                        <strong>Unlimited saves</strong> – Collect as much as you want
                                </Text>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              marginBottom: '16px',
                            }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>✅</span>
                              <div>
                                <Text style={{
                                  fontSize: '16px',
                                  fontWeight: '500',
                        color: LoftColors.text,
                                  margin: '0 0 4px 0',
                                }}>
                        <strong>AI-powered summaries</strong> – Instantly understand your saved content
                                </Text>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              marginBottom: '16px',
                            }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>✅</span>
                              <div>
                                <Text style={{
                                  fontSize: '16px',
                                  fontWeight: '500',
                        color: LoftColors.text,
                                  margin: '0 0 4px 0',
                                }}>
                        <strong>Smart resurfacing</strong> – Loft remembers what you saved and brings it back when you need it
                                </Text>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              marginBottom: '16px',
                            }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>✅</span>
                              <div>
                                <Text style={{
                                  fontSize: '16px',
                                  fontWeight: '500',
                        color: LoftColors.text,
                                  margin: '0 0 4px 0',
                                }}>
                        <strong>Advanced organization</strong> – Create your own collections or let Loft intelligently curate them for you
                                </Text>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                            }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>✅</span>
                              <div>
                                <Text style={{
                                  fontSize: '16px',
                                  fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                                }}>
                        <strong>AI-powered tags</strong> – Links are automatically categorized for effortless discovery
                                </Text>
                              </div>
                            </div>
                          </div>
                          
                {/* Getting Started Section */}
                          <Text style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: LoftColors.text,
                            margin: '0 0 16px 0',
                            lineHeight: '1.4',
                          }}>
                  Here's how to get started:
                          </Text>
                          
                          <div style={{
                            backgroundColor: '#f9fafb',
                            padding: '16px',
                            borderRadius: '8px',
                            margin: '0 0 24px 0',
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
                                  <strong>Save from anywhere</strong> – Add Loft to your share sheet, <Link href="https://loftit.ai/ios-share-extension" style={{ color: LoftColors.link, textDecoration: 'underline' }}>click here to learn how</Link>
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
                                  <strong>Let AI do the work</strong> – We'll summarize, tag, and organize your links into collections
                                </Text>
                              </div>
                            </div>
                            
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                            }}>
                              <span style={{ fontSize: '20px', marginRight: '12px' }}>✨</span>
                              <div>
                                <Text style={{
                                  fontSize: '16px',
                                  fontWeight: '500',
                                  color: LoftColors.text,
                                  margin: '0 0 4px 0',
                                }}>
                                  <strong>Search like magic</strong> – Just type what you remember — Loft will find it
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
                            👉 <strong>Start exploring Loft Pro today:</strong> <Link href="https://www.youtube.com/shorts/IoQXaCfgXKA" style={{ color: LoftColors.link, textDecoration: 'underline' }}>link to YouTube video</Link>
                          </Text>
                          
                          <Text style={{
                            fontSize: '16px',
                            color: LoftColors.textSecondary,
                            margin: '0 0 32px 0',
                            lineHeight: '1.6',
                          }}>
                            We can't wait to see what you'll create and discover with Loft Pro!
                          </Text>
                          
                          {/* Signature */}
                          <Text style={{
                              fontSize: '16px',
                            color: LoftColors.textSecondary,
                            margin: '0 0 8px 0',
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