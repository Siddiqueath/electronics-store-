"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { isOpen, items, closeCart, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#111] border-l border-white/8 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/8">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-blue-400" />
                <h2 className="text-white font-semibold text-lg">Shopping Cart</h2>
                {items.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                    {items.length}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                    <ShoppingBag size={32} className="text-white/20" />
                  </div>
                  <div>
                    <p className="text-white/60 font-medium">Your cart is empty</p>
                    <p className="text-white/30 text-sm mt-1">Add some products to get started</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 p-3 rounded-xl bg-white/3 border border-white/6"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">{item.product.brand}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-md bg-white/8 hover:bg-white/15 text-white/60 hover:text-white flex items-center justify-center transition-all"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-md bg-white/8 hover:bg-white/15 text-white/60 hover:text-white flex items-center justify-center transition-all"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                        <span className="text-white font-semibold text-sm">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-white/20 hover:text-red-400 transition-colors mt-0.5"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/8 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-green-400">Free</span> : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold text-base pt-2 border-t border-white/8">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="flex-1 py-3 rounded-xl bg-white/8 hover:bg-white/12 text-white text-sm font-semibold text-center transition-colors"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="flex-1 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold text-center shadow-glow transition-colors"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
