"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, Search, User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
];

const shopCategories = [
  { label: "Wealth Building", href: "/shop?category=wealth-building" },
  { label: "Real Estate", href: "/shop?category=real-estate" },
  { label: "Homebuying", href: "/shop?category=homebuying" },
  { label: "Emergency Planning", href: "/shop?category=emergency-planning" },
];

export default function Navbar() {
  const { items, getItemCount, openCart } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [mobileShopExpanded, setMobileShopExpanded] = useState(false);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle hydration mismatch: only render client-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll position for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const itemCount = mounted ? getItemCount() : 0;

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setShopDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setShopDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-gray-200/60 bg-white/80 backdrop-blur-md transition-shadow duration-300",
          scrolled && "shadow-sm shadow-gray-200/50"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ---- Left: Logo ---- */}
          <Link href="/" className="group flex items-center gap-1 select-none">
            <span className="text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-rose-600">
              RUBI
            </span>
            <span className="hidden text-sm font-light tracking-wide text-gray-500 sm:inline">
              Digital Downloads
            </span>
          </Link>

          {/* ---- Center: Desktop Navigation ---- */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) =>
              link.label === "Shop" ? (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-0.5 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100/70 hover:text-gray-900"
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        shopDropdownOpen && "rotate-180"
                      )}
                    />
                  </Link>

                  {/* Shop Dropdown */}
                  <AnimatePresence>
                    {shopDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute left-1/2 top-full z-50 mt-1 w-56 -translate-x-1/2 overflow-hidden rounded-xl border border-gray-200/80 bg-white/95 p-1.5 shadow-lg shadow-gray-200/40 backdrop-blur-lg"
                      >
                        {shopCategories.map((category) => (
                          <Link
                            key={category.href}
                            href={category.href}
                            className="block rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                            onClick={() => setShopDropdownOpen(false)}
                          >
                            {category.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100/70 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* ---- Right: Actions ---- */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100/70 hover:text-gray-900"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* User / Account */}
            <Link
              href="/account"
              aria-label="Account"
              className="hidden rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100/70 hover:text-gray-900 sm:inline-flex"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <button
              type="button"
              aria-label="Open cart"
              onClick={openCart}
              className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100/70 hover:text-gray-900"
            >
              <ShoppingCart className="h-5 w-5" />

              <AnimatePresence mode="wait">
                {mounted && itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                    }}
                    className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-semibold leading-none text-white"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="ml-1 rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100/70 hover:text-gray-900 md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* ---- Mobile Menu Overlay ---- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 flex h-full w-[300px] max-w-[85vw] flex-col bg-white shadow-2xl md:hidden"
            >
              {/* Panel Header */}
              <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5">
                <span className="text-lg font-bold tracking-tight text-gray-900">
                  RUBI
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Panel Links */}
              <div className="flex-1 overflow-y-auto px-5 py-6">
                <ul className="space-y-1">
                  {navLinks.map((link) =>
                    link.label === "Shop" ? (
                      <li key={link.label}>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileShopExpanded((prev) => !prev)
                          }
                          className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                          {link.label}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 text-gray-400 transition-transform duration-200",
                              mobileShopExpanded && "rotate-180"
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {mobileShopExpanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <li>
                                <Link
                                  href={link.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block rounded-lg py-2.5 pl-7 pr-3 text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
                                >
                                  All Products
                                </Link>
                              </li>
                              {shopCategories.map((category) => (
                                <li key={category.href}>
                                  <Link
                                    href={category.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block rounded-lg py-2.5 pl-7 pr-3 text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
                                  >
                                    {category.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-lg px-3 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>

                {/* Divider */}
                <div className="my-6 border-t border-gray-100" />

                {/* Account Link (visible on mobile) */}
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <User className="h-5 w-5 text-gray-400" />
                  Account
                </Link>
              </div>

              {/* Panel Footer */}
              <div className="border-t border-gray-100 px-5 py-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCart();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                >
                  <ShoppingCart className="h-4 w-4" />
                  View Cart
                  {mounted && itemCount > 0 && (
                    <span className="ml-1 rounded-full bg-rose-600 px-2 py-0.5 text-[11px] font-semibold leading-none text-white">
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
