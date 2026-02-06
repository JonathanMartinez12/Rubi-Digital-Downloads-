"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Star, Users } from "lucide-react";

const stats = [
  { label: "Products", value: "9+", icon: Download },
  { label: "Downloads", value: "2,000+", icon: Users },
  { label: "Average Rating", value: "4.9\u2605", icon: Star },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-[10%] h-72 w-72 rounded-full bg-teal-200/20 blur-3xl" />
        <div className="absolute bottom-32 right-[15%] h-96 w-96 rounded-full bg-orange-100/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-slate-100/50 blur-3xl" />
        <div className="absolute top-40 right-[25%] h-20 w-20 rounded-2xl bg-teal-100/40 blur-xl rotate-12" />
        <div className="absolute bottom-48 left-[20%] h-16 w-16 rounded-full bg-amber-100/50 blur-lg" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-700 mb-8">
              <Download className="h-3.5 w-3.5" />
              Instant Digital Downloads
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 max-w-4xl"
          >
            Build Wealth with{" "}
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
              Confidence
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-xl text-slate-600 max-w-2xl leading-relaxed"
          >
            Comprehensive workbooks and guides for real estate investing,
            homebuying, and wealth building — crafted by James Villarrubia
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-slate-900/20 transition-all duration-200 hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5"
            >
              Browse Products
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/shop/emergency-home-binder-instant-download"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5"
            >
              View Emergency Binder
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-3">
                {index > 0 && (
                  <div className="hidden sm:block h-8 w-px bg-slate-200 -ml-4 sm:-ml-6 mr-1 sm:mr-2" />
                )}
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                  <stat.icon className="h-5 w-5 text-slate-600" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
