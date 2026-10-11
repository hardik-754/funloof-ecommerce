"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/context/StoreContext";
import { ProductCard } from "@/components/storefront/ProductCard";
import { AgeGroup, SkillCategory } from "@/lib/types";
import {
  SlidersHorizontal,
  X,
  Search,
  Check,
  Flame,
} from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const { products } = useStore();

  const [selectedAge, setSelectedAge] = useState<string>(searchParams?.get("age") || "all");
  const [selectedSkill, setSelectedSkill] = useState<string>(searchParams?.get("skill") || "all");
  const [searchQuery, setSearchQuery] = useState<string>(searchParams?.get("search") || "");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(4000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    const ageParam = searchParams?.get("age");
    if (ageParam) setSelectedAge(ageParam);
    const skillParam = searchParams?.get("skill");
    if (skillParam) setSelectedSkill(skillParam);
    const searchParam = searchParams?.get("search");
    if (searchParam) setSearchQuery(searchParam);
  }, [searchParams]);

  const skillOptions: SkillCategory[] = [
    "Fine Motor Skills",
    "STEM & Logic",
    "Spatial Reasoning",
    "Sensory Play",
    "Creative Expression",
    "Hand-Eye Coordination",
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedAge !== "all" && p.ageGroup !== selectedAge) return false;
        if (selectedSkill !== "all" && !p.skills.includes(selectedSkill as SkillCategory)) return false;
        if (inStockOnly && p.stock <= 0) return false;
        if (p.price > maxPrice) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.tagline.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.skills.some((s) => s.toLowerCase().includes(q)) ||
            p.materials.some((m) => m.toLowerCase().includes(q));
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        // Default: featured/best seller first
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [products, selectedAge, selectedSkill, searchQuery, sortBy, inStockOnly, maxPrice]);

  const resetFilters = () => {
    setSelectedAge("all");
    setSelectedSkill("all");
    setSearchQuery("");
    setInStockOnly(false);
    setMaxPrice(4000);
  };

  const hasActiveFilters =
    selectedAge !== "all" ||
    selectedSkill !== "all" ||
    searchQuery !== "" ||
    inStockOnly ||
    maxPrice < 4000;

  return (
    <div className="min-h-screen bg-cream-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-wood-600 mb-1">
            Home / Collection / Wooden Toys
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-toy-coral-50 border border-toy-coral-200 text-toy-coral-700 text-xs font-bold mb-2">
                <Flame className="w-3.5 h-3.5 text-toy-coral-500" />
                <span>Small Artisanal Batch • Crafted in India</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 tracking-tight">
                Educational Wooden Toys
              </h1>
              <p className="text-xs sm:text-sm text-wood-700 mt-1 max-w-xl">
                Every toy is hand-sanded from solid medicinal Indian Neem and European Beechwood, colored with non-toxic botanical stains to nurture fine motor skills and screen-free wonder.
              </p>
            </div>

            {/* Sort & Mobile filter trigger */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-wood-300 text-xs font-semibold text-forest-900 shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters {hasActiveFilters && "•"}</span>
              </button>

              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-wood-300 shadow-sm text-xs text-forest-900">
                <span className="text-wood-500 font-medium hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured & Best Sellers</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* DESKTOP SIDEBAR FILTERS */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-wood-200/90 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-wood-100">
                <div className="flex items-center gap-2 font-serif font-bold text-forest-900 text-base">
                  <SlidersHorizontal className="w-4 h-4 text-forest-700" />
                  <span>Filters</span>
                </div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs text-toy-coral-600 hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Age Bracket Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 mb-3">
                  Age Range
                </h4>
                <div className="space-y-1.5 text-xs">
                  {[
                    { label: "All Ages", val: "all" },
                    { label: "0 – 12m (Mouth/Teething Phase)", val: "0-12m" },
                    { label: "1 – 3y (Build & Smash Phase)", val: "1-3y" },
                    { label: "3 – 5y (City-Building Phase)", val: "3-5y" },
                    { label: "5y+ (Brain Gymnastics)", val: "5y+" },
                  ].map((age) => (
                    <button
                      key={age.val}
                      type="button"
                      onClick={() => setSelectedAge(age.val)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                        selectedAge === age.val
                          ? "bg-forest-100 text-forest-900 font-bold"
                          : "text-wood-700 hover:bg-cream-100"
                      }`}
                    >
                      <span>{age.label}</span>
                      {selectedAge === age.val && <Check className="w-3.5 h-3.5 text-forest-700" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skill Developed Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 mb-3">
                  Skill Developed
                </h4>
                <div className="space-y-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedSkill("all")}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                      selectedSkill === "all"
                        ? "bg-forest-100 text-forest-900 font-bold"
                        : "text-wood-700 hover:bg-cream-100"
                    }`}
                  >
                    <span>All Skills</span>
                    {selectedSkill === "all" && <Check className="w-3.5 h-3.5 text-forest-700" />}
                  </button>
                  {skillOptions.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => setSelectedSkill(skill)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                        selectedSkill === skill
                          ? "bg-forest-100 text-forest-900 font-bold"
                          : "text-wood-700 hover:bg-cream-100"
                      }`}
                    >
                      <span>{skill}</span>
                      {selectedSkill === skill && <Check className="w-3.5 h-3.5 text-forest-700" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900">
                    Max Price
                  </h4>
                  <span className="text-xs font-bold text-forest-900">₹{maxPrice.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="4000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-forest-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-wood-500 mt-1">
                  <span>₹500</span>
                  <span>₹4,000</span>
                </div>
              </div>

              {/* In-Stock Only Toggle */}
              <div className="pt-2 border-t border-wood-100">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-forest-900">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-forest-700 focus:ring-forest-600 w-4 h-4"
                  />
                  <span>Show In-Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* MAIN PRODUCT GRID */}
          <main className="lg:col-span-3">
            {/* Active filter pills */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-wood-600 font-medium">Active Filters:</span>
                {selectedAge !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold">
                    Age: {selectedAge}
                    <button type="button" onClick={() => setSelectedAge("all")}>
                      <X className="w-3 h-3 text-forest-600 hover:text-forest-900" />
                    </button>
                  </span>
                )}
                {selectedSkill !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold">
                    Skill: {selectedSkill}
                    <button type="button" onClick={() => setSelectedSkill("all")}>
                      <X className="w-3 h-3 text-forest-600 hover:text-forest-900" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold">
                    Search: &ldquo;{searchQuery}&rdquo;
                    <button type="button" onClick={() => setSearchQuery("")}>
                      <X className="w-3 h-3 text-forest-600 hover:text-forest-900" />
                    </button>
                  </span>
                )}
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold">
                    In Stock
                    <button type="button" onClick={() => setInStockOnly(false)}>
                      <X className="w-3 h-3 text-forest-600 hover:text-forest-900" />
                    </button>
                  </span>
                )}
                {maxPrice < 4000 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold">
                    Under ₹{maxPrice.toLocaleString("en-IN")}
                    <button type="button" onClick={() => setMaxPrice(4000)}>
                      <X className="w-3 h-3 text-forest-600 hover:text-forest-900" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Results count */}
            <div className="flex items-center justify-between mb-6 text-xs text-wood-600">
              <span>
                Showing <strong>{filteredProducts.length}</strong> wooden learning toys
              </span>
            </div>

            {/* Products grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-wood-200">
                <div className="w-16 h-16 rounded-full bg-wood-100 text-wood-500 mx-auto flex items-center justify-center mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">
                  No matching toys found
                </h3>
                <p className="text-xs text-wood-600 max-w-sm mx-auto mb-6">
                  Try clearing some filters or searching for terms like &ldquo;rings&rdquo;, &ldquo;blocks&rdquo;, or &ldquo;neem&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-3 rounded-2xl bg-forest-800 text-cream-50 font-semibold text-xs transition-colors hover:bg-forest-900"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream-50/50 py-20 text-center text-xs text-wood-600 font-medium">
          Loading toy collection...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
