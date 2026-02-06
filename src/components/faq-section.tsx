"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "What format are the digital downloads?",
    answer:
      "All our products are delivered in PDF format, with some including Excel spreadsheets and Word documents. They\u2019re compatible with all devices and can be viewed on computers, tablets, and smartphones.",
  },
  {
    question: "How do I access my purchase after buying?",
    answer:
      "Immediately after purchase, you\u2019ll receive an email with download links. You can also access all your purchases anytime from your account dashboard.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes! We offer a 30-day money-back guarantee. If you\u2019re not satisfied with your purchase, contact us within 30 days for a full refund.",
  },
  {
    question: "Can I print the workbooks?",
    answer:
      "All our workbooks and guides are designed to be both printable and fillable digitally. Print as many copies as you need for personal use.",
  },
  {
    question: "Who is James Villarrubia?",
    answer:
      "James Villarrubia is a financial educator and real estate expert who has helped thousands of individuals and families build wealth through comprehensive, actionable resources.",
  },
  {
    question: "Do you offer bundle discounts?",
    answer:
      "Yes! Check our shop page for bundle deals. Purchasing multiple products together can save you up to 30% compared to individual prices.",
  },
  {
    question: "How long do I have access to my downloads?",
    answer:
      "You have lifetime access to all your purchases. Download them as many times as you need, whenever you need them.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div className={`border border-gray-100 rounded-xl mb-3 transition-all duration-300 ${isOpen ? "bg-white shadow-md border-gray-200" : "bg-white/60 hover:bg-white hover:border-gray-200"}`}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-base font-medium text-slate-900 pr-4">
            {question}
          </span>
        </div>
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${isOpen ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}>
          {isOpen ? (
            <Minus className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-slate-500 leading-relaxed pl-[3.75rem]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-slate-50/30 relative">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-600 mb-4">
            <HelpCircle className="h-3.5 w-3.5" />
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-lg text-slate-500">
            Everything you need to know about our digital products
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageCircle className="h-5 w-5 text-teal-600" />
            <p className="text-sm font-semibold text-slate-900">
              Still have questions?
            </p>
          </div>
          <p className="text-sm text-slate-500">
            Contact our support team at{" "}
            <Link href="mailto:support@rubidigitaldownloads.com" className="text-teal-600 hover:text-teal-700 font-medium underline transition-colors">
              support@rubidigitaldownloads.com
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
