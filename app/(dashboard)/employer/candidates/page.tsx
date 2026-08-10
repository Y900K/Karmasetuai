"use client";

import React, { useState } from "react";
import { Users, Sparkles, Award, CheckCircle2, Search, Building } from "lucide-react";

export default function EmployerCandidatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [offeredMap, setOfferedMap] = useState<Record<string, boolean>>({});

  const candidates = [
    {
      id: "cand-1",
      name: "Rajesh Kumar",
      trade: "CNC Machinist & Programmer",
      institute: "Govt ITI Lucknow",
      passportId: "KMP-8A92F1",
      score: 94,
      matchReason: "Ranked #1: Fanuc Lathe G-Code (96%), Micrometer Calibration ±0.01mm (92%), 5S Safety (94%). All zero-retraining requirements met.",
      skills: ["Fanuc G-Code", "Precision Calibration ±0.01mm", "5S Safety"],
    },
    {
      id: "cand-2",
      name: "Anit Sharma",
      trade: "Industrial Electrician",
      institute: "Govt ITI Kanpur",
      passportId: "KMP-3B41C2",
      score: 91,
      matchReason: "Ranked #2: 3-Phase Control Wiring (94%), Motor Diagnostics (90%), Safety Certified.",
      skills: ["Control Wiring", "Motor Testing", "PLC Basics"],
    },
    {
      id: "cand-3",
      name: "Suman Patel",
      trade: "CNC Machinist",
      institute: "Polytechnic Lucknow",
      passportId: "KMP-9C44E1",
      score: 92,
      matchReason: "Ranked #3: CAD DXF Import (90%), Quality Tolerance Inspection (94%).",
      skills: ["CAD Import", "G-Code", "Tolerance Testing"],
    },
  ];

  const toggleOffer = (id: string) => {
    setOfferedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-400" />
            <span>Pre-Filtered Candidates Pipeline & AI Match Explainer</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Candidates ranked by JobReady Index™ score with NVIDIA NIM contextual match explanations.
          </p>
        </div>

        <div className="relative max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, trade, or ID..."
            className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Candidate Pipeline Cards */}
      <div className="space-y-4">
        {candidates.map((c) => (
          <div key={c.id} className="glass-card p-6 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90 hover:border-emerald-500/40 transition-all">
            
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{c.name}</h3>
                  <span className="font-mono text-xs text-cyan-300 font-bold">{c.passportId}</span>
                </div>
                <p className="text-xs text-slate-400">{c.trade} • {c.institute}</p>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black text-sm">
                  {c.score} / 100 Index
                </span>
              </div>
            </div>

            {/* AI Match Explainer Box */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> AI MATCH EXPLAINER (NVIDIA NIM)
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">{c.matchReason}</p>
            </div>

            {/* Verified Skills & Direct Action */}
            <div className="flex flex-wrap justify-between items-center gap-3 pt-2 border-t border-white/10">
              <div className="flex flex-wrap gap-1">
                {c.skills.map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-slate-300 text-[10px] font-bold border border-white/10">
                    ✓ {s}
                  </span>
                ))}
              </div>

              <button
                onClick={() => toggleOffer(c.id)}
                className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-md ${
                  offeredMap[c.id]
                    ? "bg-emerald-500 text-black shadow-emerald-500/20"
                    : "bg-gradient-to-r from-emerald-400 to-cyan-400 text-black shadow-emerald-500/20 hover:scale-102"
                }`}
              >
                {offeredMap[c.id] ? "Direct Job Offer Issued ✓" : "Issue Direct Job Offer ➔"}
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
