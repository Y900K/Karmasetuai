import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Quick Demo Account Login (@karmasetu.ai)
    // Instant 1-click access for showcase demo credentials
    if (cleanEmail.endsWith("@karmasetu.ai")) {
      let role = "STUDENT";
      if (cleanEmail.includes("institute")) role = "INSTITUTE";
      else if (cleanEmail.includes("expert")) role = "INDUSTRY";
      else if (cleanEmail.includes("employer")) role = "EMPLOYER";
      else if (cleanEmail.includes("hr")) role = "HR";
      else if (cleanEmail.includes("admin")) role = "NATIONAL";

      const DEMO_NAMES: Record<string, string> = {
        STUDENT: "Rajesh Kumar",
        INSTITUTE: "Govt ITI Director",
        INDUSTRY: "Vikram Malhotra",
        EMPLOYER: "Tata Motors Plant HR",
        HR: "National HR Lead",
        NATIONAL: "MSDE Governance Lead",
      };

      const demoName = DEMO_NAMES[role] || `${role} User`;

      const response = NextResponse.json({
        success: true,
        user: {
          id: "demo-user-" + role.toLowerCase(),
          email: cleanEmail,
          full_name: demoName,
          user_metadata: { full_name: demoName, role: role },
        },
        role: role,
        message: `Welcome to KarmaSetu AI ${role} Portal!`,
      });

      response.cookies.set("karmasetu_auth_active", "true", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return response;
    }

    // 2. Real Registered User — Authenticate against Supabase Auth DB
    const supabase = createAdminClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (!authError && authData?.user) {
      const userRole = authData.user.user_metadata?.role || "STUDENT";
      const response = NextResponse.json({
        success: true,
        user: authData.user,
        role: userRole,
        message: "Signed in successfully!",
      });

      response.cookies.set("karmasetu_auth_active", "true", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { error: authError?.message || "Invalid login credentials." },
      { status: 401 }
    );
  } catch (error: any) {
    console.error("Login API route error:", error);
    return NextResponse.json(
      { error: "Authentication service temporarily unavailable." },
      { status: 500 }
    );
  }
}
