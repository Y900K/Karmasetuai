import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/server";

/**
 * GET /api/auth/me
 * Reads the httpOnly cookie set during login and returns the user profile.
 * This serves as a fallback when the Supabase browser client loses its session.
 */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("karmasetu_access_token")?.value;

    if (!accessToken) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const supabase = createAdminClient();
    const { data: { user: authUser }, error } = await supabase.auth.getUser(accessToken);

    if (error || !authUser) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const userRole = authUser.user_metadata?.role || "STUDENT";

    return NextResponse.json({
      user: {
        id: authUser.id,
        email: authUser.email || "",
        full_name: authUser.user_metadata?.full_name || "User",
        role: userRole,
      },
    });
  } catch (error) {
    console.error("[/api/auth/me] Error:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
