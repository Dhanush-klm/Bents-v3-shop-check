import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

export const metadata = {
  title: "Resend + Clerk POC",
  description: "Proof of concept for Clerk auth and Resend emails.",
};

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en">
        <body>
          <nav style={{ padding: 16, borderBottom: "1px solid #eee" }}>
            <a href="/sign-in" style={{ marginRight: 16 }}>Sign In</a>
            <a href="/sign-up" style={{ marginRight: 16 }}>Sign Up</a>
            <a href="/dashboard">Dashboard</a>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
