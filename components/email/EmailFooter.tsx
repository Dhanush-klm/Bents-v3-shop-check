import { Section, Text, Img } from "@react-email/components";
import * as React from "react";

interface EmailFooterProps {
  userEmail: string;
}

export default function EmailFooter({ userEmail }: EmailFooterProps) {
  const socialLinks = [
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
  ];

  return (
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
              You&apos;re receiving this email because you signed up for{' '}
              <a href="https://loftit.ai/" style={{ color: '#ffffff', textDecoration: 'underline' }}>
                Loft
              </a>
            </Text>
            <table cellPadding="0" cellSpacing="0" style={{ borderSpacing: '0', margin: '16px 0' }}>
              <tr>
                {socialLinks.map((social) => (
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
  );
}
