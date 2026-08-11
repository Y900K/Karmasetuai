"use client";

import React, { useState } from "react";
import { Clock, Users, CheckCircle2, ArrowRight, RotateCcw, AlertCircle } from "lucide-react";
import { useEcosystemStore } from "@/lib/store/EcosystemStore";

export default function EmployerHiringPage() {
  const [candidates, setCandidates] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("karmasetu_hiring_kanban");
      if (saved) return JSON.parse(saved);
    }
    return [
      { id: "c1", name: "Rajesh Kumar", trade: "CNC Machinist & Programmer", score: 94, stage: "SHORTLISTED", daysInStage: 2 },
      { id: "c2", name: "Anit Sharma", trade: "Industrial Electrician", score: 91, stage: "INTERVIEWING", daysInStage: 3 },
      { id: "c3", name: "Vikram Singh", trade: "Mechanical Fitter", score: 86, stage: "APPLIED", daysInStage: 1 },
      { id: "c4", name: "Suman Patel", trade: "CNC Machinist", score: 92, stage: "HIRED", daysInStage: 5 },
      { id: "c5", name: "Pooja Verma", trade: "QA/QC Quality Inspector", score: 88, stage: "APPLIED", daysInStage: 1 },
    ];
  });

  const stages = [
    { id: "APPLIED", label: "1. Pre-Filtered Applied", color: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10" },
    { id: "SHORTLISTED", label: "2. Shortlisted", color: "border-purple-500/40 text-purple-400 bg-purple-500/10" },
    { id: "INTERVIEWING", label: "3. Practical Interview", color: "border-amber-500/40 text-amber-400 bg-amber-500/10" },
    { id: "HIRED", label: "4. Offer Joined", color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" },
  ];

  const { hireCandidate } = useEcosystemStore();

  const moveStage = (cId: string, nextStage: string) => {
    const updated = candidates.map((c: any) => (c.id === cId ? { ...c, stage: nextStage } : c));
    setCandidates(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("karmasetu_hiring_kanban", JSON.stringify(updated));
    }
    if (nextStage === "HIRED") {
      hireCandidate("j1", cId);
    }
  };

  const resetKanban = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("karmasetu_hiring_kanban");
    }
    setCandidates([
      { id: "c1", name: "Rajesh Kumar", trade: "CNC Machinist & Programmer", score: 94, stage: "SHORTLISTED", daysInStage: 2 },
      { id: "c2", name: "Anit Sharma", trade: "Industrial Electrician", score: 91, stage: "INTERVIEWING", daysInStage: 3 },
      { id: "c3", name: "Vikram Singh", trade: "Mechanical Fitter", score: 86, stage: "APPLIED", daysInStage: 1 },
      { id: "c4", name: "Suman Patel", trade: "CNC Machinist", score: 92, stage: "HIRED", daysInStage: 5 },
      { id: "c5", name: "Pooja Verma", trade: "QA/QC Quality Inspector", score: 88, stage: "APPLIED", daysInStage: 1 },
    ]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-emerald-400" />
            <span>10-Day Hiring Cycle Kanban Tracker (Real-Time Persistence)</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Track candidates real-time across the 10-day shopfloor hiring SLA cycle.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetKanban}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" /> Reset Board
          </button>
          <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-extrabold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>SLA Countdown: Day 6 of 10</span>
          </div>
        </div>
      </div>

      {/* Kanban 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map((stg) => {
          const colCandidates = candidates.filter((c: any) => c.stage === stg.id);
          return (
            <div key={stg.id} className="glass-card p-4 rounded-3xl border border-white/10 bg-slate-900/90 space-y-3 min-h-[420px]">
              
              <div className={`p-2.5 rounded-xl border text-xs font-bold ${stg.color} flex justify-between items-center`}>
                <span>{stg.label}</span>
                <span className="px-2 py-0.5 rounded-full bg-black/40 text-[10px] font-black">{colCandidates.length}</span>
              </div>

              <div className="space-y-2.5">
                {colCandidates.map((c: any) => (
                  <div key={c.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-white/20 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-bold text-white">{c.name}</div>
                        <div className="text-[10px] text-slate-400">{c.trade}</div>
                      </div>
                      <span className="text-xs font-black text-emerald-400">{c.score} Index</span>
                    </div>

                    <div className="text-[9px] text-slate-400 font-mono">
                      In stage: {c.daysInStage} day(s)
                    </div>

                    {/* Move Stage Actions */}
                    <div className="flex gap-1.5 pt-1">
                      {stg.id !== "APPLIED" && (
                        <button
                          onClick={() => {
                            const prev = stg.id === "HIRED" ? "INTERVIEWING" : stg.id === "INTERVIEWING" ? "SHORTLISTED" : "APPLIED";
                            moveStage(c.id, prev);
                          }}
                          className="w-1/2 py-1.5 rounded bg-white/10 hover:bg-white/20 text-slate-300 font-bold text-[10px] flex items-center justify-center transition-all"
                        >
                          <span>← Back</span>
                        </button>
                      )}

                      {stg.id !== "HIRED" && (
                        <button
                          onClick={() => {
                            const next = stg.id === "APPLIED" ? "SHORTLISTED" : stg.id === "SHORTLISTED" ? "INTERVIEWING" : "HIRED";
                            moveStage(c.id, next);
                          }}
                          className="w-full py-1.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-[10px] flex items-center justify-center gap-1 transition-all"
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
