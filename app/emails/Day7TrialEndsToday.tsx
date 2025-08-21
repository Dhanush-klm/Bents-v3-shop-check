import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";

import TitleSection from "../../components/email/TitleSection";
import { LoftColors } from "../../components/email/EmailStyles";

export const subject = "Today&apos;s the last day of your Loft Pro trial";

interface Day7TrialEndsTodayProps {
  username?: string;
  userEmail?: string;
}

export default function Day7TrialEndsToday({
  username = "there",
  userEmail = "user@example.com",
}: Day7TrialEndsTodayProps) {
  return (
    <EmailLayout userEmail={userEmail}>
      <TitleSection 
        title="Today&apos;s the last day of your Loft Pro trial"
        subtitle="Final day before Pro begins"
        emoji="⏰"
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
                  Today is the <strong>final day of your Loft Pro free trial.</strong>
                  </Text>
                  
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                    Your subscription will begin automatically after today, so you can keep enjoying Loft without limits:
                  </Text>
                <div style={{
                  backgroundColor: '#f9fafb',
                  padding: '20px',
                  borderRadius: '8px',
                  margin: '0 0 32px 0',
                }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '12px',
                    }}>
                    <span style={{ fontSize: '18px', marginRight: '12px' }}>✅</span>
                      <Text style={{
                        fontSize: '16px',
                      fontWeight: '500',
                      color: LoftColors.text,
                        margin: '0',
                      }}>
                        Unlimited saves
                      </Text>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '12px',
                    }}>
                    <span style={{ fontSize: '18px', marginRight: '12px' }}>✅</span>
                      <Text style={{
                        fontSize: '16px',
                      fontWeight: '500',
                      color: LoftColors.text,
                        margin: '0',
                      }}>
                      Unlimited Ask Loft, AI-powered summaries and tags
                      </Text>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}>
                    <span style={{ fontSize: '18px', marginRight: '12px' }}>✅</span>
                      <Text style={{
                        fontSize: '16px',
                      fontWeight: '500',
                      color: LoftColors.text,
                        margin: '0',
                      }}>
                        Smart resurfacing and collections
                      </Text>
                    </div>
                  </div>
                  
                  <Text style={{ 
                    fontSize: '16px', 
                  color: LoftColors.textSecondary,
                  margin: '0 0 32px 0',
                  lineHeight: '1.6',
                }}>
                  We can&apos;t wait to continue helping you save smarter and find faster!
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