import "./globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { ReactNode } from "react";

export const metadata = {
  title: "Resend + Clerk POC",
  description: "Proof of concept for Clerk auth and Resend emails.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body>
          <nav style={{ padding: 16, borderBottom: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <UserButton afterSignOutUrl="/sign-in" />
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
