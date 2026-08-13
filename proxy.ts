import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const protectedPrefixes = ["/student", "/institute", "/expert", "/employer", "/hr", "/admin"];
export function proxy(request: NextRequest) {
  if (!protectedPrefixes.some((prefix) => request.nextUrl.pathname.startsWith(prefix))) return NextResponse.next();
  if (!request.cookies.get("karmasetu_access_token")?.value) return NextResponse.redirect(new URL("/?auth=required", request.url));
  return NextResponse.next();
}
export const config = { matcher: ["/student/:path*", "/institute/:path*", "/expert/:path*", "/employer/:path*", "/hr/:path*", "/admin/:path*"] };
