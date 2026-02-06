import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { FeaturedProducts } from "@/components/featured-products";
import { BenefitsSection } from "@/components/benefits-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CategoriesSection } from "@/components/categories-section";
import { FAQSection } from "@/components/faq-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { TrustBadges } from "@/components/trust-badges";

export const metadata = {
  title: "Rubi Digital Downloads - Premium Financial Workbooks & Guides",
  description:
    "Comprehensive workbooks and guides for real estate investing, homebuying, and wealth building by James Villarrubia. Instant digital downloads.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TrustBadges />
      <FeaturedProducts />
      <BenefitsSection />
      <CategoriesSection />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
    </main>
  );
}
