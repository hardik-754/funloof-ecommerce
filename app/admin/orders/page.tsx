"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Order, OrderStatus } from "@/lib/types";
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  X,
  Package,
  Calendar,
  User,
  MapPin,
  ExternalLink,
  Edit3,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Fulfillment update state
  const [newStatus, setNewStatus] = useState<OrderStatus>("processing");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState("UPS Carbon Neutral");
  const [updating, setUpdating] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openOrderModal = (order: Order) => {
    setActiveOrder(order);
    setNewStatus(order.status);
    setTrackingNumber(order.trackingNumber || "");
    setCarrier(order.carrier || "UPS Carbon Neutral");
  };

  const handleUpdateFulfillment = async () => {
    if (!activeOrder) return;
    setUpdating(true);
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: activeOrder.id,
          status: newStatus,
          trackingNumber,
          carrier,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setActiveOrder(updated);
        await fetchOrders();
      } else {
        alert("Failed to update order status");
      }
    } catch (e) {
      alert("Error updating order");
    } finally {
      setUpdating(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (selectedStatus !== "all" && o.status !== selectedStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.email.toLowerCase().includes(q) ||
        o.customer.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-forest-900 tracking-tight">
          Customer Orders & Dispatch
        </h1>
        <p className="text-xs text-wood-600 mt-1">
          Review incoming purchases, customer shipping details, update tracking numbers, and fulfill packages.
        </p>
      </div>

      {/* Tabs and Filters */}
      <div className="bg-white p-4 rounded-3xl border border-wood-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          {[
            { id: "all", label: "All Orders" },
            { id: "processing", label: "Processing" },
            { id: "shipped", label: "Shipped" },
            { id: "delivered", label: "Delivered" },
            { id: "cancelled", label: "Cancelled" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors ${
                selectedStatus === tab.id
                  ? "bg-forest-800 text-cream-50 shadow-sm"
                  : "bg-wood-50 text-wood-700 hover:bg-wood-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search order ref, customer name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-wood-50 border border-wood-300 text-xs text-forest-900 focus:outline-none focus:ring-1 focus:ring-forest-700"
          />
          <Search className="w-4 h-4 text-wood-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-wood-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100/60 text-forest-900 font-bold uppercase tracking-wider border-b border-wood-200">
              <tr>
                <th className="py-3.5 px-6">Order Ref</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Fulfillment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wood-100 text-forest-900">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-wood-500">
                    No orders matching this filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-cream-50/50 transition-colors">
                    <td className="py-4 px-6 font-serif font-bold text-sm">
                      {order.orderNumber}
                    </td>
                    <td className="py-4 px-4 text-wood-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold">{order.customer.fullName}</div>
                      <div className="text-[10px] text-wood-500">
                        {order.customer.city}, {order.customer.state}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold">
                          {order.items.reduce((s, i) => s + i.quantity, 0)} toys
                        </span>
                        <span className="text-[10px] text-wood-500">
                          ({order.items[0]?.productName?.slice(0, 15)}...)
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-serif font-bold text-sm">
                      ₹{order.total.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-4">
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
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => openOrderModal(order)}
                        className="px-3.5 py-1.5 rounded-xl bg-forest-800 text-cream-50 hover:bg-forest-900 font-semibold text-xs shadow-sm transition-transform active:scale-95"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER FULFILLMENT MODAL / DRAWER */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-forest-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl max-w-2xl w-full border border-wood-200 shadow-2xl overflow-hidden animate-scale">
            {/* Modal Header */}
            <div className="p-6 bg-cream-100/60 border-b border-wood-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-wood-500 block">
                  Order Management
                </span>
                <h3 className="font-serif text-2xl font-bold text-forest-900">
                  {activeOrder.orderNumber}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveOrder(null)}
                className="p-2 rounded-xl text-wood-500 hover:text-forest-900 hover:bg-wood-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Customer & Shipping Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-wood-50 border border-wood-200 space-y-2">
                  <h4 className="font-bold text-forest-900 flex items-center gap-1.5 uppercase text-[10px] tracking-wider text-wood-500">
                    <User className="w-3.5 h-3.5 text-forest-700" />
                    Customer Contact
                  </h4>
                  <div className="font-bold text-sm text-forest-900">{activeOrder.customer.fullName}</div>
                  <div className="text-wood-600">{activeOrder.customer.email}</div>
                  <div className="text-wood-600">{activeOrder.customer.phone}</div>
                </div>

                <div className="p-4 rounded-2xl bg-wood-50 border border-wood-200 space-y-2">
                  <h4 className="font-bold text-forest-900 flex items-center gap-1.5 uppercase text-[10px] tracking-wider text-wood-500">
                    <MapPin className="w-3.5 h-3.5 text-forest-700" />
                    Shipping Destination
                  </h4>
                  <div className="text-forest-900 font-medium">
                    {activeOrder.customer.addressLine1}
                    {activeOrder.customer.addressLine2 && `, ${activeOrder.customer.addressLine2}`}
                  </div>
                  <div className="text-wood-600">
                    {activeOrder.customer.city}, {activeOrder.customer.state} {activeOrder.customer.postalCode}
                  </div>
                  <div className="text-wood-500 font-semibold">{activeOrder.customer.country}</div>
                </div>
              </div>

              {/* Order Notes */}
              {activeOrder.notes && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  <strong>Customer Note:</strong> {activeOrder.notes}
                </div>
              )}

              {/* Items Purchased */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 mb-3">
                  Line Items ({activeOrder.items.length})
                </h4>
                <div className="divide-y divide-wood-100 border border-wood-200 rounded-2xl overflow-hidden bg-white">
                  {activeOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-wood-100 flex-shrink-0">
                          <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="font-serif font-bold text-forest-900">{item.productName}</div>
                          <div className="text-[11px] text-wood-500">Qty: {item.quantity} × ₹{item.price.toLocaleString("en-IN")}</div>
                        </div>
                      </div>
                      <div className="font-serif font-bold text-forest-900">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status & Tracking Update Form */}
              <div className="p-5 rounded-3xl bg-forest-50 border border-forest-200 space-y-4">
                <h4 className="font-serif text-base font-bold text-forest-900">
                  Update Fulfillment Status
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-forest-900 mb-1">Fulfillment Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-forest-300 font-bold text-forest-900"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-forest-900 mb-1">Carrier Name</label>
                    <input
                      type="text"
                      value={carrier}
                      onChange={(e) => setCarrier(e.target.value)}
                      placeholder="e.g. Blue Dart / Delhivery / DTDC"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-forest-300"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-forest-900 mb-1">Tracking Number</label>
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="e.g. 1Z9999999999999999"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-forest-300 font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveOrder(null)}
                    className="px-4 py-2 rounded-xl bg-wood-200 hover:bg-wood-300 text-xs font-semibold"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateFulfillment}
                    disabled={updating}
                    className="px-5 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-50 text-xs font-bold shadow-sm transition-transform active:scale-95 disabled:opacity-50"
                  >
                    {updating ? "Saving..." : "Save Fulfillment Status"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
