import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import TitleSection from "../../components/email/TitleSection";
import { LoftColors } from "../../components/email/EmailStyles";

export const subject = "Your Loft subscription renews next week";

interface SubscriptionRenewalWeekProps {
  username?: string;
  userEmail?: string;
  renewalDate?: string;
  amount?: string;
}

export default function SubscriptionRenewalWeek({
  username = "there",
  userEmail = "user@example.com",
  renewalDate = "January 15, 2025",
}: SubscriptionRenewalWeekProps) {
  return (
    <EmailLayout userEmail={userEmail}>
      <TitleSection 
        title="Your Loft subscription renews next week"
        subtitle="Everything continues seamlessly"
        emoji="📅"
      />
      {/* Main Content */}
      <Section style={{ padding: '0 16px 12px 16px' }}>
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
                  Your Loft Pro subscription is set to renew on {renewalDate}.
                  </Text>
                  
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  You'll continue to enjoy full access to AI-enhanced summaries, smart search, and seamless link organization — no interruptions.
                  </Text>
                  
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                    Need to update your billing info or change your plan?
                  </Text>
                  
                <EmailButton
                        href="https://loftit.ai/account/billing"
                  emoji="👉"
                  className="email-button"
                >
                  Manage Subscription
                </EmailButton>
                
                {/* Signature */}
                <Text style={{
                      fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '32px 0 0 0',
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