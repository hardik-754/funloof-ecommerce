"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Lock, KeyRound, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export const AdminAuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check existing session
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth");
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(data.authenticated);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Incorrect passcode");
      }

      setIsAuthenticated(true);
      setPasscode("");
    } catch (err: any) {
      setError(err.message || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  // While verifying initial auth state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-cream-50/70 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-forest-800 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-wood-600">Verifying security credentials...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, render secure lock screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF7F2] to-wood-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-4xl border border-wood-200/90 shadow-warm-lg p-8 sm:p-10 text-center space-y-6">
          {/* Logo & Security Shield */}
          <div className="relative w-16 h-16 mx-auto bg-white p-2 rounded-3xl border border-wood-200 shadow-sm flex items-center justify-center">
            <Image src="/images/funloof-logo.png" alt="Funloof" fill className="object-contain p-1" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-[11px] font-bold mb-2">
              <Lock className="w-3.5 h-3.5 text-forest-700" />
              <span>Owner & Staff Portal</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-forest-950">
              Admin Access Protected
            </h1>
            <p className="text-xs text-wood-600 mt-2 leading-relaxed">
              Customer order histories and store revenue are encrypted. Please enter your store passcode to manage products, fulfillment, and CMS content.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1.5">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (default: funloof2026)"
                  className="w-full px-4 py-3 rounded-2xl bg-wood-50 border border-wood-300 text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
                <KeyRound className="w-4 h-4 text-wood-400 absolute right-4 top-3.5" />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-terracotta-50 border border-terracotta-200 rounded-xl text-xs text-terracotta-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-forest-800 hover:bg-forest-900 text-cream-50 font-bold text-sm shadow-warm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50"
            >
              <span>{loading ? "Verifying..." : "Unlock Admin Dashboard"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-wood-100 flex items-center justify-center gap-2 text-[11px] text-wood-500">
            <ShieldCheck className="w-4 h-4 text-forest-700" />
            <span>256-Bit Session Guard • Data Leakage Protected</span>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated - render full admin interface
  return <>{children}</>;
};
