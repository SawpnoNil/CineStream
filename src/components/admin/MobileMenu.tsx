"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { sidebarItems } from "@/lib/admin/constants";
import { websiteSettings } from "@/lib/mock/data";
import { logoutAdmin } from "@/lib/auth";

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  count: number | null;
}

interface AdminMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminMobileMenu({ isOpen, onClose }: AdminMobileMenuProps) {
  const pathname = usePathname();

  async function handleLogout() {
    await logoutAdmin();
    window.location.href = "/admin";
    onClose();
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="border-border border-r p-0">
        <SheetHeader className="border-border border-b p-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <Film className="text-foreground h-6 w-6" />
              <span className="text-xl font-bold">
                {websiteSettings.title} Admin
              </span>
            </Link>
            <Button size="icon" variant="ghost" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        <div className="px-2 py-4">
          <nav>
            <ul className="space-y-1">
              {(sidebarItems as SidebarItem[]).map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`hover:bg-accent/60 flex w-full items-center justify-between rounded-lg px-4 py-3 transition-colors ${
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-5 w-5" />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}

              <li className="border-border mt-4 border-t pt-4">
                <button
                  className="text-muted-foreground hover:bg-accent/60 hover:text-foreground flex w-full items-center rounded-lg px-4 py-3 transition-colors"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
