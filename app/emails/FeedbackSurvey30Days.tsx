import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

interface FeedbackSurvey30DaysProps {
  username?: string;
  userEmail?: string;
  surveyUrl?: string;
}

export default function FeedbackSurvey30Days({
  username = "there",
  userEmail = "user@example.com",
  surveyUrl = "https://loftit.ai/feedback",
}: FeedbackSurvey30DaysProps) {
  return (
    <EmailLayout 
      userEmail={userEmail}
      headerTitle="Help us improve Loft"
      headerSubtitle="30 days with us - how are we doing?"
      headerEmoji="💭"
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
                  You've been using <strong>Loft</strong> for 30 days now! 🎉 We hope it's been helping you stay organized and find your saved content easily.
                </Text>
                
                {/* Survey Introduction */}
                <div style={{
                  backgroundColor: '#ede9fe',
                  border: '1px solid #8b5cf6',
                  padding: '16px',
                  borderRadius: '8px',
                  margin: '0 0 24px 0',
                }}>
                  <Text style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#7c3aed',
                    margin: '0 0 8px 0',
                  }}>
                    💡 Your feedback shapes Loft's future
                  </Text>
                  <Text style={{
                    fontSize: '14px',
                    color: '#7c3aed',
                    margin: '0',
                  }}>
                    We'd love to hear about your experience and what we can improve
                  </Text>
                </div>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  Would you mind taking 2 minutes to share your thoughts? Your honest feedback helps us build features that actually matter to you.
                </Text>
                
                {/* Survey Topics */}
                <Text style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  We'd love to hear about:
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
                    <span style={{ fontSize: '18px', marginRight: '12px' }}>🎯</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      Which features you love most
                    </Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px' }}>🚀</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      What features you'd like to see next
                    </Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px' }}>🔧</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      Any pain points or frustrations
                    </Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '12px' }}>💡</span>
                    <Text style={{
                      fontSize: '15px',
                      color: LoftColors.text,
                      margin: '0',
                    }}>
                      How Loft fits into your daily workflow
                    </Text>
                  </div>
                </div>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Ready to help us improve? It'll only take a couple of minutes:
                </Text>
                
                <EmailButton
                  href={surveyUrl}
                  emoji="📝"
                  className="email-button"
                >
                  Share Your Feedback
                </EmailButton>
                
                <Text style={{
                  fontSize: '14px',
                  color: LoftColors.textMuted,
                  margin: '16px 0 0 0',
                  textAlign: 'center' as const,
                  lineHeight: '1.5',
                }}>
                  Thank you for being part of the Loft community! Your input means everything to us. 🙏
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