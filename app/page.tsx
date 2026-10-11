"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/context/StoreContext";
import { HeroBanner } from "@/components/storefront/HeroBanner";
import { AgeCategories } from "@/components/storefront/AgeCategories";
import { SkillCategories } from "@/components/storefront/SkillCategories";
import { ProductCard } from "@/components/storefront/ProductCard";
import { NewsletterSignup } from "@/components/storefront/NewsletterSignup";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HomePage() {
  const { products, blogPosts } = useStore();

  const featuredProducts = products.filter((p) => p.isFeatured || p.isBestSeller).slice(0, 4);
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-cream-50/30">
      {/* 1. Clean & Inspiring Hero Banner */}
      <HeroBanner />

      {/* 2. Featured / Best Seller Wooden Toys Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-toy-coral-50 border border-toy-coral-200 text-toy-coral-700 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-toy-coral-500" />
                <span>Parent Favorites (Small Artisanal Batch)</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 tracking-tight">
                Our Most Cherished Heirloom Toys
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-toy-teal-700 hover:text-toy-teal-900 underline underline-offset-4"
            >
              <span>Explore Complete Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Simple & Intuitive Shop by Age Milestone */}
      <AgeCategories />

      {/* 4. Simple & Educational Shop by Skill Developed */}
      <SkillCategories />

      {/* 5. Parent Reviews & Social Proof */}
      <section className="py-20 bg-cream-50 border-t border-wood-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-wood-300 text-forest-900 text-xs font-bold mb-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-toy-yellow-500" />
              <span>Real Indian Families, Real Sanity Restored</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 tracking-tight">
              Why Parents Rave About Funloof
            </h2>
            <p className="text-xs sm:text-sm text-wood-600 mt-2">
              Tested on vitrified marble floors, naturally drool-proof, and loved across generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-4xl border-2 border-toy-yellow-200/80 shadow-sm flex flex-col justify-between hover:shadow-warm transition-all">
              <div>
                <div className="flex items-center gap-1 text-toy-yellow-500 mb-3">
                  {"★".repeat(5)}
                </div>
                <p className="text-xs text-forest-900 leading-relaxed italic mb-6">
                  &ldquo;I was so sick of noisy plastic toys with dead batteries cluttering our living room. Funloof&apos;s architectural blocks brought a wave of quiet, creative calm. My mother-in-law was thrilled by the pure neem craftsmanship!&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-wood-100 pt-4">
                <div className="w-10 h-10 rounded-2xl bg-toy-yellow-100 flex items-center justify-center font-serif font-bold text-toy-yellow-800 text-sm">
                  PS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-forest-900">Priya Sharma</h4>
                  <p className="text-[11px] text-wood-500">Mom of Aarav (2.5 yrs) • Bengaluru</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-4xl border-2 border-toy-coral-200/80 shadow-sm flex flex-col justify-between hover:shadow-warm transition-all">
              <div>
                <div className="flex items-center gap-1 text-toy-coral-500 mb-3">
                  {"★".repeat(5)}
                </div>
                <p className="text-xs text-forest-900 leading-relaxed italic mb-6">
                  &ldquo;As a pediatrician and mother, I see children suffering sensory overstimulation from screens. Funloof’s medicinal neem cylinders and balance rocker are textbook perfection for grounding active young minds.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-wood-100 pt-4">
                <div className="w-10 h-10 rounded-2xl bg-toy-coral-100 flex items-center justify-center font-serif font-bold text-toy-coral-800 text-sm">
                  SR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-forest-900">Dr. Sneha Rao</h4>
                  <p className="text-[11px] text-wood-500">Pediatrician & Mother • New Delhi</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-4xl border-2 border-toy-teal-200/80 shadow-sm flex flex-col justify-between hover:shadow-warm transition-all">
              <div>
                <div className="flex items-center gap-1 text-toy-teal-500 mb-3">
                  {"★".repeat(5)}
                </div>
                <p className="text-xs text-forest-900 leading-relaxed italic mb-6">
                  &ldquo;Most plastic toys shatter within 3 days on hard marble flooring. Funloof is solid, heavy, and smells like natural wood. My 4-year-old twins build new marble raceways every Sunday morning.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-wood-100 pt-4">
                <div className="w-10 h-10 rounded-2xl bg-toy-teal-100 flex items-center justify-center font-serif font-bold text-toy-teal-800 text-sm">
                  RM
                </div>
                <div>
                  <h4 className="text-xs font-bold text-forest-900">Rohan Mehta</h4>
                  <p className="text-[11px] text-wood-500">Dad of Twins • Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Parenting & Play Journal Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-toy-teal-50 border border-toy-teal-200 text-toy-teal-700 text-xs font-bold mb-2">
                <span>Parenting & Play</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 tracking-tight">
                Insights for Mindful Childhood Development
              </h2>
            </div>
            <Link
              href="/journal"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-toy-teal-700 hover:text-toy-teal-900 underline underline-offset-4"
            >
              <span>Read All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/journal/${post.slug}`}
                className="group flex flex-col justify-between bg-cream-50 rounded-4xl overflow-hidden border border-wood-200 hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-wood-100">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-forest-900 shadow-sm">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-[11px] text-wood-500 font-bold mb-2">
                      {post.readTime}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-forest-900 group-hover:text-toy-teal-700 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-wood-600 mt-2 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-wood-200/60 flex items-center justify-between text-xs font-bold text-forest-800 mt-4">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Clean Newsletter Signup */}
      <NewsletterSignup />
    </div>
  );
}
