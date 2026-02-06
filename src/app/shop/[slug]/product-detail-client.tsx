"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Download,
  Clock,
  ArrowLeft,
  Check,
  ChevronRight,
  ChevronDown,
  Heart,
  Share2,
  BookOpen,
  Users,
  FileText,
  Award,
} from "lucide-react";
import { Product } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import ProductCard from "@/components/product-card";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
  frequentlyBoughtTogether: Product[];
}

// ---------------------------------------------------------------------------
// Mock review data factory
// ---------------------------------------------------------------------------
function getMockReviews(product: Product) {
  return [
    {
      id: 1,
      name: "Monique T.",
      initials: "MT",
      date: "January 12, 2026",
      rating: 5,
      comment: `This ${product.name.toLowerCase().includes("workbook") ? "workbook" : "product"} exceeded every expectation. The templates are beautifully designed and incredibly practical. I started implementing the strategies the same day I downloaded it.`,
      verified: true,
    },
    {
      id: 2,
      name: "David R.",
      initials: "DR",
      date: "December 28, 2025",
      rating: 5,
      comment:
        "Worth every penny and then some. The level of detail and thought that went into this is clear from the first page. I have recommended it to everyone in my circle.",
      verified: true,
    },
    {
      id: 3,
      name: "Jasmine K.",
      initials: "JK",
      date: "November 15, 2025",
      rating: 4,
      comment:
        "Very comprehensive and easy to follow. The step-by-step approach makes what can feel overwhelming much more manageable. The only reason for 4 stars is I wish there were even more examples.",
      verified: true,
    },
    {
      id: 4,
      name: "Marcus W.",
      initials: "MW",
      date: "October 5, 2025",
      rating: 5,
      comment:
        "I have purchased several digital products in this space, and this one stands head and shoulders above the rest. The quality of the content is exceptional, and the templates save so much time.",
      verified: true,
    },
  ];
}

// ---------------------------------------------------------------------------
// Learning outcomes based on category
// ---------------------------------------------------------------------------
function getLearningOutcomes(product: Product): string[] {
  const base: Record<string, string[]> = {
    "Wealth Building": [
      "How to create a personalized wealth-building roadmap tailored to your income and goals",
      "Proven strategies for diversifying your income streams and investments",
      "Step-by-step budgeting frameworks that actually stick long-term",
      "How to identify and eliminate hidden financial leaks draining your wealth",
      "Techniques for building an emergency fund while still investing for the future",
      "The psychology of wealth and how to develop an abundance mindset",
    ],
    "Real Estate": [
      "How to evaluate rental properties and calculate true ROI before purchasing",
      "Strategies for financing your first investment property with minimal capital",
      "Tenant screening best practices to minimize vacancy and maximize returns",
      "Cash flow analysis techniques used by professional real estate investors",
      "Legal essentials every landlord must know to protect their investment",
      "How to scale from one property to a profitable real estate portfolio",
    ],
    Homebuying: [
      "How to determine exactly how much home you can afford without overextending",
      "Step-by-step credit repair strategies to qualify for the best mortgage rates",
      "The complete home search and offer process demystified",
      "How to navigate inspections, appraisals, and closing with confidence",
      "Money-saving negotiation tactics that can save you thousands at closing",
      "Post-purchase planning to protect and grow your home investment",
    ],
    "Emergency Planning": [
      "How to create a comprehensive emergency action plan for your household",
      "Essential documents every family needs organized and accessible",
      "Financial record-keeping systems that save time and reduce stress",
      "Insurance coverage review framework to ensure you are fully protected",
      "Digital and physical backup strategies for critical information",
      "Seasonal maintenance schedules to prevent costly home emergencies",
    ],
  };
  return base[product.category] || base["Wealth Building"];
}

// ---------------------------------------------------------------------------
// Target audience based on category
// ---------------------------------------------------------------------------
function getTargetAudience(product: Product): string[] {
  const base: Record<string, string[]> = {
    "Wealth Building": [
      "Anyone ready to take control of their financial future and build lasting wealth",
      "Young professionals looking to start their wealth-building journey the right way",
      "Parents who want to create generational wealth for their families",
      "People who feel overwhelmed by personal finance and want a clear, actionable plan",
      "Side hustlers and entrepreneurs looking to optimize their income",
    ],
    "Real Estate": [
      "Aspiring real estate investors looking for a structured entry into the market",
      "Current homeowners interested in house hacking or rental income",
      "Anyone who wants to build passive income through property investment",
      "Small landlords looking to professionalize their operations",
      "People exploring real estate as a path to financial independence",
    ],
    Homebuying: [
      "First-time homebuyers who want a stress-free path to homeownership",
      "Renters who are ready to transition from renting to owning",
      "Couples and families planning to purchase their first home within 1-2 years",
      "Anyone who has been turned down for a mortgage and wants to improve their credit",
      "New homeowners navigating the first year of homeownership",
    ],
    "Emergency Planning": [
      "Homeowners who want to protect their property and family from the unexpected",
      "Parents who need to organize critical family documents in one place",
      "Anyone who wants peace of mind knowing they are prepared for emergencies",
      "People who recently experienced a life event and need to get organized",
      "Families looking to create a comprehensive household management system",
    ],
  };
  return base[product.category] || base["Wealth Building"];
}

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------
const faqItems = [
  {
    question: "What format is this product in?",
    answer:
      "This product is delivered as a high-quality digital download. Depending on the specific product, you will receive PDF files, Excel spreadsheets, or Word documents. All files are designed to be both printable and digitally fillable, so you can use them however works best for your workflow.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Absolutely. We offer a 30-day money-back guarantee on all products. If you are not completely satisfied with your purchase, simply contact our support team within 30 days and we will issue a full refund, no questions asked. Your satisfaction is our top priority.",
  },
  {
    question: "How do I access my download?",
    answer:
      "Immediately after your purchase is confirmed, you will receive an email with a secure download link. You can also access all of your purchases anytime by logging into your account dashboard. Downloads are available instantly and there is no waiting period.",
  },
  {
    question: "Can I share this with others?",
    answer:
      "This product is licensed for personal use only. You may print copies for your own household, but sharing the digital files with others or distributing them publicly is not permitted. If you know someone who would benefit, we would appreciate you directing them to our shop so they can get their own copy.",
  },
];

// ---------------------------------------------------------------------------
// Star renderer helper
// ---------------------------------------------------------------------------
function renderStars(rating: number, size: "sm" | "md" | "lg" = "sm") {
  const sizeClass =
    size === "lg" ? "h-6 w-6" : size === "md" ? "h-5 w-5" : "h-4 w-4";
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star
          key={i}
          className={cn(sizeClass, "fill-amber-400 text-amber-400")}
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <span key={i} className={cn("relative inline-block", sizeClass)}>
          <Star className={cn(sizeClass, "absolute text-gray-200")} />
          <span
            className="absolute inset-0 overflow-hidden"
            style={{ width: "50%" }}
          >
            <Star className={cn(sizeClass, "fill-amber-400 text-amber-400")} />
          </span>
        </span>
      );
    } else {
      stars.push(
        <Star key={i} className={cn(sizeClass, "text-gray-200")} />
      );
    }
  }
  return stars;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function ProductDetailClient({
  product,
  relatedProducts,
  frequentlyBoughtTogether,
}: ProductDetailClientProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "learn" | "audience" | "reviews"
  >("description");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const savings = product.originalPrice - product.price;
  const reviews = getMockReviews(product);
  const learningOutcomes = getLearningOutcomes(product);
  const targetAudience = getTargetAudience(product);

  // ---- handlers ----
  const handleAddToCart = () => {
    addItem(product);
    openCart();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product);
  };

  const handleAddAllToCart = () => {
    frequentlyBoughtTogether.forEach((p) => addItem(p));
    addItem(product);
    openCart();
  };

  const combinedPrice =
    product.price +
    frequentlyBoughtTogether.reduce((acc, p) => acc + p.price, 0);

  const combinedOriginalPrice =
    product.originalPrice +
    frequentlyBoughtTogether.reduce((acc, p) => acc + p.originalPrice, 0);

  // ---- shared animation props ----
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  // ---- tab definitions ----
  const tabs = [
    { key: "description" as const, label: "Description", icon: FileText },
    { key: "learn" as const, label: "What You'll Learn", icon: BookOpen },
    { key: "audience" as const, label: "Who This Is For", icon: Users },
    { key: "reviews" as const, label: `Reviews (${product.reviewCount})`, icon: Star },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ================================================================= */}
      {/* Breadcrumb                                                        */}
      {/* ================================================================= */}
      <nav className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <li>
              <Link href="/" className="hover:text-teal-600 transition-colors">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <li>
              <Link
                href="/shop"
                className="hover:text-teal-600 transition-colors"
              >
                Shop
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <li>
              <span className="hover:text-teal-600 transition-colors cursor-default">
                {product.category}
              </span>
            </li>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <li className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* ================================================================= */}
      {/* Back to shop link                                                 */}
      {/* ================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Shop
        </Link>
      </div>

      {/* ================================================================= */}
      {/* Main product section - two columns                                */}
      {/* ================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ============================================================= */}
          {/* Left column - Image                                           */}
          {/* ============================================================= */}
          <motion.div {...fadeIn} className="space-y-6">
            {/* Cover image */}
            <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
              <Image
                src={product.coverImage}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Badges overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  INSTANT DOWNLOAD
                </span>
                {product.bestseller && (
                  <span className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    BESTSELLER
                  </span>
                )}
              </div>
            </div>

            {/* Money-back guarantee badge */}
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-green-600 shrink-0" />
              <div>
                <p className="font-semibold text-sm">
                  100% Money Back Guarantee
                </p>
                <p className="text-xs text-green-700 mt-0.5">
                  Not satisfied? Get a full refund within 30 days, no questions
                  asked.
                </p>
              </div>
            </div>

            {/* Share / Wishlist buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.share) {
                    navigator.share({
                      title: product.name,
                      url: window.location.href,
                    });
                  } else if (typeof navigator !== "undefined") {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-colors text-sm"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-colors",
                  isWishlisted
                    ? "border-rose-200 bg-rose-50 text-rose-600"
                    : "border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900"
                )}
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    isWishlisted && "fill-rose-500 text-rose-500"
                  )}
                />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
            </div>
          </motion.div>

          {/* ============================================================= */}
          {/* Right column - Details                                        */}
          {/* ============================================================= */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-6"
          >
            {/* Category badge */}
            <span className="inline-block text-sm text-teal-600 bg-teal-50 px-3 py-1 rounded-full font-medium">
              {product.category}
            </span>

            {/* Product name */}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Author line */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                R
              </div>
              <p className="text-gray-600 text-sm">
                by{" "}
                <span className="text-slate-900 font-medium">
                  {product.author}
                </span>
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-0.5">
                {renderStars(product.rating, "sm")}
              </div>
              <span className="text-sm font-semibold text-slate-900">
                {product.rating}
              </span>
              <button
                onClick={() => setActiveTab("reviews")}
                className="text-sm text-gray-400 hover:text-teal-600 transition-colors"
              >
                ({product.reviewCount.toLocaleString()} reviews)
              </button>
            </div>

            {/* Separator */}
            <hr className="border-gray-100" />

            {/* Price section */}
            <div className="space-y-2">
              <div className="flex items-end gap-3 flex-wrap">
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-4xl font-bold text-slate-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {savings > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
                    <Check className="h-3 w-3" />
                    Save ${savings.toFixed(2)}
                  </span>
                )}
                {product.featured && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full">
                    <Zap className="h-3 w-3" />
                    Limited Time Offer
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Separator */}
            <hr className="border-gray-100" />

            {/* What's Included */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">
                What&apos;s Included
              </h3>
              <ul className="space-y-2.5">
                {product.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              {/* File format badges & template count */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                {product.fileFormat.map((fmt) => (
                  <span
                    key={fmt}
                    className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    {fmt}
                  </span>
                ))}
                {product.templates && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg">
                    <BookOpen className="h-3.5 w-3.5" />
                    {product.templates} premium templates included
                  </span>
                )}
              </div>
            </div>

            {/* Separator */}
            <hr className="border-gray-100" />

            {/* Action buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className={cn(
                  "w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-lg font-semibold transition-all duration-300",
                  addedToCart
                    ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/25 hover:shadow-xl hover:shadow-slate-900/30 active:scale-[0.98]"
                )}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </button>

              <Link
                href="/checkout"
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-lg font-semibold border-2 border-orange-500 text-orange-500 hover:bg-orange-50 transition-colors active:scale-[0.98]"
              >
                <Zap className="h-5 w-5" />
                Buy Now
              </Link>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                {
                  icon: ShieldCheck,
                  label: "Secure Checkout",
                  color: "text-teal-600",
                },
                {
                  icon: Download,
                  label: "Instant Delivery",
                  color: "text-blue-600",
                },
                {
                  icon: Clock,
                  label: "Lifetime Access",
                  color: "text-purple-600",
                },
                {
                  icon: Award,
                  label: "30-Day Guarantee",
                  color: "text-amber-600",
                },
              ].map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 text-center p-3 rounded-xl bg-gray-50"
                >
                  <Icon className={cn("h-5 w-5", color)} />
                  <span className="text-xs font-medium text-gray-700">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Tabs section                                                      */}
      {/* ================================================================= */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tab bar */}
          <div className="flex gap-1 overflow-x-auto pb-1 border-b border-gray-200 mb-8 scrollbar-none">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors relative shrink-0",
                  activeTab === key
                    ? "text-teal-600 bg-white border border-gray-200 border-b-white -mb-[1px]"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {/* ---- Description tab ---- */}
            {activeTab === "description" && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="max-w-3xl space-y-6"
              >
                <h2 className="text-2xl font-bold text-slate-900">
                  About This Product
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.longDescription}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Every template, worksheet, and framework in this product has
                  been designed with one goal in mind: helping you take action
                  today. This is not a theoretical guide that sits on a
                  shelf&mdash;it is a hands-on, practical toolkit built from
                  real-world experience and refined through feedback from
                  thousands of satisfied customers.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Whether you are just getting started or looking to level up,
                  this product meets you exactly where you are. The step-by-step
                  approach ensures you never feel overwhelmed, while the depth of
                  content ensures even experienced individuals find tremendous
                  value. Instant digital delivery means you can start
                  implementing today.
                </p>

                {/* Highlight box */}
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-6 space-y-3">
                  <h3 className="font-semibold text-teal-900">
                    Why thousands trust Rubi Digital Downloads
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Actionable, not theoretical - every page drives results",
                      "Designed by experts with real-world experience",
                      "Beautiful, print-ready templates you will actually use",
                      "Instant access - start within minutes of purchase",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-teal-800"
                      >
                        <Check className="h-4 w-4 text-teal-600 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* ---- What You'll Learn tab ---- */}
            {activeTab === "learn" && (
              <motion.div
                key="learn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="max-w-3xl space-y-6"
              >
                <h2 className="text-2xl font-bold text-slate-900">
                  What You&apos;ll Learn
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  This product is packed with actionable insights and practical
                  strategies. Here is a preview of the key takeaways:
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {learningOutcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                    >
                      <div className="h-7 w-7 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                        <BookOpen className="h-4 w-4 text-teal-600" />
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ---- Who This Is For tab ---- */}
            {activeTab === "audience" && (
              <motion.div
                key="audience"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="max-w-3xl space-y-6"
              >
                <h2 className="text-2xl font-bold text-slate-900">
                  Who This Is For
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  This product was designed with specific people in mind. If any
                  of these describe you, this is the right fit:
                </p>
                <div className="space-y-4">
                  {targetAudience.map((audience, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                    >
                      <div className="h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                        <Check className="h-4 w-4 text-teal-600" />
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {audience}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ---- Reviews tab ---- */}
            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                {/* Overall rating summary */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 max-w-2xl">
                  <div className="text-center shrink-0">
                    <p className="text-5xl font-bold text-slate-900">
                      {product.rating}
                    </p>
                    <div className="flex items-center gap-1 mt-2 justify-center">
                      {renderStars(product.rating, "md")}
                    </div>
                    <p className="text-sm text-gray-500 mt-1.5">
                      {product.reviewCount.toLocaleString()} reviews
                    </p>
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    {[5, 4, 3, 2, 1].map((starCount) => {
                      const pct =
                        starCount === 5
                          ? 78
                          : starCount === 4
                          ? 16
                          : starCount === 3
                          ? 4
                          : starCount === 2
                          ? 1
                          : 1;
                      return (
                        <div
                          key={starCount}
                          className="flex items-center gap-3"
                        >
                          <span className="text-xs text-gray-500 w-12 text-right">
                            {starCount} star
                          </span>
                          <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full transition-all duration-700"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-8">
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Individual reviews */}
                <div className="space-y-5 max-w-2xl">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-sm font-bold shrink-0">
                          {review.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-slate-900 text-sm">
                              {review.name}
                            </p>
                            {review.verified && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">
                                <Check className="h-2.5 w-2.5" />
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {renderStars(review.rating, "sm")}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Frequently Bought Together                                        */}
      {/* ================================================================= */}
      {frequentlyBoughtTogether.length > 0 && (
        <section className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Frequently Bought Together
              </h2>
            </div>

            {/* Product row */}
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4">
              {/* Current product mini card */}
              <div className="w-full lg:w-auto flex-shrink-0">
                <div className="w-full lg:w-52 bg-white rounded-xl border-2 border-teal-200 shadow-sm overflow-hidden">
                  <div className="relative aspect-[3/4] bg-gray-50">
                    <Image
                      src={product.coverImage}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="208px"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-bold bg-teal-600 text-white px-2 py-0.5 rounded-full">
                        THIS ITEM
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-slate-900 line-clamp-2 leading-snug">
                      {product.name}
                    </p>
                    <p className="text-sm font-bold text-slate-900 mt-1">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Plus signs and other products */}
              {frequentlyBoughtTogether.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col lg:flex-row items-center gap-4"
                >
                  <span className="text-2xl font-light text-gray-300">+</span>
                  <div className="w-full lg:w-52 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <Link href={`/shop/${p.slug}`}>
                      <div className="relative aspect-[3/4] bg-gray-50">
                        <Image
                          src={p.coverImage}
                          alt={p.name}
                          fill
                          className="object-cover"
                          sizes="208px"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-medium text-slate-900 line-clamp-2 leading-snug">
                          {p.name}
                        </p>
                        <p className="text-sm font-bold text-slate-900 mt-1">
                          ${p.price.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}

              {/* Totals + Add All */}
              <div className="w-full lg:w-auto lg:ml-auto flex-shrink-0">
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-center space-y-3 lg:w-60">
                  <p className="text-sm text-gray-500">
                    Total price for all {frequentlyBoughtTogether.length + 1}{" "}
                    items
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400 line-through">
                      ${combinedOriginalPrice.toFixed(2)}
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      ${combinedPrice.toFixed(2)}
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      Save $
                      {(combinedOriginalPrice - combinedPrice).toFixed(2)}{" "}
                      combined
                    </p>
                  </div>
                  <button
                    onClick={handleAddAllToCart}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors active:scale-[0.98]"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add All to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* You Might Also Like                                               */}
      {/* ================================================================= */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* Product FAQ                                                       */}
      {/* ================================================================= */}
      <section className="border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqItems.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                  }
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-slate-900 text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-gray-400 shrink-0 transition-transform duration-200",
                      openFaqIndex === idx && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaqIndex === idx && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Final CTA banner                                                  */}
      {/* ================================================================= */}
      <section className="bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto">
            Join thousands of customers who have transformed their{" "}
            {product.category === "Wealth Building"
              ? "financial future"
              : product.category === "Real Estate"
              ? "real estate portfolio"
              : product.category === "Homebuying"
              ? "path to homeownership"
              : "emergency preparedness"}{" "}
            with this product.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white text-slate-900 text-lg font-semibold hover:bg-gray-100 transition-colors active:scale-[0.98] shadow-lg"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart - ${product.price.toFixed(2)}
            </button>
            <Link
              href="/checkout"
              onClick={handleBuyNow}
              className="flex items-center gap-2.5 px-8 py-4 rounded-xl border-2 border-white/20 text-white text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              <Zap className="h-5 w-5" />
              Buy Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
