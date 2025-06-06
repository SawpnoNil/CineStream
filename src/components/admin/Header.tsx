"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AdminMobileMenu } from "@/components/admin/MobileMenu";
import { Bell, Menu } from "lucide-react";

export function AdminHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get current section title from pathname
  const getSectionTitle = () => {
    const path = pathname.split("/");
    const section = path[2] ?? "dashboard";

    // Format section title (capitalize first letter, handle special cases)
    if (section === "tmdb") return "TMDB Import";
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  return (
    <>
      <header className="bg-card/80 sticky top-0 z-10 border-b border-zinc-800 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-white md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold md:text-2xl">
              {getSectionTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-white"
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <AdminMobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
