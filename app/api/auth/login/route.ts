import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

const IS_DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 1. Try standard Supabase Auth Sign In
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!authError && authData?.user) {
      // Set auth cookie for middleware session validation
      const response = NextResponse.json({
        success: true,
        user: authData.user,
        message: "Signed in successfully!",
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

    // 2. Demo Mode Fallback — ONLY if explicitly enabled via env flag
    if (IS_DEMO_MODE) {
      const isDemoAccount = email.endsWith("@karmasetu.ai");
      if (isDemoAccount) {
        // Determine demo role from email
        let role = "STUDENT";
        if (email.includes("institute")) role = "INSTITUTE";
        else if (email.includes("expert")) role = "INDUSTRY";
        else if (email.includes("employer")) role = "EMPLOYER";
        else if (email.includes("hr")) role = "HR";
        else if (email.includes("admin")) role = "NATIONAL";

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
            email: email,
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
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });
        return response;
      }
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
