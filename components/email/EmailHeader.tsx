import { Section, Img } from "@react-email/components";
import * as React from "react";

export default function EmailHeader() {
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
          margin: '0 auto',
          objectFit: 'contain',
          transition: 'transform 0.2s ease-in-out',
        }}
      />
    </Section>
  );
}
