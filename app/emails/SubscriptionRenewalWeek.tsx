import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

interface SubscriptionRenewalWeekProps {
  username?: string;
  userEmail?: string;
  renewalDate?: string;
  amount?: string;
}

export default function SubscriptionRenewalWeek({
  username = "there",
  userEmail = "user@example.com",
  renewalDate = "January 15, 2025",
  amount = "$9.99",
}: SubscriptionRenewalWeekProps) {
  return (
    <EmailLayout 
      userEmail={userEmail}
      headerTitle="Renewal reminder"
      headerSubtitle="Your subscription renews in 1 week"
      headerEmoji="📅"
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
                  Just a friendly reminder that your <strong>Loft Pro</strong> subscription will automatically renew in one week on <strong>{renewalDate}</strong>.
                </Text>
                
                {/* Renewal info */}
                <div style={{
                  backgroundColor: '#f0f9ff',
                  border: '1px solid '#0ea5e9',
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
                    📅 Renewal date: {renewalDate}
                  </Text>
                  <Text style={{
                    fontSize: '14px',
                    color: '#0369a1',
                    margin: '0',
                  }}>
                    Amount: {amount} • No action needed unless you want to make changes
                  </Text>
                </div>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  We hope you've been enjoying all the Pro features! Here's what you'll continue to have access to:
                </Text>
                
                {/* Pro benefits reminder */}
                <Text style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Your Loft Pro benefits:
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
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#10b981' }}>🔗</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      <strong>Unlimited saves</strong> — No limits on your digital collection
                    </Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#10b981' }}>🤖</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      <strong>AI-powered summaries</strong> — Instant content understanding
                    </Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#10b981' }}>💬</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      <strong>Unlimited Ask Loft</strong> — Chat with your content anytime
                    </Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#10b981' }}>🏷️</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      <strong>Smart auto-tagging</strong> — Automatic content organization
                    </Text>
                  </div>
                </div>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Need to update your payment method or modify your subscription? You can manage everything in your account:
                </Text>
                
                <EmailButton
                  href="https://loftit.ai/account/billing"
                  emoji="⚙️"
                  className="email-button"
                >
                  Manage Billing
                </EmailButton>
                
                <Text style={{
                  fontSize: '14px',
                  color: LoftColors.textMuted,
                  margin: '16px 0 0 0',
                  textAlign: 'center' as const,
                  lineHeight: '1.5',
                }}>
                  Questions about your subscription? Just reply to this email and we'll help!
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