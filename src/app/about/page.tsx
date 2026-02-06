"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Award,
  Users,
  Zap,
  Check,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Download,
  Star,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true, margin: "-50px" },
};

const staggerChild = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const values = [
  {
    icon: Award,
    title: "Quality First",
    description:
      "Every resource is meticulously researched, professionally designed, and packed with actionable content. We never compromise on quality.",
  },
  {
    icon: Users,
    title: "Customer Success",
    description:
      "Your success is our success. We provide comprehensive resources and support to ensure you achieve your financial goals.",
  },
  {
    icon: Zap,
    title: "Instant Value",
    description:
      "No waiting. All products are available for instant download so you can start your journey immediately.",
  },
];

const credentials = [
  "Real estate investment expert",
  "Published financial author",
  "Helped 2,000+ customers build wealth",
  "Specializes in actionable, practical guides",
];

const stats = [
  { value: "9+", label: "Products" },
  { value: "2,000+", label: "Downloads" },
  { value: "4.9", label: "Average Rating" },
  { value: "50+", label: "Templates in Emergency Binder" },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* ============================================================= */}
      {/*  HERO SECTION                                                  */}
      {/* ============================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Decorative glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-teal-500/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-orange-500/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-slate-400">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-white">About</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
              Rubi Digital Downloads
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-2xl text-lg text-slate-300"
          >
            Empowering financial literacy through comprehensive, actionable resources
          </motion.p>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  MISSION SECTION                                               */}
      {/* ============================================================= */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left - Decorative */}
            <motion.div {...fadeInUp} className="relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative stacked cards */}
                <div className="absolute -left-4 -top-4 h-full w-full rounded-2xl bg-teal-100/50 rotate-2" />
                <div className="absolute -right-4 -bottom-4 h-full w-full rounded-2xl bg-orange-100/50 -rotate-2" />
                <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-center shadow-xl">
                  <BookOpen className="mx-auto mb-6 h-16 w-16 text-teal-400" />
                  <p className="text-3xl font-bold text-white">Financial Literacy</p>
                  <p className="mt-2 text-lg text-slate-300">is the foundation of prosperity</p>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                      <p className="text-2xl font-bold text-white">9+</p>
                      <p className="text-xs text-slate-300">Workbooks</p>
                    </div>
                    <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                      <p className="text-2xl font-bold text-white">2K+</p>
                      <p className="text-xs text-slate-300">Customers</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div {...fadeInUp}>
              <span className="mb-3 inline-block rounded-full bg-teal-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700">
                Our Mission
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Making financial education accessible to everyone
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                We believe everyone deserves access to high-quality financial education. Rubi Digital Downloads
                creates comprehensive workbooks and guides that break down complex financial topics into
                actionable steps — from building generational wealth to buying your first home.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Founded on the principle that financial literacy is the foundation of prosperity, our resources
                are designed to be immediately useful, beautifully crafted, and accessible to everyone.
              </p>
              <Link
                href="/shop"
                className={cn(
                  "mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold",
                  "bg-slate-900 text-white shadow-sm",
                  "hover:bg-slate-800 transition-colors duration-200"
                )}
              >
                Explore Our Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  AUTHOR BIO SECTION                                            */}
      {/* ============================================================= */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left - Author photo placeholder */}
            <motion.div {...fadeInUp} className="flex justify-center lg:justify-start">
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-teal-200 to-emerald-200 opacity-60 blur-sm" />
                <div className="relative flex h-72 w-72 items-center justify-center rounded-full bg-gray-200 shadow-xl sm:h-80 sm:w-80">
                  <User className="h-24 w-24 text-gray-400" />
                </div>
                {/* Floating accent badge */}
                <div className="absolute -bottom-2 -right-2 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-gray-900">4.9 Rating</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Bio content */}
            <motion.div {...fadeInUp}>
              <span className="mb-3 inline-block rounded-full bg-slate-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Meet the Author
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                James Villarrubia
              </h2>
              <p className="mt-2 text-lg font-medium text-teal-700">
                Financial Educator &amp; Real Estate Expert
              </p>

              <p className="mt-6 text-base leading-relaxed text-gray-600">
                With years of experience in real estate investing and financial planning, James Villarrubia
                has dedicated his career to making financial education accessible to everyone. His workbooks
                combine practical expertise with actionable frameworks that readers can implement immediately.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                After helping hundreds of families navigate their financial journeys, James created the Rubi
                Digital Downloads series to reach an even wider audience. Each workbook is meticulously crafted
                with real-world strategies, proven templates, and step-by-step guidance.
              </p>

              {/* Credentials */}
              <ul className="mt-8 space-y-3">
                {credentials.map((credential) => (
                  <li key={credential} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal-100">
                      <Check className="h-3 w-3 text-teal-700" />
                    </span>
                    <span className="text-sm font-medium text-gray-700">{credential}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  VALUES SECTION                                                */}
      {/* ============================================================= */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-14 text-center">
            <span className="mb-3 inline-block rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
              What We Stand For
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
              Every decision we make is guided by these principles
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid gap-8 md:grid-cols-3"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  {...staggerChild}
                  className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 text-white transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">{value.title}</h3>
                  <p className="leading-relaxed text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  BY THE NUMBERS SECTION                                        */}
      {/* ============================================================= */}
      <section className="bg-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              By the Numbers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Trusted by thousands of customers on their financial journey
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-2 gap-6 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                {...staggerChild}
                className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 text-center backdrop-blur-sm sm:p-8"
              >
                <p className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  CTA SECTION                                                   */}
      {/* ============================================================= */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-16 text-center sm:px-16 sm:py-20">
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-teal-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-orange-500/15 blur-3xl" />

            <div className="relative">
              <motion.div {...fadeInUp}>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Ready to Start Your Financial Journey?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
                  Browse our collection of premium workbooks and guides designed to help you
                  build wealth, buy your first home, and achieve financial freedom.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="/shop"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold",
                      "bg-white text-slate-900 shadow-sm",
                      "hover:bg-gray-100 transition-colors duration-200"
                    )}
                  >
                    Explore Products
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold",
                      "border border-white/20 text-white",
                      "hover:bg-white/10 transition-colors duration-200"
                    )}
                  >
                    Get in Touch
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
