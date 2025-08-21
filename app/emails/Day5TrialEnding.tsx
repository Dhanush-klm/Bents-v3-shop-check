import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

interface Day5TrialEndingProps {
  username?: string;
  userEmail?: string;
  upgradeUrl?: string;
}

export default function Day5TrialEnding({
  username = "there",
  userEmail = "user@example.com",
  upgradeUrl = "loft://upgrade",
}: Day5TrialEndingProps) {
  return (
    <EmailLayout 
      userEmail={userEmail}
      headerTitle="2 days left in your trial"
      headerSubtitle="Don't lose access to Pro features"
      headerEmoji="⏳"
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
                  Your <strong>Loft Pro</strong> trial ends in just 2 days. We hope you've been enjoying the unlimited saves, AI summaries, and smart organization!
                </Text>
                
                {/* Trial Status */}
                <div style={{
                  backgroundColor: '#fef3cd',
                  border: '1px solid #fde047',
                  padding: '16px',
                  borderRadius: '8px',
                  margin: '0 0 24px 0',
                }}>
                  <Text style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#92400e',
                    margin: '0 0 8px 0',
                  }}>
                    ⏰ Trial ending soon
                  </Text>
                  <Text style={{
                    fontSize: '14px',
                    color: '#92400e',
                    margin: '0',
                  }}>
                    Upgrade now to keep all your Pro features and saved content organized
                  </Text>
                </div>
                
                {/* Value Proposition */}
                <Text style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  What you'll keep with Loft Pro:
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
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#10b981' }}>✅</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      <strong>Unlimited saves</strong> — Save as much as you want
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
                      <strong>AI-powered summaries</strong> — Understand content instantly
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
                      <strong>Smart auto-tagging</strong> — Automatic organization
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
                      <strong>Ask Loft unlimited</strong> — Chat with your content anytime
                    </Text>
                  </div>
                </div>
                
                <EmailButton
                  href={upgradeUrl}
                  emoji="🚀"
                  className="email-button"
                >
                  Continue with Loft Pro
                </EmailButton>
                
                <Text style={{
                  fontSize: '14px',
                  color: LoftColors.textMuted,
                  margin: '16px 0 0 0',
                  textAlign: 'center' as const,
                  lineHeight: '1.5',
                }}>
                  Questions about upgrading? Reply to this email and we'll help!
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