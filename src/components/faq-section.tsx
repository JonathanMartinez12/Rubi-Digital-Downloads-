"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What format are the digital downloads?",
    answer:
      "All our products are delivered in PDF format, with some including Excel spreadsheets and Word documents. They're compatible with all devices and can be viewed on computers, tablets, and smartphones.",
  },
  {
    question: "How do I access my purchase after buying?",
    answer:
      "Immediately after purchase, you'll receive an email with download links. You can also access all your purchases anytime from your account dashboard.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes! We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, contact us within 30 days for a full refund.",
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
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-teal-700"
      >
        <span className="text-base font-medium text-slate-900 pr-4">
          {question}
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 transition-colors group-hover:bg-teal-50">
          {isOpen ? (
            <Minus className="h-4 w-4 text-slate-600" />
          ) : (
            <Plus className="h-4 w-4 text-slate-600" />
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
            <p className="pb-5 text-slate-600 leading-relaxed pr-12">
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
    <section ref={ref} className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
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
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
