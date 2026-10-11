"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Customer, Order } from "@/lib/types";
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Sparkles,
  X,
  ExternalLink,
} from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/customers").then((r) => r.json()),
      fetch("/api/orders").then((r) => r.json()),
    ])
      .then(([custList, ordList]) => {
        setCustomers(custList);
        setOrders(ordList);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredCustomers = customers.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q)
    );
  });

  const customerOrders = selectedCustomer
    ? orders.filter(
        (o) => o.customer.email.toLowerCase() === selectedCustomer.email.toLowerCase()
      )
    : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-forest-900 tracking-tight">
          Customer Directory & CRM
        </h1>
        <p className="text-xs text-wood-600 mt-1">
          Review registered parents, their lifetime spending, repeat purchase frequency, and complete order history.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-wood-200/90 shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search customer by name, email, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs text-forest-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
          />
          <Search className="w-4 h-4 text-wood-400 absolute left-3 top-2.5" />
        </div>

        <span className="text-xs text-wood-600 font-medium hidden sm:inline">
          Total Customers: <strong>{customers.length}</strong>
        </span>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-wood-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100/60 text-forest-900 font-bold uppercase tracking-wider border-b border-wood-200">
              <tr>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Total Orders</th>
                <th className="py-3.5 px-4">Lifetime Spend</th>
                <th className="py-3.5 px-4">Last Order</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">History</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wood-100 text-forest-900">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-cream-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {cust.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-forest-900">{cust.name}</div>
                        <div className="text-[11px] text-wood-500">{cust.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-wood-600 font-medium">
                    {cust.city || "India"}
                  </td>
                  <td className="py-4 px-4 font-bold text-forest-900">
                    {cust.totalOrders} {cust.totalOrders === 1 ? "order" : "orders"}
                  </td>
                  <td className="py-4 px-4 font-serif font-bold text-sm text-forest-900">
                    ₹{Math.round(cust.totalSpent).toLocaleString("en-IN")}
                  </td>
                  <td className="py-4 px-4 text-wood-600">
                    {cust.lastOrderDate}
                  </td>
                  <td className="py-4 px-4">
                    {cust.isVip ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold flex items-center gap-1 w-fit">
                        <Sparkles className="w-2.5 h-2.5" /> VIP Parent
                      </span>
                    ) : (
                      <span className="text-[10px] text-wood-500 font-medium">Standard</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedCustomer(cust)}
                      className="px-3.5 py-1.5 rounded-xl bg-forest-800 text-cream-50 hover:bg-forest-900 font-semibold text-xs shadow-sm transition-transform active:scale-95"
                    >
                      View CRM Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOMER CRM PROFILE MODAL */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-forest-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl max-w-2xl w-full border border-wood-200 shadow-2xl overflow-hidden animate-scale">
            {/* Modal Header */}
            <div className="p-6 bg-cream-100/60 border-b border-wood-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-forest-800 text-cream-50 flex items-center justify-center font-bold text-base">
                  {selectedCustomer.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-forest-900">
                    {selectedCustomer.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-wood-600">
                    <span>{selectedCustomer.email}</span>
                    {selectedCustomer.isVip && (
                      <span className="text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-full text-[10px]">
                        ★ VIP
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="p-2 rounded-xl text-wood-500 hover:text-forest-900 hover:bg-wood-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Lifetime stats */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-4 rounded-2xl bg-wood-50 border border-wood-200">
                  <span className="text-[10px] font-bold uppercase text-wood-500 block mb-1">
                    Lifetime Orders
                  </span>
                  <span className="font-serif text-2xl font-bold text-forest-900">
                    {selectedCustomer.totalOrders}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200">
                  <span className="text-[10px] font-bold uppercase text-forest-700 block mb-1">
                    Lifetime Spend
                  </span>
                  <span className="font-serif text-2xl font-bold text-forest-900">
                    ₹{Math.round(selectedCustomer.totalSpent).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200">
                  <span className="text-[10px] font-bold uppercase text-forest-700 block mb-1">
                    Location
                  </span>
                  <span className="font-medium text-xs text-forest-900 block mt-1">
                    {selectedCustomer.city || "India"}
                  </span>
                </div>
              </div>

              {/* Order History */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 mb-3 flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-forest-700" />
                  Order History for {selectedCustomer.name}
                </h4>

                {customerOrders.length === 0 ? (
                  <p className="text-xs text-wood-500 italic p-4 bg-wood-50 rounded-2xl">
                    No order records found under this email in active session.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {customerOrders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-4 rounded-2xl border border-wood-200 bg-white shadow-sm flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-sm text-forest-900">
                              {ord.orderNumber}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                ord.status === "delivered"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : ord.status === "shipped"
                                  ? "bg-sky-100 text-sky-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {ord.status}
                            </span>
                          </div>
                          <div className="text-wood-500 text-[11px] mt-1">
                            Date: {new Date(ord.createdAt).toLocaleDateString()} • {ord.items.length} items
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-serif font-bold text-sm text-forest-900 block">
                            ₹{ord.total.toLocaleString("en-IN")}
                          </span>
                          {ord.trackingNumber && (
                            <span className="text-[10px] text-wood-500 font-mono block">
                              Track: {ord.trackingNumber}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  className="px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-50 font-bold text-xs"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
