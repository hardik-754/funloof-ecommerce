import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, DEFAULT_ADMIN_PASSCODE, verifyAdminAuth } from "@/lib/auth";

export async function GET(request: Request) {
  const isAuth = verifyAdminAuth(request);
  return NextResponse.json({ authenticated: isAuth });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passcode } = body;

    if (!passcode || passcode !== DEFAULT_ADMIN_PASSCODE) {
      return NextResponse.json({ error: "Invalid admin passcode" }, { status: 401 });
    }

    const cookieStore = cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, DEFAULT_ADMIN_PASSCODE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Admin authenticated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return NextResponse.json({ success: true, message: "Signed out" });
}
