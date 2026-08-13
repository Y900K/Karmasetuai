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

    const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("user_id", authUser.id).single();

    const DEMO_EMAIL_ROLES: Record<string, string> = {
      "student@karmasetu.ai": "STUDENT",
      "institute@karmasetu.ai": "INSTITUTE",
      "expert@karmasetu.ai": "INDUSTRY",
      "employer@karmasetu.ai": "EMPLOYER",
      "hr@karmasetu.ai": "HR",
      "admin@karmasetu.ai": "NATIONAL",
    };

    const userEmail = authUser.email?.toLowerCase() || "";
    const userRole = profile?.role || authUser.user_metadata?.role || DEMO_EMAIL_ROLES[userEmail] || "STUDENT";

    return NextResponse.json({
      user: {
        id: authUser.id,
        email: authUser.email || "",
        full_name: profile?.full_name || authUser.user_metadata?.full_name || "User",
        role: userRole,
      },
    });
  } catch (error) {
    console.error("[/api/auth/me] Error:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
