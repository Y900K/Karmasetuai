"use client";

import React, { useState } from "react";
import { Briefcase, MapPin, CheckCircle2, Building, DollarSign, Filter, Search } from "lucide-react";
import { useEcosystemStore } from "@/lib/store/EcosystemStore";

export default function StudentJobsPage() {
  const { jobs } = useEcosystemStore();
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});

  const toggleApply = (id: string) => {
    setAppliedJobs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-cyan-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-cyan-400" />
            <span>Pre-Filtered MSME Job Matches</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Jobs pre-filtered for your JobReady Index™ score &gt; 80 with zero retraining required. Real-time postings sync directly from employers.
          </p>
        </div>

        <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
          10-Day Hiring Cycle Active ({jobs.length} Matches)
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map((j) => (
          <div key={j.id} className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90 flex flex-col justify-between hover:border-cyan-500/40 transition-all">
            
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold text-white">{j.title}</h3>
                  <div className="text-xs font-semibold text-cyan-300 flex items-center gap-1 mt-0.5">
                    <Building className="w-3.5 h-3.5" /> {j.company}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-black text-xs border border-emerald-500/40">
                  {j.matchedScore}% Match
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" /> {j.location}
                </div>
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" /> {j.salary}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Required Verified Trade</div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-[10px] font-bold border border-cyan-500/20">
                    {j.trade}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => toggleApply(j.id)}
              className={`w-full py-3 rounded-xl text-xs font-extrabold transition-all shadow-md ${
                appliedJobs[j.id]
                  ? "bg-emerald-500 text-black shadow-emerald-500/20"
                  : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/20"
              }`}
            >
              {appliedJobs[j.id] ? "Application Sent ✓" : "1-Click Direct Apply ➔"}
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}
