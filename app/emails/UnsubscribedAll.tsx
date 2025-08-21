import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

interface UnsubscribedAllProps {
  username?: string;
  userEmail?: string;
  resubscribeUrl?: string;
}

export default function UnsubscribedAll({
  username = "there",
  userEmail = "user@example.com",
  resubscribeUrl = "https://loftit.ai/resubscribe",
}: UnsubscribedAllProps) {
  return (
    <EmailLayout 
      userEmail={userEmail}
      headerTitle="You've unsubscribed"
      headerSubtitle="We'll miss you"
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
                  You've successfully unsubscribed from all <strong>Loft</strong> emails. We're sorry to see you go!
                </Text>
                
                {/* Unsubscribe Confirmation */}
                <div style={{
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #0ea5e9',
                  padding: '16px',
                  borderRadius: '8px',
                  margin: '0 0 24px 0',
                }}>
                  <Text style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#0369a1',
                    margin: '0 0 8px 0',
                  }}>
                    ✅ Unsubscribe confirmed
                  </Text>
                  <Text style={{
                    fontSize: '14px',
                    color: '#0369a1',
                    margin: '0',
                  }}>
                    You won't receive any more emails from Loft (except important account notifications if you're still a user)
                  </Text>
                </div>
                
                {/* What this means */}
                <Text style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  What this means:
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
                    marginBottom: '12px',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px' }}>📧</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      No more marketing emails or feature updates
                    </Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px' }}>🎯</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      No tips or engagement emails
                    </Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px' }}>⚠️</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      You may still receive critical account or billing notifications
                    </Text>
                  </div>
                </div>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Changed your mind? You can resubscribe anytime:
                </Text>
                
                <EmailButton
                  href={resubscribeUrl}
                  emoji="💌"
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
                  Thank you for being part of the Loft community! 🙏
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