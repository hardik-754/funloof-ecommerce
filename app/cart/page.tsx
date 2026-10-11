"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Tag } from "lucide-react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    discount,
    shipping,
    total,
    appliedPromo,
    applyPromo,
    removePromo,
    amountLeftForFreeShipping,
    freeShippingProgress,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [promoMsg, setPromoMsg] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoMsg("");
    const ok = applyPromo(promoCode);
    if (!ok) {
      setPromoMsg("Arrey! Invalid coupon code. Try BACHPAN or DESIPLAY10 for 10% off!");
    } else {
      setPromoCode("");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50/50 py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-3xl bg-wood-100 flex items-center justify-center text-wood-500 mx-auto mb-6">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-forest-900 mb-2">
            Your Khilona Bag is Empty!
          </h1>
          <p className="text-sm text-wood-700 mb-8 leading-relaxed">
            Zero toys in the basket? Careful—your toddler might spot your car keys, phone, or TV remote next. 
            Save your gadgets and give little hands the sensory magic of real neem & beech wood!
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-forest-800 hover:bg-forest-900 text-cream-50 font-bold text-sm shadow-warm transition-transform"
          >
            <span>Explore Artisanal Toys</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 mb-8">
          Review Your Toy Bag
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free shipping bar */}
            <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 text-xs text-forest-900">
              <div className="flex items-center gap-2 mb-2 font-medium">
                <Truck className="w-4 h-4 text-forest-700" />
                {amountLeftForFreeShipping > 0 ? (
                  <span>
                    Add <strong>₹{Math.round(amountLeftForFreeShipping)}</strong> more to get <strong>Free Express Delivery across India</strong>!
                  </span>
                ) : (
                  <span className="font-bold text-forest-800">
                    🎉 Badhai Ho! You unlocked Free Express Delivery across India!
                  </span>
                )}
              </div>
              <div className="w-full h-2 bg-sage-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-forest-600 rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Item Rows */}
            <div className="bg-white rounded-3xl border border-wood-200/90 divide-y divide-wood-100 overflow-hidden shadow-sm">
              {items.map((item) => (
                <div key={item.product.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-wood-100 flex-shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-serif font-bold text-forest-900 hover:text-forest-600 transition-colors text-base"
                      >
                        {item.product.name}
                      </Link>
                      <div className="text-xs text-wood-500 mt-1">
                        Age: {item.product.ageLabel} • ₹{item.product.price.toLocaleString("en-IN")} each
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-wood-200 rounded-xl bg-wood-50 px-1 py-0.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-wood-600 hover:text-forest-900"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-forest-900">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="p-1.5 text-wood-600 hover:text-forest-900 disabled:opacity-40"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-serif font-bold text-base text-forest-900 block">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-wood-400 hover:text-terracotta-600 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Box */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-3xl border border-wood-200/90 shadow-sm space-y-6">
              <h2 className="font-serif text-xl font-bold text-forest-900 pb-4 border-b border-wood-100">
                Order Summary
              </h2>

              {/* Promo code */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-forest-50 border border-forest-200 text-xs text-forest-900">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-4 h-4 text-forest-700" />
                      Coupon <strong>{appliedPromo}</strong> (10% off)
                    </span>
                    <button
                      type="button"
                      onClick={removePromo}
                      className="text-terracotta-600 font-semibold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon (e.g. BACHPAN)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs uppercase text-forest-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-wood-200 hover:bg-wood-300 text-forest-900 font-semibold text-xs transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMsg && <p className="text-[11px] text-terracotta-600 mt-1">{promoMsg}</p>}
              </div>

              {/* Price rows */}
              <div className="space-y-2 text-xs text-wood-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-forest-900">₹{Math.round(subtotal).toLocaleString("en-IN")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-forest-700 font-semibold">
                    <span>Bachpan Discount</span>
                    <span>-₹{Math.round(discount).toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery across India</span>
                  <span>{shipping === 0 ? <strong className="text-forest-700">FREE</strong> : `₹${Math.round(shipping)}`}</span>
                </div>
                <div className="pt-3 border-t border-wood-200 flex justify-between text-base font-bold text-forest-900">
                  <span>Total Payable</span>
                  <span className="font-serif text-xl">₹{Math.round(total).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-forest-800 hover:bg-forest-900 text-cream-50 font-bold text-sm shadow-warm transition-transform active:scale-[0.98]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
