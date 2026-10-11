import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "funloof_admin_token";
export const DEFAULT_ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "funloof2026";

/**
 * Checks whether the incoming request has valid admin credentials via cookie or header.
 */
export function verifyAdminAuth(request?: Request): boolean {
  try {
    // 1. Check direct header (for API tools or custom client headers)
    if (request) {
      const authHeader = request.headers.get("x-admin-key") || request.headers.get("authorization");
      if (authHeader && (authHeader === DEFAULT_ADMIN_PASSCODE || authHeader === `Bearer ${DEFAULT_ADMIN_PASSCODE}`)) {
        return true;
      }
    }

    // 2. Check Next.js HTTP cookie
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    if (tokenCookie && tokenCookie.value === DEFAULT_ADMIN_PASSCODE) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}
