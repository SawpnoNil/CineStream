import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube, Github } from "lucide-react";
import { websiteSettings } from "@/lib/mock/data";

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Movies", href: "/movie" },
      { label: "TV Series", href: "/series" },
      { label: "New & Popular", href: "/new" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Preferences", href: "/cookies" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-black/90 py-8 text-gray-300 backdrop-blur-sm md:py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          {/* Logo and Social Links */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center">
              {websiteSettings.logoUrl ? (
                <Image
                  src={websiteSettings.logoUrl}
                  alt={websiteSettings.title}
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                  unoptimized
                />
              ) : (
                <h1 className="text-xl font-bold text-white">
                  {websiteSettings.title}
                </h1>
              )}
            </Link>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 md:mt-0">
            {footerLinks.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <h3 className="text-primary mb-2 text-sm font-semibold">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="hover:text-primary text-xs transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-gray-400 sm:text-left md:mt-12">
          <p>
            &copy; {new Date().getFullYear()} {websiteSettings.title}. All
            rights reserved.
          </p>
          <p className="mt-2">
            This is a demo project and not a real streaming service. All content
            is used for demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
