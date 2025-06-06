import type { ReactNode } from "react";

// This layout is for the auth-related routes (login, password reset, etc.)
// These routes should NOT require authentication

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Simply render the children without authentication check
  return children;
}
