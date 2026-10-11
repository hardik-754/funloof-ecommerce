"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/context/CartContext";
import { useStore } from "@/lib/context/StoreContext";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { settings } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isAdminRoute = pathname?.startsWith("/admin");

  // Don't render storefront navbar on admin pages
  if (isAdminRoute) return null;

  return (
    <>
      {/* Playful Colorful Wooden Blocks Top Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-toy-walnut-500 via-toy-yellow-500 via-toy-coral-500 via-toy-green-500 to-toy-teal-500" />

      {/* CMS Driven Top Announcement Bar */}
      {settings.announcementText && (
        <aside
          aria-label="Announcement"
          className="bg-forest-950 text-cream-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-toy-yellow-500 animate-pulse" />
            {settings.announcementText}
          </span>
          <Link
            href={settings.announcementLink || "/shop"}
            className="text-toy-yellow-200 underline underline-offset-2 hover:text-white transition-colors hidden sm:inline font-bold"
          >
            Shop Now &rarr;
          </Link>
        </aside>
      )}

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-wood-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-forest-800 hover:bg-wood-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo with the uploaded Funloof wooden logo image */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-12 h-12 rounded-2xl bg-cream-50 p-1 border border-wood-200 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src="/images/funloof-logo.png"
                    alt="Funloof Logo"
                    fill
                    sizes="48px"
                    priority
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-serif text-2xl font-bold tracking-tight text-forest-900 leading-none">
                      funloof
                    </span>
                    <span className="w-2 h-2 rounded-full bg-toy-coral-500" />
                  </div>
                  <span className="text-[10px] tracking-wider uppercase font-semibold text-wood-600 block mt-0.5">
                    Crafted in India • Built for curiosity
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-forest-900">
              <Link
                href="/shop"
                className={`hover:text-toy-teal-600 transition-colors ${
                  pathname === "/shop" ? "text-toy-teal-600 font-bold" : ""
                }`}
              >
                All Wooden Toys
              </Link>

              {/* By Age Dropdown */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1 hover:text-toy-coral-600 transition-colors">
                  <span>Shop by Age</span>
                  <ChevronDown className="w-4 h-4 text-wood-400 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-white rounded-3xl shadow-warm-lg border border-wood-200 p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link
                    href="/shop?age=0-12m"
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-toy-yellow-50 transition-colors text-forest-900 group/item"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-toy-yellow-500" />
                      <div>
                        <div className="font-bold text-xs group-hover/item:text-toy-yellow-700">0 – 12 Months</div>
                        <div className="text-[11px] text-wood-500">Sensory & Grasping</div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/shop?age=1-3y"
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-toy-coral-50 transition-colors text-forest-900 group/item"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-toy-coral-500" />
                      <div>
                        <div className="font-bold text-xs group-hover/item:text-toy-coral-700">1 – 3 Years</div>
                        <div className="text-[11px] text-wood-500">Toddler Motor & Balance</div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/shop?age=3-5y"
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-toy-green-50 transition-colors text-forest-900 group/item"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-toy-green-500" />
                      <div>
                        <div className="font-bold text-xs group-hover/item:text-toy-green-700">3 – 5 Years</div>
                        <div className="text-[11px] text-wood-500">Preschool STEM & Blocks</div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/shop?age=5y+"
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-toy-teal-50 transition-colors text-forest-900 group/item"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-toy-teal-500" />
                      <div>
                        <div className="font-bold text-xs group-hover/item:text-toy-teal-700">5+ Years</div>
                        <div className="text-[11px] text-wood-500">Kinetic Physics & Logic</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* By Skill Dropdown */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1 hover:text-toy-green-600 transition-colors">
                  <span>Shop by Skill</span>
                  <ChevronDown className="w-4 h-4 text-wood-400 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 w-72 bg-white rounded-3xl shadow-warm-lg border border-wood-200 p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link
                    href="/shop?skill=Fine+Motor+Skills"
                    className="block p-2.5 rounded-2xl hover:bg-cream-100 transition-colors text-forest-900"
                  >
                    <div className="font-bold text-xs text-toy-coral-600">Fine Motor Skills</div>
                    <div className="text-[11px] text-wood-600">Pincer grasp, finger dexterity</div>
                  </Link>
                  <Link
                    href="/shop?skill=STEM+%26+Logic"
                    className="block p-2.5 rounded-2xl hover:bg-cream-100 transition-colors text-forest-900"
                  >
                    <div className="font-bold text-xs text-toy-teal-600">STEM & Logic</div>
                    <div className="text-[11px] text-wood-600">Physics, cause-and-effect, sequencing</div>
                  </Link>
                  <Link
                    href="/shop?skill=Spatial+Reasoning"
                    className="block p-2.5 rounded-2xl hover:bg-cream-100 transition-colors text-forest-900"
                  >
                    <div className="font-bold text-xs text-toy-green-600">Spatial Reasoning</div>
                    <div className="text-[11px] text-wood-600">Architecture & 3D balance</div>
                  </Link>
                  <Link
                    href="/shop?skill=Sensory+Play"
                    className="block p-2.5 rounded-2xl hover:bg-cream-100 transition-colors text-forest-900"
                  >
                    <div className="font-bold text-xs text-toy-yellow-600">Sensory Play</div>
                    <div className="text-[11px] text-wood-600">Acoustic, tactile & natural wood touch</div>
                  </Link>
                </div>
              </div>

              <Link
                href="/journal"
                className={`hover:text-toy-teal-600 transition-colors ${
                  pathname?.startsWith("/journal") ? "text-toy-teal-600 font-bold" : ""
                }`}
              >
                Parenting Journal
              </Link>
            </nav>

            {/* Actions: Search & Shopping Bag (NO ADMIN PANEL VISIBLE HERE!) */}
            <div className="flex items-center gap-3">
              {/* Search toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-2xl text-forest-800 hover:bg-cream-100 transition-colors"
                aria-label="Search toys"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Shopping Bag / Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 px-3.5 rounded-2xl bg-forest-900 hover:bg-forest-800 text-cream-50 transition-colors shadow-sm flex items-center gap-2 group"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 text-toy-yellow-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold hidden sm:inline">Bag</span>
                {totalItems > 0 && (
                  <span className="bg-toy-coral-500 text-white text-[11px] font-bold min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center shadow-md animate-scale">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search bar expandable */}
          {searchOpen && (
            <div className="py-3.5 border-t border-wood-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Search wooden blocks, stacking rings, age brackets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-cream-50 border border-wood-300 focus:outline-none focus:ring-2 focus:ring-toy-teal-500 text-sm text-forest-900 font-medium"
                />
                <Search className="w-5 h-5 text-toy-teal-600 absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3.5 top-3 text-xs text-wood-600 hover:text-forest-900 px-2 py-1 rounded-lg hover:bg-wood-200"
                >
                  Close
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile menu modal/drawer (Clean customer view, NO ADMIN BUTTON) */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-wood-200 bg-white px-5 pt-4 pb-6 space-y-4">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-forest-900 hover:text-toy-teal-600"
            >
              All Wooden Toys
            </Link>
            <div className="pl-3 border-l-2 border-toy-yellow-400 space-y-2 py-1">
              <span className="text-[11px] uppercase font-bold text-wood-500 tracking-wider">
                Shop By Child Age
              </span>
              <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-forest-800">
                <Link href="/shop?age=0-12m" onClick={() => setMobileMenuOpen(false)}>
                  0–12m Sensory
                </Link>
                <Link href="/shop?age=1-3y" onClick={() => setMobileMenuOpen(false)}>
                  1–3y Toddler
                </Link>
                <Link href="/shop?age=3-5y" onClick={() => setMobileMenuOpen(false)}>
                  3–5y Preschool
                </Link>
                <Link href="/shop?age=5y+" onClick={() => setMobileMenuOpen(false)}>
                  5y+ Big Kids
                </Link>
              </div>
            </div>
            <Link
              href="/journal"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-forest-900 hover:text-toy-teal-600"
            >
              Parenting & Play Journal
            </Link>
          </div>
        )}
      </header>
    </>
  );
};
