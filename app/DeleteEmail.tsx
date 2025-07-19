import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Text,
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
              .button {
                width: 100% !important;
              }
            }
          `}
        </style>
      </Head>
      <Body>
        <Container>
          <Section>
            <Text>Hi, {username}.</Text>
            <Text>Your account has been deleted. We&apos;re sorry to see you go!</Text>
            <Text>If you have any feedback or want to return, don&apos;t hesitate to reach out.</Text>
            <Text>Want to stop getting emails from Loft? <a href={`https://loft-ai-002.vercel.app/unsubscribe?email=${userEmail}`}>Unsubscribe</a></Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
} 