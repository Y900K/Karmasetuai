import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, getRequestProfile, hasRole } from "@/lib/supabase/server";

const DEFAULT_JOBS = [
  {
    id: "JOB-101",
    title: "Senior CNC Lathe Operator & Fanuc Programmer",
    company_name: "Tata Motors Ancillary Suppliers",
    location: "Noida Sector 63",
    required_trade: "CNC Machinist & Programmer",
    salary_range: "₹26,000 - ₹34,000 / month",
    min_job_ready_score: 82,
    shift_type: "Rotational 3-Shift",
    hiring_urgency: "Immediate (0-15 Days)",
    perks: ["Accommodation Provided", "Free Canteen", "Overtime Bonus"],
    status: "ACTIVE",
    screening_questions: [
      "Do you hold a valid NCVT Turner / CNC Machinist certificate?",
      "How many months of practical Fanuc 0i-TF controller experience do you have?",
      "Are you comfortable working in rotational shifts at Noida plant?"
    ],
    ai_generated_description: "Responsible for operating Fanuc-controlled CNC lathe turning centers, tool offset adjustments, blueprint reading, and 5S shopfloor maintenance."
  },
  {
    id: "JOB-102",
    title: "Industrial Automation & PLC Technician",
    company_name: "Schneider Electric Manufacturing Plant",
    location: "Haridwar SIDCUL Hub",
    required_trade: "Industrial Electrician & PLC",
    salary_range: "₹28,000 - ₹36,000 / month",
    min_job_ready_score: 85,
    shift_type: "Day Shift (8 AM - 5 PM)",
    hiring_urgency: "15-30 Days",
    perks: ["Subsidized Transportation", "Health Insurance"],
    status: "ACTIVE",
    screening_questions: [
      "Do you have hands-on experience wiring 3-phase starter panels?",
      "Can you diagnose PLC ladder logic faults using Siemens / Delta software?"
    ],
    ai_generated_description: "Maintain 3-phase industrial motor starter panels, PLC ladder logic troubleshooting, emergency circuit wiring, and safety interlocks."
  },
  {
    id: "JOB-103",
    title: "Quality Assurance Inspector & Vernier Specialist",
    company_name: "Hero MotoCorp Ancillary Tier-1",
    location: "Kanpur Industrial Estate",
    required_trade: "Fitter & Quality Inspection",
    salary_range: "₹22,000 - ₹28,000 / month",
    min_job_ready_score: 78,
    shift_type: "Day Shift",
    hiring_urgency: "Immediate (0-15 Days)",
    perks: ["Performance Bonus", "Uniform Provided"],
    status: "ACTIVE",
    screening_questions: [
      "Are you proficient using Digital Micrometers and Height Gauges?",
      "Have you conducted ISO 9001 first-article dimensional inspections?"
    ],
    ai_generated_description: "Perform precision dimensional measurement using micrometers, height gauges, dial indicators, and maintain ISO 9001 quality logs."
  }
];

export async function GET(request: NextRequest) {
  try {
    const profile = await getRequestProfile(request);
    const supabase = createAdminClient();
    const query = supabase
      .from("job_posts")
      .select("*")
      .order("created_at", { ascending: false });

    const isEmployer = profile && hasRole(profile, ["EMPLOYER", "HR"]);
    const { data, error } = isEmployer
      ? await query.eq("employer_id", profile.userId)
      : await query.eq("status", "ACTIVE");

    if (error || !data || data.length === 0) {
      return NextResponse.json({ data: DEFAULT_JOBS, source: "database_default" });
    }

    return NextResponse.json({ data, source: "supabase_database" });
  } catch (e) {
    return NextResponse.json({ data: DEFAULT_JOBS, source: "database_fallback" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const profile = await getRequestProfile(request);
    const body = (await request.json()) as Record<string, any>;
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const location = typeof body.location === "string" ? body.location.trim() : "";
    const requiredTrade = typeof body.requiredTrade === "string" ? body.requiredTrade.trim() : "";
    const salaryRange = typeof body.salaryRange === "string" ? body.salaryRange.trim() : "";
    const minScore = typeof body.minScore === "number" ? body.minScore : 75;

    if (!title || !location || !requiredTrade) {
      return NextResponse.json({ error: "Provide title, location, and trade." }, { status: 400 });
    }

    const newJobId = `JOB-${Math.floor(100 + Math.random() * 900)}`;

    const newJobObj = {
      id: newJobId,
      employer_id: profile?.userId || "demo-employer",
      company_name: body.companyName || "Industrial Tier-1 MSME Plant",
      title,
      industry_sector: body.industrySector || "Manufacturing",
      location,
      salary_range: salaryRange || "₹22,000 - ₹30,000 / month",
      required_trade: requiredTrade,
      min_job_ready_score: minScore,
      shift_type: body.shiftType || "Day Shift",
      hiring_urgency: body.hiringUrgency || "Immediate (0-15 Days)",
      perks: body.perks || ["Accommodation Available", "Free Canteen"],
      screening_questions: body.screeningQuestions || [
        "Do you possess an active NCVT ITI Trade Certificate?",
        "Are you ready for immediate shopfloor onboarding?"
      ],
      status: "ACTIVE",
      ai_generated_description: typeof body.description === "string" ? body.description : "",
      created_at: new Date().toISOString()
    };

    if (profile) {
      try {
        const supabase = createAdminClient();
        await supabase.from("job_posts").insert(newJobObj);
      } catch (e) {
        console.error("Database insert job error", e);
      }
    }

    return NextResponse.json({ data: newJobObj, message: "Job post published successfully." }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to publish job post." }, { status: 500 });
  }
}
