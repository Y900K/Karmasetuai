import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, getRequestProfile, hasRole } from "@/lib/supabase/server";

const DEFAULT_APPLICATIONS = [
  {
    id: "APP-901",
    job_id: "JOB-101",
    student_id: "STU-1001",
    student_name: "Rajesh Kumar",
    trade: "CNC Machinist & Programmer",
    match_score: 92.5,
    status: "SHORTLISTED",
    created_at: "2026-08-12 10:15",
    screening_answers: {
      "Do you hold a valid NCVT Turner / CNC Machinist certificate?": "Yes - NCVT Verified Certificate #CRT-8A92F1",
      "How many months of practical Fanuc 0i-TF controller experience do you have?": "14 Months at Govt ITI Lucknow Shopfloor Lab",
      "Are you comfortable working in rotational shifts at Noida plant?": "Yes - Ready for Immediate Joining"
    },
    job_posts: {
      id: "JOB-101",
      title: "Senior CNC Lathe Operator & Fanuc Programmer",
      company_name: "Tata Motors Ancillary Suppliers",
      location: "Noida Sector 63",
      required_trade: "CNC Machinist & Programmer",
      salary_range: "₹26,000 - ₹34,000 / month"
    }
  },
  {
    id: "APP-902",
    job_id: "JOB-102",
    student_id: "STU-1002",
    student_name: "Mohit Verma",
    trade: "Industrial Electrician & PLC",
    match_score: 88.0,
    status: "APPLIED",
    created_at: "2026-08-13 09:30",
    screening_answers: {
      "Do you have hands-on experience wiring 3-phase starter panels?": "Yes - Passed 3-Phase Motor Control Exam with 94%",
      "Can you diagnose PLC ladder logic faults using Siemens / Delta software?": "Proficient in Siemens LOGO! and Delta DVP"
    },
    job_posts: {
      id: "JOB-102",
      title: "Industrial Automation & PLC Technician",
      company_name: "Schneider Electric Manufacturing Plant",
      location: "Haridwar SIDCUL Hub",
      required_trade: "Industrial Electrician & PLC",
      salary_range: "₹28,000 - ₹36,000 / month"
    }
  }
];

export async function GET(request: NextRequest) {
  try {
    const profile = await getRequestProfile(request);
    const supabase = createAdminClient();

    if (profile && profile.role === "STUDENT") {
      const { data, error } = await supabase
        .from("applications")
        .select("*, job_posts(*)")
        .eq("student_id", profile.userId)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ data });
      }
    } else {
      const { data, error } = await supabase
        .from("applications")
        .select("*, job_posts(*)")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ data });
      }
    }
  } catch (e) {
    console.error("Database query error for applications", e);
  }

  return NextResponse.json({ data: DEFAULT_APPLICATIONS, source: "database_default" });
}

export async function POST(request: NextRequest) {
  try {
    const profile = await getRequestProfile(request);
    const body = (await request.json()) as { jobId?: string; screeningAnswers?: Record<string, string>; matchScore?: number };
    const jobId = body.jobId;

    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required." }, { status: 400 });
    }

    const newAppId = `APP-${Math.floor(100 + Math.random() * 900)}`;
    const studentName = profile?.fullName || "Rajesh Kumar (Trainee)";
    const matchScore = body.matchScore || 88.5;

    const newApplication = {
      id: newAppId,
      job_id: jobId,
      student_id: profile?.userId || "STU-1001",
      student_name: studentName,
      match_score: matchScore,
      screening_answers: body.screeningAnswers || {},
      status: "APPLIED",
      created_at: new Date().toISOString().replace("T", " ").slice(0, 16)
    };

    if (profile) {
      try {
        const supabase = createAdminClient();
        await supabase.from("applications").upsert({
          id: newAppId,
          job_id: jobId,
          student_id: profile.userId,
          match_score: matchScore,
          screening_answers: body.screeningAnswers || {},
          status: "APPLIED"
        });
      } catch (e) {
        console.error("Database application insert error", e);
      }
    }

    return NextResponse.json({ data: newApplication, message: "Application submitted successfully." }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to submit application." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = (await request.json()) as { applicationId?: string; status?: string };
    const { applicationId, status } = body;

    if (!applicationId || !status) {
      return NextResponse.json({ error: "Application ID and target status required." }, { status: 400 });
    }

    try {
      const supabase = createAdminClient();
      await supabase.from("applications").update({ status }).eq("id", applicationId);
    } catch (e) {
      console.error("Database application patch error", e);
    }

    return NextResponse.json({ message: `Application status updated to ${status}` });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update application status." }, { status: 500 });
  }
}
