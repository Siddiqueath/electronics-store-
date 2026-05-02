"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import ProductCard from "@/components/product/ProductCard";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleMoveToCart = (productId: string) => {
    const product = items.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
      removeItem(productId);
      openCart();
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="text-white/20" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Your wishlist is empty</h2>
          <p className="text-white/40 mb-8">Save products you love and come back to them anytime.</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-glow transition-all">
            <ArrowLeft size={18} /> Discover Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Wishlist</h1>
            <p className="text-white/40 mt-1">{items.length} saved {items.length === 1 ? "item" : "items"}</p>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product, i) => (
              <motion.div key={product.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }}>
                <div className="relative">
                  <ProductCard product={product} index={i} />
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleMoveToCart(product.id)}
                      className="flex-1 py-2 rounded-xl bg-blue-500/15 border border-blue-500/25 text-blue-400 hover:bg-blue-500 hover:text-white text-xs font-semibold transition-all"
                    >
                      Move to Cart
                    </button>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="px-3 py-2 rounded-xl glass text-white/40 hover:text-red-400 text-xs transition-all"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
