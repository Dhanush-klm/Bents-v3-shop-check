import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import TitleSection from "../../components/email/TitleSection";
import { LoftColors } from "../../components/email/EmailStyles";

export const subject = "Got a minute? We&apos;d love your thoughts";

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
    <EmailLayout userEmail={userEmail}>
      <TitleSection 
        title="Got a minute?"
        subtitle="We&apos;d love your thoughts"
        emoji="💭"
      />
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
                  You&apos;ve been with Loft for a month and we&apos;d love to hear how it&apos;s going.
                  </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  What&apos;s working well? What can we do better?
                  </Text>
                  
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 32px 0',
                  lineHeight: '1.6',
                }}>
                    Take 60 seconds to share your thoughts:
                  </Text>
                  
                <EmailButton
                      href={surveyUrl}
                  emoji="👉"
                  className="email-button"
                >
                  Take the Feedback Survey
                </EmailButton>
                
                <Text style={{
                        fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '32px 0 32px 0',
                  lineHeight: '1.6',
                }}>
                    Your feedback helps shape Loft as we grow. Thank you for being part of it!
                  </Text>
                
                {/* Signature */}
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                      margin: '0 0 8px 0',
                      lineHeight: '1.6',
                }}>
                  Warmly,
                        </Text>
                
                        <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 8px 0',
                  lineHeight: '1.6',
                }}>
                  The Loft Team
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