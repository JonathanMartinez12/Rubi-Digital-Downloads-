"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Lock,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Zap,
  CheckCircle,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, getSubtotal, getTotal, getItemCount } = useCartStore();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to cart if empty (after mount)
  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push("/cart");
    }
  }, [mounted, items.length, router]);

  const subtotal = mounted ? getSubtotal() : 0;
  const total = mounted ? getTotal() : 0;
  const itemCount = mounted ? getItemCount() : 0;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsProcessing(true);

    try {
      // Check if Stripe is configured
      const isStripeConfigured = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

      if (isStripeConfigured) {
        // Production: Use Stripe Checkout
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((item) => ({
              id: item.product.id,
              name: item.product.name,
              price: item.product.price,
              coverImage: item.product.coverImage,
            })),
            email: email.trim(),
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Something went wrong.");
        }
        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error("No checkout URL returned.");
        }
      } else {
        // Demo mode: Simulate checkout and redirect to success
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push(`/success?session_id=demo_${Date.now()}`);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
      setIsProcessing(false);
    }
  };

  if (!mounted || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="animate-pulse space-y-4 text-center">
          <div className="h-8 w-48 rounded bg-gray-200 mx-auto" />
          <div className="h-4 w-32 rounded bg-gray-200 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Minimal Header */}
      <header className="bg-white border-b border-gray-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="group flex items-center gap-1 select-none">
            <span className="text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-rose-600">
              RUBI
            </span>
            <span className="hidden text-sm font-light tracking-wide text-gray-500 sm:inline">
              Digital Downloads
            </span>
          </Link>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Lock className="h-4 w-4 text-green-600" />
            <span className="hidden sm:inline">Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Link */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Checkout Form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

            <form onSubmit={handleCheckout} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter your email for receipt and download links"
                  required
                  disabled={isProcessing}
                  className={cn(
                    "w-full px-4 py-3.5 rounded-xl border bg-white text-gray-900 text-base",
                    "placeholder:text-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500",
                    "transition-colors duration-200",
                    "disabled:opacity-60 disabled:cursor-not-allowed",
                    error
                      ? "border-red-300 focus:ring-red-500/40 focus:border-red-500"
                      : "border-gray-200"
                  )}
                />
                <p className="mt-2 text-xs text-gray-400">
                  We&apos;ll send your receipt and download links to this email.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100"
                >
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">{error}</p>
                    <p className="text-xs text-red-600 mt-1">
                      If the problem persists, please contact our support team.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Terms */}
              <p className="text-xs text-gray-400 leading-relaxed">
                By completing this purchase, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-gray-600 underline hover:text-gray-900 transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-gray-600 underline hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </Link>
                . All digital products are delivered instantly via download
                link.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={cn(
                  "w-full flex items-center justify-center gap-2.5",
                  "py-4 rounded-xl text-lg font-semibold",
                  "transition-all duration-200",
                  "disabled:cursor-not-allowed",
                  isProcessing
                    ? "bg-orange-400 text-white/90"
                    : "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30"
                )}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Complete Purchase - ${total.toFixed(2)}
                  </>
                )}
              </button>
            </form>

            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-gray-200/60">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-50">
                    <ShieldCheck className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Stripe Secured
                    </p>
                    <p className="text-xs text-gray-400">PCI compliant</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-50">
                    <Lock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      256-bit SSL
                    </p>
                    <p className="text-xs text-gray-400">Encrypted checkout</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50">
                    <Zap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Instant Delivery
                    </p>
                    <p className="text-xs text-gray-400">
                      Download immediately
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Order Summary (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-24 space-y-6">
              {/* Order Summary Card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-5">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-start gap-3"
                    >
                      <div className="relative w-14 h-[72px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.product.coverImage}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.product.fileFormat.join(" + ")} download
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 flex-shrink-0">
                        ${item.product.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Separator */}
                <div className="border-t border-gray-100 my-4" />

                {/* Subtotal */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Separator */}
                <div className="border-t border-gray-200 my-4" />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Money-Back Guarantee */}
              <div className="bg-green-50 rounded-2xl border border-green-100 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-green-900">
                      30-Day Money-Back Guarantee
                    </h4>
                    <p className="text-xs text-green-700 mt-1 leading-relaxed">
                      Not satisfied? Get a full refund within 30 days, no
                      questions asked.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
