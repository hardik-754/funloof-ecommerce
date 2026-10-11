"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/context/CartContext";
import { ShoppingBag, Star, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const getSkillBadgeColor = (skill: string) => {
    if (skill.includes("Motor")) return "bg-toy-coral-50 text-toy-coral-700 border-toy-coral-200";
    if (skill.includes("STEM") || skill.includes("Logic")) return "bg-toy-teal-50 text-toy-teal-700 border-toy-teal-200";
    if (skill.includes("Spatial")) return "bg-toy-green-50 text-toy-green-700 border-toy-green-200";
    if (skill.includes("Sensory")) return "bg-toy-yellow-50 text-toy-yellow-700 border-toy-yellow-200";
    return "bg-wood-100 text-toy-walnut-700 border-wood-200";
  };

  return (
    <div className="group bg-white rounded-4xl overflow-hidden border-2 border-wood-200/80 hover:border-toy-yellow-300 shadow-sm hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-100">
          <Link href={`/products/${product.slug}`} className="block w-full h-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {product.isBestSeller && (
              <span className="bg-forest-900 text-cream-50 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 border border-forest-800">
                <Sparkles className="w-3 h-3 text-toy-yellow-400" />
                Best Seller
              </span>
            )}
            <span className="bg-white/95 backdrop-blur-md text-forest-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm border border-wood-200">
              {product.ageLabel}
            </span>
          </div>

          {/* Low Stock Warning */}
          {product.stock <= 15 && product.stock > 0 && (
            <div className="absolute bottom-3 right-3 bg-toy-coral-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
              Only {product.stock} left
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-5">
          {/* Skill Tag with colorful pills */}
          <div className="flex items-center gap-1.5 flex-wrap mb-2">
            {product.skills.slice(0, 2).map((skill) => (
              <span
                key={skill}
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getSkillBadgeColor(skill)}`}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-serif text-base font-bold text-forest-900 group-hover:text-toy-teal-700 transition-colors line-clamp-1">
            <Link href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Tagline */}
          <p className="text-xs text-wood-600 line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-3">
            <div className="flex items-center text-toy-yellow-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-forest-900">{product.rating.toFixed(1)}</span>
            <span className="text-[11px] text-wood-500 font-medium">({product.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Pricing & Add to Cart */}
      <div className="p-5 pt-0 border-t border-wood-100 flex items-center justify-between mt-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-xl font-bold text-forest-900">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-wood-400 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-toy-green-700 font-bold block">
            ✓ 100% FSC Wood
          </span>
        </div>

        <button
          type="button"
          onClick={() => addItem(product, 1)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-bold shadow-sm transition-transform active:scale-95 group/btn"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag className="w-3.5 h-3.5 text-toy-yellow-400 group-hover/btn:scale-110 transition-transform" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};
