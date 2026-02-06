"use client";

import { motion } from "framer-motion";
import { Lock, Zap, ShieldCheck, Users, TrendingUp, CreditCard } from "lucide-react";

const badges = [
  { icon: Lock, label: "Bank-Level Security", sublabel: "256-bit SSL" },
  { icon: CreditCard, label: "Powered by Stripe", sublabel: "PCI compliant" },
  { icon: Zap, label: "Instant Delivery", sublabel: "< 30 seconds" },
  { icon: ShieldCheck, label: "30-Day Guarantee", sublabel: "Full refund" },
  { icon: TrendingUp, label: "Proven Results", sublabel: "4.9★ average" },
  { icon: Users, label: "2,000+ Customers", sublabel: "& growing" },
];

export function TrustBadges() {
  return (
    <section className="relative py-8 bg-[#070e1f] border-y border-white/[0.04] overflow-hidden">
      {/* Subtle gradient streak */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(13,148,136,0.04)_50%,transparent_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-2.5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.06]">
                <badge.icon className="h-4 w-4 text-amber-400/70" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/70">{badge.label}</p>
                <p className="text-[10px] text-white/30 uppercase tracking-wider">{badge.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
