import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, getRequestProfile, hasRole } from "@/lib/supabase/server";

const allowedStatuses = new Set(["SHORTLISTED", "INTERVIEWING", "HIRED", "REJECTED"]);

export async function GET(request: NextRequest) {
  const profile = await getRequestProfile(request);
  if (!profile) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const supabase = createAdminClient();
  if (profile.role === "STUDENT") {
    const { data, error } = await supabase.from("applications").select("id,status,match_score,created_at,job_posts(id,title,company_name,location,required_trade,salary_range)").eq("student_id", profile.userId).order("created_at", { ascending: false });
    return error ? NextResponse.json({ error: error.message }, { status: 500 }) : NextResponse.json({ data });
  }
  if (!hasRole(profile, ["EMPLOYER", "HR"])) return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  const { data, error } = await supabase.from("applications").select("id,status,match_score,created_at,student_id,job_posts!inner(id,title,employer_id,required_trade)").eq("job_posts.employer_id", profile.userId).order("created_at", { ascending: false });
  return error ? NextResponse.json({ error: error.message }, { status: 500 }) : NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const profile = await getRequestProfile(request);
  if (!profile) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  if (profile.role !== "STUDENT") return NextResponse.json({ error: "Only students can apply." }, { status: 403 });
  const { jobId } = await request.json() as { jobId?: string };
  if (!jobId) return NextResponse.json({ error: "Job is required." }, { status: 400 });
  const supabase = createAdminClient();
  const { data: job } = await supabase.from("job_posts").select("id,min_job_ready_score,status").eq("id", jobId).eq("status", "ACTIVE").single();
  if (!job) return NextResponse.json({ error: "This job is unavailable." }, { status: 404 });
  const { data: details } = await supabase.from("student_details").select("job_ready_score").eq("user_id", profile.userId).maybeSingle();
  const matchScore = details?.job_ready_score ?? 0;
  const { data, error } = await supabase.from("applications").upsert({ job_id: job.id, student_id: profile.userId, match_score: matchScore, status: "APPLIED" }, { onConflict: "job_id,student_id" }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await supabase.from("audit_events").insert({ actor_id: profile.userId, entity_type: "application", entity_id: data.id, event_type: "APPLICATION_CREATED" });
  return NextResponse.json({ data }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const profile = await getRequestProfile(request);
  if (!profile) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  if (!hasRole(profile, ["EMPLOYER", "HR"])) return NextResponse.json({ error: "Only employers can update applications." }, { status: 403 });
  const { applicationId, status } = await request.json() as { applicationId?: string; status?: string };
  if (!applicationId || !status || !allowedStatuses.has(status)) return NextResponse.json({ error: "Invalid application transition." }, { status: 400 });
  const supabase = createAdminClient();
  const { data: application } = await supabase.from("applications").select("id,job_posts!inner(employer_id)").eq("id", applicationId).eq("job_posts.employer_id", profile.userId).single();
  if (!application) return NextResponse.json({ error: "Application not found." }, { status: 404 });
  const patch = status === "HIRED" ? { status, hired_at: new Date().toISOString() } : { status };
  const { data, error } = await supabase.from("applications").update(patch).eq("id", applicationId).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await supabase.from("audit_events").insert({ actor_id: profile.userId, entity_type: "application", entity_id: applicationId, event_type: `APPLICATION_${status}` });
  return NextResponse.json({ data });
}
