"use client";

import React, { useState } from "react";
import { CheckCircle2, Gift, Sparkles, Flame } from "lucide-react";

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-20 bg-forest-950 text-cream-50 relative overflow-hidden">
      {/* Subtle organic background ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-forest-900 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 text-toy-yellow-300 text-xs font-bold mb-4 border border-forest-800">
          <Gift className="w-3.5 h-3.5 text-toy-coral-400" />
          <span>The Mindful Play Club</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Join 35,000+ Indian Parents Choosing Screen-Free Wonder
        </h2>

        <p className="text-sm text-wood-200 max-w-xl mx-auto mb-8 leading-relaxed">
          Subscribe for early access to small-batch restocks (they sell out fast!), monthly developmental milestone play recipes, and <strong>10% off your order</strong> with code <code className="bg-forest-900 px-2 py-0.5 rounded text-toy-yellow-300 font-bold border border-forest-800">BACHPAN</code>.
        </p>

        {subscribed ? (
          <div className="bg-forest-900/90 border border-forest-700 p-6 rounded-3xl max-w-md mx-auto flex items-center justify-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-toy-green-400 flex-shrink-0" />
            <div className="text-left text-xs">
              <strong className="block text-cream-50 font-serif text-sm">Welcome to the family!</strong>
              <span className="text-wood-300">Use promo code <strong>BACHPAN</strong> at checkout for 10% off.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-forest-900/90 border border-forest-800 text-cream-50 placeholder-wood-400 text-xs focus:outline-none focus:ring-2 focus:ring-toy-yellow-400 font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-toy-yellow-500 hover:bg-toy-yellow-400 text-forest-950 font-bold text-xs shadow-md transition-colors whitespace-nowrap"
            >
              Get 10% Off
            </button>
          </form>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] text-wood-400">
          <span>✓ Zero spam</span>
          <span>✓ Unsubscribe anytime</span>
          <span>✓ Free PDF: &ldquo;How to Keep Toddlers Busy for 45 Mins Without an iPad&rdquo;</span>
        </div>
      </div>
    </section>
  );
};
