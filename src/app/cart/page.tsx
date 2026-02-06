"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Lock,
  CreditCard,
  Minus,
  Plus,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import CartSidebar from "@/components/cart-sidebar";
import Footer from "@/components/footer";

export default function CartPage() {
  const { items, removeItem, getSubtotal, getTotal, getItemCount } =
    useCartStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = mounted ? getSubtotal() : 0;
  const total = mounted ? getTotal() : 0;
  const itemCount = mounted ? getItemCount() : 0;

  // Get recommended products from categories not in the cart
  const cartCategories = items.map((item) => item.product.category);
  const recommendedProducts = products
    .filter((p) => !cartCategories.includes(p.category))
    .filter((p) => !items.some((item) => item.product.id === p.id))
    .slice(0, 3);

  // Fallback: if all categories are in cart, just show products not in cart
  const suggestedProducts =
    recommendedProducts.length > 0
      ? recommendedProducts
      : products
          .filter((p) => !items.some((item) => item.product.id === p.id))
          .slice(0, 3);

  // Bestsellers for empty cart state
  const bestsellers = products.filter((p) => p.bestseller || p.featured).slice(0, 4);

  if (!mounted) {
    return (
      <>
        <Navbar />
        <CartSidebar />
        <main className="min-h-screen bg-gray-50/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-48 rounded bg-gray-200" />
              <div className="h-64 rounded-2xl bg-gray-200" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <CartSidebar />
      <main className="min-h-screen bg-gray-50/50">
        {/* Breadcrumb */}
        <div className="border-b border-gray-200/60 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link
                href="/"
                className="hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Cart</span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Your Cart
              {itemCount > 0 && (
                <span className="ml-3 text-lg font-normal text-gray-400">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              )}
            </h1>
          </div>

          {items.length === 0 ? (
            /* ============ EMPTY CART STATE ============ */
            <div className="text-center py-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gray-100"
              >
                <ShoppingBag className="h-14 w-14 text-gray-300" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Looks like you haven&apos;t added anything to your cart yet.
                  Explore our collection of premium digital workbooks and
                  guides.
                </p>
                <Link
                  href="/shop"
                  className={cn(
                    "inline-flex items-center gap-2 px-8 py-3.5 rounded-xl",
                    "bg-slate-900 text-white font-semibold text-base",
                    "hover:bg-slate-800 transition-colors duration-200",
                    "shadow-lg shadow-slate-900/20"
                  )}
                >
                  Start Shopping
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* Bestsellers Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-20"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Browse Our Bestsellers
                </h3>
                <p className="text-gray-500 mb-8">
                  Start with our most popular digital downloads
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bestsellers.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            /* ============ CART WITH ITEMS ============ */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              {/* Main Area - Cart Items (2 cols) */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          x: -80,
                          height: 0,
                          marginBottom: 0,
                          paddingTop: 0,
                          paddingBottom: 0,
                          overflow: "hidden",
                        }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm"
                      >
                        <div className="flex gap-4 sm:gap-5">
                          {/* Product Image */}
                          <Link
                            href={`/shop/${item.product.slug}`}
                            className="relative w-20 h-[100px] flex-shrink-0 rounded-xl overflow-hidden bg-gray-100"
                          >
                            <Image
                              src={item.product.coverImage}
                              alt={item.product.name}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-105"
                              sizes="80px"
                            />
                          </Link>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <Link href={`/shop/${item.product.slug}`}>
                                  <h3 className="font-semibold text-gray-900 leading-snug hover:text-teal-700 transition-colors line-clamp-2">
                                    {item.product.name}
                                  </h3>
                                </Link>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                  <span className="inline-block text-xs font-medium text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
                                    {item.product.category}
                                  </span>
                                  {item.product.fileFormat.map((format) => (
                                    <span
                                      key={format}
                                      className="inline-block text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
                                    >
                                      {format}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Remove Button - Desktop */}
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="hidden sm:flex flex-shrink-0 p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                aria-label={`Remove ${item.product.name}`}
                              >
                                <Trash2 className="h-4.5 w-4.5" />
                              </button>
                            </div>

                            {/* Price + Remove (Mobile) */}
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-lg font-bold text-slate-900">
                                ${item.product.price.toFixed(2)}
                              </span>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="sm:hidden flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 transition-colors"
                                aria-label={`Remove ${item.product.name}`}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Continue Shopping Link */}
                <div className="mt-6">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Sidebar - Order Summary (1 col) */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Order Summary Card */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-5">
                      Order Summary
                    </h2>

                    {/* Item List */}
                    <div className="space-y-3 mb-5">
                      {items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-start justify-between gap-3"
                        >
                          <span className="text-sm text-gray-600 line-clamp-1 flex-1">
                            {item.product.name}
                          </span>
                          <span className="text-sm font-medium text-gray-900 flex-shrink-0">
                            ${item.product.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Separator */}
                    <div className="border-t border-gray-100 my-4" />

                    {/* Subtotal */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-sm font-medium text-gray-900">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Discount */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-400">Discount</span>
                      <span className="text-sm text-gray-400">$0.00</span>
                    </div>

                    {/* Separator */}
                    <div className="border-t border-gray-200 my-4" />

                    {/* Total */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xl font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        ${total.toFixed(2)}
                      </span>
                    </div>

                    {/* Checkout Button */}
                    <Link
                      href="/checkout"
                      className={cn(
                        "flex items-center justify-center gap-2 w-full",
                        "py-4 rounded-xl text-lg font-semibold",
                        "bg-orange-500 hover:bg-orange-600 text-white",
                        "transition-all duration-200 shadow-md shadow-orange-500/20",
                        "hover:shadow-lg hover:shadow-orange-500/30"
                      )}
                    >
                      Proceed to Checkout
                      <ArrowRight className="h-5 w-5" />
                    </Link>

                    {/* Continue Shopping Link */}
                    <Link
                      href="/shop"
                      className="block text-center text-sm text-gray-500 hover:text-gray-700 transition-colors mt-3"
                    >
                      or continue shopping
                    </Link>
                  </div>

                  {/* Trust Badges */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-50">
                        <Lock className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-600">
                        Secure checkout
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50">
                        <ShieldCheck className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-600">
                        30-day money-back guarantee
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50">
                        <CreditCard className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-sm text-gray-600">
                        Powered by Stripe
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Complete Your Collection */}
          {items.length > 0 && suggestedProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16 pt-12 border-t border-gray-200"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Complete Your Collection
                </h2>
                <p className="text-gray-500">
                  Explore more resources to complement your purchase
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
