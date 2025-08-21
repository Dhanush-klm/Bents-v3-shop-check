import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import TitleSection from "../../components/email/TitleSection";
import { LoftColors } from "../../components/email/EmailStyles";

export const subject = "Your Loft Pro trial ends in 2 days";

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
    <EmailLayout userEmail={userEmail}>
      <TitleSection 
        title="Your Loft Pro trial ends in 2 days"
        subtitle="Seamless transition to Pro"
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
                  Just a heads-up — your <strong>Loft Pro free trial</strong> will end in <strong>2 days</strong>.
                  </Text>
                  
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  After that, your subscription will begin automatically, and you'll continue to enjoy:
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
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#10b981' }}>✅</span>
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
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#10b981' }}>✅</span>
                      <Text style={{
                        fontSize: '16px',
                      fontWeight: '500',
                      color: LoftColors.text,
                        margin: '0',
                      }}>
                      Unlimited Ask Loft, AI-powered summaries
                      </Text>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '12px',
                    }}>
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#10b981' }}>✅</span>
                      <Text style={{
                        fontSize: '16px',
                      fontWeight: '500',
                      color: LoftColors.text,
                        margin: '0',
                      }}>
                        Smart resurfacing
                      </Text>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}>
                    <span style={{ fontSize: '18px', marginRight: '12px', color: '#10b981' }}>✅</span>
                      <Text style={{
                        fontSize: '16px',
                      fontWeight: '500',
                      color: LoftColors.text,
                        margin: '0',
                      }}>
                        AI-powered tags and smart collections
                      </Text>
                    </div>
                  </div>
                  
                  <Text style={{ 
                    fontSize: '16px', 
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  No action needed — your Pro access will continue seamlessly.
                  </Text>
                  
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 32px 0',
                  lineHeight: '1.6',
                }}>
                    Thanks for being part of Loft!
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