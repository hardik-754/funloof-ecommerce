"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/context/StoreContext";
import { ArrowRight, BookOpen, Sparkles, Clock, User } from "lucide-react";

export default function JournalIndexPage() {
  const { blogPosts } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Developmental Milestones",
    "Montessori at Home",
    "Sustainable Parenting",
    "Screen-Free Play",
  ];

  const filteredPosts = blogPosts.filter((post) => {
    if (selectedCategory === "All") return true;
    return post.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-cream-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-forest-700" />
            <span>Parenting & Play Journal</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-900 tracking-tight">
            Mindful Insights for Early Childhood
          </h1>
          <p className="text-sm text-wood-700 mt-3 leading-relaxed">
            Written by pediatric occupational therapists, Montessori guides, and sustainable play advocates.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-forest-800 text-cream-50 shadow-sm"
                  : "bg-white text-wood-700 border border-wood-200 hover:bg-cream-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-4xl overflow-hidden border border-wood-200/90 shadow-sm hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-wood-100">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-forest-900 shadow-sm">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-wood-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>

                  <h2 className="font-serif text-xl font-bold text-forest-900 group-hover:text-forest-600 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/journal/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-wood-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-wood-100 flex items-center justify-between mt-4">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden bg-wood-200">
                    <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-forest-900">{post.author.name}</h3>
                    <p className="text-[10px] text-wood-500">{post.author.role}</p>
                  </div>
                </div>

                <Link
                  href={`/journal/${post.slug}`}
                  className="p-2 rounded-xl text-forest-800 hover:bg-cream-100 transition-colors"
                  aria-label="Read full article"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
