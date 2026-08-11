import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      password,
      fullName,
      phone,
      role,
      instituteName,
      trade,
      rollNo,
      codeNcvt,
      companyName,
      designation,
      experience,
    } = body;

    // Input validation
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Full Name, Email, and Password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (phone && !/^\d{10,15}$/.test(phone.replace(/[\s\-\+]/g, ""))) {
      return NextResponse.json(
        { error: "Please enter a valid phone number (10-15 digits)." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 1. Create User via Supabase Admin API
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        phone,
        role: role || "STUDENT",
        institute_name: instituteName,
        trade,
        roll_no: rollNo,
        ncvt_code: codeNcvt,
        company_name: companyName,
        designation,
        experience,
      },
    });

    if (userError) {
      if (userError.message.includes("already been registered")) {
        return NextResponse.json(
          { error: "This email is already registered. Please sign in instead." },
          { status: 409 }
        );
      }
      console.error("Admin createUser error:", userError.message);
      return NextResponse.json(
        { error: userError.message || "Failed to create account." },
        { status: 400 }
      );
    }

    const userId = userData?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Account creation failed. Please try again." },
        { status: 500 }
      );
    }

    // 2. Insert into public.profiles
    const { error: profileError } = await supabase.from("profiles").upsert({
      user_id: userId,
      full_name: fullName,
      email: email,
      phone: phone,
      role: role || "STUDENT",
    });

    if (profileError) {
      console.warn("Profile insertion warning:", profileError.message);
    }

    // 3. Insert role-specific details
    try {
      if (role === "STUDENT") {
        await supabase.from("student_details").upsert({
          user_id: userId,
          trade_branch: trade || "General Technical",
          roll_no: rollNo,
        });
      } else if (role === "INSTITUTE") {
        await supabase.from("institute_details").upsert({
          user_id: userId,
          official_name: instituteName || "Partner Institute",
          code_ncvt: codeNcvt,
        });
      } else if (role === "INDUSTRY") {
        await supabase.from("industry_expert_details").upsert({
          user_id: userId,
          company_name: companyName || "Industry Plant",
          designation: designation,
          experience: experience,
        });
      } else if (role === "EMPLOYER" || role === "HR") {
        await supabase.from("employer_details").upsert({
          user_id: userId,
          company_name: companyName || "Manufacturing Enterprise",
        });
      }
    } catch (dbError: any) {
      console.warn("Role-specific details insertion warning:", dbError.message);
    }

    return NextResponse.json({
      success: true,
      message: `Registration for ${fullName} (${role || "STUDENT"}) completed successfully!`,
    });
  } catch (error: any) {
    console.error("Register API route error:", error);
    return NextResponse.json(
      { error: "Registration service temporarily unavailable." },
      { status: 500 }
    );
  }
}
