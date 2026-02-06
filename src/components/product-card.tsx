"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import { useState, useCallback } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const [added, setAdded] = useState(false);

  const savings = product.originalPrice - product.price;

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addItem(product);
      openCart();
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    },
    [addItem, openCart, product]
  );

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="relative inline-block h-3.5 w-3.5">
            <Star className="absolute h-3.5 w-3.5 text-gray-200" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            </span>
          </span>
        );
      } else {
        stars.push(
          <Star key={i} className="h-3.5 w-3.5 text-gray-200" />
        );
      }
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="group"
    >
      <div
        className={cn(
          "relative rounded-xl overflow-hidden bg-white border border-gray-100",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-1.5 hover:shadow-xl"
        )}
      >
        {/* Product Image Area */}
        <Link href={`/shop/${product.slug}`} className="block">
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
            <Image
              src={product.coverImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                INSTANT DOWNLOAD
              </span>
            </div>

            {product.bestseller && (
              <div className="absolute top-3 right-3 z-10">
                <span className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  BESTSELLER
                </span>
              </div>
            )}

            {/* Hover Overlay */}
            <div
              className={cn(
                "absolute inset-0 bg-black/40 backdrop-blur-[2px]",
                "flex flex-col items-center justify-center gap-3",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              )}
            >
              <Link
                href={`/shop/${product.slug}`}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-lg",
                  "bg-white/20 backdrop-blur-md border border-white/30",
                  "text-white text-sm font-medium",
                  "hover:bg-white/30 transition-colors duration-200"
                )}
              >
                <Eye className="h-4 w-4" />
                View Details
              </Link>
              <button
                onClick={handleAddToCart}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-lg",
                  "bg-white/20 backdrop-blur-md border border-white/30",
                  "text-white text-sm font-medium",
                  "hover:bg-white/30 transition-colors duration-200"
                )}
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </Link>

        {/* Content Area */}
        <div className="p-4 space-y-2">
          {/* Category */}
          <span className="text-xs text-teal-600 font-medium uppercase tracking-wider">
            {product.category}
          </span>

          {/* Product Name */}
          <Link href={`/shop/${product.slug}`} className="block">
            <h3 className="font-semibold text-gray-900 line-clamp-2 leading-snug hover:text-teal-700 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {renderStars(product.rating)}
            </div>
            <span className="text-gray-400 text-sm">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-400 text-sm line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
            <span className="text-xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            {savings > 0 && (
              <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                Save ${savings.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={cn(
              "w-full flex items-center justify-center gap-2 mt-2",
              "rounded-lg py-2.5 text-sm font-medium",
              "transition-all duration-200",
              added
                ? "bg-green-600 text-white"
                : "bg-slate-900 hover:bg-slate-800 text-white"
            )}
          >
            {added ? (
              "Added!"
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
