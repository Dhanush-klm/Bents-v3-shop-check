import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

interface SubscriptionRenewalDayProps {
  username?: string;
  userEmail?: string;
  renewalDate?: string;
  amount?: string;
}

export default function SubscriptionRenewalDay({
  username = "there",
  userEmail = "user@example.com",
  renewalDate = "January 15, 2025",
  amount = "$9.99",
}: SubscriptionRenewalDayProps) {
  return (
    <EmailLayout 
      userEmail={userEmail}
      headerTitle="Renewal tomorrow"
      headerSubtitle="Your subscription renews in 24 hours"
      headerEmoji="⏰"
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
                  This is a final reminder that your <strong>Loft Pro</strong> subscription will automatically renew tomorrow ({renewalDate}). We'll charge {amount} to your payment method on file.
                </Text>
                
                {/* Final reminder */}
                <div style={{
                  backgroundColor: '#fef3c7',
                  border: '1px solid '#f59e0b',
                  padding: '16px',
                  borderRadius: '8px',
                  margin: '0 0 24px 0',
                }}>
                  <Text style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#d97706',
                    margin: '0 0 8px 0',
                  }}>
                    ⏰ Renewal in 24 hours
                  </Text>
                  <Text style={{
                    fontSize: '14px',
                    color: '#d97706',
                    margin: '0',
                  }}>
                    {renewalDate} • {amount} • Last chance to make changes
                  </Text>
                </div>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  Thank you for being a loyal Loft Pro member! Your continued support helps us keep building amazing features for organizing your digital life.
                </Text>
                
                {/* What continues */}
                <Text style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Your Pro access continues with:
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
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#10b981' }}>∞</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      Unlimited saves and storage
                    </Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#10b981' }}>🧠</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      AI-powered insights and summaries
                    </Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#10b981' }}>💬</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      Unlimited conversations with Ask Loft
                    </Text>
                  </div>
                </div>
                
                {/* Last chance CTA */}
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  padding: '16px',
                  borderRadius: '8px',
                  margin: '0 0 32px 0',
                }}>
                  <Text style={{
                    fontSize: '14px',
                    color: '#dc2626',
                    margin: '0',
                    textAlign: 'center' as const,
                    fontWeight: '500',
                  }}>
                    ⚡ Last chance to modify your subscription before renewal
                  </Text>
                </div>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Need to make any last-minute changes to your billing or subscription?
                </Text>
                
                <EmailButton
                  href="https://loftit.ai/account/billing"
                  emoji="🔧"
                  className="email-button"
                >
                  Manage Subscription
                </EmailButton>
                
                <Text style={{
                  fontSize: '14px',
                  color: LoftColors.textMuted,
                  margin: '16px 0 0 0',
                  textAlign: 'center' as const,
                  lineHeight: '1.5',
                }}>
                  Otherwise, sit back and enjoy another month of Loft Pro! 🚀
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