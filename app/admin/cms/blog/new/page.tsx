"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/context/StoreContext";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ArrowLeft, CheckCircle2, Sparkles, BookOpen } from "lucide-react";

export default function NewBlogPostPage() {
  const router = useRouter();
  const { refreshStore } = useStore();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState<
    "Montessori at Home" | "Developmental Milestones" | "Screen-Free Play" | "Sustainable Parenting"
  >("Montessori at Home");
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1000&q=80"
  );
  const [authorName, setAuthorName] = useState("Hannah Sterling");
  const [authorRole, setAuthorRole] = useState("Montessori Educator & Parent Coach");
  const [content, setContent] = useState(
    `Every parent knows the frustration of buying an expensive toy only for their child to abandon it ten minutes later.\n\n### The Magic of Open-Ended Toys\nWhen playthings have no single predetermined outcome, children become creators rather than spectators.\n\n- Encourages deep focus and problem-solving\n- Promotes fine motor dexterity\n- Calms sensory over-stimulation`
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const presetPhotos = [
    {
      label: "Wooden Stacker Play",
      url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1000&q=80",
    },
    {
      label: "Montessori Toy Shelf",
      url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1000&q=80",
    },
    {
      label: "Active Movement & Rocker",
      url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Please provide both a title and article body.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        title: title.trim(),
        excerpt: excerpt.trim() || content.slice(0, 150) + "...",
        content,
        coverImage,
        category,
        readTime: "4 min read",
        author: {
          name: authorName,
          role: authorRole,
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        },
        isPublished: true,
      };

      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to publish blog post");
      }

      await refreshStore();
      router.push("/admin/cms/blog");
    } catch (err: any) {
      setError(err.message || "Failed to publish");
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-wood-200">
        <Link
          href="/admin/cms/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-forest-800 hover:text-forest-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles List</span>
        </Link>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-forest-100 text-forest-800">
          WYSIWYG Mode
        </span>
      </div>

      <div>
        <h1 className="font-serif text-3xl font-bold text-forest-900 tracking-tight">
          Write Journal Article
        </h1>
        <p className="text-xs text-wood-600 mt-1">
          Compose helpful developmental insights that educate parents and boost search engine visibility.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Title, Body with WYSIWYG */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-wood-200/90 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                Article Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 5 Signs Your Toddler Is Ready for Open-Ended Blocks"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-wood-50 border border-wood-300 font-serif font-bold text-base text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                Short Excerpt / Summary
              </label>
              <textarea
                rows={2}
                placeholder="A 1-2 sentence preview for search engines and cards..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-3.5 py-2 rounded-2xl bg-wood-50 border border-wood-300 text-xs text-forest-900"
              />
            </div>

            {/* WYSIWYG Rich Editor */}
            <div>
              <label className="block text-xs font-bold text-forest-900 mb-2">
                Article Body (Use toolbar to format headings & lists)
              </label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your advice on child play, Montessori techniques, and motor milestones..."
              />
            </div>
          </div>
        </div>

        {/* Right Column: Category, Cover Photo, Author */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-wood-200/90 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-forest-900 border-b border-wood-100 pb-2">
              Publish Settings
            </h2>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs font-bold text-forest-900"
              >
                <option value="Montessori at Home">Montessori at Home</option>
                <option value="Developmental Milestones">Developmental Milestones</option>
                <option value="Screen-Free Play">Screen-Free Play</option>
                <option value="Sustainable Parenting">Sustainable Parenting</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">Author Name</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">Author Role</label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs"
              />
            </div>
          </div>

          {/* Cover Photo */}
          <div className="bg-white p-6 rounded-3xl border border-wood-200/90 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-forest-900 border-b border-wood-100 pb-2">
              Cover Photo
            </h2>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-wood-100">
              <Image src={coverImage} alt="Cover Preview" fill className="object-cover" />
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">Photo URL</label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {presetPhotos.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setCoverImage(p.url)}
                  className="px-2 py-1 rounded-lg bg-wood-100 hover:bg-wood-200 text-[10px] font-medium text-wood-800"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-terracotta-50 text-terracotta-700 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 rounded-2xl bg-forest-800 hover:bg-forest-900 text-cream-50 font-bold text-sm shadow-warm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{saving ? "Publishing..." : "Publish Article Now"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
