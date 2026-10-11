"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/context/StoreContext";
import { ProductCard } from "@/components/storefront/ProductCard";
import { ArrowLeft, Clock, Calendar, Share2, BookOpen, Sparkles } from "lucide-react";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { blogPosts, products } = useStore();

  const post = blogPosts.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest-900 mb-2">Article Not Found</h2>
          <p className="text-xs text-wood-600 mb-6">The requested parenting guide could not be located.</p>
          <Link
            href="/journal"
            className="px-6 py-3 rounded-2xl bg-forest-800 text-cream-50 text-xs font-semibold"
          >
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  const suggestedToys = products.slice(0, 3);

  return (
    <article className="min-h-screen bg-cream-50/30 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-xs font-bold text-forest-700 hover:text-forest-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Parenting Journal</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <span className="px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold">
            {post.category}
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base text-wood-700 leading-relaxed font-serif italic">
            &ldquo;{post.excerpt}&rdquo;
          </p>

          <div className="flex items-center justify-between py-4 border-y border-wood-200">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden bg-wood-200">
                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-forest-900">{post.author.name}</h3>
                <p className="text-[11px] text-wood-500">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-wood-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full rounded-4xl overflow-hidden mb-12 shadow-warm">
          <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" />
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-4xl p-8 sm:p-12 border border-wood-200/90 shadow-sm prose max-w-none mb-16">
          <div className="space-y-6 text-forest-900 leading-relaxed text-sm sm:text-base font-normal">
            {post.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    className="font-serif text-2xl font-bold text-forest-900 pt-4 pb-1 border-b border-wood-100"
                  >
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("- ")) {
                const listItems = paragraph.split("\n");
                return (
                  <ul key={index} className="space-y-2 pl-4 list-disc text-wood-800 text-sm">
                    {listItems.map((item, i) => (
                      <li key={i}>{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              if (/^\d+\.\s/.test(paragraph)) {
                const listItems = paragraph.split("\n");
                return (
                  <ol key={index} className="space-y-2 pl-4 list-decimal text-wood-800 text-sm">
                    {listItems.map((item, i) => (
                      <li key={i}>{item.replace(/^\d+\.\s/, "")}</li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={index} className="text-wood-800 text-sm sm:text-base leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Related Skill Toys Section */}
        <div className="border-t border-wood-200 pt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-wood-600 block mb-1">
                Bring This Principle Home
              </span>
              <h2 className="font-serif text-2xl font-bold text-forest-900">
                Recommended Screen-Free Wooden Toys
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold text-forest-800 hover:underline"
            >
              View All Toys &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {suggestedToys.map((toy) => (
              <ProductCard key={toy.id} product={toy} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
