import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import EmailButton from "../../components/email/EmailButton";
import { LoftColors } from "../../components/email/EmailStyles";


interface UnsubscribedAllProps {
  username?: string;
  userEmail?: string;
  resubscribeUrl?: string;
}

export default function UnsubscribedAll({
  username = "there",
  userEmail = "user@example.com",
  resubscribeUrl = `https://loftit.ai/unsubscribe?email=${encodeURIComponent(userEmail)}`,
}: UnsubscribedAllProps) {
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
                  You've been unsubscribed from all marketing emails from Loft.
                  </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  We'll make sure your inbox stays quiet no promotions, no updates, no product news.
                  </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  If you ever change your mind, you're always welcome back.
                  </Text>
                
                <EmailButton
                      href={resubscribeUrl}
                  emoji="👉"
                  className="email-button"
                >
                  Resubscribe to Loft Updates
                </EmailButton>
                
                <Text style={{
                        fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '32px 0 0 0',
                  lineHeight: '1.6',
                }}>
                  Thanks again for being part of our journey — we've loved having you with us.
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