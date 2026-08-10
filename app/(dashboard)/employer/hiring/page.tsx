"use client";

import React, { useState } from "react";
import { Clock, Users, CheckCircle2, ArrowRight } from "lucide-react";

export default function EmployerHiringPage() {
  const [candidates, setCandidates] = useState([
    { id: "c1", name: "Rajesh Kumar", trade: "CNC Machinist", score: 94, stage: "SHORTLISTED" },
    { id: "c2", name: "Anit Sharma", trade: "Electrician", score: 91, stage: "INTERVIEWING" },
    { id: "c3", name: "Vikram Singh", trade: "Fitter & Assembly", score: 86, stage: "APPLIED" },
    { id: "c4", name: "Suman Patel", trade: "CNC Machinist", score: 92, stage: "HIRED" },
  ]);

  const stages = [
    { id: "APPLIED", label: "1. Pre-Filtered Applied", color: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10" },
    { id: "SHORTLISTED", label: "2. Shortlisted", color: "border-purple-500/40 text-purple-400 bg-purple-500/10" },
    { id: "INTERVIEWING", label: "3. Practical Interview", color: "border-amber-500/40 text-amber-400 bg-amber-500/10" },
    { id: "HIRED", label: "4. Offer Joined", color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" },
  ];

  const moveStage = (cId: string, nextStage: string) => {
    setCandidates(candidates.map((c) => (c.id === cId ? { ...c, stage: nextStage } : c)));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-emerald-400" />
            <span>10-Day Hiring Cycle Kanban Tracker</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Accelerated 10-day shopfloor hiring pipeline with zero initial retraining required.
          </p>
        </div>

        <div className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-extrabold">
          Cycle Deadline: 4 Days Remaining
        </div>
      </div>

      {/* Kanban 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map((stg) => {
          const colCandidates = candidates.filter((c) => c.stage === stg.id);
          return (
            <div key={stg.id} className="glass-card p-4 rounded-3xl border border-white/10 bg-slate-900/90 space-y-3 min-h-[400px]">
              
              <div className={`p-2.5 rounded-xl border text-xs font-bold ${stg.color} flex justify-between items-center`}>
                <span>{stg.label}</span>
                <span className="px-2 py-0.5 rounded-full bg-black/40 text-[10px] font-black">{colCandidates.length}</span>
              </div>

              <div className="space-y-2">
                {colCandidates.map((c) => (
                  <div key={c.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-white/20 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-bold text-white">{c.name}</div>
                        <div className="text-[10px] text-slate-400">{c.trade}</div>
                      </div>
                      <span className="text-xs font-black text-emerald-400">{c.score}</span>
                    </div>

                    {/* Move Stage Actions */}
                    <div className="flex gap-1 pt-1">
                      {stg.id !== "HIRED" && (
                        <button
                          onClick={() => {
                            const next = stg.id === "APPLIED" ? "SHORTLISTED" : stg.id === "SHORTLISTED" ? "INTERVIEWING" : "HIRED";
                            moveStage(c.id, next);
                          }}
                          className="w-full py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-[10px] flex items-center justify-center gap-1 transition-all"
                        >
                          <span>Advance ➔</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
