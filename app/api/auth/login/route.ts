import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }
    const supabase = createAdminClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
    if (authError || !authData.user || !authData.session) {
      return NextResponse.json({ error: authError?.message || "Invalid login credentials." }, { status: 401 });
    }
    const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("user_id", authData.user.id).single();
    const response = NextResponse.json({
      success: true,
      user: { id: authData.user.id, email: authData.user.email || "", full_name: profile?.full_name || authData.user.user_metadata?.full_name || "User" },
      role: profile?.role || "STUDENT",
      message: "Signed in successfully!",
      session: { access_token: authData.session.access_token, refresh_token: authData.session.refresh_token },
    });
    response.cookies.set("karmasetu_access_token", authData.session.access_token, {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: authData.session.expires_in || 3600, path: "/",
    });
    return response;
  } catch (error: unknown) {
    console.error("Login API route error:", error);
    return NextResponse.json({ error: "Authentication service temporarily unavailable." }, { status: 500 });
  }
}
