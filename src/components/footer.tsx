"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, type FormEvent } from "react";

const shopLinks = [
  { label: "All Products", href: "/shop" },
  { label: "Wealth Building", href: "/shop?category=wealth-building" },
  { label: "Real Estate", href: "/shop?category=real-estate" },
  { label: "Homebuying", href: "/shop?category=homebuying" },
  { label: "Emergency Planning", href: "/shop?category=emergency-planning" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

const supportLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Help Center", href: "/help" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

const linkStyles = "text-slate-400 hover:text-white transition-colors duration-200";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Newsletter signup logic would go here
    setEmail("");
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1 - Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl tracking-tight">
                <span className="font-bold">RUBI</span>{" "}
                <span className="text-slate-300 font-light">
                  Digital Downloads
                </span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Premium financial workbooks and guides to help you build wealth
              with confidence.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center",
                    "text-slate-400 hover:text-white hover:border-slate-500 transition-all duration-200"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={cn("text-sm", linkStyles)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={cn("text-sm", linkStyles)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Support & Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Support
            </h3>
            <ul className="space-y-3 mb-8">
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={cn("text-sm", linkStyles)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div>
              <p className="text-sm text-slate-300 mb-3">
                Get free financial tips &amp; updates
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex items-stretch"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className={cn(
                    "flex-1 min-w-0 bg-slate-800 border border-slate-700 rounded-l-md",
                    "px-3 py-2 text-sm text-white placeholder:text-slate-500",
                    "focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500",
                    "transition-colors duration-200"
                  )}
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className={cn(
                    "bg-white text-slate-900 px-3 rounded-r-md",
                    "hover:bg-slate-200 transition-colors duration-200",
                    "flex items-center justify-center"
                  )}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-slate-500 text-center sm:text-left">
              &copy; 2026 Rubi Digital Downloads. All rights reserved.
            </p>

            {/* Payment Methods & Security */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="px-2 py-1 border border-slate-700 rounded font-medium">
                  Visa
                </span>
                <span className="px-2 py-1 border border-slate-700 rounded font-medium">
                  Mastercard
                </span>
                <span className="px-2 py-1 border border-slate-700 rounded font-medium">
                  Amex
                </span>
                <span className="px-2 py-1 border border-slate-700 rounded font-medium">
                  Stripe
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5" />
                <span>Secured by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
