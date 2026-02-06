"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/product-card";

export function FeaturedProducts() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Our most popular financial workbooks and guides
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
