"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Send } from "lucide-react";

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
    <section ref={ref} className="py-20 sm:py-28 bg-slate-900">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Get Free Financial Tips & Updates
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join our community and receive exclusive insights, tips, and early
            access to new products.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          {subscribed ? (
            <div className="rounded-xl bg-teal-500/20 border border-teal-500/30 px-6 py-4 text-teal-300 font-medium">
              Thanks for subscribing! Check your inbox for a welcome message.
            </div>
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
                className="flex-1 rounded-xl bg-white/10 border border-white/20 px-5 py-3.5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-colors"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-lg shadow-orange-500/20"
              >
                Subscribe
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}

          <p className="mt-4 text-sm text-slate-400">
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
