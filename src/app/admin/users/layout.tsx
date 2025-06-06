import type { ReactNode } from "react";
import { checkAdminAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UsersLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Server-side authentication check
  const isAuthenticated = await checkAdminAuth();

  if (!isAuthenticated) {
    redirect("/admin/auth/login");
  }

  // If authenticated, render the children
  return <>{children}</>;
}
