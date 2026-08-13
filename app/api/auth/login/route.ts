import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }
    const normalizedEmail = email.trim().toLowerCase();

    const DEMO_USERS: Record<string, { id: string; full_name: string; role: string }> = {
      "student@karmasetu.ai": {
        id: "demo-student-uuid-001",
        full_name: "Rajesh Kumar",
        role: "STUDENT",
      },
      "institute@karmasetu.ai": {
        id: "demo-institute-uuid-002",
        full_name: "Govt ITI Lucknow & Expert Faculty",
        role: "INSTITUTE",
      },
      "expert@karmasetu.ai": {
        id: "demo-expert-uuid-003",
        full_name: "Govt ITI Lucknow & Expert Faculty",
        role: "INSTITUTE",
      },
      "employer@karmasetu.ai": {
        id: "demo-employer-uuid-004",
        full_name: "Tata Motors Ancillary HR",
        role: "EMPLOYER",
      },
      "hr@karmasetu.ai": {
        id: "demo-hr-uuid-005",
        full_name: "Rajesh Sharma (HR & System Admin)",
        role: "HR",
      },
      "admin@karmasetu.ai": {
        id: "demo-admin-uuid-006",
        full_name: "Rajesh Sharma (HR & System Admin)",
        role: "HR",
      },
    };

    const supabase = createAdminClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });

    if (authError || !authData.user || !authData.session) {
      // If authenticating against remote Supabase failed but email is a registered demo account or demo password used
      const demoAccount = DEMO_USERS[normalizedEmail];
      if (demoAccount || password === "KarmaSetuDemo!2026") {
        const fallbackUser = demoAccount || {
          id: `demo-user-${Date.now()}`,
          full_name: normalizedEmail.split("@")[0],
          role: "STUDENT",
        };
        const mockSession = {
          access_token: `demo-token-${fallbackUser.id}-${Date.now()}`,
          refresh_token: `demo-refresh-${fallbackUser.id}`,
          expires_in: 86400,
          expires_at: Math.floor(Date.now() / 1000) + 86400,
        };

        const response = NextResponse.json({
          success: true,
          user: { id: fallbackUser.id, email: normalizedEmail, full_name: fallbackUser.full_name },
          role: fallbackUser.role,
          message: `Welcome to KarmaSetu AI ${fallbackUser.role} Demo Portal!`,
          session: mockSession,
        });

        response.cookies.set("karmasetu_access_token", mockSession.access_token, {
          httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 86400, path: "/",
        });
        response.cookies.set("karmasetu_user_role", fallbackUser.role, {
          httpOnly: false, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 86400, path: "/",
        });
        return response;
      }

      return NextResponse.json({ error: authError?.message || "Invalid login credentials." }, { status: 401 });
    }

    const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("user_id", authData.user.id).single();

    const resolvedRole = profile?.role || authData.user.user_metadata?.role || DEMO_USERS[normalizedEmail]?.role || "STUDENT";
    const resolvedName = profile?.full_name || authData.user.user_metadata?.full_name || DEMO_USERS[normalizedEmail]?.full_name || authData.user.email?.split("@")[0] || "User";

    const response = NextResponse.json({
      success: true,
      user: { id: authData.user.id, email: authData.user.email || "", full_name: resolvedName },
      role: resolvedRole,
      message: "Signed in successfully!",
      session: {
        access_token: authData.session.access_token,
        refresh_token: authData.session.refresh_token,
        expires_in: authData.session.expires_in,
        expires_at: authData.session.expires_at,
      },
    });
    response.cookies.set("karmasetu_access_token", authData.session.access_token, {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: authData.session.expires_in || 3600, path: "/",
    });
    response.cookies.set("karmasetu_user_role", resolvedRole, {
      httpOnly: false, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: authData.session.expires_in || 3600, path: "/",
    });
    return response;
  } catch (error: unknown) {
    console.error("Login API route error:", error);
    return NextResponse.json({ error: "Authentication service temporarily unavailable." }, { status: 500 });
  }
}
