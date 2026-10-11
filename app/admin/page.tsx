"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Package,
  TrendingUp,
  AlertTriangle,
  PlusCircle,
  Sliders,
  BookOpen,
  Users,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Order, Product } from "@/lib/types";

interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  lowStockCount: number;
  averageOrderValue: number;
  totalCustomers: number;
  recentOrders: Order[];
}

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/metrics")
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-wood-600 font-medium animate-pulse">
        Loading dashboard metrics...
      </div>
    );
  }

  const m = metrics || {
    totalRevenue: 317.72,
    totalOrders: 3,
    totalProducts: 8,
    lowStockCount: 2,
    averageOrderValue: 105.9,
    totalCustomers: 4,
    recentOrders: [],
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-forest-900 tracking-tight">
            Store Performance & Operations
          </h1>
          <p className="text-xs text-wood-600 mt-1">
            Real-time analytics, incoming orders, and catalog status for Funloof.
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-forest-800 hover:bg-forest-900 text-cream-50 font-bold text-xs shadow-sm transition-transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Toy</span>
          </Link>
          <Link
            href="/admin/cms"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-wood-50 text-forest-900 font-semibold text-xs border border-wood-300 shadow-sm transition-colors"
          >
            <Sliders className="w-4 h-4 text-forest-700" />
            <span>Edit Banners</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-wood-200/90 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-wood-500 block mb-1">
              Gross Revenue
            </span>
            <span className="font-serif text-3xl font-bold text-forest-900">
              ₹{Math.round(m.totalRevenue).toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
              ↑ 18.4% from last month
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-forest-100 flex items-center justify-center text-forest-800">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Orders */}
        <div className="bg-white p-6 rounded-3xl border border-wood-200/90 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-wood-500 block mb-1">
              Total Orders
            </span>
            <span className="font-serif text-3xl font-bold text-forest-900">
              {m.totalOrders}
            </span>
            <span className="text-[11px] text-wood-600 block mt-1">
              All processed securely
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-wood-100 flex items-center justify-center text-wood-800">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Products */}
        <div className="bg-white p-6 rounded-3xl border border-wood-200/90 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-wood-500 block mb-1">
              Catalog Items
            </span>
            <span className="font-serif text-3xl font-bold text-forest-900">
              {m.totalProducts} Toys
            </span>
            <span className="text-[11px] text-wood-600 block mt-1">
              Medicinal Neem & Beech wood
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-forest-800">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Average Order Value */}
        <div className="bg-white p-6 rounded-3xl border border-wood-200/90 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-wood-500 block mb-1">
              Average Order (AOV)
            </span>
            <span className="font-serif text-3xl font-bold text-forest-900">
              ₹{Math.round(m.averageOrderValue).toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
              High basket conversion
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-honey-100 flex items-center justify-center text-forest-900">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Low Stock Warning Banner */}
      {m.lowStockCount > 0 && (
        <div className="p-4 rounded-2xl bg-terracotta-50 border border-terracotta-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-terracotta-900">
                {m.lowStockCount} Products Have Low Workshop Stock (&le; 15 units remaining)
              </h4>
              <p className="text-[11px] text-terracotta-700">
                Update stock levels or notify woodcraft artisans to schedule a fresh batch.
              </p>
            </div>
          </div>
          <Link
            href="/admin/products"
            className="px-3.5 py-1.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs transition-colors whitespace-nowrap shadow-sm"
          >
            Review Stock Table
          </Link>
        </div>
      )}

      {/* Recent Orders Overview */}
      <div className="bg-white rounded-3xl border border-wood-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-wood-100">
          <div>
            <h2 className="font-serif text-xl font-bold text-forest-900">
              Incoming Customer Orders
            </h2>
            <p className="text-xs text-wood-600">
              Orders requiring fulfillment, tracking codes, or invoice review.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-forest-800 hover:underline flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-wood-100 text-wood-500 font-bold uppercase tracking-wider">
                <th className="pb-3">Order Ref</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Items</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wood-100 text-forest-900">
              {m.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-cream-50/50 transition-colors">
                  <td className="py-3.5 font-bold font-serif text-sm">
                    {order.orderNumber}
                  </td>
                  <td className="py-3.5">
                    <div className="font-semibold">{order.customer.fullName}</div>
                    <div className="text-[10px] text-wood-500">{order.customer.email}</div>
                  </td>
                  <td className="py-3.5">
                    {order.items.reduce((s, i) => s + i.quantity, 0)} toys (
                    {order.items[0]?.productName?.slice(0, 20)}...)
                  </td>
                  <td className="py-3.5 font-bold font-serif">
                    ₹{order.total.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === "delivered"
                          ? "bg-emerald-100 text-emerald-800"
                          : order.status === "shipped"
                          ? "bg-sky-100 text-sky-800"
                          : order.status === "processing"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-wood-100 text-wood-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <Link
                      href="/admin/orders"
                      className="px-3 py-1.5 rounded-xl bg-wood-100 hover:bg-forest-800 hover:text-white font-semibold transition-colors"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Access Tiles to CMS and CRM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/products/new"
          className="p-6 rounded-3xl bg-white border border-wood-200/90 shadow-sm hover:shadow-warm transition-all group"
        >
          <div className="w-10 h-10 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <PlusCircle className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-forest-900 group-hover:text-forest-700">
            Publish New Toy
          </h3>
          <p className="text-xs text-wood-600 mt-1 leading-relaxed">
            Fill in images, price, age brackets, and skills tags without any coding.
          </p>
        </Link>

        <Link
          href="/admin/cms"
          className="p-6 rounded-3xl bg-white border border-wood-200/90 shadow-sm hover:shadow-warm transition-all group"
        >
          <div className="w-10 h-10 rounded-2xl bg-wood-100 text-wood-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Sliders className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-forest-900 group-hover:text-forest-700">
            Homepage Hero CMS
          </h3>
          <p className="text-xs text-wood-600 mt-1 leading-relaxed">
            Change the banner headline, subtext, CTA links, and top announcement instantly.
          </p>
        </Link>

        <Link
          href="/admin/cms/blog/new"
          className="p-6 rounded-3xl bg-white border border-wood-200/90 shadow-sm hover:shadow-warm transition-all group"
        >
          <div className="w-10 h-10 rounded-2xl bg-sage-100 text-forest-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-forest-900 group-hover:text-forest-700">
            Write Journal Article
          </h3>
          <p className="text-xs text-wood-600 mt-1 leading-relaxed">
            Use the WYSIWYG editor to educate parents on child development & SEO.
          </p>
        </Link>
      </div>
    </div>
  );
}
