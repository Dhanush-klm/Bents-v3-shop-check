"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { user, isSignedIn } = useUser();
  if (!isSignedIn) {
    redirect("/sign-in");
  }
  return (
    <div style={{ maxWidth: 480, margin: "40px auto", textAlign: "center" }}>
      <h2>Welcome, {user?.emailAddresses[0]?.emailAddress}!</h2>
      <SignOutButton />
    </div>
  );
} 