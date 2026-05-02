"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, Tag, X, ArrowLeft, AlertCircle } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const subtotal = getSubtotal();
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal - discount >= 50 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const handlePromo = () => {
    if (promoCode.trim().length === 0) return;
    if (promoApplied) { setPromoError("A promo code is already applied."); return; }
    setPromoApplied(true);
    setPromoError("");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-white/20" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Your cart is empty</h2>
          <p className="text-white/40 mb-8">Looks like you haven&apos;t added anything yet.</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-glow transition-all">
            <ArrowLeft size={18} /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
          <button onClick={clearCart} className="text-white/40 hover:text-red-400 text-sm transition-colors">Clear all</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="glass rounded-2xl p-4 sm:p-6"
                >
                  <div className="flex gap-4">
                    <Link href={`/products/${item.product.slug}`} className="relative w-24 h-24 rounded-xl overflow-hidden bg-white/5 flex-shrink-0 group">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover group-hover:scale-105 transition-transform" unoptimized />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <p className="text-white/40 text-xs">{item.product.brand}</p>
                          <Link href={`/products/${item.product.slug}`} className="text-white font-medium text-sm hover:text-blue-400 transition-colors line-clamp-2">
                            {item.product.name}
                          </Link>
                        </div>
                        <button onClick={() => removeItem(item.product.id)} className="text-white/20 hover:text-red-400 transition-colors flex-shrink-0 p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                        <div className="flex items-center gap-1 glass rounded-xl overflow-hidden">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-2 text-white/50 hover:text-white hover:bg-white/8 transition-all">
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-white text-sm font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-3 py-2 text-white/50 hover:text-white hover:bg-white/8 transition-all">
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">{formatPrice(item.product.price * item.quantity)}</div>
                          <div className="text-white/30 text-xs">{formatPrice(item.product.price)} each</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link href="/products" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors mt-4">
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-24 space-y-5">
              <h3 className="text-white font-bold text-lg">Order Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Promo (VOLT10)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-400">Free</span> : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Tax (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="h-px bg-white/8" />
                <div className="flex justify-between text-white font-bold text-base">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Promo code */}
              <div>
                <label className="text-white/50 text-xs font-medium mb-2 block">Promo Code</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoError(""); }}
                      placeholder="VOLT10"
                      disabled={promoApplied}
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-blue-500 disabled:opacity-50 transition-colors"
                    />
                  </div>
                  <button
                    onClick={handlePromo}
                    disabled={promoApplied}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium disabled:opacity-50 transition-all"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && <p className="text-green-400 text-xs mt-1.5">✓ 10% discount applied!</p>}
                {promoError && <p className="text-red-400 text-xs mt-1.5">{promoError}</p>}
                {!promoApplied && <p className="text-white/25 text-xs mt-1.5">Try code: VOLT10</p>}
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCheckoutModal(true)}
                className="w-full py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-glow transition-all hover:-translate-y-0.5"
              >
                Proceed to Checkout
              </motion.button>

              <p className="text-white/20 text-xs text-center">🔒 Secure checkout</p>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout modal */}
      <AnimatePresence>
        {showCheckoutModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCheckoutModal(false)} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
            >
              <div className="bg-[#161616] border border-white/10 rounded-3xl p-8 text-center mx-4">
                <button onClick={() => setShowCheckoutModal(false)} className="absolute top-4 right-4 text-white/30 hover:text-white p-2"><X size={18} /></button>
                <div className="w-16 h-16 rounded-2xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={28} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Portfolio Demo</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  This is a portfolio showcase project. Checkout is not functional — no real transactions are processed.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setShowCheckoutModal(false)} className="flex-1 py-3 rounded-xl glass hover:bg-white/10 text-white font-medium transition-all">
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => { clearCart(); setShowCheckoutModal(false); }}
                    className="flex-1 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
