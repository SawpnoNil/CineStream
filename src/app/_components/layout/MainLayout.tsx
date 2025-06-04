"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import { websiteSettings } from "@/lib/mock/data";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [theme] = useState<"light" | "dark" | "system">(websiteSettings.theme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Apply theme class to document
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [theme]);

  // Listen for system theme changes if using system preference
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          {websiteSettings.logoUrl ? (
            <Image
              src={websiteSettings.logoUrl}
              alt={websiteSettings.title}
              width={64}
              height={64}
              className="h-12 w-auto animate-pulse sm:h-16"
            />
          ) : (
            <h1 className="animate-pulse text-3xl font-bold text-white sm:text-4xl">
              {websiteSettings.title}
            </h1>
          )}
          <div className="relative mt-6 h-1 w-16 overflow-hidden rounded-full bg-white/20 sm:mt-8">
            <div className="bg-primary absolute inset-y-0 left-0 w-1/2 animate-[loader_1s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
