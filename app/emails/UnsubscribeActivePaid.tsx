import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

interface UnsubscribeActivePaidProps {
  username?: string;
  userEmail?: string;
  resubscribeUrl?: string;
}

export default function UnsubscribeActivePaid({
  username = "there",
  userEmail = "user@example.com",
  resubscribeUrl = "https://loftit.ai/resubscribe",
}: UnsubscribeActivePaidProps) {
  return (
    <EmailLayout 
      userEmail={userEmail}
      headerTitle="Email preferences updated"
      headerSubtitle="Your subscription is still active"
      headerEmoji="✉️"
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
                  fontSize: '24px',
                  fontWeight: '600',
                  color: LoftColors.text,
                  margin: '0 0 8px 0',
                  lineHeight: '1.2',
                  textAlign: 'center' as const,
                }}>
                  You'll no longer receive Loft updates
                </Text>
                <Text style={{ 
                  fontSize: '16px', 
                  color: LoftColors.primary, 
                  margin: '0 0 8px 0', 
                  fontWeight: 500,
                  textAlign: 'center' as const,
                }}>
                  But your subscription is still active
                </Text>
                
                {/* Status Clarification */}
                <div style={{
                  backgroundColor: '#ecfdf5',
                  border: '1px solid '#10b981',
                  padding: '16px',
                  borderRadius: '8px',
                  margin: '24px 0',
                }}>
                  <Text style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#059669',
                    margin: '0 0 8px 0',
                  }}>
                    ✅ Your Loft Pro subscription continues
                  </Text>
                  <Text style={{
                    fontSize: '14px',
                    color: '#059669',
                    margin: '0',
                  }}>
                    You'll still have full access to all Pro features — just no more marketing emails
                  </Text>
                </div>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  Perfect! You've unsubscribed from our marketing emails while keeping your active Loft Pro subscription. Here's what this means:
                </Text>
                
                {/* What continues */}
                <Text style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  What continues:
                </Text>
                <div style={{
                  backgroundColor: LoftColors.backgroundGray,
                  padding: '20px',
                  borderRadius: '8px',
                  margin: '0 0 24px 0',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#10b981' }}>✅</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      Full access to all Loft Pro features
                    </Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#10b981' }}>✅</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      Important billing and account notifications
                    </Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#10b981' }}>✅</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      Critical security and service updates
                    </Text>
                  </div>
                </div>
                
                {/* What stops */}
                <Text style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  What stops:
                </Text>
                <div style={{
                  backgroundColor: '#fef3f2',
                  padding: '20px',
                  borderRadius: '8px',
                  margin: '0 0 32px 0',
                  border: '1px solid #fecaca',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px' }}>📧</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      Feature announcements and tips
                    </Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px' }}>🎯</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      Marketing and engagement emails
                    </Text>
                  </div>
                </div>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Want to get updates again? You can resubscribe anytime:
                </Text>
                
                <EmailButton
                  href={resubscribeUrl}
                  emoji="📬"
                  className="email-button"
                >
                  Resubscribe to Updates
                </EmailButton>
                
                <Text style={{
                  fontSize: '14px',
                  color: LoftColors.textMuted,
                  margin: '16px 0 0 0',
                  textAlign: 'center' as const,
                  lineHeight: '1.5',
                }}>
                  Thank you for being a valued Loft Pro member! 🌟
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