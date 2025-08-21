import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

interface Day6TrialEndsTomorrowProps {
  username?: string;
  userEmail?: string;
  upgradeUrl?: string;
}

export default function Day6TrialEndsTomorrow({
  username = "there",
  userEmail = "user@example.com",
  upgradeUrl = "loft://upgrade",
}: Day6TrialEndsTomorrowProps) {
  return (
    <EmailLayout 
      userEmail={userEmail}
      headerTitle="Trial ends tomorrow"
      headerSubtitle="Last chance to upgrade"
      headerEmoji="⚡"
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
                  This is it — your <strong>Loft Pro</strong> trial ends tomorrow! Don't lose access to all the powerful features that make organizing your digital life effortless.
                </Text>
                
                {/* Urgency Alert */}
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  padding: '16px',
                  borderRadius: '8px',
                  margin: '0 0 24px 0',
                }}>
                  <Text style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#dc2626',
                    margin: '0 0 8px 0',
                  }}>
                    🚨 Final notice: Trial expires tomorrow
                  </Text>
                  <Text style={{
                    fontSize: '14px',
                    color: '#dc2626',
                    margin: '0',
                  }}>
                    After tomorrow, you'll be moved to Loft Free with limited features
                  </Text>
                </div>
                
                {/* Last Chance Messaging */}
                <Text style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Don't lose access to:
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
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#dc2626' }}>⚠️</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      <strong>Unlimited saves</strong> — Back to limited storage
                    </Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#dc2626' }}>⚠️</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      <strong>AI summaries</strong> — No more instant understanding
                    </Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#dc2626' }}>⚠️</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      <strong>Unlimited Ask Loft</strong> — Back to one session per day
                    </Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#dc2626' }}>⚠️</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      <strong>Smart auto-tagging</strong> — Manual organization only
                    </Text>
                  </div>
                </div>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                  textAlign: 'center' as const,
                  fontWeight: '600',
                }}>
                  Upgrade now and keep everything!
                </Text>
                
                <EmailButton
                  href={upgradeUrl}
                  emoji="⚡"
                  className="email-button"
                >
                  Upgrade to Loft Pro Now
                </EmailButton>
                
                <Text style={{
                  fontSize: '14px',
                  color: LoftColors.textMuted,
                  margin: '16px 0 0 0',
                  textAlign: 'center' as const,
                  lineHeight: '1.5',
                }}>
                  Need help? Just reply to this email — we're here to assist!
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