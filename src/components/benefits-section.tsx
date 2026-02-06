"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Download,
  BookOpen,
  RefreshCw,
  DollarSign,
  BarChart3,
  PiggyBank,
} from "lucide-react";

const benefits = [
  {
    icon: Download,
    title: "Instant Download",
    description:
      "Get immediate access to your workbooks and guides. No waiting, no shipping — start building wealth today.",
    accent: "from-teal-500 to-emerald-600",
    bgGlow: "bg-teal-500/10",
    metric: "< 30 sec",
    metricLabel: "delivery time",
  },
  {
    icon: BookOpen,
    title: "Expert Author",
    description:
      "Created by James Villarrubia with years of real estate and financial planning expertise.",
    accent: "from-orange-500 to-amber-600",
    bgGlow: "bg-orange-500/10",
    metric: "2,000+",
    metricLabel: "customers helped",
  },
  {
    icon: RefreshCw,
    title: "Lifetime Access",
    description:
      "Download your purchases anytime, anywhere. Your resources are always available when you need them.",
    accent: "from-blue-500 to-indigo-600",
    bgGlow: "bg-blue-500/10",
    metric: "Forever",
    metricLabel: "access period",
  },
];

const miniStats = [
  { icon: DollarSign, value: "$29.99", label: "Starting from" },
  { icon: BarChart3, value: "42+", label: "Templates per book" },
  { icon: PiggyBank, value: "30 Day", label: "Money-back guarantee" },
];

export function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-slate-50/50 relative overflow-hidden">
      {/* Subtle finance-themed background decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 right-[10%] w-64 h-64 rounded-full bg-teal-100/30 blur-3xl" />
        <div className="absolute bottom-10 left-[5%] w-72 h-72 rounded-full bg-amber-100/20 blur-3xl" />
        {/* Faint chart line decoration */}
        <svg className="absolute bottom-0 left-0 right-0 w-full h-40 opacity-[0.04]" viewBox="0 0 1200 160" preserveAspectRatio="none">
          <path d="M0,120 Q200,100 400,80 T800,40 T1200,60" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-600" />
          <path d="M0,140 Q300,110 600,90 T1200,50" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-500" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-4 py-1.5 text-sm font-medium text-teal-700 mb-4">
            <BarChart3 className="h-3.5 w-3.5" />
            Why Customers Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Built for Your Financial Success
          </h2>
          <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
            Every resource is designed with one goal — to give you the tools and confidence to take control of your finances.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
              className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient glow on hover */}
              <div className={`absolute inset-0 rounded-2xl ${benefit.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative">
                {/* Icon with gradient background */}
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${benefit.accent} shadow-lg`}>
                  <benefit.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-slate-500 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Finance metric chip */}
                <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-lg font-bold text-slate-900">{benefit.metric}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">{benefit.metricLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-6 px-8 rounded-2xl bg-white border border-gray-100 shadow-sm"
        >
          {miniStats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-3">
              {i > 0 && <div className="hidden sm:block h-8 w-px bg-gray-200 -ml-3 sm:-ml-5 mr-0 sm:mr-1" />}
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-slate-800 to-slate-900">
                <stat.icon className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
