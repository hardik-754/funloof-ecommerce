"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/context/StoreContext";
import { Product } from "@/lib/types";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function AdminProductsPage() {
  const { products, refreshStore } = useStore();
  const [search, setSearch] = useState("");
  const [filterAge, setFilterAge] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredProducts = products.filter((p) => {
    if (filterAge !== "all" && p.ageGroup !== filterAge) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from the store catalog?`)) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        await refreshStore();
      } else {
        alert("Failed to delete product");
      }
    } catch (e) {
      alert("Error deleting product");
    } finally {
      setDeletingId(null);
    }
  };

  const handleStockUpdate = async (id: string, currentStock: number, delta: number) => {
    const newStock = Math.max(0, currentStock + delta);
    try {
      await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: newStock }),
      });
      await refreshStore();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-forest-900 tracking-tight">
            Toy Catalog & Inventory
          </h1>
          <p className="text-xs text-wood-600 mt-1">
            Manage your wooden educational toys, pricing, stock levels, and developmental tags.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-forest-800 hover:bg-forest-900 text-cream-50 font-bold text-xs shadow-warm transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Toy (No-Code Form)</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-wood-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search toy by name, skill, materials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs text-forest-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
          />
          <Search className="w-4 h-4 text-wood-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto text-xs">
          <span className="text-wood-600 font-medium">Age Bracket:</span>
          <select
            value={filterAge}
            onChange={(e) => setFilterAge(e.target.value)}
            className="bg-wood-50 border border-wood-300 px-3 py-2 rounded-xl text-xs text-forest-900 font-semibold cursor-pointer"
          >
            <option value="all">All Ages</option>
            <option value="0-12m">0 – 12m (Sensory)</option>
            <option value="1-3y">1 – 3y (Toddler)</option>
            <option value="3-5y">3 – 5y (Preschool)</option>
            <option value="5y+">5y+ (STEM Logic)</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-wood-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100/60 text-forest-900 font-bold uppercase tracking-wider border-b border-wood-200">
              <tr>
                <th className="py-3.5 px-6">Product</th>
                <th className="py-3.5 px-4">Age / Skills</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Workshop Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wood-100 text-forest-900">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-cream-50/50 transition-colors">
                  {/* Product Details */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-wood-100 flex-shrink-0 border border-wood-200">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/products/${product.slug}`}
                          target="_blank"
                          className="font-serif font-bold text-sm text-forest-900 hover:text-forest-600 line-clamp-1 flex items-center gap-1"
                        >
                          <span>{product.name}</span>
                          <ExternalLink className="w-3 h-3 text-wood-400" />
                        </Link>
                        <p className="text-[11px] text-wood-500 line-clamp-1">{product.tagline}</p>
                      </div>
                    </div>
                  </td>

                  {/* Age & Skills */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-forest-100 text-forest-800 text-[10px] font-bold">
                        {product.ageLabel}
                      </span>
                      <div className="text-[10px] text-wood-600 line-clamp-1">
                        {product.skills.slice(0, 2).join(", ")}
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4">
                    <div className="font-serif font-bold text-sm">₹{product.price.toLocaleString("en-IN")}</div>
                    {product.compareAtPrice && (
                      <span className="text-[10px] text-wood-400 line-through">
                        ₹{product.compareAtPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </td>

                  {/* Stock Counter with Quick Inline Buttons */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleStockUpdate(product.id, product.stock, -1)}
                        className="w-6 h-6 rounded-lg bg-wood-100 hover:bg-wood-200 flex items-center justify-center font-bold text-wood-700"
                        title="Reduce stock by 1"
                      >
                        -
                      </button>
                      <span
                        className={`font-bold px-2 py-0.5 rounded-lg text-xs ${
                          product.stock <= 15
                            ? "bg-terracotta-100 text-terracotta-800"
                            : "bg-forest-50 text-forest-900"
                        }`}
                      >
                        {product.stock} units
                      </span>
                      <button
                        type="button"
                        onClick={() => handleStockUpdate(product.id, product.stock, 1)}
                        className="w-6 h-6 rounded-lg bg-wood-100 hover:bg-wood-200 flex items-center justify-center font-bold text-wood-700"
                        title="Add 1 to stock"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Badges */}
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1 items-start">
                      {product.isBestSeller && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> Best Seller
                        </span>
                      )}
                      {product.stock > 0 ? (
                        <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live
                        </span>
                      ) : (
                        <span className="text-terracotta-600 font-semibold text-[11px]">Out of Stock</span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="p-2 rounded-xl bg-wood-100 hover:bg-forest-800 hover:text-white transition-colors"
                        title="Edit product"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id, product.name)}
                        disabled={deletingId === product.id}
                        className="p-2 rounded-xl bg-wood-100 hover:bg-terracotta-600 hover:text-white transition-colors disabled:opacity-50"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
