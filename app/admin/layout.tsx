import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminAuthGate } from "@/components/admin/AdminAuthGate";

export const metadata = {
  title: "Admin Dashboard | Funloof Mindful Toys",
  description: "No-code management GUI for products, orders, blog posts, and site settings",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGate>
      <div className="min-h-screen bg-cream-50/70 flex">
        {/* Fixed Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader />
          <main className="p-6 sm:p-8 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthGate>
  );
}
