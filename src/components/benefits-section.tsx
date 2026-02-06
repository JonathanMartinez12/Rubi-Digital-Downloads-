"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, BookOpen, RefreshCw } from "lucide-react";

const benefits = [
  {
    icon: Download,
    title: "Instant Download",
    description:
      "Get immediate access to your workbooks and guides. No waiting, no shipping — start building wealth today.",
  },
  {
    icon: BookOpen,
    title: "Expert Author",
    description:
      "Created by James Villarrubia with years of real estate and financial planning expertise.",
  },
  {
    icon: RefreshCw,
    title: "Lifetime Access",
    description:
      "Download your purchases anytime, anywhere. Your resources are always available when you need them.",
  },
];

export function BenefitsSection() {
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
            Why Choose Rubi Digital Downloads
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50">
                <benefit.icon className="h-7 w-7 text-teal-600" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                {benefit.title}
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
