import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";

export const subject = "Your Loft subscription has been renewed";

interface SubscriptionRenewedProps {
  username?: string;
  userEmail?: string;
  planPrice?: number;
  planCurrency?: string;
  nextRenewalDate?: string;
}

export default function SubscriptionRenewed({
  username = "there",
  userEmail = "user@example.com",
  planPrice = 9.99,
  planCurrency = "USD",
  nextRenewalDate = "March 15, 2024",
}: SubscriptionRenewedProps) {
  // Format amount based on currency
  const formatAmount = (price: number, currency: string) => {
    if (currency === 'USD') return `$${price}`;
    if (currency === 'INR') return `₹${price}`;
    if (currency === 'EUR') return `€${price}`;
    if (currency === 'GBP') return `£${price}`;
    return `${price} ${currency}`;
  };

  const amount = formatAmount(planPrice, planCurrency);
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
                    Your Loft Pro subscription has been successfully renewed.
                  </Text>
                  
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  You've been charged {amount} and will continue enjoying full access to everything Loft offers.
                  </Text>
                  
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                    Want to view your receipt or update billing info?
                  </Text>
                  
                <EmailButton
                  href="https://loftit.ai/account/billing"
                  emoji="👉"
                  className="email-button"
                >
                  View My Account
                </EmailButton>
                  
                  <Text style={{ 
                    fontSize: '16px', 
                  color: LoftColors.textSecondary,
                  margin: '32px 0 0 0',
                  lineHeight: '1.6',
                }}>
                  Thanks for being part of the Loft community 💙
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