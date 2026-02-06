"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Building2, Home, Shield, ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Wealth Building",
    description:
      "Master your financial future with comprehensive wealth-building strategies",
    icon: TrendingUp,
    href: "/shop?category=Wealth+Building",
    gradient: "from-teal-600 to-teal-800",
  },
  {
    name: "Real Estate",
    description:
      "Investment tools and analysis workbooks for aspiring property investors",
    icon: Building2,
    href: "/shop?category=Real+Estate",
    gradient: "from-blue-600 to-blue-800",
  },
  {
    name: "Homebuying",
    description:
      "Step-by-step guides from credit readiness to closing day",
    icon: Home,
    href: "/shop?category=Homebuying",
    gradient: "from-orange-500 to-orange-700",
  },
  {
    name: "Emergency Planning",
    description:
      "Complete family emergency binders and preparedness kits",
    icon: Shield,
    href: "/shop?category=Emergency+Planning",
    gradient: "from-amber-500 to-amber-700",
  },
];

export function CategoriesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Explore Our Collections
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
            >
              <Link
                href={category.href}
                className={`group block rounded-2xl bg-gradient-to-br ${category.gradient} p-8 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl h-full`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{category.name}</h3>
                <p className="mt-2 text-white/80 text-sm leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-6 flex items-center gap-1 text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                  Browse Collection
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
