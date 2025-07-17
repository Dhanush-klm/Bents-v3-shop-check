"use client";
import { UserProfile, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function UserPage() {
  const { isSignedIn } = useUser();
  if (!isSignedIn) {
    redirect("/sign-in");
  }
  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <UserProfile />
    </div>
  );
} 