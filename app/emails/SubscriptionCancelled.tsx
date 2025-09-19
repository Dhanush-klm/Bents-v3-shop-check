import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";


interface SubscriptionCancelledProps {
  username?: string;
  userEmail?: string;
  endDate?: string;
}

export default function SubscriptionCancelled({
  username = "there",
  userEmail = "user@example.com",
  endDate = "January 15, 2025",
}: SubscriptionCancelledProps) {
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
                  We've confirmed your Loft Pro subscription has been canceled.
                </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  Your account is still active, and you'll continue to have access to all your saved links — but premium features like AI summaries, smart resurfacing, and unlimited saves will be paused once your current billing cycle ends on <strong>{endDate}</strong>.
                </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  No hard feelings — we're grateful you gave Loft Pro a try.
                </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  If you ever want to upgrade again, just follow this path in Loft:
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
                            Go to Loft {'>'}  Settings {'>'}  Subscription {'>'}  Upgrade to Pro
                          </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '32px 0 0 0',
                  lineHeight: '1.6',
                }}>
                  In the meantime, we're here if you need anything.
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
                
                {/* Tagline */}
                <Text style={{
                  fontSize: '14px',
                  color: LoftColors.textMuted,
                  margin: '16px 0 0 0',
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