"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

const SUGGESTIONS = ["iPhone", "MacBook", "Sony", "Gaming", "Headphones", "OLED", "Samsung", "Camera"];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const [submitted, setSubmitted] = useState(initialQ);

  const results = submitted
    ? products.filter((p) => {
        const q = submitted.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : [];

  useEffect(() => { setSubmitted(initialQ); setQuery(initialQ); }, [initialQ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSubmitted(query.trim());
      router.push(`/search?q=${encodeURIComponent(query.trim())}`, { scroll: false });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-white text-center mb-6">Search Products</h1>
          <form onSubmit={handleSearch} className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, brands, categories..."
              className="w-full pl-12 pr-12 py-4 rounded-2xl glass text-white text-base placeholder-white/25 focus:outline-none focus:border-blue-500 border border-white/10 transition-colors"
              autoFocus
            />
            {query && (
              <button type="button" onClick={() => { setQuery(""); setSubmitted(""); router.push("/search"); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                <X size={18} />
              </button>
            )}
          </form>
        </div>

        {!submitted ? (
          <div className="text-center">
            <p className="text-white/40 mb-6">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); setSubmitted(s); router.push(`/search?q=${s}`); }}
                  className="px-5 py-2.5 rounded-full glass hover:bg-white/8 hover:border-white/20 text-white/60 hover:text-white text-sm transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-white/20" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No results for &ldquo;{submitted}&rdquo;</h2>
            <p className="text-white/40 mb-6">Try a different search term or browse our categories.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); setSubmitted(s); router.push(`/search?q=${s}`); }}
                  className="px-4 py-2 rounded-full glass hover:bg-white/8 text-white/50 hover:text-white text-sm transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-white/40 text-sm">
                <span className="text-white font-semibold">{results.length}</span> results for &ldquo;<span className="text-blue-400">{submitted}</span>&rdquo;
              </p>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
