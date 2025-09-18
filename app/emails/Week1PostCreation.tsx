import { Section, Text, Link } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import { LoftColors } from "../../components/email/EmailStyles";


interface Week1PostCreationProps {
  username?: string;
  userEmail?: string;
}

export default function Week1PostCreation({
  username = "there",
  userEmail = "user@example.com",
}: Week1PostCreationProps) {
  return (
    <EmailLayout userEmail={userEmail}>
      
      {/* Main Content */}
      <Section style={{ padding: '0 16px 12px 16px' }}>
        <div
              style={{
                background: '#fff2',
                borderRadius: '8px',
                padding: '16px',
                margin: '0 0 12px 0',
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
                  You've signed up — now it's time to make Loft work for you. Here are 3 ways to get the most out of your first week:
                  </Text>
                {/* 3 Ways to Use Loft */}
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
                      <span style={{ fontSize: '20px', marginRight: '12px' }}>🔗</span>
                      <div>
                        <Text style={{
                          fontSize: '16px',
                          fontWeight: '500',
                        color: LoftColors.text,
                          margin: '0 0 4px 0',
                        }}>
                          Save from anywhere
                        </Text>
                        <Text style={{
                          fontSize: '14px',
                        color: LoftColors.textMuted,
                          margin: '0',
                        }}>
                        Use Loft through your phone's share sheet
                        </Text>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '16px',
                    }}>
                      <span style={{ fontSize: '20px', marginRight: '12px' }}>📂</span>
                      <div>
                        <Text style={{
                          fontSize: '16px',
                          fontWeight: '500',
                        color: LoftColors.text,
                          margin: '0 0 4px 0',
                        }}>
                          Organize easily
                        </Text>
                        <Text style={{
                          fontSize: '14px',
                        color: LoftColors.textMuted,
                          margin: '0',
                        }}>
                        Add Collections and tags to sort content your way
                        </Text>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}>
                      <span style={{ fontSize: '20px', marginRight: '12px' }}>✨</span>
                      <div>
                        <Text style={{
                          fontSize: '16px',
                          fontWeight: '500',
                        color: LoftColors.text,
                          margin: '0 0 4px 0',
                        }}>
                          Search like magic
                        </Text>
                        <Text style={{
                          fontSize: '14px',
                        color: LoftColors.textMuted,
                          margin: '0',
                        }}>
                          Type anything you remember, Loft will find it
                        </Text>
                      </div>
                    </div>
                  </div>
                  
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  <Link href="https://www.loftit.ai/ios-share-extension" style={{ color: LoftColors.link, textDecoration: 'underline' }}>
                    Click here
                  </Link>
                  {' '}to Learn How to Add Loft to Your Share Sheet
                </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 32px 0',
                  lineHeight: '1.6',
                }}>
                    Your link library is just getting started, happy saving!
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