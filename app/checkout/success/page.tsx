"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { CheckCircle2, TreePine, ArrowRight } from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams?.get("orderNumber") || "FNL-CONFIRMED";
  const total = searchParams?.get("total") || "0";

  useEffect(() => {
    // Run celebratory eco confetti with Funloof block colors
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#F5A623", "#E25C38", "#4E8B38", "#1F8A96", "#7C4724"],
      });
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen bg-cream-50/50 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Brand Logo */}
        <div className="relative w-16 h-16 mx-auto mb-4 bg-white p-2 rounded-3xl border border-wood-200 shadow-sm">
          <Image src="/images/funloof-logo.png" alt="Funloof" fill className="object-contain p-1" />
        </div>

        <div className="w-16 h-16 rounded-full bg-toy-green-100 text-toy-green-700 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-toy-teal-700 block mb-2">
          Payment Confirmed • Carbon-Neutral Dispatch Initiated
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 mb-3">
          Thank You for Nurturing Mindful Play!
        </h1>

        <p className="text-sm text-wood-700 mb-8 max-w-lg mx-auto leading-relaxed">
          Your order has been received. Our workshop team is lovingly inspecting, packing, and sealing your wooden toys in biodegradable packaging.
        </p>

        {/* Order Details Receipt Box */}
        <div className="bg-white rounded-4xl p-6 sm:p-8 border border-wood-200/90 shadow-sm text-left space-y-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-wood-100">
            <div>
              <span className="text-[11px] font-semibold text-wood-500 uppercase tracking-wider block">
                Order Reference
              </span>
              <span className="font-serif text-2xl font-bold text-forest-900">{orderNumber}</span>
            </div>
            <div className="sm:text-right">
              <span className="text-[11px] font-semibold text-wood-500 uppercase tracking-wider block">
                Amount Paid
              </span>
              <span className="font-serif text-2xl font-bold text-forest-900">₹{total}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-wood-700">
            <div>
              <strong className="block text-forest-900 mb-1">Estimated Dispatch:</strong>
              <span>Within 24 Hours via Blue Dart / Express Air</span>
            </div>
            <div>
              <strong className="block text-forest-900 mb-1">Estimated Delivery:</strong>
              <span>3 – 5 Business Days</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200 flex items-center gap-3 text-xs text-forest-900">
            <TreePine className="w-5 h-5 text-toy-green-600 flex-shrink-0" />
            <span>
              <strong>1 Tree Planted:</strong> We planted an indigenous neem sapling in your child&apos;s honour via our reforestation pledge.
            </span>
          </div>
        </div>

        {/* Action Buttons (Strictly customer-facing, no admin link) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs shadow-warm transition-transform active:scale-95"
          >
            <span>Continue Exploring Toys</span>
            <ArrowRight className="w-4 h-4 text-toy-yellow-400" />
          </Link>

          <Link
            href="/journal"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-cream-100 text-forest-900 font-bold text-xs border border-wood-300 shadow-sm transition-colors"
          >
            <span>Read Parenting Journal &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream-50/50 py-20 text-center text-xs text-wood-600 font-medium">
          Loading order receipt...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
