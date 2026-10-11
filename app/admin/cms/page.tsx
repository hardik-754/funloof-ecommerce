"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/context/StoreContext";
import { SiteSettings } from "@/lib/types";
import {
  Sliders,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
  Eye,
  ExternalLink,
} from "lucide-react";

export default function AdminCmsPage() {
  const { settings, refreshStore } = useStore();

  const [announcementText, setAnnouncementText] = useState("");
  const [announcementLink, setAnnouncementLink] = useState("");
  const [heroBadge, setHeroBadge] = useState("");
  const [heroHeadline, setHeroHeadline] = useState("");
  const [heroSubheadline, setHeroSubheadline] = useState("");
  const [heroCtaText, setHeroCtaText] = useState("");
  const [heroCtaLink, setHeroCtaLink] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("50");

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    if (settings) {
      setAnnouncementText(settings.announcementText);
      setAnnouncementLink(settings.announcementLink);
      setHeroBadge(settings.heroBadge);
      setHeroHeadline(settings.heroHeadline);
      setHeroSubheadline(settings.heroSubheadline);
      setHeroCtaText(settings.heroCtaText);
      setHeroCtaLink(settings.heroCtaLink);
      setHeroImage(settings.heroImage);
      setFreeShippingThreshold(settings.freeShippingThreshold.toString());
    }
  }, [settings]);

  const presetHeroImages = [
    {
      label: "Classic Montessori Stacker",
      url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&q=80",
    },
    {
      label: "Geometric Block Architecture",
      url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      label: "Toddler Balance Play",
      url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(false);

    try {
      const payload: Partial<SiteSettings> = {
        announcementText,
        announcementLink,
        heroBadge,
        heroHeadline,
        heroSubheadline,
        heroCtaText,
        heroCtaLink,
        heroImage,
        freeShippingThreshold: parseFloat(freeShippingThreshold) || 50,
      };

      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await refreshStore();
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 4000);
      } else {
        alert("Failed to update site settings");
      }
    } catch (e) {
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-forest-900 tracking-tight">
            Homepage & Banners Visual CMS
          </h1>
          <p className="text-xs text-wood-600 mt-1">
            Swap headlines, announcement ribbons, and hero photography with real-time preview—no code needed.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-wood-50 text-forest-900 border border-wood-300 text-xs font-semibold shadow-sm"
        >
          <span>View Public Storefront</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Editor Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Announcement Bar Ribbon */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-wood-200/90 shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-forest-900 border-b border-wood-100 pb-2">
              Top Announcement Ribbon
            </h2>
            <p className="text-xs text-wood-600">
              The high-visibility ribbon displayed at the very top of every storefront page.
            </p>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                Announcement Text
              </label>
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-wood-50 border border-wood-300 text-xs text-forest-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                Click Target Link
              </label>
              <input
                type="text"
                value={announcementLink}
                onChange={(e) => setAnnouncementLink(e.target.value)}
                placeholder="/shop"
                className="w-full px-3.5 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs"
              />
            </div>
          </div>

          {/* Hero Banner Controls */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-wood-200/90 shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-forest-900 border-b border-wood-100 pb-2">
              Homepage Hero Section
            </h2>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                Top Floating Pill Badge
              </label>
              <input
                type="text"
                value={heroBadge}
                onChange={(e) => setHeroBadge(e.target.value)}
                placeholder="100% Organic & Non-Toxic Wooden Toys"
                className="w-full px-3.5 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                Main Hero Headline
              </label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-wood-50 border border-wood-300 text-sm font-serif font-bold text-forest-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                Hero Subtitle / Mission Statement
              </label>
              <textarea
                rows={3}
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-wood-50 border border-wood-300 text-xs text-forest-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-forest-900 mb-1">CTA Button Label</label>
                <input
                  type="text"
                  value={heroCtaText}
                  onChange={(e) => setHeroCtaText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-wood-50 border border-wood-300"
                />
              </div>
              <div>
                <label className="block font-bold text-forest-900 mb-1">CTA Button Link</label>
                <input
                  type="text"
                  value={heroCtaLink}
                  onChange={(e) => setHeroCtaLink(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-wood-50 border border-wood-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                Hero Image URL
              </label>
              <input
                type="text"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs"
              />
              <div className="flex gap-2 mt-2">
                {presetHeroImages.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setHeroImage(p.url)}
                    className="px-2.5 py-1 rounded-lg bg-wood-100 hover:bg-wood-200 text-[10px] font-semibold text-wood-800"
                  >
                    Preset: {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Store Policies & Thresholds */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-wood-200/90 shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-forest-900 border-b border-wood-100 pb-2">
              Shipping & Store Threshold
            </h2>
            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">
                Free Carbon-Neutral Shipping Threshold ($)
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(e.target.value)}
                className="w-32 px-3 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs font-bold"
              />
            </div>
          </div>

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Settings updated successfully! The storefront is now reflecting your changes.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 rounded-2xl bg-forest-800 hover:bg-forest-900 text-cream-50 font-bold text-sm shadow-warm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{saving ? "Publishing Updates..." : "Publish Banner & CMS Changes"}</span>
          </button>
        </div>

        {/* RIGHT: Live Visual Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-24 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-forest-900 uppercase tracking-wider">
              <Eye className="w-4 h-4 text-forest-700" />
              <span>Live Visual Preview</span>
            </div>

            {/* Preview Container */}
            <div className="rounded-3xl border-2 border-forest-900/10 overflow-hidden shadow-warm bg-cream-50 text-left">
              {/* Preview Announcement Bar */}
              <div className="bg-forest-900 text-cream-100 py-1.5 px-3 text-[10px] text-center font-medium line-clamp-1">
                {announcementText || "Announcement Ribbon Preview"}
              </div>

              {/* Preview Hero Content */}
              <div className="p-6 space-y-4">
                <span className="inline-block px-2 py-0.5 rounded-full bg-forest-100 text-forest-800 text-[10px] font-bold">
                  {heroBadge || "Pill Badge"}
                </span>

                <h3 className="font-serif text-xl font-bold text-forest-900 leading-tight">
                  {heroHeadline || "Headline Preview"}
                </h3>

                <p className="text-xs text-wood-700 line-clamp-3 leading-relaxed">
                  {heroSubheadline || "Subheadline preview text will display here on the storefront."}
                </p>

                <div className="pt-1">
                  <span className="inline-block px-4 py-2 rounded-xl bg-forest-800 text-cream-50 text-xs font-semibold">
                    {heroCtaText || "Explore Toys"} &rarr;
                  </span>
                </div>

                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-wood-200 mt-4 border border-wood-300">
                  {heroImage ? (
                    <Image src={heroImage} alt="Hero Preview" fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-wood-500">
                      No Image Set
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-wood-200 text-[11px] text-wood-600">
              💡 <strong>Store Owner Tip:</strong> You can change the seasonal banner here anytime (e.g., Spring Montessori Festival or Holiday Gifting) without writing a line of code!
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
