import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { AdminHeader } from "@/components/admin/Header";
import { checkAdminAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "StreamFlix Admin Dashboard",
  description: "Admin dashboard for StreamFlix",
};

// This layout is for all protected admin routes
export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Server-side admin authentication check
  const isAuthenticated = await checkAdminAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    redirect("/admin");
  }

  // Render the admin layout with sidebar
  return (
    <div className="bg-background flex min-h-screen text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
