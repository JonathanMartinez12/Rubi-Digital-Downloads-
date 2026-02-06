"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronRight,
  SearchX,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { products, getAllCategories, Product } from "@/lib/products";
import ProductCard from "@/components/product-card";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Sort helpers                                                       */
/* ------------------------------------------------------------------ */

type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "popular";

const sortLabels: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  newest: "Newest",
  popular: "Most Popular",
};

function sortProducts(items: Product[], sortBy: SortOption): Product[] {
  const sorted = [...items];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      // Products at the end of the array are treated as newest
      return sorted.reverse();
    case "popular":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case "featured":
    default:
      return sorted.sort((a, b) => {
        if (a.featured && a.bestseller) return -1;
        if (b.featured && b.bestseller) return 1;
        if (a.featured) return -1;
        if (b.featured) return 1;
        if (a.bestseller) return -1;
        if (b.bestseller) return 1;
        return 0;
      });
  }
}

/* ------------------------------------------------------------------ */
/*  All category options (static)                                      */
/* ------------------------------------------------------------------ */

const CATEGORIES = ["All", ...getAllCategories()];

/* ------------------------------------------------------------------ */
/*  Inner shop content (uses useSearchParams)                          */
/* ------------------------------------------------------------------ */

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  /* ---- derived / filtered products ---- */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort
    result = sortProducts(result, sortBy);

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== "" || selectedCategory !== "All" || sortBy !== "featured";

  function clearAllFilters() {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("featured");
  }

  /* ---- render ---- */
  return (
    <div className="min-h-screen bg-gray-50/60">
      {/* ============================================================= */}
      {/*  PAGE HEADER                                                   */}
      {/* ============================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* decorative grain / glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-teal-500/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-orange-500/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-slate-400">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white font-medium">Shop</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Premium Financial Workbooks&nbsp;
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
              &amp;&nbsp;Guides
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-2xl text-lg text-slate-300"
          >
            Expert-crafted resources for building wealth and achieving financial
            freedom
          </motion.p>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  FILTER / SORT BAR                                             */}
      {/* ============================================================= */}
      <div className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Search + Mobile filter toggle */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 lg:w-80">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm",
                    "placeholder:text-gray-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200",
                    "transition-all duration-200"
                  )}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Mobile filter toggle */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium lg:hidden",
                  "transition-colors duration-200",
                  showMobileFilters
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                )}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
            </div>

            {/* Right: Categories (desktop) + Sort */}
            <div className="hidden items-center gap-3 lg:flex">
              {/* Category Pills */}
              <div className="flex items-center gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                      selectedCategory === cat
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="mx-1 h-8 w-px bg-gray-200" />

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className={cn(
                    "appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-gray-600",
                    "focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200",
                    "transition-all duration-200 cursor-pointer"
                  )}
                >
                  {(Object.entries(sortLabels) as [SortOption, string][]).map(
                    ([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    )
                  )}
                </select>
                <SlidersHorizontal className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Mobile filters panel */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="space-y-4 pb-4">
                  {/* Category pills - mobile */}
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Category
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={cn(
                            "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                            selectedCategory === cat
                              ? "bg-slate-900 text-white shadow-sm"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort - mobile */}
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Sort By
                    </p>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className={cn(
                        "w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-gray-600",
                        "focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                      )}
                    >
                      {(Object.entries(sortLabels) as [SortOption, string][]).map(
                        ([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ============================================================= */}
      {/*  ACTIVE FILTER BADGES + RESULTS COUNT                          */}
      {/* ============================================================= */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 pb-2">
          {/* Results count */}
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredProducts.length}
            </span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>

          {/* Active filter badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-slate-200 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {searchQuery.trim() && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  &ldquo;{searchQuery}&rdquo;
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-slate-200 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {sortBy !== "featured" && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {sortLabels[sortBy]}
                  <button
                    onClick={() => setSortBy("featured")}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-slate-200 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs font-medium text-slate-500 underline underline-offset-2 hover:text-slate-800 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================= */}
      {/*  PRODUCT GRID                                                  */}
      {/* ============================================================= */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <ProductCard product={product} index={idx} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ---- Empty State ---- */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 mb-6">
              <SearchX className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              No products found
            </h3>
            <p className="mt-2 max-w-sm text-gray-500">
              Try adjusting your filters or search terms to discover our premium
              financial resources.
            </p>
            <button
              onClick={clearAllFilters}
              className={cn(
                "mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium",
                "bg-slate-900 text-white shadow-sm",
                "hover:bg-slate-800 transition-colors duration-200"
              )}
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </section>

      {/* ============================================================= */}
      {/*  BOTTOM CTA                                                    */}
      {/* ============================================================= */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-12 text-center sm:px-16">
            {/* decorative */}
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-teal-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-orange-500/15 blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                <Sparkles className="h-6 w-6 text-teal-400" />
              </div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Can&apos;t find what you&apos;re looking for?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-slate-300">
                We&apos;re always creating new resources. Reach out and let us
                know what you need, or explore all of our product categories.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold",
                    "bg-white text-slate-900 shadow-sm",
                    "hover:bg-gray-100 transition-colors duration-200"
                  )}
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                    setSortBy("featured");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold",
                    "border border-white/20 text-white",
                    "hover:bg-white/10 transition-colors duration-200"
                  )}
                >
                  View All Categories
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page wrapper with Suspense (required for useSearchParams)          */
/* ------------------------------------------------------------------ */

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50/60">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
            <p className="text-sm text-gray-500">Loading shop...</p>
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
