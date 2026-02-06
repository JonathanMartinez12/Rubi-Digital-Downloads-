import { Metadata } from "next";
import { products, getProductBySlug } from "@/lib/products";
import { ProductDetailClient } from "./product-detail-client";
import { notFound } from "next/navigation";

// Generate static params for all products
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Dynamic metadata - Next.js 15+/16 params is a Promise
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found - Rubi Digital Downloads" };
  }

  return {
    title: `${product.name} - Rubi Digital Downloads`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  // Get related products (same category, exclude current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Get "frequently bought together" products (different category)
  const frequentlyBoughtTogether = products
    .filter((p) => p.category !== product.category && p.featured)
    .slice(0, 3);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
      frequentlyBoughtTogether={frequentlyBoughtTogether}
    />
  );
}
