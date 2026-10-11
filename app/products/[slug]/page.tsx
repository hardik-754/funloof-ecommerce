"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/context/StoreContext";
import { useCart } from "@/lib/context/CartContext";
import { ProductCard } from "@/components/storefront/ProductCard";
import {
  ShoppingBag,
  ShieldCheck,
  TreePine,
  CheckCircle2,
  Truck,
  Plus,
  Minus,
  Sparkles,
  Flame,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { products } = useStore();
  const { addItem } = useCart();

  const product = products.find((p) => p.slug === slug);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"skills" | "materials" | "parents" | "specs">("skills");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest-900 mb-2">Toy Not Found</h2>
          <p className="text-xs text-wood-600 mb-6">The requested wooden toy could not be located.</p>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-2xl bg-forest-800 text-cream-50 text-xs font-semibold"
          >
            Return to Toy Collection
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.ageGroup === product.ageGroup || p.skills.some((s) => product.skills.includes(s))))
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="min-h-screen bg-cream-50/40 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs font-medium text-wood-600 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-forest-900">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-forest-900">Toys</Link>
          <span>/</span>
          <Link href={`/shop?age=${product.ageGroup}`} className="hover:text-forest-900">{product.ageLabel}</Link>
          <span>/</span>
          <span className="text-forest-900 font-bold">{product.name}</span>
        </nav>

        {/* Top Product Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* LEFT: Large Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] w-full rounded-4xl overflow-hidden bg-white border-2 border-wood-200 shadow-sm">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
              {product.isBestSeller && (
                <div className="absolute top-4 left-4 bg-forest-900 text-cream-50 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-forest-800">
                  <Sparkles className="w-3.5 h-3.5 text-toy-yellow-400" />
                  Best Seller
                </div>
              )}
              {product.stock <= 15 && product.stock > 0 && (
                <div className="absolute top-4 right-4 bg-toy-coral-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Only {product.stock} left in Batch #14</span>
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImageIndex === idx
                        ? "border-toy-coral-500 shadow-md scale-95"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantee Callout */}
            <div className="p-4 rounded-3xl bg-white border border-wood-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-wood-700">
              <div className="flex items-center gap-2">
                <TreePine className="w-4 h-4 text-toy-green-600" />
                <span>100% Solid Indian Neem & European Beechwood</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-toy-teal-600" />
                <span>BIS Standard & Edible Plant Stains</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Buy Box */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Age pill & Skill Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-forest-900 text-cream-50 text-xs font-bold">
                  Ages: {product.ageLabel}
                </span>
                {product.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-0.5 rounded-full bg-toy-yellow-50 text-toy-yellow-800 border border-toy-yellow-200 text-[11px] font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center text-toy-yellow-500">
                  {"★".repeat(Math.round(product.rating))}
                </div>
                <span className="text-xs font-bold text-forest-900">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-wood-500 font-medium">({product.reviewCount} verified Indian parent reviews)</span>
              </div>

              {/* Tagline */}
              <p className="text-sm text-wood-700 italic border-l-2 border-toy-coral-500 pl-3">
                &ldquo;{product.tagline}&rdquo;
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="font-serif text-3xl font-bold text-forest-900">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-wood-400 line-through">
                    ₹{product.compareAtPrice.toLocaleString("en-IN")}
                  </span>
                )}
                {product.compareAtPrice && (
                  <span className="text-xs font-bold text-toy-coral-700 bg-toy-coral-50 border border-toy-coral-200 px-2 py-0.5 rounded-md">
                    Save ₹{(product.compareAtPrice - product.price).toLocaleString("en-IN")} (18% Off)
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-wood-700 leading-relaxed">
                {product.description}
              </p>

              {/* Stock status indicator */}
              <div className="flex items-center gap-2 text-xs">
                {product.stock > 0 ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-emerald-800">
                      In Stock ({product.stock} sets left in Batch #14) — Dispatches in 24 Hours
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-toy-coral-500" />
                    <span className="font-bold text-toy-coral-700">Batch Sold Out (Next artisanal restock in 4 weeks)</span>
                  </>
                )}
              </div>

              {/* Quantity selector & Add to Bag */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-wood-300 rounded-2xl bg-white px-2 py-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-wood-600 hover:text-forest-900 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-bold text-sm text-forest-900">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="p-2 text-wood-600 hover:text-forest-900 transition-colors disabled:opacity-40"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className="flex-1 py-4 px-6 rounded-2xl bg-forest-900 hover:bg-forest-800 disabled:bg-wood-300 text-cream-50 font-bold text-sm shadow-warm flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-4 h-4 text-toy-yellow-400" />
                    <span>Add to Toy Bag • ₹{(product.price * quantity).toLocaleString("en-IN")}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-sage-50 border border-sage-200 text-xs text-forest-900 flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-forest-700 flex-shrink-0" />
                  <span>Free express courier delivery across India on orders over ₹1,499.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTIONS: Skills Developed, Materials Used, Why Parents Love It */}
        <section className="bg-white rounded-5xl p-8 sm:p-12 border-2 border-wood-200/90 shadow-sm mb-16">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-wood-200 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab("skills")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "skills"
                  ? "bg-forest-900 text-cream-50 shadow-sm"
                  : "bg-cream-100 text-forest-900 hover:bg-cream-200"
              }`}
            >
              1. Skills Developed
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("materials")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "materials"
                  ? "bg-forest-900 text-cream-50 shadow-sm"
                  : "bg-cream-100 text-forest-900 hover:bg-cream-200"
              }`}
            >
              2. Materials & Drool-Safe Purity
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("parents")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "parents"
                  ? "bg-forest-900 text-cream-50 shadow-sm"
                  : "bg-cream-100 text-forest-900 hover:bg-cream-200"
              }`}
            >
              3. Why Parents Love It
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === "specs"
                  ? "bg-forest-900 text-cream-50 shadow-sm"
                  : "bg-cream-100 text-forest-900 hover:bg-cream-200"
              }`}
            >
              4. Dimensions & Care
            </button>
          </div>

          {/* TAB 1: Skills Developed */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-forest-900 mb-2">
                  Cognitive & Motor Synapses in Action
                </h3>
                <p className="text-xs sm:text-sm text-wood-700 max-w-2xl">
                  Unlike flashing plastic toys that prompt automatic, passive staring, this toy exercises the frontal lobe through self-directed spatial and mechanical feedback.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {product.skills.map((skill, idx) => (
                  <div key={idx} className="p-5 rounded-3xl bg-cream-50 border border-wood-200">
                    <span className="text-[10px] font-bold uppercase text-wood-500 tracking-wider block mb-1">
                      Focus Area #{idx + 1}
                    </span>
                    <h4 className="font-serif text-base font-bold text-forest-900 mb-2">{skill}</h4>
                    <p className="text-xs text-wood-700 leading-relaxed">
                      Encourages active exploration, tactile mastery, and intrinsic satisfaction without dependency on digital dopamine loops.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Materials Used */}
          {activeTab === "materials" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-forest-900 mb-2">
                  Purity You Can Feel, Safety You Can Trust
                </h3>
                <p className="text-xs sm:text-sm text-wood-700 max-w-2xl">
                  We formulate each piece knowing curious babies learn with their mouths and fingers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-6 rounded-3xl bg-forest-50 border border-forest-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900">
                    Sustainable Ingredients
                  </h4>
                  <ul className="space-y-2 text-xs text-forest-900">
                    {product.materials.map((mat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-toy-green-600 flex-shrink-0" />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-3xl bg-wood-100 border border-wood-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900">
                    Safety & Toxicological Compliance
                  </h4>
                  <ul className="space-y-2 text-xs text-forest-900">
                    {product.safetyCertifications.map((cert, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-toy-coral-700 flex-shrink-0" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Why Parents Love It */}
          {activeTab === "parents" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-forest-900 mb-2">
                  Real Family Insights
                </h3>
                <p className="text-xs sm:text-sm text-wood-700 max-w-2xl">
                  Feedback from thousands of mindful parents who substituted noisy battery toys with Funloof:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {product.whyParentsLoveIt.map((reason, idx) => (
                  <div key={idx} className="p-4 rounded-3xl bg-cream-50 border border-wood-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-toy-green-700 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-forest-900 font-medium leading-relaxed">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Dimensions & Care */}
          {activeTab === "specs" && (
            <div className="space-y-4 max-w-lg">
              <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">Technical Specs</h3>
              <div className="space-y-2 text-xs text-wood-700">
                <div className="flex justify-between py-2 border-b border-wood-100">
                  <span className="font-medium text-forest-900">Dimensions:</span>
                  <span>{product.dimensions || "Standard toddler scale"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-wood-100">
                  <span className="font-medium text-forest-900">Weight:</span>
                  <span>{product.weight || "350 grams"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-wood-100">
                  <span className="font-medium text-forest-900">Care:</span>
                  <span>{product.careInstructions || "Wipe with damp cloth and apply a drop of coconut oil"}</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* RELATED TOYS CAROUSEL */}
        {relatedProducts.length > 0 && (
          <section className="pb-16">
            <h3 className="font-serif text-2xl font-bold text-forest-900 mb-8">
              Pairs Beautifully With
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
