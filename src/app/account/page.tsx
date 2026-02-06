"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Download,
  ShoppingBag,
  Settings,
  LogOut,
  Clock,
  FileText,
  Eye,
  ChevronRight,
  Lock,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

// TODO: Connect to Firebase Auth

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  initials: "JD",
};

const mockPurchases = [
  {
    id: "RBD-001",
    name: "Emergency Home Binder",
    image: "/images/products/product-8.jpg",
    purchaseDate: "Jan 15, 2026",
    orderNumber: "RBD-001",
    status: "Completed" as const,
    downloadExpiresIn: 25,
  },
  {
    id: "RBD-002",
    name: "First-Time Homebuyer Workbook Vol 1",
    image: "/images/products/product-5.jpg",
    purchaseDate: "Jan 10, 2026",
    orderNumber: "RBD-002",
    status: "Completed" as const,
    downloadExpiresIn: 20,
  },
  {
    id: "RBD-003",
    name: "Generational Wealth Vol 1",
    image: "/images/products/product-3.jpg",
    purchaseDate: "Dec 28, 2025",
    orderNumber: "RBD-003",
    status: "Completed" as const,
    downloadExpiresIn: 7,
  },
];

/* ------------------------------------------------------------------ */
/*  Sidebar navigation items                                           */
/* ------------------------------------------------------------------ */

type DashboardTab = "purchases" | "profile" | "settings";

const sidebarNav: { label: string; value: DashboardTab; icon: typeof ShoppingBag }[] = [
  { label: "My Purchases", value: "purchases", icon: ShoppingBag },
  { label: "Profile", value: "profile", icon: User },
  { label: "Settings", value: "settings", icon: Settings },
];

/* ------------------------------------------------------------------ */
/*  Auth Forms                                                         */
/* ------------------------------------------------------------------ */

function AuthSection({ onLogin }: { onLogin: () => void }) {
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirm, setSignUpConfirm] = useState("");

  const inputClass = cn(
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm",
    "placeholder:text-gray-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200",
    "transition-all duration-200"
  );

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo area */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold tracking-tight text-gray-900">RUBI</span>
            <span className="ml-1 text-sm font-light text-gray-500">Digital Downloads</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to access your digital library
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Tabs */}
          <div className="mb-6 flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setAuthTab("signin")}
              className={cn(
                "flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200",
                authTab === "signin"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthTab("signup")}
              className={cn(
                "flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200",
                authTab === "signup"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            {authTab === "signin" ? (
              <motion.form
                key="signin"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: Connect to Firebase Auth
                  onLogin();
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="signin-email" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="signin-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="signin-password" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="signin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="flex items-center justify-end">
                  <button type="button" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className={cn(
                    "w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white",
                    "hover:bg-slate-800 transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  )}
                >
                  Sign In
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-gray-400">or</span>
                  </div>
                </div>

                {/* Google button */}
                <button
                  type="button"
                  onClick={() => {
                    // TODO: Connect to Firebase Google Auth
                    onLogin();
                  }}
                  className={cn(
                    "flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3",
                    "text-sm font-medium text-gray-700",
                    "hover:bg-gray-50 transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
                  )}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: Connect to Firebase Auth
                  onLogin();
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="signup-name" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="signup-email" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="signup-password" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="signup-confirm" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    id="signup-confirm"
                    type="password"
                    placeholder="Confirm your password"
                    value={signUpConfirm}
                    onChange={(e) => setSignUpConfirm(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={cn(
                    "w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white",
                    "hover:bg-slate-800 transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  )}
                >
                  Create Account
                </button>

                <p className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthTab("signin")}
                    className="font-medium text-slate-900 hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Security note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <Shield className="h-3.5 w-3.5" />
          <span>Your data is encrypted and secure</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard - Purchases Tab                                          */
/* ------------------------------------------------------------------ */

function PurchasesTab() {
  if (mockPurchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100">
          <ShoppingBag className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">No purchases yet</h3>
        <p className="mt-2 max-w-sm text-gray-500">
          Browse our collection of premium workbooks and guides to get started.
        </p>
        <Link
          href="/shop"
          className={cn(
            "mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium",
            "bg-slate-900 text-white shadow-sm",
            "hover:bg-slate-800 transition-colors duration-200"
          )}
        >
          Browse Products
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900">My Digital Library</h2>

      <div className="space-y-4">
        {mockPurchases.map((purchase, idx) => (
          <motion.div
            key={purchase.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Product thumbnail */}
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <div className="flex h-full w-full items-center justify-center">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
              </div>

              {/* Product info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{purchase.name}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        Purchased {purchase.purchaseDate}
                      </span>
                      <span>Order #{purchase.orderNumber}</span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    {purchase.status}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white",
                      "hover:bg-teal-700 transition-colors duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    )}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600",
                      "hover:bg-gray-50 transition-colors duration-200"
                    )}
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </button>
                  <span className="text-xs text-gray-400">
                    Download expires in {purchase.downloadExpiresIn} days
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Help link */}
      <div className="mt-8 rounded-lg border border-gray-100 bg-gray-50 p-4 text-center">
        <p className="text-sm text-gray-500">
          Need help with a purchase?{" "}
          <Link href="/contact" className="font-medium text-slate-900 hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard - Profile Tab                                            */
/* ------------------------------------------------------------------ */

function ProfileTab() {
  const [displayName, setDisplayName] = useState(mockUser.name);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const inputClass = cn(
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm",
    "placeholder:text-gray-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200",
    "transition-all duration-200"
  );

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Profile</h2>

      {/* Profile info card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Personal Information</h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="profile-name" className="mb-1.5 block text-sm font-medium text-gray-700">
              Display Name
            </label>
            <input
              id="profile-name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500">
              <Mail className="h-4 w-4 text-gray-400" />
              {mockUser.email}
            </div>
            <p className="mt-1 text-xs text-gray-400">Email cannot be changed here</p>
          </div>

          <button
            type="button"
            className={cn(
              "rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white",
              "hover:bg-slate-800 transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            )}
          >
            Update Profile
          </button>
        </div>
      </motion.div>

      {/* Change Password card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="current-password" className="mb-1.5 block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              id="current-password"
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="new-password" className="mb-1.5 block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="confirm-new-password" className="mb-1.5 block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              id="confirm-new-password"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          <button
            type="button"
            className={cn(
              "rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white",
              "hover:bg-slate-800 transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            )}
          >
            Update Password
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard - Settings Tab                                           */
/* ------------------------------------------------------------------ */

function SettingsTab() {
  const [orderConfirmations, setOrderConfirmations] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      {/* Email preferences */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h3 className="mb-1 text-lg font-semibold text-gray-900">Email Preferences</h3>
        <p className="mb-6 text-sm text-gray-500">Manage which emails you receive from us</p>

        <div className="space-y-5">
          {/* Order confirmations toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Order confirmations</p>
              <p className="text-xs text-gray-500">Receive emails when your order is confirmed</p>
            </div>
            <button
              onClick={() => setOrderConfirmations(!orderConfirmations)}
              className={cn(
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200",
                orderConfirmations ? "bg-teal-600" : "bg-gray-200"
              )}
            >
              <span
                className={cn(
                  "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition-transform duration-200",
                  orderConfirmations ? "translate-x-5.5 mt-0.5 ml-0.5" : "translate-x-0.5 mt-0.5"
                )}
              />
            </button>
          </div>

          {/* Product updates toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Product updates</p>
              <p className="text-xs text-gray-500">Get notified when we release new products</p>
            </div>
            <button
              onClick={() => setProductUpdates(!productUpdates)}
              className={cn(
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200",
                productUpdates ? "bg-teal-600" : "bg-gray-200"
              )}
            >
              <span
                className={cn(
                  "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition-transform duration-200",
                  productUpdates ? "translate-x-5.5 mt-0.5 ml-0.5" : "translate-x-0.5 mt-0.5"
                )}
              />
            </button>
          </div>

          {/* Newsletter toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Newsletter</p>
              <p className="text-xs text-gray-500">Receive our weekly financial tips newsletter</p>
            </div>
            <button
              onClick={() => setNewsletter(!newsletter)}
              className={cn(
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200",
                newsletter ? "bg-teal-600" : "bg-gray-200"
              )}
            >
              <span
                className={cn(
                  "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition-transform duration-200",
                  newsletter ? "translate-x-5.5 mt-0.5 ml-0.5" : "translate-x-0.5 mt-0.5"
                )}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Danger zone */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="rounded-xl border-2 border-red-200 bg-red-50/50 p-6"
      >
        <h3 className="mb-1 text-lg font-semibold text-red-900">Danger Zone</h3>
        <p className="mb-4 text-sm text-red-700/70">
          Once you delete your account, there is no going back. All your purchases and data will be permanently removed.
        </p>
        <button
          type="button"
          className={cn(
            "rounded-lg border border-red-300 bg-white px-5 py-2.5 text-sm font-medium text-red-600",
            "hover:bg-red-50 transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          )}
        >
          Delete Account
        </button>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard Layout                                                   */
/* ------------------------------------------------------------------ */

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<DashboardTab>("purchases");

  return (
    <div className="min-h-[80vh] bg-gray-50/60">
      {/* Page header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-gray-400">
            <Link href="/" className="transition-colors hover:text-gray-900">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gray-900">Account</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* ---- Mobile tab bar ---- */}
          <div className="flex gap-1 overflow-x-auto rounded-lg bg-white p-1 shadow-sm border border-gray-200 lg:hidden no-scrollbar">
            {sidebarNav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  className={cn(
                    "flex flex-shrink-0 items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200",
                    activeTab === item.value
                      ? "bg-slate-100 text-slate-900"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={onLogout}
              className="flex flex-shrink-0 items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>

          {/* ---- Desktop sidebar ---- */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              {/* User info */}
              <div className="mb-6 flex flex-col items-center text-center">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">
                  {mockUser.initials}
                </div>
                <h3 className="font-semibold text-gray-900">{mockUser.name}</h3>
                <p className="text-sm text-gray-500">{mockUser.email}</p>
              </div>

              {/* Nav */}
              <nav className="space-y-1">
                {sidebarNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.value}
                      onClick={() => setActiveTab(item.value)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                        activeTab === item.value
                          ? "bg-slate-100 font-medium text-slate-900"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      )}
                    >
                      <Icon className="h-4.5 w-4.5" />
                      {item.label}
                    </button>
                  );
                })}

                {/* Divider */}
                <div className="!my-3 border-t border-gray-100" />

                {/* Sign out */}
                <button
                  onClick={onLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition-all duration-200 hover:bg-red-50"
                >
                  <LogOut className="h-4.5 w-4.5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* ---- Main content ---- */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "purchases" && <PurchasesTab />}
                {activeTab === "profile" && <ProfileTab />}
                {activeTab === "settings" && <SettingsTab />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
      </div>
    );
  }

  // TODO: Connect to Firebase Auth - check auth state here
  if (!isLoggedIn) {
    return <AuthSection onLogin={() => setIsLoggedIn(true)} />;
  }

  return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
}
