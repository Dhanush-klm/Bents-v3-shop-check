import { Section, Text } from "@react-email/components";
import * as React from "react";
import { LoftColors } from "./EmailStyles";

interface TitleSectionProps {
  title: string;
  subtitle?: string;
  emoji?: string;
  showEmoji?: boolean;
}

export default function TitleSection({
  title,
  subtitle,
  emoji = "👋",
  showEmoji = true,
}: TitleSectionProps) {
  return (
    <Section style={{
      backgroundColor: '#ffffff',
      padding: '0 24px 24px 24px',
      textAlign: 'center' as const,
    }}>
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
            color: LoftColors.text,
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
      {subtitle && (
        <Text style={{
          fontSize: '18px',
          color: LoftColors.textMuted,
          margin: '0',
          lineHeight: '1.4',
        }}>
          {subtitle}
        </Text>
      )}
    </Section>
  );
}
