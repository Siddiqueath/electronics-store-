"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { formatPrice } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";
import type { Product } from "@/types";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const addToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isInWishlist(product.id));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="glass rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300 hover:shadow-card hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-square bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />

            {/* Discount badge */}
            {product.discount > 0 && (
              <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-red-500 text-white text-xs font-bold">
                -{product.discount}%
              </div>
            )}

            {/* New badge */}
            {product.isNew && !product.discount && (
              <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-blue-500 text-white text-xs font-bold">
                NEW
              </div>
            )}

            {/* Wishlist — suppressHydrationWarning because className depends on
                Zustand/localStorage state that the server cannot know. */}
            <button
              onClick={handleWishlist}
              suppressHydrationWarning
              className={`absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                isWishlisted
                  ? "bg-red-500/20 text-red-400 border border-red-500/40"
                  : "bg-black/40 text-white/60 border border-white/10 opacity-0 group-hover:opacity-100"
              }`}
            >
              <Heart size={14} className={isWishlisted ? "fill-current" : ""} suppressHydrationWarning />
            </button>

            {/* Add to cart overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold shadow-glow transition-colors"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-xs text-white/40 mb-1">{product.brand}</p>
            <h3 className="text-white font-medium text-sm line-clamp-2 leading-snug mb-2 group-hover:text-blue-400 transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-1.5 mb-3">
              <StarRating rating={product.rating} size="sm" />
              <span className="text-xs text-white/30">({product.reviewCount.toLocaleString()})</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-white font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="text-white/30 text-sm line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
