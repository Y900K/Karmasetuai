"use client";
import { useEffect, useState } from "react";
import { Briefcase, Building, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
type Job = { id: string; title: string; company_name: string; location: string; required_trade: string; salary_range: string; };
export default function StudentJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]); const [message, setMessage] = useState("Loading live jobs…");
  const load = async () => { const response = await fetch("/api/jobs"); const payload = await response.json(); if (response.ok) { setJobs(payload.data); setMessage(payload.data.length ? "Live data from Supabase" : "No active jobs yet."); } else setMessage(payload.error || "Could not load jobs."); };
  useEffect(() => {
    void load();
    const channel = supabase.channel("student-live-jobs").on("postgres_changes", { event: "*", schema: "public", table: "job_posts" }, () => void load()).subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, []);
  const apply = async (jobId: string) => { const response = await fetch("/api/applications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ jobId }) }); const payload = await response.json(); setMessage(response.ok ? "Application saved. The employer can now progress it." : payload.error || "Application failed."); };
  return <div className="space-y-6 animate-fade-in"><div className="glass-card p-6 rounded-3xl border border-cyan-500/30 bg-slate-900/90"><h1 className="text-2xl font-black text-white flex items-center gap-2"><Briefcase className="text-cyan-400" />Live MSME Job Matches</h1><p className="text-xs text-slate-300 mt-2">{message}</p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{jobs.map((job) => <article key={job.id} className="glass-card p-6 rounded-3xl border border-white/10 bg-slate-900/90 space-y-4"><div><h2 className="font-bold text-white">{job.title}</h2><p className="text-xs text-cyan-300 flex gap-1 mt-1"><Building className="w-3.5" />{job.company_name}</p></div><p className="text-xs text-slate-300 flex gap-1"><MapPin className="w-3.5" />{job.location}</p><p className="text-xs text-slate-300">{job.required_trade} · {job.salary_range}</p><button onClick={() => void apply(job.id)} className="w-full py-3 rounded-xl bg-cyan-500 text-black font-extrabold text-xs">Apply once</button></article>)}</div></div>;
}
