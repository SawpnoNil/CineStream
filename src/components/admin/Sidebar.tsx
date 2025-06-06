"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Film,
  Tv,
  BarChart,
  Settings,
  Home,
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Tags,
  Database,
  Activity,
  MessageSquare,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { logoutAdmin } from "@/lib/auth";
import { websiteSettings } from "@/lib/mock/data";

// Admin sidebar navigation items
const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin/dashboard",
    count: null,
  },
  {
    icon: Film,
    label: "Movies",
    href: "/admin/movies",
    count: null,
  },
  {
    icon: Tv,
    label: "TV Series",
    href: "/admin/series",
    count: null,
  },
  {
    icon: Search,
    label: "TMDB Import",
    href: "/admin/tmdb",
    count: null,
  },
  {
    icon: Tags,
    label: "Tags",
    href: "/admin/tags",
    count: null,
  },
  {
    icon: Database,
    label: "Categories",
    href: "/admin/categories",
    count: null,
  },
  {
    icon: Activity,
    label: "Logs",
    href: "/admin/logs",
    count: null,
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/admin/analytics",
    count: null,
  },
  {
    icon: MessageSquare,
    label: "Feedback",
    href: "/admin/feedback",
    count: null,
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
    count: null,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  async function handleLogout() {
    await logoutAdmin();
    window.location.href = "/admin";
  }

  return (
    <div
      className={`${sidebarOpen ? "w-64" : "w-20"} hidden border-r border-zinc-800 p-4 transition-all duration-300 md:block`}
    >
      <div className="mb-8 flex items-center justify-center md:justify-start">
        <Link
          href="/"
          className={`flex items-center gap-2 ${!sidebarOpen && "justify-center"}`}
        >
          {websiteSettings.logoUrl ? (
            <Image
              src={websiteSettings.logoUrl}
              alt={websiteSettings.title}
              width={40}
              height={40}
              className="h-8 w-auto"
            />
          ) : (
            <Film className="h-8 w-8 text-white" />
          )}
          {sidebarOpen && (
            <span className="text-xl font-bold">
              {websiteSettings.title} Admin
            </span>
          )}
        </Link>
      </div>

      <nav>
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-zinc-800/60 ${
                    isActive ? "bg-zinc-800 text-white" : "text-zinc-400"
                  }`}
                >
                  <div
                    className={`flex items-center ${!sidebarOpen && "w-full justify-center"}`}
                  >
                    <item.icon
                      className={`h-5 w-5 ${sidebarOpen ? "mr-3" : ""}`}
                    />
                    {sidebarOpen && <span>{item.label}</span>}
                  </div>
                  {sidebarOpen && item.count !== null && (
                    <Badge variant="outline" className="bg-zinc-800 text-xs">
                      {item.count}
                    </Badge>
                  )}
                </Link>
              </li>
            );
          })}

          <li className="mt-4 border-t border-zinc-800 pt-4">
            <Link
              href="/"
              className={`flex items-center ${!sidebarOpen ? "justify-center" : ""} w-full rounded-lg px-4 py-3 text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-white`}
            >
              <Home className={`h-5 w-5 ${sidebarOpen ? "mr-3" : ""}`} />
              {sidebarOpen && <span>Back to Site</span>}
            </Link>
          </li>

          <li>
            <button
              className={`flex items-center ${!sidebarOpen ? "justify-center" : ""} w-full rounded-lg px-4 py-3 text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-white`}
              onClick={handleLogout}
            >
              <LogOut className={`h-5 w-5 ${sidebarOpen ? "mr-3" : ""}`} />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </nav>

      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-4 left-4 text-zinc-400 hover:text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <ChevronLeft className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
