import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Img,
} from "@react-email/components";
import * as React from "react";

interface DeleteEmailProps {
  username?: string;
  userEmail?: string;
}

export default function DeleteEmail({
  username = "there",
  userEmail = "user@example.com",
}: DeleteEmailProps) {
  // Log the userEmail for debugging
  console.log("Unsubscribe link userEmail:", userEmail);
  // Inline styles function for email client compatibility
  const inlineStyle = (baseStyle: Record<string, any>, additionalStyle: Record<string, any> = {}) => ({
    ...baseStyle,
    ...additionalStyle
  });

  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          }
          body, table, td {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          }
          img {
            -ms-interpolation-mode: bicubic;
            display: block;
            max-width: 100%;
            height: auto;
          }
          .emoji {
            font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          }
          @media only screen and (max-width: 600px) {
            .container { width: 100% !important; max-width: 100% !important; }
            .content { padding: 16px !important; }
            .logo-container { flex-direction: column !important; text-align: center !important; }
            .logo-text { margin-top: 12px !important; text-align: center !important; }
            .welcome-title { font-size: 20px !important; }
            .feature-list, .steps-list { padding: 16px !important; margin: 20px 0 !important; }
            .feature-item, .step-item { margin-bottom: 10px !important; }
            .button { width: 100% !important; max-width: 280px !important; text-align: center !important; padding: 12px 10px !important; }
            .header-section { padding: 16px 0 !important; }
            .greeting-line { flex-wrap: wrap !important; justify-content: center !important; margin-bottom: 20px !important; }
            .step-number, .checkmark-container { margin-right: 4px !important; }
            .social-icons-container { display: flex !important; flex-wrap: wrap !important; gap: 16px !important; justify-content: center !important; margin: 12px 0 !important; }
            .social-icons-container a { padding: 4px !important; }
            .social-icons-container img { width: 24px !important; height: 24px !important; }
          }
          @media only screen and (max-width: 480px) {
            .container { border-radius: 0 !important; border-left: 0 !important; border-right: 0 !important; }
          }
          @media only screen and (max-width: 400px) {
            .welcome-title { font-size: 18px !important; }
            .feature-title, .steps-title { font-size: 16px !important; }
            .feature-item, .step-item, .paragraph { font-size: 14px !important; line-height: 1.6 !important; }
          }
        `}</style>
      </Head>
      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        bgcolor="#ffffff"
        style={{ backgroundColor: '#ffffff', width: '100%', minWidth: '100%' }}
      >
        <tr>
          <td style={{ backgroundColor: '#ffffff' }}>
            <Body
              style={{
                backgroundColor: '#ffffff',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                margin: 0,
                padding: 0,
                width: '100%',
              }}
            >
              <Container
                bgcolor="#ffffff"
                style={{
                  width: '100%',
                  maxWidth: '600px',
                  margin: '0 auto',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                {/* Header */}
                <Section style={{
                  backgroundColor: '#ffffff',
                  padding: '32px 24px 24px 24px',
                  textAlign: 'center' as const,
                }}>
                  <table width="100%" cellPadding="0" cellSpacing="0" style={{ borderSpacing: '0' }}>
                    <tr>
                      <td>
                        {/* Logo */}
                        <div
                          style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '16px',
                            padding: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 'fit-content',
                            margin: '0 auto 16px auto',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          }}
                        >
                          <Img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-NYLEum0BjNr1QNxE1HCgTvaqV84l0b.png"
                            width="125"
                            height="100"
                            alt="Loft AI Logo"
                            style={{
                              display: 'block',
                              maxWidth: '120px',
                              width: '120px',
                              height: '100px',
                              borderRadius: '8px',
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            width: 'fit-content',
                            margin: '0 auto 8px auto',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: '28px',
                              fontWeight: '700',
                              color: '#111827',
                              margin: '0',
                              lineHeight: '1.2',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Goodbye from Loft
                          </Text>
                          <span 
                            style={{
                              fontSize: '28px',
                              fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
                              whiteSpace: 'nowrap',
                              display: 'inline-block',
                            }}
                          >
                            👋
                          </span>
                        </div>
                        <Text style={{
                          fontSize: '18px',
                          color: '#6b7280',
                          margin: '0',
                          lineHeight: '1.4',
                        }}>
                          Your Loft account has been deleted
                        </Text>
                      </td>
                    </tr>
                  </table>
                </Section>
                {/* Main Content */}
                <Section style={{
                  padding: '0 24px 32px 24px',
                }}>
                  <table width="100%" cellPadding="0" cellSpacing="0" style={{ borderSpacing: '0' }}>
                    <tr>
                      <td>
                        {/* Greeting */}
                        <Text style={{
                          fontSize: '18px',
                          color: '#111827',
                          margin: '0 0 24px 0',
                          lineHeight: '1.5',
                        }}>
                          Hi {username},
                        </Text>
                        <Text style={{
                          fontSize: '16px',
                          color: '#374151',
                          margin: '0 0 24px 0',
                          lineHeight: '1.6',
                        }}>
                          We wanted to let you know that your Loft account has been successfully deleted. We're sorry to see you go, but we appreciate the time you spent with us.
                        </Text>
                        <Text style={{
                          fontSize: '16px',
                          color: '#374151',
                          margin: '0 0 24px 0',
                          lineHeight: '1.6',
                        }}>
                          If you have any feedback or if there’s anything we could have done better, please let us know by replying to this email or reaching out to <a href="mailto:support@loftit.ai" style={{ color: '#2563eb', textDecoration: 'underline' }}>support@loftit.ai</a>.
                        </Text>
                        <Text style={{
                          fontSize: '16px',
                          color: '#374151',
                          margin: '0 0 24px 0',
                          lineHeight: '1.6',
                        }}>
                          If you ever change your mind, you’re always welcome back to Loft. Your smarter way to save, search, and surface links will be waiting for you.
                        </Text>
                        <Text style={{
                          fontSize: '16px',
                          color: '#6b7280',
                          margin: '0 0 8px 0',
                          lineHeight: '1.6',
                        }}>
                          Wishing you all the best,
                          <br />
                          <strong>The Loft Team</strong>
                        </Text>
                        <Text style={{
                          fontSize: '14px',
                          color: '#9ca3af',
                          margin: '16px 0 0 0',
                          textAlign: 'center' as const,
                        }}>
                          Link it. Love it. Loft it.
                        </Text>
                      </td>
                    </tr>
                  </table>
                </Section>
                {/* Loft Footer Section */}
                <Section style={{
                  backgroundColor: '#FF5A5F',
                  padding: '24px 0',
                  color: '#ffffff',
                }}>
                  <table width="100%" cellPadding="0" cellSpacing="0" style={{ borderSpacing: '0' }}>
                    <tr>
                      <td align="center" style={{ padding: '0 24px' }}>
                        <Text style={{
                          fontSize: '14px',
                          textAlign: 'center' as const,
                          margin: '0 0 16px 0',
                        }}>
                          This email was sent to{' '}
                          <a
                            href={`mailto:${userEmail}`}
                            style={{
                              color: '#ffffff',
                              textDecoration: 'underline',
                            }}
                          >
                            {userEmail}
                          </a>
                        </Text>
                        <Text style={{
                          fontSize: '14px',
                          textAlign: 'center' as const,
                          margin: '16px 0',
                          lineHeight: '1.5',
                        }}>
                          You’re receiving this email because you had an account with <a href="https://loftit.ai/" style={{ color: '#ffffff', textDecoration: 'underline' }}>Loft</a>
                        </Text>
                        <table cellPadding="0" cellSpacing="0" style={{ borderSpacing: '0', margin: '16px 0' }}>
                          <tr>
                            {[
                              {
                                href: 'https://www.youtube.com/@justloftit',
                                icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png',
                                alt: 'YouTube',
                                size: 24,
                              },
                              {
                                href: 'https://www.instagram.com/justloftit?igsh=NThtYXdsMHB2MDAw',
                                icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png',
                                alt: 'Instagram',
                                size: 24,
                              },
                              {
                                href: 'https://x.com/justloftit?s=21&t=--zBBLxgAAblM7-dOrEx8A',
                                icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968958.png',
                                alt: 'Twitter',
                                size: 20,
                              },
                              {
                                href: 'https://loftit.ai/',
                                icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png',
                                alt: 'Website',
                                size: 20,
                              },
                            ].map((social, index) => (
                              <td key={social.alt} style={{ padding: '0 8px' }}>
                                <a
                                  href={social.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    color: '#ffffff',
                                    textDecoration: 'none',
                                    display: 'block',
                                  }}
                                >
                                  <Img
                                    src={social.icon}
                                    width={social.size}
                                    height={social.size}
                                    alt={social.alt}
                                    style={{
                                      display: 'block',
                                      maxWidth: `${social.size}px`,
                                      width: `${social.size}px`,
                                      height: `${social.size}px`,
                                    }}
                                  />
                                </a>
                              </td>
                            ))}
                          </tr>
                        </table>
                        <Text style={{
                          fontSize: '14px',
                          textAlign: 'center' as const,
                          margin: '16px 0',
                          lineHeight: '1.5',
                        }}>
                          Want to stop getting emails from Loft?{' '}
                          <a
                            href={`https://loft-ai-002.vercel.app/unsubscribe?email=${userEmail}`}
                            style={{
                              color: '#ffffff',
                              textDecoration: 'underline',
                            }}
                          >
                            Unsubscribe
                          </a>
                        </Text>
                      </td>
                    </tr>
                  </table>
                </Section>
              </Container>
            </Body>
          </td>
        </tr>
      </table>
    </Html>
  );
} 