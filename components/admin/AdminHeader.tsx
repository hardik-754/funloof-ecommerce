"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/context/StoreContext";
import { RotateCcw, ExternalLink, ShieldCheck, Check, Sparkles } from "lucide-react";

export const AdminHeader: React.FC = () => {
  const { refreshStore } = useStore();
  const [resetting, setResetting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleResetData = async () => {
    if (!confirm("Are you sure you want to reset all store products, orders, and CMS settings back to the initial demo values?")) {
      return;
    }
    setResetting(true);
    try {
      await fetch("/api/reset", { method: "POST" });
      await refreshStore();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      window.location.reload();
    } catch (e) {
      alert("Failed to reset database");
    } finally {
      setResetting(false);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-wood-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-forest-100 text-forest-800 border border-forest-200">
          Admin GUI
        </span>
        <span className="text-xs text-wood-500 hidden sm:inline">
          Manage Funloof toys, orders, and content without touching code
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Reset Demo Button */}
        <button
          type="button"
          onClick={handleResetData}
          disabled={resetting}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-wood-700 hover:text-forest-900 bg-wood-100 hover:bg-wood-200 transition-colors"
          title="Reset sample products, orders and blog posts"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${resetting ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">{resetting ? "Resetting..." : "Reset Demo Data"}</span>
        </button>

        {/* Live Storefront Link */}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-50 text-xs font-semibold shadow-sm transition-colors"
        >
          <span>Storefront</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-wood-200">
          <div className="w-8 h-8 rounded-full bg-forest-700 text-cream-50 flex items-center justify-center font-bold text-xs">
            FL
          </div>
          <div className="hidden md:block text-left">
            <span className="text-xs font-bold text-forest-900 block leading-tight">Store Owner</span>
            <span className="text-[10px] text-wood-500 block">Full Access (CMS/CRM)</span>
          </div>
        </div>

        {/* Lock / Sign Out */}
        <button
          type="button"
          onClick={async () => {
            await fetch("/api/auth", { method: "DELETE" });
            window.location.reload();
          }}
          className="text-xs text-wood-500 hover:text-terracotta-600 font-semibold px-2 py-1 transition-colors"
          title="Lock portal and sign out"
        >
          Sign Out
        </button>
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-forest-900 text-cream-50 px-4 py-3 rounded-2xl shadow-xl border border-forest-700 flex items-center gap-2 z-50 text-xs">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Database successfully reset to initial demo state!</span>
        </div>
      )}
    </header>
  );
};
