import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET(request: Request) {
  // CRITICAL SECURITY: Protect customer list, emails, phone numbers, and addresses
  if (!verifyAdminAuth(request)) {
    return NextResponse.json(
      { error: "Unauthorized access to customer directory" },
      { status: 401 }
    );
  }

  try {
    const customers = await db.getCustomers();
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}
