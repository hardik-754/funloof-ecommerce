import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET(request: Request) {
  // CRITICAL SECURITY: Protect store financial revenue, AOV, and performance metrics
  if (!verifyAdminAuth(request)) {
    return NextResponse.json(
      { error: "Unauthorized access to store performance metrics" },
      { status: 401 }
    );
  }

  try {
    const metrics = await db.getMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 });
  }
}
