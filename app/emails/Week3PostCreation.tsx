import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";

import TitleSection from "../../components/email/TitleSection";
import { LoftColors } from "../../components/email/EmailStyles";

export const subject = "From chaos to clarity: How others use Loft";

interface Week3PostCreationProps {
  username?: string;
  userEmail?: string;
}

export default function Week3PostCreation({
  username = "there",
  userEmail = "user@example.com",
}: Week3PostCreationProps) {
  return (
    <EmailLayout userEmail={userEmail}>
      <TitleSection 
        title="From chaos to clarity"
        subtitle="How others use Loft"
        emoji="🧠"
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
                  You&apos;re not alone in having dozens of tabs and saved links scattered across apps. Here&apos;s how users are turning Loft into their digital second brain:
                  </Text>
                  
                {/* How Others Use Loft */}
                  <div style={{
                    backgroundColor: '#f9fafb',
                    padding: '20px',
                  borderRadius: '8px',
                  margin: '0 0 32px 0',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '16px',
                    }}>
                      <span style={{ fontSize: '20px', marginRight: '12px' }}>📚</span>
                      <div>
                        <Text style={{
                          fontSize: '16px',
                          fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                        }}>
                          Students use it to manage research links
                        </Text>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '16px',
                    }}>
                      <span style={{ fontSize: '20px', marginRight: '12px' }}>📌</span>
                      <div>
                        <Text style={{
                          fontSize: '16px',
                          fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                        }}>
                          Founders track product inspo across platforms
                        </Text>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}>
                      <span style={{ fontSize: '20px', marginRight: '12px' }}>🎯</span>
                      <div>
                        <Text style={{
                          fontSize: '16px',
                          fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                        }}>
                          Creators save reels, ideas, and threads, all in one place
                        </Text>
                      </div>
                    </div>
                  </div>
                  
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 32px 0',
                  lineHeight: '1.6',
                }}>
                    What will Loft help you keep track of?
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