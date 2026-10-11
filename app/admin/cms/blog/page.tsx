"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/context/StoreContext";
import {
  Plus,
  BookOpen,
  Trash2,
  ExternalLink,
  Clock,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function AdminBlogPage() {
  const { blogPosts, refreshStore } = useStore();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the article "${title}"?`)) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        await refreshStore();
      } else {
        alert("Failed to delete post");
      }
    } catch (e) {
      alert("Error deleting post");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-forest-900 tracking-tight">
            Parenting Journal Articles (CMS)
          </h1>
          <p className="text-xs text-wood-600 mt-1">
            Write guides for parents on child development, toy rotation, and screen-free living.
          </p>
        </div>

        <Link
          href="/admin/cms/blog/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-forest-800 hover:bg-forest-900 text-cream-50 font-bold text-xs shadow-warm transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article (WYSIWYG)</span>
        </Link>
      </div>

      {/* Articles Grid/Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl overflow-hidden border border-wood-200/90 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-wood-100">
                <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-forest-900">
                  {post.category}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-[11px] text-wood-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                  <span>•</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>

                <h3 className="font-serif text-base font-bold text-forest-900 line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-wood-600 line-clamp-2 mt-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-wood-100 flex items-center justify-between mt-2">
              <Link
                href={`/journal/${post.slug}`}
                target="_blank"
                className="text-xs font-semibold text-forest-800 hover:underline flex items-center gap-1"
              >
                <span>Live View</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <button
                type="button"
                onClick={() => handleDelete(post.id, post.title)}
                disabled={deletingId === post.id}
                className="p-2 rounded-xl text-wood-400 hover:text-terracotta-600 hover:bg-terracotta-50 transition-colors disabled:opacity-50"
                title="Delete post"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
