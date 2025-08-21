import * as React from "react";

// Loft Brand Colors
export const LoftColors = {
  primary: '#FF5A5F',      // Loft brand red/pink
  primaryDark: '#E4464B',  // Darker shade for hover states
  text: '#111827',         // Primary text
  textSecondary: '#374151', // Secondary text
  textMuted: '#6b7280',    // Muted text
  textLight: '#9ca3af',    // Light text
  background: '#ffffff',   // Background
  backgroundGray: '#f9fafb', // Light gray background
  border: '#e5e7eb',       // Border color
  link: '#FF5A5F',         // Links use brand color
};

// Centralized CSS styles for all email templates
export const emailStyles = `
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
  .email-button {
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
    .welcome-title, .title {
      font-size: 20px !important;
    }
    .feature-list, .steps-list {
      padding: 16px !important;
      margin: 20px 0 !important;
    }
    .feature-item, .step-item {
      margin-bottom: 10px !important;
    }
    .email-button {
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
    .welcome-title, .title {
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
`;

interface EmailStylesProps {
  additionalStyles?: string;
}

export default function EmailStyles({ additionalStyles }: EmailStylesProps) {
  return (
    <style>
      {emailStyles}
      {additionalStyles}
    </style>
  );
}
