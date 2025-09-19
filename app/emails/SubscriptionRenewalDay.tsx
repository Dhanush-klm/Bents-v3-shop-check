import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";


interface SubscriptionRenewalDayProps {
  username?: string;
  userEmail?: string;
  renewalDate?: string;
  amount?: string;
}

export default function SubscriptionRenewalDay({
  username = "there",
  userEmail = "user@example.com",
}: SubscriptionRenewalDayProps) {
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
                    Just a final reminder — your Loft Pro subscription renews tomorrow.
                  </Text>
                  
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  We'll charge the card on file and your access will continue uninterrupted.
                  </Text>
                  
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                    Want to make changes before then?
                  </Text>
                  
                  <Text style={{
                            fontSize: '16px',
                            color: '#ffffff',
                            margin: '16px 0',
                            padding: '14px 20px',
                            backgroundColor: '#FF5A5F',
                            borderRadius: '8px',
                            textAlign: 'center' as const,
                            fontWeight: '600',
                            display: 'inline-block',
                            border: 'none',
                            cursor: 'pointer',
                          }}>
                            Go to Loft {'>'}  Settings {'>'}  Subscription
                          </Text>
                  
                  <Text style={{ 
                    fontSize: '16px', 
                  color: LoftColors.textSecondary,
                  margin: '32px 0 0 0',
                  lineHeight: '1.6',
                  }}>
                    Thanks for staying with us!
                  </Text>
                  
                {/* Signature */}
                <Text style={{
                      fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '16px 0 0 0',
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