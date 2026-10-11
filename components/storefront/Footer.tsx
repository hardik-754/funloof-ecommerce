"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TreePine, ShieldCheck, Heart, Sparkles, RefreshCw, Mail, Lock } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-950 text-cream-100 pt-16 pb-12 border-t border-forest-900">
      {/* Playful Colorful Accent Stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-toy-walnut-500 via-toy-yellow-500 via-toy-coral-500 via-toy-green-500 to-toy-teal-500 -mt-16 mb-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value badges bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-forest-900/80">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-toy-coral-500/10 border border-toy-coral-500/20 flex items-center justify-center text-toy-coral-400 flex-shrink-0">
              <TreePine className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cream-50">100% FSC Timber</h4>
              <p className="text-[11px] text-wood-300">Responsibly harvested beech & neem</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-toy-yellow-500/10 border border-toy-yellow-500/20 flex items-center justify-center text-toy-yellow-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cream-50">Non-Toxic Botanicals</h4>
              <p className="text-[11px] text-wood-300">Food-grade organic stains & oils</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-toy-teal-500/10 border border-toy-teal-500/20 flex items-center justify-center text-toy-teal-400 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cream-50">Screen-Free Focus</h4>
              <p className="text-[11px] text-wood-300">Montessori & Waldorf developmental</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-toy-green-500/10 border border-toy-green-500/20 flex items-center justify-center text-toy-green-400 flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cream-50">Heirloom Durability</h4>
              <p className="text-[11px] text-wood-300">Built to pass down generations</p>
            </div>
          </div>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl bg-white p-1 shadow-sm flex items-center justify-center">
                <Image
                  src="/images/funloof-logo.png"
                  alt="Funloof Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-none">
                  funloof
                </span>
                <span className="text-[10px] uppercase font-semibold text-toy-yellow-300 tracking-wider block mt-1">
                  Crafted in India • Built for curiosity
                </span>
              </div>
            </Link>

            <p className="text-xs text-wood-300 leading-relaxed max-w-sm">
              We design wholesome, tactile wooden playthings that invite toddlers to touch, balance, build, and wonder. Handcrafted in India with reverence for natural child development and planetary stewardship.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-[11px] px-3 py-1 rounded-full bg-forest-900 text-toy-yellow-200 border border-forest-800 font-semibold">
                Certified Plastic-Free Packaging
              </span>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-toy-yellow-300">Shop by Age</h4>
            <ul className="space-y-2 text-xs text-wood-300 font-medium">
              <li>
                <Link href="/shop?age=0-12m" className="hover:text-white transition-colors">
                  0–12 Months (Sensory)
                </Link>
              </li>
              <li>
                <Link href="/shop?age=1-3y" className="hover:text-white transition-colors">
                  1–3 Years (Toddler Motor)
                </Link>
              </li>
              <li>
                <Link href="/shop?age=3-5y" className="hover:text-white transition-colors">
                  3–5 Years (STEM Blocks)
                </Link>
              </li>
              <li>
                <Link href="/shop?age=5y+" className="hover:text-white transition-colors">
                  5+ Years (Kinetic Physics)
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn & Values */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-toy-teal-300">Parenting & Play</h4>
            <ul className="space-y-2 text-xs text-wood-300 font-medium">
              <li>
                <Link href="/journal" className="hover:text-white transition-colors">
                  Parenting Journal
                </Link>
              </li>
              <li>
                <Link href="/journal/why-wooden-toys-beat-flashing-screens" className="hover:text-white transition-colors">
                  Why Wooden Toys
                </Link>
              </li>
              <li>
                <Link href="/journal/montessori-inspired-toy-shelf-guide" className="hover:text-white transition-colors">
                  Toy Shelf Rotation Guide
                </Link>
              </li>
              <li>
                <Link href="/journal/plastic-vs-fsc-wooden-toys-guide" className="hover:text-white transition-colors">
                  FSC Timber Certification
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-toy-coral-300">Customer Care</h4>
            <ul className="space-y-2 text-xs text-wood-300 font-medium">
              <li>
                <span className="text-wood-400">Free Express Delivery across India over ₹1,499</span>
              </li>
              <li>
                <span className="text-wood-400">30-Day Marble-Floor Happiness Guarantee</span>
              </li>
              <li>
                <span className="text-wood-400">Care: wipe with organic oil</span>
              </li>
              <li>
                <span className="text-cream-200">care@funloof.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-forest-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-wood-400">
          <p>© {new Date().getFullYear()} Funloof Playthings Co. Crafted in India. Built for curiosity.</p>
          <div className="flex items-center gap-4">
            <Link href="/shop" className="hover:text-cream-100">Privacy Policy</Link>
            <span>•</span>
            <Link href="/shop" className="hover:text-cream-100">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
