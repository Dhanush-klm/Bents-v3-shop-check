import { Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";

import TitleSection from "../../components/email/TitleSection";
import { LoftColors } from "../../components/email/EmailStyles";

export const subject = "A month with Loft — here's what's next";

interface Month1PaidUserProps {
  username?: string;
  userEmail?: string;
}

export default function Month1PaidUser({
  username = "there",
  userEmail = "user@example.com",
}: Month1PaidUserProps) {
  return (
    <EmailLayout userEmail={userEmail}>
      <TitleSection 
        title="A month with Loft — here's what's next"
        subtitle="Your second brain in the making"
        emoji="✨"
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
                  You've had Loft for a month — and we hope it's made saving and finding your favorite content easier ✨
                </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  Don't forget:
                </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 12px 0',
                  lineHeight: '1.6',
                }}>
                  📂 Organize with folders & tags
                </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 12px 0',
                  lineHeight: '1.6',
                }}>
                  🧠 AI keeps everything categorized
                </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  🔍 Smart search works even when you forget the title
                </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 32px 0',
                  lineHeight: '1.6',
                }}>
                  Stick with Loft — your second brain in the making.
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