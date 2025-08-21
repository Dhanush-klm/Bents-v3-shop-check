import {
  Body,
  Container,
  Head,
  Html,
} from "@react-email/components";
import * as React from "react";
import EmailStyles from "./EmailStyles";
import EmailHeader from "./EmailHeader";
import EmailFooter from "./EmailFooter";

interface EmailLayoutProps {
  children: React.ReactNode;
  userEmail: string;
  additionalStyles?: string;
}

export default function EmailLayout({
  children,
  userEmail,
  additionalStyles,
}: EmailLayoutProps) {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
        <EmailStyles additionalStyles={additionalStyles} />
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
                className="container"
              >
                <EmailHeader />
                {children}
                <EmailFooter userEmail={userEmail} />
              </Container>
            </Body>
          </td>
        </tr>
      </table>
    </Html>
  );
}
