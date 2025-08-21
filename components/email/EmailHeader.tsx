import { Section, Text, Img } from "@react-email/components";
import * as React from "react";

interface EmailHeaderProps {
  title?: string;
  subtitle?: string;
  showEmoji?: boolean;
  emoji?: string;
}

export default function EmailHeader({
  title = "Welcome to Loft",
  subtitle = "Your smarter way to save links",
  showEmoji = true,
  emoji = "👋",
}: EmailHeaderProps) {
  return (
    <Section style={{
      backgroundColor: '#ffffff',
      padding: '32px 24px 24px 24px',
      textAlign: 'center' as const,
    }}>
      <Img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-NYLEum0BjNr1QNxE1HCgTvaqV84l0b.png"
        width="80"
        height="80"
        alt="Loft AI Logo"
        style={{
          display: 'block',
          maxWidth: '80px',
          width: '80px',
          height: '80px',
          borderRadius: '8px',
          margin: '0 auto 16px auto',
          objectFit: 'contain',
          transition: 'transform 0.2s ease-in-out',
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
          {title}
        </Text>
        {showEmoji && (
          <span 
            style={{
              fontSize: '28px',
              fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
              whiteSpace: 'nowrap',
              display: 'inline-block',
            }}
          >
            {emoji}
          </span>
        )}
      </div>
      <Text style={{
        fontSize: '18px',
        color: '#6b7280',
        margin: '0',
        lineHeight: '1.4',
      }}>
        {subtitle}
      </Text>
    </Section>
  );
}
