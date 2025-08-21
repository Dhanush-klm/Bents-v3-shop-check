import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";

import TitleSection from "../../components/email/TitleSection";
import { LoftColors } from "../../components/email/EmailStyles";

export const subject = "Loft tip: Let AI do the heavy lifting";

interface Week2PostCreationProps {
  username?: string;
  userEmail?: string;
}

export default function Week2PostCreation({
  username = "there",
  userEmail = "user@example.com",
}: Week2PostCreationProps) {
  return (
    <EmailLayout userEmail={userEmail}>
      <TitleSection 
        title="Let AI do the heavy lifting"
        subtitle="Smart summaries and categorization"
        emoji="🤖"
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
                    Did you know Loft automatically summarizes and categorizes your saved links?
                  </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                    Our AI makes it easier to revisit your content later without having to re-read it all.
                  </Text>
                  
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                    margin: '0 0 24px 0',
                  lineHeight: '1.6',
                  }}>
                  Try saving a long article, TikTok, or Twitter thread, we&apos;ll make sense of it for you.
                </Text>
                
                    <Text style={{
                      fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 32px 0',
                  lineHeight: '1.6',
                }}>
                    Smarter, faster, more delightful saving starts here.
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