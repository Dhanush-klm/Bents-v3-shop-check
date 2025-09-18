import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";

import { LoftColors } from "../../components/email/EmailStyles";


interface MilestoneEmailProps {
  username?: string;
  userEmail?: string;
}

export default function MilestoneEmail({
  username = "there",
  userEmail = "user@example.com",
}: MilestoneEmailProps) {
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
                            You just hit <strong>100 links saved with Loft</strong> — that's 100 ideas, inspirations, insights, and rabbit holes all organized, searchable, and always within reach.
                          </Text>
                          
                          <Text style={{
                            fontSize: '16px',
                            color: LoftColors.textSecondary,
                            margin: '0 0 24px 0',
                            lineHeight: '1.6',
                          }}>
                            That's what we call progress.
                          </Text>
                          
                          <Text style={{
                            fontSize: '16px',
                            color: LoftColors.textSecondary,
                            margin: '0 0 32px 0',
                            lineHeight: '1.6',
                          }}>
                            We're so glad Loft is part of your flow 💙
                          </Text>
                          
                          {/* Signature */}
                          <Text style={{
                            fontSize: '16px',
                            color: LoftColors.textSecondary,
                            margin: '0 0 0 0',
                            lineHeight: '1.6',
                          }}>
                            — The Loft Team
                          </Text>
                        </td>
                      </tr>
                    </table>
                  </div>
                </Section>
    </EmailLayout>  
  );
}