"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "First-Time Homebuyer",
    rating: 5,
    quote:
      "The First-Time Homebuyer Workbook was invaluable. It walked me through every step from credit repair to closing. I felt confident and prepared throughout the entire process.",
    initials: "SM",
    color: "bg-teal-100 text-teal-700",
  },
  {
    name: "Marcus J.",
    role: "Real Estate Investor",
    rating: 5,
    quote:
      "The House Hacking Workbook helped me analyze my first duplex purchase. The ROI calculators and tenant screening templates saved me hours of work.",
    initials: "MJ",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Lisa T.",
    role: "Financial Planner",
    rating: 5,
    quote:
      "I recommend the Generational Wealth series to all my clients. The workbooks are comprehensive, actionable, and beautifully designed.",
    initials: "LT",
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "David R.",
    role: "New Homeowner",
    rating: 5,
    quote:
      "The Emergency Home Binder is a must-have. Having all our important documents organized in one place gives us incredible peace of mind.",
    initials: "DR",
    color: "bg-amber-100 text-amber-700",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
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
            What Our Customers Say
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              {/* Star Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Quote */}
              <p className="mt-4 text-slate-600 italic leading-relaxed flex-1 text-sm">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${testimonial.color}`}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
