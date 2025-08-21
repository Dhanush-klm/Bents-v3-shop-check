import { Section, Text, Link } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../../components/email/EmailLayout";
import { LoftColors } from "../../components/email/EmailStyles";

interface DeleteProps {
  username?: string;
  userEmail?: string;
}

export default function Delete({
  username = "there",
  userEmail = "user@example.com",
}: DeleteProps) {
  return (
    <EmailLayout 
      userEmail={userEmail}
      headerTitle="Account deleted"
      headerSubtitle="We're sorry to see you go"
      headerEmoji="👋"
    >
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
                  fontSize: '24px',
                  fontWeight: '600',
                  color: LoftColors.text,
                  margin: '0 0 16px 0',
                  lineHeight: '1.2',
                  textAlign: 'center' as const,
                }}>
                  Sorry to see you go
                </Text>
                <Text style={{ 
                  fontSize: '16px', 
                  color: LoftColors.primary, 
                  margin: '0 0 8px 0', 
                  fontWeight: 500,
                  textAlign: 'center' as const,
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{
                      fontSize: '20px',
                      fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji'
                    }}>😢</span>
                    Your account has been successfully deleted
                  </span>
                </Text>
                
                {/* Deletion Confirmation */}
                <div style={{
                  backgroundColor: '#f3f4f6',
                  padding: '20px',
                  borderRadius: '8px',
                  margin: '24px 0',
                  border: '1px solid #d1d5db',
                }}>
                  <Text style={{
                    fontSize: '16px',
                    color: LoftColors.text,
                    margin: '0 0 12px 0',
                    fontWeight: '600',
                  }}>
                    What's been deleted:
                  </Text>
                  <Text style={{
                    fontSize: '14px',
                    color: LoftColors.textMuted,
                    margin: '0 0 8px 0',
                    lineHeight: '1.5',
                  }}>
                    • All your saved links and content
                  </Text>
                  <Text style={{
                    fontSize: '14px',
                    color: LoftColors.textMuted,
                    margin: '0 0 8px 0',
                    lineHeight: '1.5',
                  }}>
                    • Your collections and tags
                  </Text>
                  <Text style={{
                    fontSize: '14px',
                    color: LoftColors.textMuted,
                    margin: '0 0 8px 0',
                    lineHeight: '1.5',
                  }}>
                    • Account settings and preferences
                  </Text>
                  <Text style={{
                    fontSize: '14px',
                    color: LoftColors.textMuted,
                    margin: '0',
                    lineHeight: '1.5',
                  }}>
                    • Any active subscriptions
                  </Text>
                </div>
                
                <Text style={{ 
                  fontSize: '16px', 
                  color: LoftColors.textSecondary, 
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  We hope <strong>Loft</strong> was helpful during your time with us. If you ever change your mind, you're always welcome back!
                </Text>
                
                <Text style={{ 
                  fontSize: '16px', 
                  color: '#fbbf24', 
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                }}>
                  👉 Prefer not to receive updates? No problem, you can{' '}
                  <Link
                    href={`https://loftit.ai/unsubscribe?email=${userEmail}`}
                    style={{ color: LoftColors.link, textDecoration: 'underline' }}
                  >
                    unsubscribe here
                  </Link>.
                </Text>
                
                <Text style={{ 
                  fontSize: '16px', 
                  color: LoftColors.textSecondary, 
                  margin: '24px 0 0 0',
                  lineHeight: '1.6',
                }}>
                  Thank you for trying Loft. We wish you all the best! 🙏
                </Text>
                
                <div
                  style={{
                    background: '#fff2',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    display: 'inline-block',
                    margin: '24px 0 8px 0',
                    color: LoftColors.textMuted,
                    fontSize: '16px',
                    lineHeight: '1.6',
                    fontFamily: 'inherit',
                  }}
                >
                  — The Loft Team
                </div>
                <Text style={{
                  fontSize: '14px',
                  color: LoftColors.textLight,
                  margin: '16px 0 0 0',
                  textAlign: 'center' as const,
                  fontStyle: 'italic',
                }}>
                  Take care! 💙
                </Text>
              </td>
            </tr>
          </table>
        </div>
      </Section>
    </EmailLayout>
  );
}