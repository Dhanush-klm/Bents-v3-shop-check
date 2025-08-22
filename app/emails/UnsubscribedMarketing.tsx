import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import TitleSection from "../../components/email/TitleSection";
import { LoftColors } from "../../components/email/EmailStyles";

interface UnsubscribedMarketingProps {
  username?: string;
  userEmail?: string;
  resubscribeUrl?: string;
}

export default function UnsubscribedMarketing({
  username = "there",
  userEmail = "user@example.com",
  resubscribeUrl = "https://loftit.ai/resubscribe",
}: UnsubscribedMarketingProps) {
  return (
    <EmailLayout userEmail={userEmail}>
      <TitleSection 
        title="Unsubscribed from marketing"
        subtitle="You'll still get important updates"
        emoji="📧"
      />
      {/* Main Content */}
      <Section style={{ padding: '0 16px 12px 16px' }}>
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
                  You've successfully unsubscribed
                </Text>
                <Text style={{ 
                  fontSize: '16px', 
                  color: LoftColors.primary, 
                  margin: '0 0 8px 0', 
                  fontWeight: 500,
                  textAlign: 'center' as const,
                }}>
                  from Loft's marketing emails
                </Text>
                
                {/* Unsubscribe Details */}
                <div style={{
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #0ea5e9',
                  padding: '16px',
                  borderRadius: '8px',
                  margin: '24px 0',
                }}>
                  <Text style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#0369a1',
                    margin: '0 0 8px 0',
                  }}>
                    ✅ Marketing unsubscribe confirmed
                  </Text>
                  <Text style={{
                    fontSize: '14px',
                    color: '#0369a1',
                    margin: '0',
                  }}>
                    You'll still receive important account and service notifications
                  </Text>
                </div>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  Perfect! You've opted out of promotional emails while keeping the essential ones. Here's what this means:
                </Text>
                
                {/* What you'll still receive */}
                <Text style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  You'll still receive:
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
                      Account security notifications
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
                      Billing and subscription updates
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
                      Critical service announcements
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
                    <span style={{ fontSize: '18px', marginRight: '12px' }}>📢</span>
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
                      Promotional offers and updates
                    </Text>
                  </div>
                </div>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Want to hear about new features again? You can resubscribe anytime:
                </Text>
                
                <EmailButton
                  href={resubscribeUrl}
                  emoji="🔔"
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
                  Thank you for choosing what's right for you! 🙏
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