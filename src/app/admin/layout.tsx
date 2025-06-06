import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { AdminHeader } from "@/components/admin/Header";
import { checkAdminAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "StreamFlix Admin",
  description: "Admin panel for StreamFlix",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // This layout is used for all admin routes except those in /admin/auth/*
  // We assume middleware.ts is properly directing unauthenticated users to /admin/auth/login

  // For simplicity, we'll just provide the layout wrapper
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
