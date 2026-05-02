import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Truck, ShieldCheck, HeadphonesIcon, RotateCcw } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about VoltStore — our mission, story, and the team behind your favourite electronics store.",
};

const stats = [
  { value: "10K+", label: "Products" },
  { value: "50+", label: "Brands" },
  { value: "1M+", label: "Customers" },
  { value: "Since 2019", label: "In Business" },
];

const whyUs = [
  {
    icon: Truck,
    title: "Fast Shipping",
    desc: "Same-day dispatch on orders before 2 PM. Free shipping on all orders over $50.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    desc: "256-bit SSL encryption on every transaction. Your payment data never touches our servers.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    desc: "Real humans available around the clock via live chat, email, and phone.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "Changed your mind? Return any item within 30 days, no questions asked.",
  },
];

const team = [
  { name: "Jordan Lee", role: "CEO & Co-founder", avatar: "https://placehold.co/96x96/3b82f6/ffffff?text=JL" },
  { name: "Priya Nair", role: "CTO & Co-founder", avatar: "https://placehold.co/96x96/8b5cf6/ffffff?text=PN" },
  { name: "Marcus Chen", role: "Head of Product", avatar: "https://placehold.co/96x96/06b6d4/ffffff?text=MC" },
  { name: "Sofia Reyes", role: "Lead Designer", avatar: "https://placehold.co/96x96/ec4899/ffffff?text=SR" },
  { name: "Alex Kim", role: "Head of Engineering", avatar: "https://placehold.co/96x96/10b981/ffffff?text=AK" },
  { name: "Dana Brooks", role: "Head of Operations", avatar: "https://placehold.co/96x96/f97316/ffffff?text=DB" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-hero">
        {/* Ambient blobs */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-blue-400 text-sm font-medium mb-8">
            <Zap size={14} className="fill-current" />
            About VoltStore
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            We&apos;re on a mission to{" "}
            <span className="gradient-text">power your world</span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Since 2019 we&apos;ve been connecting tech enthusiasts with the finest electronics on the planet — sourced directly from the brands you trust, delivered to your door.
          </p>
        </div>
      </section>

      {/* ── OUR STORY ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Story text */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-white/55 leading-relaxed">
              <p>
                VoltStore was born in a garage in San Francisco in 2019. Our founders — two engineers tired of overpriced electronics and unreliable online retailers — set out to build something different: a store that combines expert curation with unbeatable prices and obsessive customer service.
              </p>
              <p>
                We started with 20 products and one warehouse. Today we carry over 10,000 SKUs from 50+ premium brands, ship to 40 countries, and serve more than a million customers worldwide. But our core belief hasn&apos;t changed: every person deserves access to great technology, at a fair price, with zero hassle.
              </p>
              <p>
                Every product in our catalogue is hand-tested by our team of engineers before we agree to stock it. If we wouldn&apos;t use it ourselves, it doesn&apos;t make the cut. That&apos;s the VoltStore promise.
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="glass rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/6 transition-colors"
              >
                <span className="text-4xl font-bold gradient-text mb-2">{value}</span>
                <span className="text-white/50 text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────────── */}
      <section className="bg-[#0d0d0d] border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">Why Choose VoltStore?</h2>
            <p className="text-white/40 max-w-xl mx-auto">
              We don&apos;t just sell electronics — we stand behind every product and every order.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="glass rounded-2xl p-7 flex flex-col gap-4 hover:bg-white/6 hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEET THE TEAM ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Meet the Team</h2>
          <p className="text-white/40 max-w-xl mx-auto">
            The people behind VoltStore are engineers, designers, and shoppers just like you.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {team.map(({ name, role, avatar }) => (
            <div
              key={name}
              className="glass rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:bg-white/6 hover:-translate-y-1 transition-all duration-200"
            >
              <Image
                src={avatar}
                alt={name}
                width={72}
                height={72}
                className="rounded-full ring-2 ring-white/10"
                unoptimized
              />
              <div>
                <p className="text-white font-semibold text-sm">{name}</p>
                <p className="text-white/40 text-xs mt-0.5">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600/20 to-cyan-600/10 border border-blue-500/20 p-12 md:p-20 text-center">
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/8 rounded-full blur-3xl pointer-events-none" />
          <h2 className="relative text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Shop?
          </h2>
          <p className="relative text-white/50 mb-8 max-w-md mx-auto">
            Explore our full catalogue of premium electronics, handpicked by our team of experts.
          </p>
          <Link
            href="/products"
            className="relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg shadow-glow transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-0.5"
          >
            Browse Products
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
