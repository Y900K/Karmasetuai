import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * KarmaSetu AI — Route Protection Middleware
 * Protects all dashboard routes and redirects unauthenticated users.
 */

const PROTECTED_PREFIXES = [
  "/student",
  "/institute",
  "/expert",
  "/employer",
  "/hr",
  "/admin",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a protected dashboard route
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // Check for auth session in localStorage-synced cookie or auth token
  const authCookie = request.cookies.get("karmasetu_session")?.value;
  const hasLocalAuth = request.cookies.get("karmasetu_auth_active")?.value;

  // In demo mode, allow access if demo mode is enabled
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  if (!authCookie && !hasLocalAuth && !isDemoMode) {
    // Redirect to home page with auth prompt
    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("auth", "required");
    redirectUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Add security headers
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: [
    "/student/:path*",
    "/institute/:path*",
    "/expert/:path*",
    "/employer/:path*",
    "/hr/:path*",
    "/admin/:path*",
  ],
};
