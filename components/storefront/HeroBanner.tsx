"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/context/StoreContext";
import { ArrowRight, Sparkles, ShieldCheck, Flame, Heart } from "lucide-react";

export const HeroBanner: React.FC = () => {
  const { settings } = useStore();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-cream-50 via-cream-100/40 to-white">
      {/* Background organic colored shapes inspired by Funloof wooden blocks */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-toy-yellow-100/60 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 -ml-20 w-80 h-80 rounded-full bg-toy-teal-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-toy-coral-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Small Batch FOMO Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-toy-coral-50 border border-toy-coral-200 shadow-sm text-toy-coral-800 text-xs font-bold">
              <Flame className="w-4 h-4 text-toy-coral-600 animate-bounce" />
              <span>Small Artisanal Batch #14 • Only 38 Sets Remaining</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-forest-900 tracking-tight leading-[1.12]">
              {settings.heroHeadline || "Replace the 'Screen Trance' with Real Wooden Wonder."}
            </h1>

            {/* Subheadline with humor & attachment */}
            <p className="text-base sm:text-lg text-wood-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {settings.heroSubheadline ||
                "Handcrafted from medicinal Indian Neem and European Beechwood. Toys so delightfully captivating, your toddler will actually forget where you hid the iPad. Non-toxic, battery-free, and 100% Daadi-approved."}
            </p>

            {/* Action Buttons with high-converting urgency */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href={settings.heroCtaLink || "/shop"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-sm shadow-warm hover:shadow-warm-lg transition-all active:scale-[0.98] group"
              >
                <span>{settings.heroCtaText || "Claim Your Batch Before It Sells Out"}</span>
                <ArrowRight className="w-4 h-4 text-toy-yellow-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/shop#ages"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-cream-100 text-forest-900 font-bold text-sm border-2 border-toy-yellow-400/80 shadow-sm transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-toy-coral-500" />
                <span>Shop by Child Age (6m – 6y)</span>
              </Link>
            </div>

            {/* Trust highlights with funny and comforting realities */}
            <div className="pt-6 border-t border-wood-200/80 grid grid-cols-3 gap-3 text-left max-w-md mx-auto lg:mx-0">
              <div className="p-3 rounded-2xl bg-white border border-toy-coral-100 shadow-sm">
                <div className="font-serif font-bold text-toy-coral-600 text-sm sm:text-base">Zero Screeching</div>
                <div className="text-[11px] text-wood-600">No dead batteries at 8 PM</div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-toy-green-100 shadow-sm">
                <div className="font-serif font-bold text-toy-green-600 text-sm sm:text-base">100% Drool Safe</div>
                <div className="text-[11px] text-wood-600">Turmeric & plant stains</div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-toy-teal-100 shadow-sm">
                <div className="font-serif font-bold text-toy-teal-600 text-sm sm:text-base">Marble-Floor Safe</div>
                <div className="text-[11px] text-wood-600">Won&apos;t shatter when thrown</div>
              </div>
            </div>
          </div>

          {/* Right Image Feature with FOMO Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-4xl overflow-hidden shadow-warm-lg border-4 border-white">
              <Image
                src={settings.heroImage}
                alt="Montessori wooden educational toys by Funloof"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent" />

              {/* Floating Testimonial Card with Indian Mother Review */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-wood-200 shadow-lg">
                <div className="flex items-center gap-1 text-toy-yellow-500 mb-1">
                  {"★".repeat(5)}
                </div>
                <p className="text-xs text-forest-900 font-medium italic">
                  &ldquo;I was skeptical because my 2-year-old was glued to rhymes during lunch. He sat for 45 straight minutes building arches. Even my mother-in-law was shocked!&rdquo;
                </p>
                <span className="text-[10px] text-wood-600 font-bold uppercase tracking-wider block mt-1">
                  — Priya Sharma, Bengaluru • Verified Funloof Parent
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
