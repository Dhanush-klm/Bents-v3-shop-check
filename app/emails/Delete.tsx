import { Section, Text, Link } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import { LoftColors } from "../../components/email/EmailStyles";

export const subject = "You've left Loft — but we hope it's not goodbye 💙";

interface DeleteProps {
  username?: string;
  userEmail?: string;
}

export default function Delete({
  username = "there",
  userEmail = "user@example.com",
}: DeleteProps) {
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
                  We're sorry to see you go but thank you for being part of the Loft journey.
                </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  Whether you used Loft to save links, collect inspiration, or just keep your digital world a little more organized, we hope it brought you a bit of ease and magic along the way. ✨
                </Text>
                
                <Text style={{
                  fontSize: '16px',
                  color: LoftColors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  While your account has now been deleted, we'd love to keep you in the loop as we continue to build and improve. Expect the occasional update with what's new just in case you want to come back someday (we hope you do!).
                </Text>
                
                <Text style={{ 
                  fontSize: '16px', 
                  color: LoftColors.textSecondary, 
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  👉 Prefer not to receive updates? No problem, you can{' '}
                  <Link
                    href="https://loftit.ai/unsubscribe?email=${userEmail}"
                    style={{ color: LoftColors.link, textDecoration: 'underline' }}
                  >
                    unsubscribe here
                  </Link>.
                </Text>
                
                <Text style={{ 
                  fontSize: '16px', 
                  color: LoftColors.textSecondary, 
                  margin: '24px 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  Thanks again for being with us,
                </Text>
                
                {/* Signature */}
                <Text style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: LoftColors.text,
                  margin: '0 0 24px 0',
                  lineHeight: '1.6',
                }}>
                  <strong>The Loft Team</strong>
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