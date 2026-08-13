"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type Stage = "APPLIED" | "SHORTLISTED" | "INTERVIEWING" | "HIRED" | "REJECTED";
type Application = { id: string; status: Stage; match_score: number; created_at: string; student_id: string; job_posts: { id: string; title: string; required_trade: string } };
const stages: { id: Stage; label: string; color: string }[] = [
  { id: "APPLIED", label: "1. Applied", color: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10" },
  { id: "SHORTLISTED", label: "2. Shortlisted", color: "border-purple-500/40 text-purple-400 bg-purple-500/10" },
  { id: "INTERVIEWING", label: "3. Interviewing", color: "border-amber-500/40 text-amber-400 bg-amber-500/10" },
  { id: "HIRED", label: "4. Hired", color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" },
];
const nextStage: Record<Exclude<Stage, "HIRED" | "REJECTED">, Stage> = { APPLIED: "SHORTLISTED", SHORTLISTED: "INTERVIEWING", INTERVIEWING: "HIRED" };

export default function EmployerHiringPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [message, setMessage] = useState("Loading live applications…");
  const [busyId, setBusyId] = useState<string | null>(null);
  const load = async () => { const res = await fetch("/api/applications"); const payload = await res.json(); if (res.ok) { setApplications(payload.data); setMessage(payload.data.length ? "Live Supabase pipeline" : "No applications yet."); } else setMessage(payload.error || "Could not load applications."); };
  useEffect(() => { void load(); const channel = supabase.channel("employer-applications").on("postgres_changes", { event: "*", schema: "public", table: "applications" }, () => void load()).subscribe(); return () => { void supabase.removeChannel(channel); }; }, []);
  const advance = async (application: Application) => { const status = nextStage[application.status as keyof typeof nextStage]; if (!status) return; setBusyId(application.id); const res = await fetch("/api/applications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ applicationId: application.id, status }) }); const payload = await res.json(); setBusyId(null); if (!res.ok) { setMessage(payload.error || "Update failed."); return; } setApplications((current) => current.map((item) => item.id === application.id ? { ...item, status } : item)); setMessage(status === "HIRED" ? "Hire committed. Placement outcome and audit event were created." : `Application advanced to ${status}.`); };
  const grouped = useMemo(() => Object.fromEntries(stages.map((stage) => [stage.id, applications.filter((application) => application.status === stage.id)])), [applications]);
  return <div className="space-y-6 animate-fade-in"><div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-2xl font-black text-white flex items-center gap-2"><Clock className="w-6 h-6 text-emerald-400" />Hiring Cycle Kanban</h1><p className="text-xs text-slate-300 mt-1">{message}</p></div><button onClick={() => void load()} className="px-3 py-2 rounded-xl bg-white/10 text-slate-200 text-xs font-bold flex gap-1"><RefreshCw className="w-3.5" />Refresh</button></div><div className="grid grid-cols-1 md:grid-cols-4 gap-4">{stages.map((stage) => <section key={stage.id} className="glass-card p-4 rounded-3xl border border-white/10 bg-slate-900/90 min-h-[300px]"><div className={`p-2.5 rounded-xl border text-xs font-bold ${stage.color} flex justify-between`}><span>{stage.label}</span><span>{grouped[stage.id].length}</span></div><div className="space-y-2.5 mt-3">{grouped[stage.id].map((application) => <article key={application.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2"><p className="text-xs font-bold text-white">Applicant {application.student_id.slice(0, 8)}</p><p className="text-[10px] text-slate-400">{application.job_posts.title}</p><p className="text-[10px] text-slate-400">{application.job_posts.required_trade} · {application.match_score}% score</p>{stage.id !== "HIRED" && <button disabled={busyId === application.id} onClick={() => void advance(application)} className="w-full py-1.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">{busyId === application.id ? "Saving…" : `Advance to ${nextStage[stage.id as keyof typeof nextStage]}`}</button>}</article>)}</div></section>)}</div></div>;
}
