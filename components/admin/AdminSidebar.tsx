"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Sliders,
  BookOpen,
  Users,
  ExternalLink,
  PlusCircle,
  Sparkles,
} from "lucide-react";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard Overview",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Products & Stock",
      href: "/admin/products",
      icon: Package,
      exact: false,
    },
    {
      label: "Orders & Shipping",
      href: "/admin/orders",
      icon: ShoppingBag,
      exact: false,
    },
    {
      label: "Homepage & Banners CMS",
      href: "/admin/cms",
      icon: Sliders,
      exact: true,
    },
    {
      label: "Parenting Journal CMS",
      href: "/admin/cms/blog",
      icon: BookOpen,
      exact: false,
    },
    {
      label: "Customer CRM",
      href: "/admin/customers",
      icon: Users,
      exact: false,
    },
  ];

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname?.startsWith(item.href);
  };

  return (
    <aside className="w-64 bg-forest-950 text-cream-100 flex flex-col justify-between border-r border-forest-900 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-forest-900">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Image src="/images/funloof-logo.png" alt="Funloof Logo" fill className="object-contain p-0.5" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-white block leading-none">
                funloof
              </span>
              <span className="text-[10px] font-bold text-toy-yellow-300 uppercase tracking-widest block mt-1">
                Admin Control Center
              </span>
            </div>
          </Link>
          <div className="mt-3 px-2.5 py-1 rounded-lg bg-forest-900/80 border border-forest-800 text-[11px] text-wood-300 flex items-center justify-between">
            <span>No-Code Mode</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-colors ${
                  active
                    ? "bg-forest-800 text-cream-50 shadow-sm border border-forest-700"
                    : "text-wood-300 hover:bg-forest-900/60 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-toy-yellow-400" : "text-wood-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & Quick Link to Live Storefront */}
      <div className="p-4 border-t border-forest-900 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-forest-900/90 hover:bg-forest-800 text-cream-100 text-xs font-medium border border-forest-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-toy-yellow-300" />
            <span>View Live Storefront</span>
          </span>
          <span className="text-[10px] text-wood-400">Open ↗</span>
        </Link>

        <div className="text-[10px] text-wood-400 text-center">
          Zero-Code Architecture v1.0 • Ready for Vercel
        </div>
      </div>
    </aside>
  );
};
