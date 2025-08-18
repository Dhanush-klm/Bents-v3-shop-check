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

interface FreeUserWelcomeProps {
  username?: string;
  userEmail?: string;
}

export default function FreeUserWelcome({
  username = "there",
  userEmail = "user@example.com",
}: FreeUserWelcomeProps) {
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
            .upgrade-btn {
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
              .welcome-title {
                font-size: 20px !important;
              }
              .feature-list, .steps-list {
                padding: 16px !important;
                margin: 20px 0 !important;
              }
              .feature-item, .step-item {
                margin-bottom: 10px !important;
              }
              .upgrade-btn {
                width: 100% !important;
                max-width: 100% !important;
                text-align: center !important;
                padding: 14px 8px !important;
                font-size: 15px !important;
              }
              .header-section {
                padding: 16px 0 !important;
              }
              .greeting-line {
                flex-wrap: wrap !important;
                justify-content: center !important;
                margin-bottom: 20px !important;
              }
              .step-number, .checkmark-container {
                margin-right: 4px !important;
              }
              .social-icons-container {
                display: flex !important;
                flex-wrap: wrap !important;
                gap: 16px !important;
                justify-content: center !important;
                margin: 12px 0 !important;
              }
              .social-icons-container a {
                padding: 4px !important;
              }
              .social-icons-container img {
                width: 24px !important;
                height: 24px !important;
              }
            }
            @media only screen and (max-width: 480px) {
              .container {
                border-radius: 0 !important;
                border-left: 0 !important;
                border-right: 0 !important;
              }
            }
            @media only screen and (max-width: 400px) {
              .welcome-title {
                font-size: 18px !important;
              }
              .feature-title, .steps-title {
                font-size: 16px !important;
              }
              .feature-item, .step-item, .paragraph {
                font-size: 14px !important;
                line-height: 1.6 !important;
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
                      Welcome to Loft
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
                    Your smarter way to save links
                  </Text>
                </Section>
                {/* Main Content */}
                <Section style={{
                  padding: '0 24px 32px 24px',
                }}>
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
                            Thanks for joining <strong>Loft</strong> — we&apos;re so excited to have you here!
                          </Text>
                          
                          {/* Free Features */}
                          <Text style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#374151',
                            margin: '0 0 16px 0',
                            lineHeight: '1.6',
                          }}>
                            With Loft Free, you can:
                          </Text>
                          <div style={{
                            backgroundColor: '#f9fafb',
                            padding: '20px',
                            borderRadius: '8px',
                            margin: '0 0 32px 0',
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              marginBottom: '16px',
                            }}>
                              <span style={{ fontSize: '20px', marginRight: '12px' }}>🔗</span>
                              <div>
                                <Text style={{
                                  fontSize: '16px',
                                  fontWeight: '500',
                                  color: '#111827',
                                  margin: '0 0 4px 0',
                                }}>
                                  Save links from anywhere
                                </Text>
                                <Text style={{
                                  fontSize: '14px',
                                  color: '#6b7280',
                                  margin: '0',
                                }}>
                                  Using our Loft extension or your phone&apos;s share sheet
                                </Text>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              marginBottom: '16px',
                            }}>
                              <span style={{ fontSize: '20px', marginRight: '12px' }}>📂</span>
                              <div>
                                <Text style={{
                                  fontSize: '16px',
                                  fontWeight: '500',
                                  color: '#111827',
                                  margin: '0 0 4px 0',
                                }}>
                                  Organize your content into collections
                                </Text>
                                <Text style={{
                                  fontSize: '14px',
                                  color: '#6b7280',
                                  margin: '0',
                                }}>
                                  You create
                                </Text>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              marginBottom: '16px',
                            }}>
                              <span style={{ fontSize: '20px', marginRight: '12px' }}>✨</span>
                              <div>
                                <Text style={{
                                  fontSize: '16px',
                                  fontWeight: '500',
                                  color: '#111827',
                                  margin: '0 0 4px 0',
                                }}>
                                  Use smart search
                                </Text>
                                <Text style={{
                                  fontSize: '14px',
                                  color: '#6b7280',
                                  margin: '0',
                                }}>
                                  To find what you&apos;ve saved
                                </Text>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                            }}>
                              <span style={{ fontSize: '20px', marginRight: '12px' }}>🤖</span>
                              <div>
                                <Text style={{
                                  fontSize: '16px',
                                  fontWeight: '500',
                                  color: '#111827',
                                  margin: '0 0 4px 0',
                                }}>
                                  Try Ask Loft once
                                </Text>
                                <Text style={{
                                  fontSize: '14px',
                                  color: '#6b7280',
                                  margin: '0',
                                }}>
                                  Our AI-powered way to summarize and resurface your content
                                </Text>
                              </div>
                            </div>
                          </div>
                          
                          {/* Upgrade Prompt */}
                          <Text style={{
                            fontSize: '16px',
                            color: '#374151',
                            margin: '0 0 16px 0',
                            lineHeight: '1.6',
                          }}>
                            Want unlimited Ask Loft sessions, AI-powered tagging, and intelligent collections curated for you?
                          </Text>
                          
                          <div style={{ margin: '16px 0 32px 0', textAlign: 'center' }}>
                            <Link
                              className="upgrade-btn"
                              href="loft://upgrade"
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
                                <span>Upgrade to Loft Pro</span>
                              </span>
                            </Link>
                          </div>
                          
                          <Text style={{
                            fontSize: '16px',
                            color: '#374151',
                            margin: '0 0 16px 0',
                            lineHeight: '1.6',
                          }}>
                            Start by saving your first link today:{' '}
                            <Link href="https://www.youtube.com/shorts/IoQXaCfgXKA" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                              Watch our help video
                            </Link>
                          </Text>
                          
                          <div
                            style={{
                              background: '#fff2',
                              borderRadius: '6px',
                              padding: '8px 16px',
                              display: 'inline-block',
                              margin: '24px 0 8px 0',
                              color: '#6b7280',
                              fontSize: '16px',
                              lineHeight: '1.6',
                              fontFamily: 'inherit',
                            }}
                          >
                            — The Loft Team
                          </div>
                          <Text style={{
                            fontSize: '14px',
                            color: '#9ca3af',
                            margin: '16px 0 0 0',
                            textAlign: 'center' as const,
                            fontStyle: 'italic',
                          }}>
                            Link it. Love it. Loft it.
                          </Text>
                        </td>
                      </tr>
                    </table>
                  </div>
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
                            href={`https://loftit.ai/unsubscribe?email=${userEmail}`}
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