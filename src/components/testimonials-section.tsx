"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, BadgeCheck, TrendingUp } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "First-Time Homebuyer",
    product: "Homebuyer Workbook Vol 1",
    rating: 5,
    quote:
      "The First-Time Homebuyer Workbook was invaluable. It walked me through every step from credit repair to closing. I felt confident and prepared throughout the entire process.",
    initials: "SM",
    gradientFrom: "from-teal-500",
    gradientTo: "to-emerald-600",
    highlight: "Closed on my first home in 4 months",
  },
  {
    name: "Marcus J.",
    role: "Real Estate Investor",
    product: "House Hacking Workbook",
    rating: 5,
    quote:
      "The House Hacking Workbook helped me analyze my first duplex purchase. The ROI calculators and tenant screening templates saved me hours of work.",
    initials: "MJ",
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600",
    highlight: "Generating $1,400/mo in rental income",
  },
  {
    name: "Lisa T.",
    role: "Financial Planner",
    product: "Generational Wealth Series",
    rating: 5,
    quote:
      "I recommend the Generational Wealth series to all my clients. The workbooks are comprehensive, actionable, and beautifully designed.",
    initials: "LT",
    gradientFrom: "from-orange-500",
    gradientTo: "to-amber-600",
    highlight: "Recommended to 50+ clients",
  },
  {
    name: "David R.",
    role: "New Homeowner",
    product: "Emergency Home Binder",
    rating: 5,
    quote:
      "The Emergency Home Binder is a must-have. Having all our important documents organized in one place gives us incredible peace of mind.",
    initials: "DR",
    gradientFrom: "from-amber-500",
    gradientTo: "to-yellow-600",
    highlight: "50+ documents organized instantly",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-[5%] w-72 h-72 rounded-full bg-orange-50/60 blur-3xl" />
        <div className="absolute bottom-20 right-[5%] w-64 h-64 rounded-full bg-teal-50/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-100 px-4 py-1.5 text-sm font-medium text-amber-700 mb-4">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            Customer Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Real Results from Real Customers
          </h2>
          <p className="mt-3 text-lg text-slate-500 max-w-xl mx-auto">
            See how our workbooks have helped thousands achieve their financial goals
          </p>

          {/* Rating summary */}
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900 text-white">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-semibold">4.9 out of 5</span>
            <span className="text-white/40">|</span>
            <span className="text-sm text-white/60">1,600+ reviews</span>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-200"
            >
              {/* Top row: stars + product tag */}
              <div className="flex items-center justify-between mb-4">
                <StarRating rating={testimonial.rating} />
                <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">
                  {testimonial.product}
                </span>
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote className="absolute -top-1 -left-1 h-6 w-6 text-slate-100" />
                <p className="text-slate-600 leading-relaxed pl-5">
                  {testimonial.quote}
                </p>
              </div>

              {/* Highlight result */}
              <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-100">
                <TrendingUp className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span className="text-sm font-semibold text-emerald-800">
                  {testimonial.highlight}
                </span>
              </div>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradientFrom} ${testimonial.gradientTo} text-white text-sm font-bold shadow-sm`}>
                  {testimonial.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-slate-900">
                      {testimonial.name}
                    </p>
                    <BadgeCheck className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-xs text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
