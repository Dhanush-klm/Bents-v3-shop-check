import { Section, Img } from "@react-email/components";
import * as React from "react";

export default function EmailHeader() {
  return (
    <Section style={{
      backgroundColor: '#ffffff',
      padding: '10px 24px 6px 24px',
      textAlign: 'center' as const,
    }}>
      <Img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-NYLEum0BjNr1QNxE1HCgTvaqV84l0b.png"
        width="100"
        height="100"
        alt="Loft AI Logo"
        style={{
          display: 'block',
          maxWidth: '100px',
          width: '100px',
          height: '100px',
          borderRadius: '8px',
          margin: '0 auto',
          objectFit: 'contain',
          transition: 'transform 0.2s ease-in-out',
        }}
      />
    </Section>
  );
}
