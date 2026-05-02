"use client";
import { notFound } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, ChevronRight, Minus, Plus, Check, Package, Zap, RotateCcw, XCircle } from "lucide-react";
import { products } from "@/data/products";
import { reviews as allReviews } from "@/data/reviews";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { formatPrice } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const productReviews = allReviews.filter((r) => r.productId === product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "reviews">("overview");
  const [addedToCart, setAddedToCart] = useState(false);

  const addToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isInWishlist(product.id));

  const variantTypes = Array.from(new Set(product.variants.map((v) => v.type)));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product, selectedVariants);
    setAddedToCart(true);
    openCart();
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <ChevronRight size={14} />
          <Link href={`/products?category=${product.category}`} className="hover:text-white transition-colors capitalize">{product.category}</Link>
          <ChevronRight size={14} />
          <span className="text-white/70 truncate max-w-48">{product.name}</span>
        </nav>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Image gallery */}
          <div className="lg:sticky lg:top-24 h-fit">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative aspect-square rounded-2xl overflow-hidden bg-white/3 border border-white/8 mb-4 group">
              <Image src={product.images[selectedImage]} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-red-500 text-white text-sm font-bold">-{product.discount}%</div>
              )}
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? "border-blue-500" : "border-white/10 hover:border-white/30"}`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-semibold mb-3">{product.brand}</span>
              <h1 className="text-3xl font-bold text-white leading-tight mb-3">{product.name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <StarRating rating={product.rating} size="md" showValue />
                <span className="text-white/30 text-sm">({product.reviewCount.toLocaleString()} reviews)</span>
                {product.isNew && <span className="px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/25 text-green-400 text-xs font-semibold">NEW</span>}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-white">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-white/30 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="px-2 py-1 rounded-lg bg-red-500/15 text-red-400 text-sm font-semibold">Save {formatPrice(product.originalPrice - product.price)}</span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 text-sm">
              {product.stock > 10 ? (
                <><Check size={16} className="text-green-400" /><span className="text-green-400 font-medium">In Stock</span></>
              ) : product.stock > 0 ? (
                <><Package size={16} className="text-amber-400" /><span className="text-amber-400 font-medium">Only {product.stock} left!</span></>
              ) : (
                <><XCircle size={16} className="text-red-400" /><span className="text-red-400 font-medium">Out of Stock</span></>
              )}
            </div>

            {/* Variants */}
            {variantTypes.map((type) => {
              const typeVariants = product.variants.filter((v) => v.type === type);
              return (
                <div key={type}>
                  <div className="text-white/60 text-sm font-medium mb-2 capitalize">{type}: <span className="text-white">{selectedVariants[type] || "Select"}</span></div>
                  <div className="flex flex-wrap gap-2">
                    {typeVariants.map((v) => (
                      <button
                        key={v.value}
                        disabled={!v.available}
                        onClick={() => setSelectedVariants((prev) => ({ ...prev, [type]: v.value }))}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                          !v.available ? "opacity-30 cursor-not-allowed border-white/5 text-white/30 line-through" :
                          selectedVariants[type] === v.value ? "bg-blue-500 border-blue-500 text-white shadow-glow" :
                          "border-white/15 text-white/70 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Quantity + Add */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center glass rounded-xl overflow-hidden">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-4 py-3 text-white/60 hover:text-white hover:bg-white/8 transition-all">
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-white font-semibold">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="px-4 py-3 text-white/60 hover:text-white hover:bg-white/8 transition-all">
                  <Plus size={16} />
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all ${
                  addedToCart ? "bg-green-500 text-white" :
                  product.stock === 0 ? "bg-white/5 text-white/30 cursor-not-allowed" :
                  "bg-blue-500 hover:bg-blue-600 text-white shadow-glow hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                }`}
              >
                {addedToCart ? <><Check size={18} /> Added!</> : <><ShoppingCart size={18} /> Add to Cart</>}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition-all ${isWishlisted ? "bg-red-500/15 border-red-500/30 text-red-400" : "glass text-white/60 hover:text-white"}`}
              >
                <Heart size={20} className={isWishlisted ? "fill-current" : ""} />
              </motion.button>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[{ icon: Zap, text: "Fast Shipping" }, { icon: RotateCcw, text: "30-Day Returns" }, { icon: Check, text: "Authentic" }].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1.5 p-3 glass rounded-xl text-center">
                  <Icon size={18} className="text-blue-400" />
                  <span className="text-white/50 text-xs">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-12">
          <div className="flex gap-1 p-1 glass rounded-xl w-fit mb-8">
            {(["overview", "specs", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? "bg-blue-500 text-white shadow-glow" : "text-white/50 hover:text-white"}`}
              >
                {tab} {tab === "reviews" && `(${productReviews.length})`}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">About this product</h3>
              <p className="text-white/60 leading-relaxed">{product.description}</p>
            </motion.div>
          )}

          {activeTab === "specs" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y divide-white/5 sm:divide-y-0 sm:divide-x-0">
                {Object.entries(product.specs).map(([key, value], i) => (
                  <div key={key} className={`flex items-start gap-4 px-6 py-4 ${i % 2 === 0 ? "bg-white/2" : ""}`}>
                    <span className="text-white/40 text-sm min-w-32 flex-shrink-0">{key}</span>
                    <span className="text-white text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {productReviews.length === 0 ? (
                <div className="glass rounded-2xl p-8 text-center text-white/40">No reviews yet for this product.</div>
              ) : (
                productReviews.map((review) => (
                  <div key={review.id} className="glass rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <Image src={review.avatar} alt={review.author} width={44} height={44} className="rounded-full flex-shrink-0" unoptimized />
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{review.author}</span>
                            {review.verified && <span className="text-xs text-green-400 font-medium">✓ Verified</span>}
                          </div>
                          <span className="text-white/30 text-xs">{new Date(review.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <StarRating rating={review.rating} size="sm" />
                          <span className="text-white font-medium text-sm">{review.title}</span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">{review.body}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">You May Also Like</h2>
              <Link href={`/products?category=${product.category}`} className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 transition-colors">See all <ChevronRight size={16} /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
