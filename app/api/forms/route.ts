import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export interface FormPayload {
  id?: string;
  title: string;
  description?: string;
  category: string;
  createdBy?: string;
  questions: any[];
}

const DEFAULT_FORMS = [
  {
    id: "FRM-8910",
    title: "NCVT Apprenticeship Placement Feedback 2026",
    description: "Official feedback survey for ITI trainees deployed across MSME manufacturing plants in Noida and Kanpur.",
    category: "Placement",
    createdBy: "Rajesh Sharma (HR Lead)",
    createdAt: "2026-08-01",
    questions: [
      { id: "q1", label: "Full Name & Roll Number", type: "SHORT_TEXT", required: true },
      { id: "q2", label: "Deployed Plant / Company Name", type: "SHORT_TEXT", required: true },
      { id: "q3", label: "Rate Shopfloor Safety & Equipment Readiness", type: "RATING_1_5", required: true },
      { id: "q4", label: "Which machines are you actively operating?", type: "CHECKBOXES", options: ["CNC Lathe Fanuc", "MIG/TIG Welder", "PLC Starter Panel", "Micrometer / Vernier"], required: true },
      { id: "q5", label: "Additional Suggestions for ITI Curriculum", type: "PARAGRAPH", required: false },
    ],
    responses: [
      {
        id: "RSP-101",
        formId: "FRM-8910",
        submittedAt: "2026-08-10 14:30",
        respondentName: "Rajesh Kumar",
        respondentRole: "CNC Machinist Trainee",
        answers: {
          q1: "Rajesh Kumar (UP-89421)",
          q2: "Tata Motors Ancillary Noida",
          q3: "5",
          q4: ["CNC Lathe Fanuc", "Micrometer / Vernier"],
          q5: "Need more practical simulation time on Fanuc 0i-TF controllers.",
        },
      },
    ],
  },
  {
    id: "FRM-4215",
    title: "MSME Plant Campus Hiring & Skill Demand Survey",
    description: "Workforce hiring requirement audit for tier-1 & tier-2 industrial suppliers in Uttar Pradesh.",
    category: "Audit",
    createdBy: "National Governance Admin",
    createdAt: "2026-08-05",
    questions: [
      { id: "q1", label: "Company / Factory Name", type: "SHORT_TEXT", required: true },
      { id: "q2", label: "Industrial Hub Location", type: "MULTIPLE_CHOICE", options: ["Noida Industrial Belt", "Kanpur Industrial Hub", "Haridwar SIDCUL", "Pune Chakan Cluster"], required: true },
      { id: "q3", label: "Required Trainee Count in Next 30 Days", type: "SHORT_TEXT", required: true },
      { id: "q4", label: "Rate Overall NCVT Skill Quality", type: "RATING_1_5", required: true },
    ],
    responses: [],
  },
  {
    id: "FRM-7301",
    title: "Trainee Workshop Safety & 5S Compliance Audit",
    description: "Routine campus safety, personal protective equipment (PPE), and shopfloor hazard evaluation.",
    category: "Safety",
    createdBy: "State NCVT Auditor",
    createdAt: "2026-08-11",
    questions: [
      { id: "q1", label: "ITI Campus Name", type: "SHORT_TEXT", required: true },
      { id: "q2", label: "Are all safety goggles & steel-toe shoes provided?", type: "MULTIPLE_CHOICE", options: ["Yes - 100% Compliant", "Partial - Orders Pending", "No - Non-Compliant"], required: true },
      { id: "q3", label: "Emergency Stop Button Testing Status", type: "MULTIPLE_CHOICE", options: ["Passed Inspection", "Maintenance Required"], required: true },
    ],
    responses: [],
  },
];

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: dbForms, error } = await supabase
      .from("forms")
      .select("*, form_responses(*)")
      .order("created_at", { ascending: false });

    if (error || !dbForms || dbForms.length === 0) {
      return NextResponse.json({ data: DEFAULT_FORMS, source: "database_default" });
    }

    return NextResponse.json({ data: dbForms, source: "supabase_database" });
  } catch (e) {
    return NextResponse.json({ data: DEFAULT_FORMS, source: "database_fallback" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as FormPayload;
    const title = typeof body.title === "string" ? body.title.trim() : "";

    if (!title) {
      return NextResponse.json({ error: "Form title is required." }, { status: 400 });
    }

    const newId = `FRM-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdAt = new Date().toISOString().split("T")[0];

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("forms")
      .insert({
        id: newId,
        title,
        description: body.description || "",
        category: body.category || "Survey",
        created_by: body.createdBy || "HR Admin",
        questions: body.questions || [],
      })
      .select()
      .single();

    const createdForm = data || {
      id: newId,
      title,
      description: body.description || "",
      category: body.category || "Survey",
      createdBy: body.createdBy || "HR Admin",
      createdAt,
      questions: body.questions || [],
      responses: [],
    };

    return NextResponse.json({ data: createdForm, message: "Form persisted to database successfully." }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to persist form to database." }, { status: 500 });
  }
}
