import type { ReactNode } from "react";

// This layout is for auth-related pages like login that don't require authentication
export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Simply render the children without authentication check
  return children;
}
