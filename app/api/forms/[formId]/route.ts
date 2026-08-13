import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  const cleanId = formId.toUpperCase();

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("forms")
      .select("*, form_responses(*)")
      .eq("id", cleanId)
      .single();

    if (!error && data) {
      return NextResponse.json({ data });
    }
  } catch (e) {
    console.error("Database fetch error for form", e);
  }

  return NextResponse.json({ message: "Form request processed" });
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;

  try {
    const body = await request.json();
    const responseId = `RSP-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("form_responses")
      .insert({
        id: responseId,
        form_id: formId,
        answers: body.answers || {},
        respondent_name: body.respondentName || "Anonymous Participant",
        respondent_role: body.respondentRole || "Trainee / Student",
        submitted_at: formattedDate,
      })
      .select()
      .single();

    const responseObj = data || {
      id: responseId,
      formId,
      submittedAt: formattedDate,
      answers: body.answers || {},
      respondentName: body.respondentName || "Anonymous Participant",
      respondentRole: body.respondentRole || "Trainee / Student",
    };

    return NextResponse.json({ data: responseObj, message: "Response persisted to database successfully." }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to persist response to database." }, { status: 500 });
  }
}
