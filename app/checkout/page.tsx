"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/context/CartContext";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  Truck,
  ArrowLeft,
  CheckCircle2,
  TreePine,
  Sparkles,
  Smartphone,
  Banknote,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, shipping, total, clearCart, appliedPromo } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentTab, setPaymentTab] = useState<"upi" | "card" | "cod">("upi");

  // Form State initialized clean with no leaked or prefilled PII
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    deliveryMethod: "express_india",
    upiId: "",
    cardNumber: "",
    cardExp: "",
    cardCvc: "",
    notes: "",
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50/50 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-forest-900 mb-2">No Toys in Checkout</h2>
        <p className="text-xs text-wood-600 mb-6">Your khilona bag is currently empty.</p>
        <Link href="/shop" className="px-6 py-3 rounded-2xl bg-forest-800 text-cream-50 text-xs font-semibold">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const gstAmount = Math.round(subtotal * 0.05);
  const finalPayable = Math.round(total + gstAmount);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const paymentMethodTitle =
        paymentTab === "upi"
          ? `UPI (${formData.upiId})`
          : paymentTab === "card"
          ? "Credit/Debit Card (RuPay/Visa/MasterCard)"
          : "Cash on Delivery (Verified)";

      const orderPayload = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          productImage: i.product.images[0],
          price: i.product.price,
          quantity: i.quantity,
        })),
        subtotal: Math.round(subtotal),
        discount: Math.round(discount),
        shipping: Math.round(shipping),
        tax: gstAmount,
        total: finalPayable,
        paymentMethod: paymentMethodTitle,
        notes: formData.notes,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        throw new Error("Failed to process order. Please try again.");
      }

      const createdOrder = await res.json();
      clearCart();
      router.push(`/checkout/success?orderNumber=${createdOrder.orderNumber}&total=${createdOrder.total}`);
    } catch (err: any) {
      setError(err.message || "An error occurred during checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-wood-200">
          <Link href="/cart" className="inline-flex items-center gap-2 text-xs font-bold text-forest-800 hover:text-forest-600">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Toy Bag</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-forest-800">
            <Lock className="w-4 h-4 text-forest-700" />
            <span>256-Bit Encrypted Indian Payment Gateway</span>
          </div>
        </div>

        {/* Checkout Form & Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form Fields */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handleSubmitOrder} className="space-y-8">
              {/* SECTION 1: Contact Details */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-wood-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-wood-100 pb-3">
                  <h2 className="font-serif text-lg font-bold text-forest-900">
                    1. Parent & Contact Details
                  </h2>
                  <span className="text-xs text-wood-500">For WhatsApp & SMS dispatch alerts</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-forest-900 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. priya.sharma@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-wood-50 border border-wood-300 focus:outline-none focus:ring-1 focus:ring-forest-700"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-forest-900 mb-1">Mobile Number (WhatsApp tracking) *</label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-wood-50 border border-wood-300 focus:outline-none focus:ring-1 focus:ring-forest-700"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Shipping Destination */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-wood-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-wood-100 pb-3">
                  <h2 className="font-serif text-lg font-bold text-forest-900">
                    2. Delivery Address (Across India)
                  </h2>
                  <span className="text-xs text-wood-500">Express air courier delivery</span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-forest-900 mb-1">Parent or Guardian Full Name *</label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-wood-50 border border-wood-300 focus:outline-none focus:ring-1 focus:ring-forest-700"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-forest-900 mb-1">Flat / House No. & Apartment Name *</label>
                    <input
                      type="text"
                      required
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleChange}
                      placeholder="e.g. Flat 402, Palm Meadows"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-wood-50 border border-wood-300 focus:outline-none focus:ring-1 focus:ring-forest-700"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-forest-900 mb-1">Street / Area / Landmark</label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleChange}
                      placeholder="e.g. Near Forum Value Mall, Whitefield"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-wood-50 border border-wood-300 focus:outline-none focus:ring-1 focus:ring-forest-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-semibold text-forest-900 mb-1">City *</label>
                      <input
                        type="text"
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Bengaluru"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-wood-50 border border-wood-300 focus:outline-none focus:ring-1 focus:ring-forest-700"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-forest-900 mb-1">State *</label>
                      <input
                        type="text"
                        required
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="e.g. Karnataka"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-wood-50 border border-wood-300 focus:outline-none focus:ring-1 focus:ring-forest-700"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-forest-900 mb-1">PIN Code *</label>
                      <input
                        type="text"
                        required
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        maxLength={6}
                        placeholder="e.g. 560066"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-wood-50 border border-wood-300 focus:outline-none focus:ring-1 focus:ring-forest-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-forest-900 mb-1">Delivery Instructions or Gift Note</label>
                    <textarea
                      rows={2}
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Special instructions (e.g. Do not ring bell between 2–4 PM, or include a birthday greeting for the child)..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-wood-50 border border-wood-300 focus:outline-none focus:ring-1 focus:ring-forest-700 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Payment Options (UPI / Cards / COD) */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-wood-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-wood-100 pb-3">
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-lg font-bold text-forest-900">
                      3. Payment Method
                    </h2>
                    <span className="text-[10px] bg-forest-100 text-forest-800 font-bold px-2 py-0.5 rounded-full">
                      Instant & Safe
                    </span>
                  </div>
                  <CreditCard className="w-5 h-5 text-forest-700" />
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-wood-100/70 rounded-2xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setPaymentTab("upi")}
                    className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                      paymentTab === "upi"
                        ? "bg-white text-forest-900 shadow-sm"
                        : "text-wood-600 hover:text-forest-800"
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-forest-600" />
                    <span>UPI (GPay / PhonePe)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab("card")}
                    className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                      paymentTab === "card"
                        ? "bg-white text-forest-900 shadow-sm"
                        : "text-wood-600 hover:text-forest-800"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-forest-600" />
                    <span>Cards (RuPay/Visa)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab("cod")}
                    className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                      paymentTab === "cod"
                        ? "bg-white text-forest-900 shadow-sm"
                        : "text-wood-600 hover:text-forest-800"
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-forest-600" />
                    <span>Cash on Delivery</span>
                  </button>
                </div>

                {/* Tab 1: UPI */}
                {paymentTab === "upi" && (
                  <div className="p-4 rounded-2xl bg-cream-50 border border-wood-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-forest-900">Virtual Payment Address (VPA / UPI ID)</label>
                      <span className="text-[11px] font-bold text-forest-700">Instant Verification</span>
                    </div>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      placeholder="e.g. mobile@upi or username@okhdfcbank"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-wood-300 font-mono text-xs text-forest-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
                    />
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-wood-500">
                      <Sparkles className="w-3.5 h-3.5 text-toy-yellow-600 flex-shrink-0" />
                      <span>Supports Google Pay, PhonePe, Paytm, BHIM, Cred, and all major Indian UPI apps.</span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Cards */}
                {paymentTab === "card" && (
                  <div className="p-4 rounded-2xl bg-cream-50 border border-wood-200 space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-forest-900 mb-1">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-wood-300 font-mono text-xs text-forest-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
                        />
                        <div className="absolute right-3 top-2.5 flex items-center gap-1 text-[10px] font-bold text-forest-700">
                          RUPAY / VISA / MASTERCARD
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-semibold text-forest-900 mb-1">Valid Thru</label>
                        <input
                          type="text"
                          name="cardExp"
                          value={formData.cardExp}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-wood-300 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-forest-700"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-forest-900 mb-1">CVV</label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleChange}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-wood-300 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-forest-700"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: COD */}
                {paymentTab === "cod" && (
                  <div className="p-4 rounded-2xl bg-cream-50 border border-wood-200 text-xs text-wood-700 space-y-2">
                    <p className="font-semibold text-forest-900">
                      Pay cash or scan QR upon doorstep delivery.
                    </p>
                    <p className="text-[11px] leading-relaxed">
                      Our courier executive will present a verified Funloof parcel. Please keep exact change or UPI ready at the time of delivery.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-terracotta-50 border border-terracotta-200 rounded-xl text-xs text-terracotta-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-forest-800 hover:bg-forest-900 text-cream-50 font-bold text-sm shadow-warm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {loading ? "Confirming Order..." : `Pay ₹${finalPayable.toLocaleString("en-IN")} & Confirm Order`}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-wood-200/90 shadow-sm space-y-6 sticky top-28">
              <h3 className="font-serif text-lg font-bold text-forest-900 pb-3 border-b border-wood-100">
                Order Review ({items.length} {items.length === 1 ? "toy" : "toys"})
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-wood-100 flex-shrink-0">
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-serif font-bold text-forest-900 line-clamp-1 block">
                          {item.product.name}
                        </span>
                        <span className="text-wood-500">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-forest-900">
                      ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="pt-4 border-t border-wood-100 space-y-2 text-xs text-wood-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-forest-900">₹{Math.round(subtotal).toLocaleString("en-IN")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-forest-700 font-semibold">
                    <span>Discount Coupon ({appliedPromo})</span>
                    <span>-₹{Math.round(discount).toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Courier Across India</span>
                  <span>{shipping === 0 ? <strong className="text-forest-700">FREE</strong> : `₹${Math.round(shipping)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5% Included)</span>
                  <span>₹{gstAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="pt-3 border-t border-wood-200 flex justify-between text-base font-bold text-forest-900">
                  <span>Grand Total</span>
                  <span className="font-serif text-xl">₹{finalPayable.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="p-4 rounded-2xl bg-cream-50 border border-wood-200 text-xs text-wood-700 space-y-2.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0" />
                  <span>Plastic-free, 100% recyclable honeycomb packing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0" />
                  <span>Tested on Indian marble floors & completely drool-proof</span>
                </div>
                <div className="flex items-center gap-2">
                  <TreePine className="w-4 h-4 text-toy-teal-600 flex-shrink-0" />
                  <span>1 Neem sapling planted for every wooden toy ordered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
