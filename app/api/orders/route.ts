import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET(request: Request) {
  // CRITICAL SECURITY: Protect customer order history from data leakage
  if (!verifyAdminAuth(request)) {
    return NextResponse.json(
      { error: "Unauthorized access to customer orders" },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let orders = await db.getOrders();
    if (status && status !== "all") {
      orders = orders.filter((o) => o.status === status);
    }

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.customer || !body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Customer details and items are required" }, { status: 400 });
    }

    // Sanitize customer inputs to avoid XSS / payload injection
    const sanitizedCustomer = {
      fullName: String(body.customer.fullName || "").trim().slice(0, 100),
      email: String(body.customer.email || "").trim().toLowerCase().slice(0, 120),
      phone: String(body.customer.phone || "").trim().slice(0, 20),
      addressLine1: String(body.customer.addressLine1 || "").trim().slice(0, 150),
      addressLine2: String(body.customer.addressLine2 || "").trim().slice(0, 150),
      city: String(body.customer.city || "").trim().slice(0, 60),
      state: String(body.customer.state || "").trim().slice(0, 60),
      postalCode: String(body.customer.postalCode || "").trim().slice(0, 12),
      country: String(body.customer.country || "India").trim().slice(0, 50),
    };

    const order = await db.createOrder({
      customer: sanitizedCustomer,
      items: body.items,
      subtotal: Number(body.subtotal) || 0,
      discount: Number(body.discount) || 0,
      shipping: Number(body.shipping) || 0,
      tax: Number(body.tax) || 0,
      total: Number(body.total) || 0,
      status: "processing",
      paymentMethod: String(body.paymentMethod || "Credit Card (Stripe)").slice(0, 60),
      notes: String(body.notes || "").slice(0, 300),
    });

    // Return only safe minimal receipt metadata to shopper (zero internal state leakage)
    return NextResponse.json(
      {
        orderNumber: order.orderNumber,
        total: order.total,
        id: order.id,
        status: order.status,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  // CRITICAL SECURITY: Only authenticated admins can modify order statuses
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { orderId, status, trackingNumber, carrier } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: "Order ID and status are required" }, { status: 400 });
    }

    const updated = await db.updateOrderStatus(orderId, status, trackingNumber, carrier);
    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
  }
}
