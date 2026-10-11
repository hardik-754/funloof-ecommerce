import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const settings = await db.getSiteSettings();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch site settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = await db.updateSiteSettings(body);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update site settings" }, { status: 500 });
  }
}
