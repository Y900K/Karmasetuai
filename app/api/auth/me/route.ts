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

    const storedRole = cookieStore.get("karmasetu_user_role")?.value;

    const DEMO_USER_BY_ROLE: Record<string, { id: string; email: string; full_name: string; role: string }> = {
      "STUDENT": { id: "demo-student-uuid-001", email: "student@karmasetu.ai", full_name: "Rajesh Kumar", role: "STUDENT" },
      "INSTITUTE": { id: "demo-institute-uuid-002", email: "institute@karmasetu.ai", full_name: "Govt ITI Lucknow & Expert Faculty", role: "INSTITUTE" },
      "EMPLOYER": { id: "demo-employer-uuid-004", email: "employer@karmasetu.ai", full_name: "Tata Motors Ancillary HR", role: "EMPLOYER" },
      "HR": { id: "demo-hr-uuid-005", email: "hr@karmasetu.ai", full_name: "Rajesh Sharma (HR & System Admin)", role: "HR" },
      "INDUSTRY": { id: "demo-expert-uuid-003", email: "institute@karmasetu.ai", full_name: "Govt ITI Lucknow & Expert Faculty", role: "INSTITUTE" },
      "NATIONAL": { id: "demo-admin-uuid-006", email: "hr@karmasetu.ai", full_name: "Rajesh Sharma (HR & System Admin)", role: "HR" },
    };

    if (error || !authUser) {
      if (accessToken.startsWith("demo-token-") && storedRole && DEMO_USER_BY_ROLE[storedRole]) {
        return NextResponse.json({ user: DEMO_USER_BY_ROLE[storedRole] });
      }
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("user_id", authUser.id).single();

    const DEMO_EMAIL_ROLES: Record<string, string> = {
      "student@karmasetu.ai": "STUDENT",
      "institute@karmasetu.ai": "INSTITUTE",
      "expert@karmasetu.ai": "INSTITUTE",
      "employer@karmasetu.ai": "EMPLOYER",
      "hr@karmasetu.ai": "HR",
      "admin@karmasetu.ai": "HR",
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
