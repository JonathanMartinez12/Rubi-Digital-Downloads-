"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Download,
  BookOpen,
  Users,
  ShoppingBag,
  ArrowRight,
  Mail,
  Clock,
  FileText,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessPageContent() {
  const { items, clearCart } = useCartStore();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [mounted, setMounted] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState<typeof items>([]);
  const hasCleared = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Capture cart items and clear the cart on mount
  useEffect(() => {
    if (mounted && !hasCleared.current) {
      // Save current cart items before clearing
      if (items.length > 0) {
        setPurchasedItems([...items]);
      }
      hasCleared.current = true;
      clearCart();
    }
  }, [mounted, items, clearCart]);

  // Derive a confirmation number from session_id
  const confirmationNumber = sessionId
    ? `RBD-${sessionId.slice(-8).toUpperCase()}`
    : `RBD-${Date.now().toString(36).toUpperCase()}`;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="animate-pulse space-y-4 text-center">
          <div className="h-20 w-20 rounded-full bg-gray-200 mx-auto" />
          <div className="h-8 w-64 rounded bg-gray-200 mx-auto" />
          <div className="h-4 w-48 rounded bg-gray-200 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Minimal Header */}
      <header className="bg-white border-b border-gray-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center h-16">
          <Link href="/" className="group flex items-center gap-1 select-none">
            <span className="text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-rose-600">
              RUBI
            </span>
            <span className="hidden text-sm font-light tracking-wide text-gray-500 sm:inline">
              Digital Downloads
            </span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Success Animation */}
        <div className="text-center mb-12">
          {/* Animated Check Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.1,
            }}
            className="mx-auto mb-6 relative"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 12,
                delay: 0.1,
              }}
              className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.35,
                }}
              >
                <CheckCircle className="h-12 w-12 text-green-600" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            {/* Celebration rings */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: "easeOut",
              }}
              className="absolute inset-0 mx-auto w-24 h-24 rounded-full border-2 border-green-300"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: "easeOut",
              }}
              className="absolute inset-0 mx-auto w-24 h-24 rounded-full border-2 border-green-200"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Thank You for Your Purchase!
            </h1>
            <p className="text-gray-500 text-lg mb-4">
              Your order has been confirmed
            </p>

            {/* Confirmation Number */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-sm">
              <span className="text-gray-500">Order</span>
              <span className="font-mono font-semibold text-gray-900">
                {confirmationNumber}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500"
          >
            <Mail className="h-4 w-4" />
            <span>
              A confirmation email with your download links has been sent to your
              email.
            </span>
          </motion.div>
        </div>

        {/* Downloads Section */}
        {purchasedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-50">
                <Download className="h-5 w-5 text-teal-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Your Downloads
              </h2>
            </div>

            <div className="space-y-4">
              {purchasedItems.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative w-12 h-[60px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                      <Image
                        src={item.product.coverImage}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        {item.product.fileFormat.map((format) => (
                          <span
                            key={format}
                            className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200"
                          >
                            <FileText className="h-3 w-3" />
                            {format}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <button
                      className={cn(
                        "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg",
                        "bg-teal-600 hover:bg-teal-700 text-white",
                        "text-sm font-semibold",
                        "transition-all duration-200",
                        "shadow-sm hover:shadow-md"
                      )}
                    >
                      <Download className="h-4 w-4" />
                      Download Now
                    </button>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      Download link expires in 7 days
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Re-download Note */}
            <div className="mt-5 pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                You can always re-download your purchases from your{" "}
                <Link
                  href="/account"
                  className="text-teal-600 hover:text-teal-700 underline transition-colors"
                >
                  account page
                </Link>
                .
              </p>
            </div>
          </motion.div>
        )}

        {/* What's Next Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
            What&apos;s Next?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1 - Get Started */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-50">
                <BookOpen className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Get Started
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Open your workbook and begin your journey toward financial
                success.
              </p>
            </div>

            {/* Card 2 - Join Community */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-50">
                <Users className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Join Our Community
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Get tips, share wins, and connect with other Rubi customers on
                their journey.
              </p>
            </div>

            {/* Card 3 - Explore More */}
            <Link
              href="/shop"
              className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200 group"
            >
              <div className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-50">
                <ShoppingBag className="h-7 w-7 text-teal-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                Explore More
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Browse our other financial resources to complete your
                collection.
              </p>
            </Link>
          </div>
        </motion.div>

        {/* Continue Shopping Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="text-center"
        >
          <Link
            href="/shop"
            className={cn(
              "inline-flex items-center gap-2 px-8 py-3.5 rounded-xl",
              "bg-slate-900 text-white font-semibold text-base",
              "hover:bg-slate-800 transition-colors duration-200",
              "shadow-lg shadow-slate-900/20"
            )}
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </main>

      {/* Simple Footer */}
      <footer className="mt-12 border-t border-gray-200/60 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2026 Rubi Digital Downloads. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
          <div className="animate-pulse space-y-4 text-center">
            <div className="h-20 w-20 rounded-full bg-gray-200 mx-auto" />
            <div className="h-8 w-64 rounded bg-gray-200 mx-auto" />
            <div className="h-4 w-48 rounded bg-gray-200 mx-auto" />
          </div>
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  );
}
