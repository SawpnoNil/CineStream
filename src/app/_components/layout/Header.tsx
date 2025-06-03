"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { websiteSettings } from "@/lib/mock/data";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movie" },
  { label: "TV Series", href: "/series" },
  { label: "New & Popular", href: "/new" },
  { label: "Tailwind v4", href: "/tailwind-v4" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 shadow-lg backdrop-blur-sm"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            {websiteSettings.logoUrl ? (
              <Image
                src={websiteSettings.logoUrl}
                alt={websiteSettings.title}
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            ) : (
              <h1 className="text-2xl font-bold text-white">
                {websiteSettings.title}
              </h1>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex gap-x-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-white ${
                      pathname === item.href
                        ? "after:bg-primary relative text-white after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-full"
                        : "text-white/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search titles..."
                    className="focus-visible:ring-primary h-9 w-[200px] rounded-full border-white/20 bg-black/50 pl-10 text-white md:w-[300px]"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => {
                      if (!searchQuery) setSearchOpen(false);
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="ml-1 h-9 w-9 text-white"
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-white hover:bg-white/10"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/10 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-white/10 bg-black/95 text-white backdrop-blur-md"
            >
              <nav>
                <ul className="mt-8 flex flex-col gap-6">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`text-lg font-medium transition-colors hover:text-white ${
                          pathname === item.href
                            ? "text-white"
                            : "text-white/70"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
