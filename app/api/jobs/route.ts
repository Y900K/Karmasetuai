import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, getRequestProfile, hasRole } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const profile = await getRequestProfile(request);
  if (!profile) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const supabase = createAdminClient();
  const query = supabase.from("job_posts").select("id,title,company_name,location,required_trade,salary_range,min_job_ready_score,status,created_at").order("created_at", { ascending: false });
  const { data, error } = hasRole(profile, ["EMPLOYER", "HR"]) ? await query.eq("employer_id", profile.userId) : await query.eq("status", "ACTIVE");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const profile = await getRequestProfile(request);
  if (!profile) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  if (!hasRole(profile, ["EMPLOYER", "HR"])) return NextResponse.json({ error: "Only employers can publish jobs." }, { status: 403 });
  const body = await request.json() as Record<string, unknown>;
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const location = typeof body.location === "string" ? body.location.trim() : "";
  const requiredTrade = typeof body.requiredTrade === "string" ? body.requiredTrade.trim() : "";
  const salaryRange = typeof body.salaryRange === "string" ? body.salaryRange.trim() : "";
  const minScore = typeof body.minScore === "number" ? body.minScore : 0;
  if (!title || !location || !requiredTrade || !salaryRange || minScore < 0 || minScore > 100) return NextResponse.json({ error: "Provide a title, location, trade, salary range, and score from 0–100." }, { status: 400 });
  const supabase = createAdminClient();
  const { data: employer } = await supabase.from("employer_details").select("company_name").eq("user_id", profile.userId).maybeSingle();
  const { data, error } = await supabase.from("job_posts").insert({ employer_id: profile.userId, company_name: employer?.company_name || profile.fullName, title, industry_sector: "Manufacturing", location, salary_range: salaryRange, required_trade: requiredTrade, min_job_ready_score: minScore, status: "ACTIVE", ai_generated_description: typeof body.description === "string" ? body.description : null }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await supabase.from("audit_events").insert({ actor_id: profile.userId, entity_type: "job_post", entity_id: data.id, event_type: "JOB_PUBLISHED" });
  return NextResponse.json({ data }, { status: 201 });
}
