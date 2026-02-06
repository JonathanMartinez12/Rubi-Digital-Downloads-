"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, getSubtotal, getItemCount } =
    useCartStore();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={closeCart}
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Cart
                </h2>
                {itemCount > 0 && (
                  <span className="inline-flex items-center justify-center h-6 min-w-[1.5rem] px-1.5 rounded-full bg-orange-500 text-white text-xs font-bold">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Content */}
            {items.length === 0 ? (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="h-10 w-10 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Explore our collection of digital downloads and start building
                  your toolkit.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-lg",
                    "bg-slate-900 text-white font-medium text-sm",
                    "hover:bg-slate-800 transition-colors"
                  )}
                >
                  Start Shopping
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                {/* Scrollable Items List */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="mb-4"
                      >
                        <div className="flex gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
                          {/* Product Image */}
                          <div className="relative w-16 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-200">
                            <Image
                              src={item.product.coverImage}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/shop/${item.product.slug}`}
                              onClick={closeCart}
                              className="block"
                            >
                              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug hover:text-teal-700 transition-colors">
                                {item.product.name}
                              </h4>
                            </Link>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {item.product.category}
                            </p>
                            <p className="text-sm font-semibold text-slate-900 mt-1">
                              ${item.product.price.toFixed(2)}
                            </p>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="flex-shrink-0 self-start p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            aria-label={`Remove ${item.product.name} from cart`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 bg-white px-6 py-5 space-y-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-lg font-bold text-slate-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className={cn(
                      "flex items-center justify-center gap-2 w-full",
                      "py-3.5 rounded-lg text-base font-semibold",
                      "bg-orange-500 hover:bg-orange-600 text-white",
                      "transition-colors duration-200 shadow-sm"
                    )}
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  {/* Continue Shopping */}
                  <button
                    onClick={closeCart}
                    className="block w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Continue Shopping
                  </button>

                  {/* Trust Badges */}
                  <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-gray-100">
                    <ShieldCheck className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-xs text-gray-400">
                      Secure checkout powered by Stripe
                    </span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
