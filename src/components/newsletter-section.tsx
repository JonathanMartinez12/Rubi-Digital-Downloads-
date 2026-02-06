"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Send, TrendingUp, BookOpen, DollarSign, CheckCircle } from "lucide-react";

export function NewsletterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    console.log("Newsletter subscription:", email);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-[#060d1f]" />

      {/* Decorative gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(249,115,22,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(13,148,136,0.06)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.05)_0%,transparent_60%)]" />
      </div>

      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Finance icons row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          {[TrendingUp, BookOpen, DollarSign].map((Icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1, type: "spring" }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.06]"
            >
              <Icon className="h-5 w-5 text-amber-400/60" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            <span className="text-white">Get Free </span>
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Financial Tips
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/40 max-w-xl mx-auto leading-relaxed">
            Join 2,000+ subscribers who receive exclusive wealth-building insights, investment strategies, and early access to new products.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          {subscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-6 py-4 max-w-md mx-auto"
            >
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <span className="text-emerald-300 font-medium">Thanks for subscribing! Check your inbox.</span>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-xl bg-white/[0.06] border border-white/[0.08] px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/30 transition-colors backdrop-blur-sm"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5"
              >
                Subscribe
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </form>
          )}

          <p className="mt-4 text-sm text-white/20">
            No spam, ever. Unsubscribe anytime. Your data is secure.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
