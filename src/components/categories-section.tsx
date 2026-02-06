"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  TrendingUp,
  Building2,
  Home,
  Shield,
  ArrowRight,
  DollarSign,
  BarChart3,
  Key,
  FileCheck,
} from "lucide-react";

const categories = [
  {
    name: "Wealth Building",
    description:
      "Master your financial future with strategic wealth-building frameworks and actionable planning tools",
    icon: TrendingUp,
    decorIcon: DollarSign,
    href: "/shop?category=Wealth+Building",
    bg: "bg-gradient-to-br from-[#0a2e2b] to-[#0f4a3f]",
    borderColor: "border-emerald-500/20",
    accentColor: "text-emerald-400",
    iconBg: "bg-emerald-500/15",
    products: "3 workbooks",
    tag: "Most Popular",
  },
  {
    name: "Real Estate",
    description:
      "Investment analysis workbooks, landlording guides, and ROI calculators for property investors",
    icon: Building2,
    decorIcon: BarChart3,
    href: "/shop?category=Real+Estate",
    bg: "bg-gradient-to-br from-[#0d1b3a] to-[#162a56]",
    borderColor: "border-blue-500/20",
    accentColor: "text-blue-400",
    iconBg: "bg-blue-500/15",
    products: "2 workbooks",
    tag: "For Investors",
  },
  {
    name: "Homebuying",
    description:
      "Step-by-step guides from credit readiness to closing day — 42+ premium templates included",
    icon: Home,
    decorIcon: Key,
    href: "/shop?category=Homebuying",
    bg: "bg-gradient-to-br from-[#2a1a0a] to-[#3d2814]",
    borderColor: "border-orange-500/20",
    accentColor: "text-orange-400",
    iconBg: "bg-orange-500/15",
    products: "3 guides",
    tag: "Bestseller",
  },
  {
    name: "Emergency Planning",
    description:
      "Complete family emergency binders with 50+ essential documents — printable & editable",
    icon: Shield,
    decorIcon: FileCheck,
    href: "/shop?category=Emergency+Planning",
    bg: "bg-gradient-to-br from-[#2a2208] to-[#3d3310]",
    borderColor: "border-amber-500/20",
    accentColor: "text-amber-400",
    iconBg: "bg-amber-500/15",
    products: "1 binder",
    tag: "Essential",
  },
];

export function CategoriesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-slate-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-teal-50/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white/80 mb-4">
            <BarChart3 className="h-3.5 w-3.5 text-amber-400" />
            Browse by Category
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Explore Our Collections
          </h2>
          <p className="mt-3 text-lg text-slate-500 max-w-xl mx-auto">
            Expertly crafted resources for every stage of your financial journey
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              <Link
                href={category.href}
                className={`group relative block rounded-2xl ${category.bg} border ${category.borderColor} p-7 sm:p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl h-full overflow-hidden`}
              >
                {/* Decorative background icon */}
                <category.decorIcon className="absolute -right-4 -bottom-4 h-32 w-32 text-white/[0.03] rotate-12" />

                {/* Tag */}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider ${category.accentColor} bg-white/[0.06] border border-white/[0.06] mb-5`}>
                  {category.tag}
                </span>

                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${category.iconBg} backdrop-blur-sm`}>
                    <category.icon className={`h-6 w-6 ${category.accentColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    <p className="mt-1.5 text-white/50 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-medium text-white/30 uppercase tracking-wider">
                    {category.products}
                  </span>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${category.accentColor} group-hover:gap-2 transition-all duration-300`}>
                    Browse
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
