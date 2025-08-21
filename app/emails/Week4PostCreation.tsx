import { Section, Text, Link } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import TitleSection from "../../components/email/TitleSection";
import { LoftColors } from "../../components/email/EmailStyles";

export const subject = "Save smarter. Search faster. Stay organized";

interface Week4PostCreationProps {
  username?: string;
  userEmail?: string;
}

export default function Week4PostCreation({
  username = "there",
  userEmail = "user@example.com",
}: Week4PostCreationProps) {
  return (
    <EmailLayout userEmail={userEmail}>
      <TitleSection 
        title="Save smarter. Search faster. Stay organized"
        subtitle="Power features for power users"
        
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
                  You've had Loft for nearly a month — have you tried these power features yet?
                </Text>
                
                {/* Power Features */}
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
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>✅</span>
                    <div>
                      <Text style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                      }}>
                        Use collections + tags to build your personal system
                      </Text>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                  }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>✅</span>
                    <div>
                      <Text style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                      }}>
                        Search using smart tags created for you
                      </Text>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: '20px', marginRight: '12px' }}>✅</span>
                    <div>
                      <Text style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: LoftColors.text,
                        margin: '0 0 4px 0',
                      }}>
                        Use Ask Loft to find buried gems, no scrolling
                      </Text>
                    </div>
                  </div>
                </div>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  It's all designed to make your digital life more manageable.
                </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 32px 0',
                  lineHeight: '1.6',
                }}>
                  If you need help or want tips, we're just a reply away!
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