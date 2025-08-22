import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

export const subject = "You've unlocked Loft Pro ✨ Smarter saving starts now";

interface UpgradeConfirmationProps {
  username?: string;
  userEmail?: string;
  openLoftUrl?: string;
}

export default function UpgradeConfirmation({
  username = "there",
  userEmail = "user@example.com",
  openLoftUrl = "loft://open",
}: UpgradeConfirmationProps) {
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
                  Great news — you've just upgraded to <strong>Loft Pro</strong>! 🎉
                  </Text>

                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  We're so excited for you to experience everything Loft can do at its best.
                  </Text>

                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                    Now you have full access to:
                  </Text>
                  
                {/* Features List */}
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
                        Unlimited saves
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                          margin: '0',
                        }}>
                        No more limits on what you can collect
                        </Text>
                      </div>
                    </div>
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
                        AI-powered summaries
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                          margin: '0',
                        }}>
                        Instantly understand your saved content
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
                        Smart resurfacing
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                          margin: '0',
                        }}>
                        Loft remembers and brings your links back when you need them
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
                        Advanced organization
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                          margin: '0',
                        }}>
                        Create your own collections or let Loft intelligently curate them for you
                        </Text>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>🏷️</span>
                      <div>
                        <Text style={{
                          fontSize: '16px',
                          fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                      }}>
                        AI-powered tags
                      </Text>
                      <Text style={{
                        fontSize: '14px',
                        color: LoftColors.textMuted,
                          margin: '0',
                        }}>
                        Links are automatically categorized for effortless discovery
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
                    Your existing saved links are still right where you left them — but now Loft will work even harder to organize, summarize, and surface them at just the right time.
                  </Text>
                  
                {/* CTA Button */}
                <div style={{ textAlign: 'center' as const, margin: '32px 0 24px 0' }}>
                  <Text style={{
                        fontSize: '16px',
                    color: LoftColors.text,
                    margin: '0 0 16px 0',
                    fontWeight: '600',
                  }}>
                    👉 <strong>Start using your new features today:</strong>
                  </Text>
                  <EmailButton 
                    href={openLoftUrl}
                    variant="primary"
                  >
                    Open Loft
                  </EmailButton>
                  </div>

                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 32px 0',
                  lineHeight: '1.6',
                }}>
                  Welcome to a smarter way to save, search, and rediscover what matters.
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