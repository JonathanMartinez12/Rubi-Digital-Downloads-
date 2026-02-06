"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Star,
  Users,
  TrendingUp,
  Shield,
  Sparkles,
} from "lucide-react";

const stats = [
  { label: "Products", value: "9+", icon: Download },
  { label: "Downloads", value: "2,000+", icon: Users },
  { label: "Avg Rating", value: "4.9★", icon: Star },
];

const floatingCards = [
  { label: "Wealth Building", icon: TrendingUp, x: "8%", y: "18%", delay: 0.8, rotate: -6 },
  { label: "Real Estate", icon: Shield, x: "82%", y: "22%", delay: 1.0, rotate: 6 },
  { label: "Homebuying", icon: Sparkles, x: "5%", y: "68%", delay: 1.2, rotate: -4 },
  { label: "Emergency Kit", icon: Download, x: "85%", y: "65%", delay: 1.4, rotate: 5 },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* ── Rich dark gradient background ── */}
      <div className="absolute inset-0 bg-[#060d1f]" />

      {/* Layered radial gradients for depth */}
      <div className="absolute inset-0">
        {/* Deep teal center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.15)_0%,transparent_70%)]" />
        {/* Warm amber top-right accent */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.1)_0%,transparent_60%)]" />
        {/* Cool blue bottom-left accent */}
        <div className="absolute -bottom-48 -left-48 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_60%)]" />
        {/* Subtle orange top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(249,115,22,0.06)_0%,transparent_70%)]" />
      </div>

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated floating orbs */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[12%] w-3 h-3 rounded-full bg-teal-400/30 blur-sm"
      />
      <motion.div
        animate={{ y: [15, -15, 15], x: [8, -8, 8] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[35%] right-[18%] w-2 h-2 rounded-full bg-amber-400/25 blur-sm"
      />
      <motion.div
        animate={{ y: [-12, 18, -12] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[25%] left-[20%] w-2.5 h-2.5 rounded-full bg-orange-400/20 blur-sm"
      />
      <motion.div
        animate={{ y: [10, -20, 10], x: [-5, 12, -5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[60%] right-[10%] w-2 h-2 rounded-full bg-blue-400/20 blur-sm"
      />

      {/* Floating category cards (desktop only) */}
      {floatingCards.map((card) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: card.delay, ease: "easeOut" }}
          style={{ left: card.x, top: card.y, rotate: card.rotate }}
          className="absolute hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/[0.06] shadow-lg shadow-black/20"
        >
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2.5"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-600/10">
              <card.icon className="h-4 w-4 text-teal-400" />
            </div>
            <span className="text-sm font-medium text-white/60">{card.label}</span>
          </motion.div>
        </motion.div>
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="flex flex-col items-center">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm px-5 py-2 text-sm font-medium text-white/70 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Trusted by 2,000+ customers
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl leading-[0.95]"
          >
            <span className="text-white">Master Your</span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Financial Future
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="mt-7 text-lg sm:text-xl text-white/50 max-w-2xl leading-relaxed"
          >
            Premium workbooks and guides for{" "}
            <span className="text-white/75">real estate investing</span>,{" "}
            <span className="text-white/75">homebuying</span>, and{" "}
            <span className="text-white/75">generational wealth</span>{" "}
            — by James Villarrubia
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="/shop"
              className="group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative flex items-center gap-2.5">
                Browse Products
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              href="/shop/emergency-home-binder-instant-download"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white/80 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/25 hover:text-white hover:-translate-y-0.5"
            >
              View Emergency Binder
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-10"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-3">
                {index > 0 && (
                  <div className="hidden sm:block h-8 w-px bg-white/10 -ml-4 sm:-ml-5 mr-1 sm:mr-2" />
                )}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.06]">
                  <stat.icon className="h-5 w-5 text-amber-400/80" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-white/40">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs font-medium tracking-widest uppercase text-white/25">
                Scroll to explore
              </span>
              <div className="w-5 h-8 rounded-full border-2 border-white/15 flex items-start justify-center pt-1.5">
                <motion.div
                  animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-1.5 rounded-full bg-white/40"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade into page content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
