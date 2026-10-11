"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/context/StoreContext";
import { AgeGroup, SkillCategory } from "@/lib/types";
import {
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  TreePine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function NewProductPage() {
  const router = useRouter();
  const { refreshStore } = useStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Product Form state
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("45");
  const [compareAtPrice, setCompareAtPrice] = useState("55");
  const [stock, setStock] = useState("25");
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1000&q=80"
  );
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("1-3y");
  const [ageLabel, setAgeLabel] = useState("12 - 36 Months");

  const [selectedSkills, setSelectedSkills] = useState<SkillCategory[]>([
    "Fine Motor Skills",
    "Spatial Reasoning",
  ]);

  const [materials, setMaterials] = useState<string[]>([
    "100% FSC-Certified European Solid Beechwood",
    "Food-Grade Organic Linseed Oil Sealer",
  ]);
  const [newMaterialInput, setNewMaterialInput] = useState("");

  const [whyParentsLoveIt, setWhyParentsLoveIt] = useState<string[]>([
    "No batteries or loud electronic sounds—encourages calm focus.",
    "Velvet-smooth hand-sanded edges for safe toddler gripping.",
  ]);
  const [newLoveInput, setNewLoveInput] = useState("");

  const [isFeatured, setIsFeatured] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [dimensions, setDimensions] = useState("20 cm x 15 cm x 10 cm");
  const [weight, setWeight] = useState("450 grams");

  const availableSkills: SkillCategory[] = [
    "Fine Motor Skills",
    "STEM & Logic",
    "Spatial Reasoning",
    "Sensory Play",
    "Creative Expression",
    "Hand-Eye Coordination",
  ];

  const presetImages = [
    {
      label: "Stacking & Rings",
      url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1000&q=80",
    },
    {
      label: "Wooden Building Blocks",
      url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1000&q=80",
    },
    {
      label: "Balance Rocker",
      url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1000&q=80",
    },
    {
      label: "Sensory Shakers & Cylinders",
      url: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  const handleToggleSkill = (skill: SkillCategory) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddMaterial = () => {
    if (newMaterialInput.trim()) {
      setMaterials([...materials, newMaterialInput.trim()]);
      setNewMaterialInput("");
    }
  };

  const handleRemoveMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const handleAddLovePoint = () => {
    if (newLoveInput.trim()) {
      setWhyParentsLoveIt([...whyParentsLoveIt, newLoveInput.trim()]);
      setNewLoveInput("");
    }
  };

  const handleRemoveLovePoint = (index: number) => {
    setWhyParentsLoveIt(whyParentsLoveIt.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please provide a toy name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        name: name.trim(),
        tagline: tagline.trim() || "Handcrafted wooden plaything for curious minds.",
        description: description.trim() || `${name} is handcrafted from FSC European timber to inspire screen-free wonder.`,
        price: parseFloat(price) || 39,
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : undefined,
        stock: parseInt(stock, 10) || 20,
        images: [imageUrl],
        ageGroup,
        ageLabel,
        skills: selectedSkills,
        materials,
        safetyCertifications: ["ASTM F963 Certified", "EN71 Compliant", "Zero Heavy Metals"],
        whyParentsLoveIt,
        dimensions,
        weight,
        isFeatured,
        isBestSeller,
        rating: 5.0,
        reviewCount: 1,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      await refreshStore();
      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message || "An error occurred");
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
          No Coding Required
        </span>
      </div>

      <div>
        <h1 className="font-serif text-3xl font-bold text-forest-900 tracking-tight">
          Add New Wooden Toy
        </h1>
        <p className="text-xs text-wood-600 mt-1">
          Complete the form below. Once saved, this toy will immediately appear in the customer storefront and search filters.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Main Product Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Basic Info Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-wood-200/90 shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-forest-900 border-b border-wood-100 pb-2">
              1. Title & Tagline
            </h2>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                Toy Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. The Heirloom Woodland Stacking Rings"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-wood-50 border border-wood-300 text-sm text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                Short Tagline
              </label>
              <input
                type="text"
                placeholder="e.g. Natural beechwood tactile rings with organic vegetable-dyed earthy gradients."
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-2 rounded-2xl bg-wood-50 border border-wood-300 text-xs text-forest-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                Detailed Product Description
              </label>
              <textarea
                rows={4}
                placeholder="Describe the Montessori inspiration, sensory benefits, and craftsmanship..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-wood-50 border border-wood-300 text-xs text-forest-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
              />
            </div>
          </div>

          {/* 2. Age Range & Skills */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-wood-200/90 shadow-sm space-y-5">
            <h2 className="font-serif text-lg font-bold text-forest-900 border-b border-wood-100 pb-2">
              2. Developmental Stage & Skills
            </h2>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-2">
                Age Bracket (Used for &ldquo;Shop by Age&rdquo; filters)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {[
                  { id: "0-12m", label: "0 – 12m", sub: "Sensory & Baby" },
                  { id: "1-3y", label: "1 – 3y", sub: "Toddler Motor" },
                  { id: "3-5y", label: "3 – 5y", sub: "Preschool STEM" },
                  { id: "5y+", label: "5y+", sub: "Big Kids Logic" },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setAgeGroup(tier.id as AgeGroup);
                      setAgeLabel(
                        tier.id === "0-12m"
                          ? "6 - 12 Months"
                          : tier.id === "1-3y"
                          ? "12 - 36 Months"
                          : tier.id === "3-5y"
                          ? "3 - 5 Years"
                          : "5+ Years"
                      );
                    }}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      ageGroup === tier.id
                        ? "bg-forest-800 text-cream-50 border-forest-800 shadow-sm"
                        : "bg-wood-50 text-wood-800 border-wood-200 hover:bg-cream-100"
                    }`}
                  >
                    <div className="font-bold">{tier.label}</div>
                    <div className="text-[10px] opacity-80">{tier.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-2">
                Developmental Skills (Select all that apply)
              </label>
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

          {/* 3. Materials & Why Parents Love It */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-wood-200/90 shadow-sm space-y-5">
            <h2 className="font-serif text-lg font-bold text-forest-900 border-b border-wood-100 pb-2">
              3. Materials & Parent Highlights
            </h2>

            {/* Materials List */}
            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                Eco-Friendly Materials
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="e.g. 100% Solid European Beechwood"
                  value={newMaterialInput}
                  onChange={(e) => setNewMaterialInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddMaterial}
                  className="px-3.5 py-2 rounded-xl bg-forest-800 text-cream-50 font-bold text-xs"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1.5">
                {materials.map((mat, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-wood-50 text-xs">
                    <span className="text-forest-900">{mat}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMaterial(i)}
                      className="text-wood-400 hover:text-terracotta-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Parents Love It */}
            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                &ldquo;Why Parents Love It&rdquo; Bullet Points
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="e.g. No batteries or flashing lights—promotes calm play"
                  value={newLoveInput}
                  onChange={(e) => setNewLoveInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddLovePoint}
                  className="px-3.5 py-2 rounded-xl bg-forest-800 text-cream-50 font-bold text-xs"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1.5">
                {whyParentsLoveIt.map((reason, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-wood-50 text-xs">
                    <span className="text-forest-900">{reason}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLovePoint(i)}
                      className="text-wood-400 hover:text-terracotta-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Image Preview, Pricing & Submit */}
        <div className="lg:col-span-4 space-y-6">
          {/* Image Selector & Live Preview */}
          <div className="bg-white p-6 rounded-3xl border border-wood-200/90 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-forest-900 border-b border-wood-100 pb-2">
              Toy Image
            </h2>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-wood-100 border border-wood-200">
              <Image src={imageUrl} alt="Preview" fill className="object-cover" />
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                Image Web URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs focus:outline-none"
              />
            </div>

            <div>
              <span className="text-[11px] font-semibold text-wood-500 block mb-1.5">
                Or Pick a Preset Demo Photo:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {presetImages.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className="p-1.5 rounded-lg border border-wood-200 text-[10px] font-medium text-wood-800 hover:bg-cream-100 text-left truncate"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-white p-6 rounded-3xl border border-wood-200/90 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-forest-900 border-b border-wood-100 pb-2">
              Pricing & Inventory
            </h2>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-forest-900 mb-1">Price (₹) *</label>
                <input
                  type="number"
                  step="1"
                  required
                  placeholder="e.g. 1499"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-wood-50 border border-wood-300 font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-forest-900 mb-1">Compare-At (₹)</label>
                <input
                  type="number"
                  step="1"
                  placeholder="e.g. 1999"
                  value={compareAtPrice}
                  onChange={(e) => setCompareAtPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-wood-50 border border-wood-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                Workshop Stock Units *
              </label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-wood-50 border border-wood-300 font-bold text-xs"
              />
            </div>

            {/* Badges Toggle */}
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

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-forest-800 hover:bg-forest-900 text-cream-50 font-bold text-sm shadow-warm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{loading ? "Publishing Toy..." : "Publish Toy to Store"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
