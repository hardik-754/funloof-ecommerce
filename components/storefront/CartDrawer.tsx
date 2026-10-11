"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/context/CartContext";
import { X, Trash2, Plus, Minus, ArrowRight, Truck, ShieldCheck, Tag } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
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

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const success = applyPromo(promoInput);
    if (!success) {
      setPromoError("Invalid code. Try BACHPAN for 10% off!");
    } else {
      setPromoInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-forest-950/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-50 shadow-2xl flex flex-col border-l border-wood-200">
          {/* Header */}
          <div className="px-6 py-5 border-b border-wood-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-serif font-bold text-forest-900">Your Toy Bag</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-toy-coral-50 text-toy-coral-700 font-bold">
                {items.length} {items.length === 1 ? "toy" : "toys"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-wood-500 hover:text-forest-900 hover:bg-wood-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-sage-50 border-b border-sage-200 text-xs text-forest-900">
            <div className="flex items-center gap-2 mb-2 font-medium">
              <Truck className="w-4 h-4 text-forest-700 flex-shrink-0" />
              {amountLeftForFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-forest-800">₹{amountLeftForFreeShipping}</strong> more for <strong>FREE Express Delivery across India</strong>!
                </span>
              ) : (
                <span className="text-forest-700 font-bold">🎉 You unlocked FREE Express Delivery across India!</span>
              )}
            </div>
            <div className="w-full h-2 bg-sage-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-forest-600 transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-wood-100 text-wood-400 mx-auto flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-forest-900 mb-1">Your bag is empty</h3>
                <p className="text-xs text-wood-600 mb-6 max-w-xs mx-auto">
                  Handcrafted wooden playthings that outlast smartphones and save living rooms from plastic clutter.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-forest-800 text-cream-50 hover:bg-forest-900 font-semibold text-xs tracking-wide transition-colors"
                >
                  Explore Small-Batch Toys
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3.5 bg-white rounded-3xl border border-wood-200 shadow-sm"
                >
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-wood-100 flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-serif font-semibold text-sm text-forest-900 line-clamp-1 hover:text-toy-teal-600"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          className="text-wood-400 hover:text-toy-coral-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[11px] font-medium text-wood-600">
                        Age: {item.product.ageLabel}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-wood-200 rounded-xl bg-wood-50">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-wood-600 hover:text-forest-900 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-forest-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-1 text-wood-600 hover:text-forest-900 transition-colors disabled:opacity-40"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-sm font-bold text-forest-900">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-wood-200 space-y-4 shadow-lg">
              {/* Promo code */}
              <div className="space-y-1">
                {appliedPromo ? (
                  <div className="flex items-center justify-between text-xs bg-forest-50 border border-forest-200 px-3 py-2 rounded-xl text-forest-800">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-forest-600" />
                      Promo code <strong>{appliedPromo}</strong> applied (10% off)
                    </span>
                    <button
                      type="button"
                      onClick={removePromo}
                      className="text-toy-coral-600 font-semibold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. BACHPAN)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs text-forest-900 focus:outline-none focus:ring-1 focus:ring-forest-600 uppercase font-semibold"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-wood-200 hover:bg-wood-300 text-forest-900 font-semibold text-xs transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && <p className="text-[11px] text-toy-coral-600">{promoError}</p>}
              </div>

              {/* Subtotal breakdown */}
              <div className="space-y-1.5 text-xs text-wood-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-forest-900">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-forest-700 font-medium">
                    <span>Bachpan Discount (10%)</span>
                    <span>-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Delivery across India</span>
                  <span>{shipping === 0 ? <strong className="text-forest-700">FREE</strong> : `₹${shipping}`}</span>
                </div>
                <div className="pt-2 border-t border-wood-200 flex justify-between text-sm font-bold text-forest-900">
                  <span>Total Amount</span>
                  <span className="font-serif text-lg">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-sm shadow-warm transition-transform active:scale-[0.98]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-toy-yellow-400" />
              </Link>

              <div className="text-center">
                <span className="text-[11px] text-wood-500 flex items-center justify-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest-600" />
                  100% Neem & Beech Wood • Plastic-Free Packing
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
