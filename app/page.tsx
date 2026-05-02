"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronRight, Zap, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import ProductCard from "@/components/product/ProductCard";
import { formatPrice } from "@/lib/utils";

function useCountdown(target: Date) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTime({ h: Math.floor(diff / 3_600_000) % 24, m: Math.floor(diff / 60_000) % 60, s: Math.floor(diff / 1_000) % 60 });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

function TimerBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 glass rounded-xl flex items-center justify-center text-2xl font-bold text-white tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-white/40 text-xs mt-1">{label}</span>
    </div>
  );
}

function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span>
      {words.map((word, i) => (
        <motion.span key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }} className="inline-block mr-[0.3em]">
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: "easeOut" }} className={className}>
      {children}
    </motion.section>
  );
}

export default function HomePage() {
  // useState lazy init runs once. Using a plain `new Date(Date.now() + …)` in
  // the render body creates a new object every render, which restarts the
  // countdown interval on each re-render and also makes the reference unstable.
  const [dealEnd] = useState(() => new Date(Date.now() + 1000 * 60 * 60 * 11 + 1000 * 60 * 37 + 1000 * 24));
  const { h, m, s } = useCountdown(dealEnd);

  const featured = products.filter((p) => p.isFeatured).slice(0, 4);
  const hotDeals = products.filter((p) => p.discount >= 20).slice(0, 4);

  const testimonials = [
    { name: "Alex Turner", role: "Software Engineer", avatar: "https://placehold.co/48x48/3b82f6/ffffff?text=AT", rating: 5, text: "Ordered the MacBook Pro M3 and it arrived in perfect condition. The packaging was immaculate. VoltStore is now my go-to for tech gear." },
    { name: "Maria Santos", role: "Photographer", avatar: "https://placehold.co/48x48/ec4899/ffffff?text=MS", rating: 5, text: "Got the Sony A7R V and the price was unbeatable. Customer service answered all my questions within minutes. Highly recommend." },
    { name: "Jake Williams", role: "Gaming Creator", avatar: "https://placehold.co/48x48/10b981/ffffff?text=JW", rating: 5, text: "The PS5 Slim bundle was incredible. Shipped the same day and arrived ahead of schedule. Everything pristine. 10/10." },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "64px 64px" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <Zap size={14} className="fill-current" />
            New arrivals for 2025 — Up to 30% off
          </motion.div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            <AnimatedHeadline text="The Future of" />
            <br />
            <span className="gradient-text"><AnimatedHeadline text="Consumer Tech" /></span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="text-xl text-white/50 max-w-2xl mx-auto mb-10">
            Curated collection of premium electronics — from cutting-edge smartphones to professional-grade audio and gaming gear.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products" className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg shadow-glow transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-0.5">
              Shop Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/products?sort=price-asc" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass hover:bg-white/8 text-white font-semibold text-lg transition-all hover:-translate-y-0.5">
              View Deals
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {[{ value: "48+", label: "Products" }, { value: "10", label: "Top Brands" }, { value: "4.8★", label: "Avg Rating" }, { value: "Free", label: "Shipping $50+" }].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-white/40 text-sm">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 bg-gradient-to-b from-blue-500/60 to-transparent animate-pulse-slow" />
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Shop by Category</h2>
          <Link href="/products" className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">View all <ChevronRight size={16} /></Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
              <Link href={`/products?category=${cat.slug}`} className="flex-shrink-0 flex flex-col items-center gap-3 px-6 py-5 rounded-2xl glass hover:bg-white/8 hover:border-white/15 transition-all hover:-translate-y-1 group min-w-[110px]">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${cat.gradient[0]}33, ${cat.gradient[1]}33)`, border: `1px solid ${cat.gradient[0]}40` }}>
                  <span className="text-lg font-bold" style={{ color: cat.gradient[0] }}>{cat.name.charAt(0)}</span>
                </div>
                <div className="text-center">
                  <div className="text-white text-sm font-medium whitespace-nowrap">{cat.name}</div>
                  <div className="text-white/30 text-xs">{cat.productCount} items</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      {/* FEATURED */}
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Products</h2>
            <p className="text-white/40 text-sm mt-1">Handpicked for quality and value</p>
          </div>
          <Link href="/products" className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">See all <ChevronRight size={16} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
        </div>
      </RevealSection>

      {/* HOT DEALS BANNER */}
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600/20 via-purple-600/15 to-cyan-600/15 border border-blue-500/20 p-8 md:p-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold mb-4">🔥 HOT DEALS</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Flash Sale Ends In</h2>
              <p className="text-white/50 mb-6">Up to 30% off on top electronics</p>
              <div className="flex items-end gap-3">
                <TimerBlock value={h} label="Hours" />
                <span className="text-white/50 text-2xl font-bold mb-5">:</span>
                <TimerBlock value={m} label="Minutes" />
                <span className="text-white/50 text-2xl font-bold mb-5">:</span>
                <TimerBlock value={s} label="Seconds" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto md:max-w-sm">
              {hotDeals.slice(0, 2).map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="glass rounded-xl p-3 hover:bg-white/8 transition-all group">
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-2 bg-white/5">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform" unoptimized />
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-red-500 text-white text-[10px] font-bold">-{p.discount}%</span>
                  </div>
                  <p className="text-white text-xs font-medium line-clamp-1">{p.name}</p>
                  <p className="text-blue-400 text-xs font-bold mt-1">{formatPrice(p.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* DEALS GRID */}
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Today&apos;s Best Deals</h2>
            <p className="text-white/40 text-sm mt-1">Maximum savings, minimum clicks</p>
          </div>
          <Link href="/products" className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">All deals <ChevronRight size={16} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotDeals.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
        </div>
      </RevealSection>

      {/* BRANDS */}
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Shop Top Brands</h2>
          <p className="text-white/40">Official products from the world&apos;s leading electronics companies</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {brands.slice(0, 10).map((brand, i) => (
            <motion.div key={brand.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}>
              <Link href={`/products?brand=${brand.slug}`} className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl glass hover:bg-white/8 hover:border-white/15 transition-all group hover:-translate-y-1">
                <div className="text-white/80 font-bold text-lg group-hover:text-white transition-colors">{brand.name}</div>
                <div className="text-white/30 text-xs">{brand.productCount} products</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      {/* FEATURES */}
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[{ icon: Truck, title: "Free Shipping", desc: "On all orders over $50" }, { icon: Shield, title: "Genuine Products", desc: "100% authentic, always" }, { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free returns" }].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4 p-6 rounded-2xl glass">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Icon size={22} className="text-blue-400" />
              </div>
              <div>
                <div className="text-white font-semibold">{title}</div>
                <div className="text-white/40 text-sm">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* TESTIMONIALS */}
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">What Customers Say</h2>
          <p className="text-white/40">Trusted by thousands of tech enthusiasts</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} className="text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <Image src={t.avatar} alt={t.name} width={40} height={40} className="rounded-full" unoptimized />
                <div>
                  <div className="text-white font-medium text-sm">{t.name}</div>
                  <div className="text-white/30 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      {/* NEWSLETTER */}
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600/20 to-cyan-600/10 border border-blue-500/20 p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent pointer-events-none" />
          <h2 className="relative text-3xl md:text-4xl font-bold text-white mb-3">Get Exclusive Deals First</h2>
          <p className="relative text-white/50 mb-8 max-w-lg mx-auto">Join 50,000+ tech enthusiasts who get early access to sales, new arrivals, and expert buying guides.</p>
          <div className="relative flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3.5 rounded-xl bg-white/8 border border-white/12 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
            <button className="px-7 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-glow transition-all hover:-translate-y-0.5 whitespace-nowrap">Subscribe</button>
          </div>
          <p className="relative text-white/25 text-xs mt-4">No spam, unsubscribe anytime.</p>
        </div>
      </RevealSection>
    </>
  );
}
