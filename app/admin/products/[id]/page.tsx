"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/context/StoreContext";
import { AgeGroup, SkillCategory, Product } from "@/lib/types";
import { ArrowLeft, CheckCircle2, Trash2, Sparkles } from "lucide-react";

export default function EditProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { products, refreshStore } = useStore();

  const product = products.find((p) => p.id === id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [compareAtPrice, setCompareAtPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("1-3y");
  const [ageLabel, setAgeLabel] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<SkillCategory[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setTagline(product.tagline);
      setDescription(product.description);
      setPrice(product.price.toString());
      setCompareAtPrice(product.compareAtPrice ? product.compareAtPrice.toString() : "");
      setStock(product.stock.toString());
      setImageUrl(product.images[0] || "");
      setAgeGroup(product.ageGroup);
      setAgeLabel(product.ageLabel);
      setSelectedSkills(product.skills);
      setIsFeatured(product.isFeatured);
      setIsBestSeller(product.isBestSeller);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-forest-900 mb-2">Toy Not Found</h2>
        <Link href="/admin/products" className="text-xs text-forest-700 underline font-semibold">
          Back to products list
        </Link>
      </div>
    );
  }

  const availableSkills: SkillCategory[] = [
    "Fine Motor Skills",
    "STEM & Logic",
    "Spatial Reasoning",
    "Sensory Play",
    "Creative Expression",
    "Hand-Eye Coordination",
  ];

  const handleToggleSkill = (skill: SkillCategory) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        name,
        tagline,
        description,
        price: parseFloat(price) || product.price,
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : undefined,
        stock: parseInt(stock, 10) || product.stock,
        images: [imageUrl],
        ageGroup,
        ageLabel,
        skills: selectedSkills,
        isFeatured,
        isBestSeller,
      };

      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      await refreshStore();
      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message || "Failed to update product");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-wood-200">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-forest-800 hover:text-forest-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products Table</span>
        </Link>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-forest-100 text-forest-800">
          Editing: {product.name}
        </span>
      </div>

      <div>
        <h1 className="font-serif text-3xl font-bold text-forest-900 tracking-tight">
          Edit Toy Details
        </h1>
        <p className="text-xs text-wood-600 mt-1">
          Adjust pricing, stock levels, imagery, or developmental age tags.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-wood-200/90 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">Toy Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-wood-50 border border-wood-300 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-2 rounded-2xl bg-wood-50 border border-wood-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-wood-50 border border-wood-300 text-xs"
              />
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-wood-200/90 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-forest-900">Developmental Skills</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {availableSkills.map((skill) => {
                const selected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleToggleSkill(skill)}
                    className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-between text-left transition-colors ${
                      selected
                        ? "bg-forest-100 text-forest-900 border-forest-400"
                        : "bg-wood-50 text-wood-700 border-wood-200 hover:bg-wood-100"
                    }`}
                  >
                    <span className="text-[11px]">{skill}</span>
                    {selected && <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-wood-200/90 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-forest-900">Toy Photo</h2>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-wood-100">
              <Image src={imageUrl || product.images[0]} alt="Preview" fill className="object-cover" />
            </div>
            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">Photo URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-wood-200/90 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-forest-900">Price & Stock</h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-forest-900 mb-1">Price (₹)</label>
                <input
                  type="number"
                  step="1"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-wood-50 border border-wood-300 font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-forest-900 mb-1">Stock</label>
                <input
                  type="number"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-wood-50 border border-wood-300 font-bold"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-wood-100 text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-forest-900">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-forest-700"
                />
                <span>Feature on Homepage</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-forest-900">
                <input
                  type="checkbox"
                  checked={isBestSeller}
                  onChange={(e) => setIsBestSeller(e.target.checked)}
                  className="rounded text-forest-700"
                />
                <span>Mark as &ldquo;Best Seller&rdquo;</span>
              </label>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-terracotta-50 text-terracotta-700 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-forest-800 hover:bg-forest-900 text-cream-50 font-bold text-sm shadow-warm flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{loading ? "Saving Changes..." : "Save Product Updates"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
