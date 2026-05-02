"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown, Search } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import ProductCard from "@/components/product/ProductCard";
import type { SortOption } from "@/types";

const PRICE_MAX = 4000;
const PAGE_SIZE = 12;

function ProductSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-16 skeleton rounded" />
        <div className="h-4 w-full skeleton rounded" />
        <div className="h-3 w-24 skeleton rounded" />
        <div className="h-5 w-20 skeleton rounded" />
      </div>
    </div>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const cat = searchParams.get("category");
    return cat ? [cat] : [];
  });
  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    const brand = searchParams.get("brand");
    return brand ? [brand] : [];
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, PRICE_MAX]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>((searchParams.get("sort") as SortOption) || "popular");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = products
    .filter((p) => {
      if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brand.toLowerCase())) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (p.rating < minRating) return false;
      if (inStockOnly && p.stock === 0) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sort) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "rating": return b.rating - a.rating;
        case "discount": return b.discount - a.discount;
        default: return b.reviewCount - a.reviewCount;
      }
    });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeFilterCount = selectedCategories.length + selectedBrands.length + (minRating > 0 ? 1 : 0) + (inStockOnly ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < PRICE_MAX ? 1 : 0);

  const handleFilterChange = useCallback(() => {
    setLoading(true);
    setPage(1);
    setTimeout(() => setLoading(false), 200);
  }, []);

  useEffect(() => { handleFilterChange(); }, [selectedCategories, selectedBrands, priceRange, minRating, inStockOnly, sort, handleFilterChange]);

  const toggleCategory = (slug: string) => setSelectedCategories((prev) => prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]);
  const toggleBrand = (slug: string) => setSelectedBrands((prev) => prev.includes(slug) ? prev.filter((b) => b !== slug) : [...prev, slug]);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, PRICE_MAX]);
    setMinRating(0);
    setInStockOnly(false);
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Filters</h3>
        {activeFilterCount > 0 && (
          <button onClick={clearAll} className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors">
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => toggleCategory(cat.slug)}
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer ${selectedCategories.includes(cat.slug) ? "bg-blue-500 border-blue-500" : "border-white/20 group-hover:border-white/40"}`}
              >
                {selectedCategories.includes(cat.slug) && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <span className="text-white/60 group-hover:text-white text-sm transition-colors">{cat.name}</span>
              <span className="text-white/30 text-xs ml-auto">({products.filter((p) => p.category === cat.slug).length})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Brand</h4>
        <div className="space-y-2">
          {brands.slice(0, 8).map((brand) => (
            <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => toggleBrand(brand.slug)}
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer ${selectedBrands.includes(brand.slug) ? "bg-blue-500 border-blue-500" : "border-white/20 group-hover:border-white/40"}`}
              >
                {selectedBrands.includes(brand.slug) && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <span className="text-white/60 group-hover:text-white text-sm transition-colors">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Price Range</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">${priceRange[0]}</span>
            <span className="text-white/60">${priceRange[1] >= PRICE_MAX ? PRICE_MAX + "+" : priceRange[1]}</span>
          </div>
          <input
            type="range"
            min={0}
            max={PRICE_MAX}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-blue-500"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Min Rating</h4>
        <div className="space-y-1">
          {[4.5, 4, 3.5, 0].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${minRating === r ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "text-white/50 hover:text-white hover:bg-white/5"}`}
            >
              {r === 0 ? "Any rating" : `${r}+ stars`}
            </button>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <label className="flex items-center gap-3 cursor-pointer group">
        <div
          onClick={() => setInStockOnly(!inStockOnly)}
          className={`w-10 h-5 rounded-full transition-all cursor-pointer relative ${inStockOnly ? "bg-blue-500" : "bg-white/10"}`}
        >
          <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${inStockOnly ? "translate-x-5" : ""}`} />
        </div>
        <span className="text-white/60 group-hover:text-white text-sm transition-colors">In Stock Only</span>
      </label>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">All Products</h1>
          <p className="text-white/40">Explore our full catalog of premium electronics</p>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategories.map((c) => (
              <button key={c} onClick={() => toggleCategory(c)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-medium hover:bg-blue-500/30 transition-colors">
                {c} <X size={12} />
              </button>
            ))}
            {selectedBrands.map((b) => (
              <button key={b} onClick={() => toggleBrand(b)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-medium hover:bg-purple-500/30 transition-colors">
                {b} <X size={12} />
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="glass rounded-2xl p-5 sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/8 text-white/70 text-sm transition-all"
                >
                  <SlidersHorizontal size={16} />
                  Filters {activeFilterCount > 0 && <span className="w-5 h-5 bg-blue-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">{activeFilterCount}</span>}
                </button>
                <span className="text-white/40 text-sm">{filtered.length} results</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-white/40 text-sm hidden sm:block">Sort:</span>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    className="appearance-none px-4 py-2 pr-8 rounded-xl glass text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="discount">Biggest Discount</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: PAGE_SIZE }).map((_, i) => <ProductSkeleton key={i} />)}
                </motion.div>
              ) : paginated.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-24 gap-4">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                    <Search size={32} className="text-white/20" />
                  </div>
                  <p className="text-white/60 font-medium">No products match your filters</p>
                  <button onClick={clearAll} className="px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors">
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginated.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && !loading && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl glass text-white/60 text-sm disabled:opacity-30 hover:text-white hover:bg-white/8 transition-all"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${p === page ? "bg-blue-500 text-white shadow-glow" : "glass text-white/60 hover:text-white hover:bg-white/8"}`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl glass text-white/60 text-sm disabled:opacity-30 hover:text-white hover:bg-white/8 transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilters(false)} className="fixed inset-0 z-50 bg-black/60 lg:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25 }} className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-[#111] border-r border-white/8 p-6 overflow-y-auto lg:hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-lg">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="p-2 text-white/40 hover:text-white"><X size={20} /></button>
              </div>
              <FilterSidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}
