import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function POST(request: Request) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db.resetToDemo();
    return NextResponse.json({ success: true, message: "Database reset to initial demo state" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to reset data" }, { status: 500 });
  }
}
