import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Text,
  Img,
  Link,
} from "@react-email/components";
import * as React from "react";

interface FeedbackSurvey30DaysProps {
  username?: string;
  userEmail?: string;
  surveyUrl?: string;
}

export default function FeedbackSurvey30Days({
  username = "there",
  userEmail = "user@example.com",
  surveyUrl = "https://forms.gle/survey-link",
}: FeedbackSurvey30DaysProps) {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
        <style>
          {`
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
            .survey-btn {
              width: 100% !important;
              max-width: 100% !important;
              font-size: 15px !important;
              padding: 14px 8px !important;
              box-sizing: border-box !important;
            }
            @media only screen and (max-width: 600px) {
              .container {
                width: 100% !important;
                max-width: 100% !important;
              }
              .content {
                padding: 16px !important;
              }
              .logo-container {
                flex-direction: column !important;
                text-align: center !important;
              }
              .logo-text {
                margin-top: 12px !important;
                text-align: center !important;
              }
              .title {
                font-size: 20px !important;
              }
              .paragraph {
                font-size: 14px !important;
                line-height: 1.6 !important;
              }
              .survey-btn {
                width: 100% !important;
                max-width: 100% !important;
                text-align: center !important;
                padding: 14px 8px !important;
                font-size: 15px !important;
              }
            }
          `}
        </style>
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
                  <Img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-NYLEum0BjNr1QNxE1HCgTvaqV84l0b.png"
                    width="100"
                    height="80"
                    alt="Loft AI Logo"
                    style={{
                      display: 'block',
                      maxWidth: '100px',
                      width: '100px',
                      height: '80px',
                      borderRadius: '8px',
                      margin: '0 auto 16px auto',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#111827',
                      margin: '0 0 8px 0',
                      lineHeight: '1.2',
                    }}
                  >
                    Got a minute? We&apos;d love your thoughts
                  </Text>
                </Section>
                {/* Main Content */}
                <Section style={{ padding: '0 24px 32px 24px', backgroundColor: '#ffffff' }}>
                  <Text style={{ fontSize: '16px', color: '#111827', margin: '0 0 24px 0', fontWeight: 600 }}>
                    Hi {username},
                  </Text>
                  <Text style={{ fontSize: '16px', color: '#374151', margin: '0 0 16px 0' }}>
                    You&apos;ve been with Loft for a month and we&apos;d love to hear how it&apos;s going.
                  </Text>
                  <Text style={{ fontSize: '16px', color: '#374151', margin: '0 0 24px 0', fontWeight: '600' }}>
                    What&apos;s working well? What can we do better?
                  </Text>
                  
                  <Text style={{ fontSize: '16px', color: '#374151', margin: '0 0 16px 0' }}>
                    Take 60 seconds to share your thoughts:
                  </Text>
                  
                  <div style={{ margin: '16px 0 24px 0', textAlign: 'center' }}>
                    <Link
                      className="survey-btn"
                      href={surveyUrl}
                      style={{
                        display: 'inline-block',
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        padding: '14px 28px',
                        borderRadius: '6px',
                        fontWeight: 600,
                        textDecoration: 'none',
                        fontSize: '16px',
                        width: '100%',
                        maxWidth: '350px',
                        textAlign: 'center',
                        boxSizing: 'border-box',
                      }}
                    >
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                      }}>
                        <span style={{ fontSize: '22px', lineHeight: 1, display: 'inline-block' }}>👉</span>
                        <span>Take the Feedback Survey</span>
                      </span>
                    </Link>
                  </div>
                  
                  <Text style={{ fontSize: '16px', color: '#374151', margin: '24px 0 0 0' }}>
                    Your feedback helps shape Loft as we grow. Thank you for being part of it!
                  </Text>
                  <div
                    style={{
                      background: '#fff2',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      display: 'inline-block',
                      margin: '0 0 8px 0',
                      color: '#6b7280',
                      fontSize: '16px',
                      lineHeight: '1.6',
                      fontFamily: 'inherit',
                    }}
                  >
                    Warmly,<br />
                    <strong>The Loft Team</strong>
                  </div>
                  <Text style={{ fontSize: '15px', color: '#9ca3af', fontStyle: 'italic', margin: '16px 0 0 0' }}>
                    Link it. Love it. Loft it.
                  </Text>
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
                          You&apos;re receiving this email because you signed up for <a href="https://loftit.ai/" style={{ color: '#ffffff', textDecoration: 'underline' }}>Loft</a>
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
                            ].map((social) => (
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
                            href={`https://loft-ai-002-subscribe.vercel.app/unsubscribe?email=${userEmail}`}
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