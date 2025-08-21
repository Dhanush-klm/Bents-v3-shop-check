import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

interface MilestoneEmailProps {
  username?: string;
  userEmail?: string;
  milestone?: string;
  count?: number;
}

export default function MilestoneEmail({
  username = "there",
  userEmail = "user@example.com",
  milestone = "100 saves",
  count = 100,
}: MilestoneEmailProps) {
  return (
    <EmailLayout 
      userEmail={userEmail}
      headerTitle="Milestone achieved!"
      headerSubtitle={`You've reached ${milestone}`}
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
                          
                          <Text style={{
                            fontSize: '16px',
                  color: LoftColors.textSecondary,
                            margin: '0 0 24px 0',
                            lineHeight: '1.6',
                          }}>
                  🎉 Congratulations! You've just reached an awesome milestone with <strong>Loft</strong> — you've saved {count} pieces of content!
                          </Text>
                          
                {/* Milestone Celebration */}
                          <div style={{
                  backgroundColor: '#fef3c7',
                  border: '1px solid #f59e0b',
                            padding: '20px',
                  borderRadius: '8px',
                  margin: '0 0 24px 0',
                            textAlign: 'center' as const,
                          }}>
                            <Text style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#d97706',
                              margin: '0 0 8px 0',
                  }}>
                    🏆 {milestone}
                  </Text>
                  <Text style={{
                    fontSize: '16px',
                    color: '#d97706',
                    margin: '0',
                  }}>
                    You're building an incredible digital library!
                            </Text>
                          </div>
                
                {/* Milestone Insights */}
                <Text style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Here's what your milestone means:
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
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>📚</span>
                    <div>
                      <Text style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                      }}>
                        Growing knowledge base
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                        margin: '0',
                      }}>
                        You're creating a valuable personal library of curated content
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
                        Enhanced AI insights
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                        margin: '0',
                      }}>
                        More content means better AI recommendations and smarter collections
                      </Text>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>🎯</span>
                    <div>
                      <Text style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                      }}>
                        Pattern recognition
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                        margin: '0',
                      }}>
                        Loft can now identify your interests and suggest related content
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
                  Ready to explore what you've built and discover new insights?
                </Text>
                
                <EmailButton
                  href="https://loftit.ai"
                  emoji="🔍"
                  className="email-button"
                >
                  Explore Your Collection
                </EmailButton>
                
                <Text style={{
                  fontSize: '14px',
                  color: LoftColors.textMuted,
                  margin: '16px 0 0 0',
                  textAlign: 'center' as const,
                  lineHeight: '1.5',
                }}>
                  Keep up the great work! Your future self will thank you. 🚀
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