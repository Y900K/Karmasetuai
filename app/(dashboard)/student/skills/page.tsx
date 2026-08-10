"use client";

import React, { useState } from "react";
import { Award, CheckCircle2, Sparkles, AlertTriangle, RefreshCw } from "lucide-react";

export default function StudentSkillsPage() {
  const [loadingRadar, setLoadingRadar] = useState(false);
  const [radarResult, setRadarResult] = useState<any>(null);

  const handleRunRadar = async () => {
    setLoadingRadar(true);
    try {
      const res = await fetch("/api/ai/skill-radar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trade: "CNC Machinist",
          studentSkills: ["Fanuc G-Code", "Micrometer Calibration", "5S Safety"]
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setRadarResult(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingRadar(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-cyan-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-cyan-400" />
            <span>Verified Practical Competencies & AI Skill Radar</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Verified by Senior Plant Engineers & Master Mentors on live shopfloor machines.
          </p>
        </div>

        <button
          onClick={handleRunRadar}
          disabled={loadingRadar}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-cyan-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
        >
          {loadingRadar ? <RefreshCw className="w-4 h-4 animate-spin text-black" /> : <Sparkles className="w-4 h-4 text-black" />}
          <span>Run AI Skill Radar Scan</span>
        </button>
      </div>

      {/* Verified Skills List */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Verified Shopfloor Competencies</h3>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white">Fanuc CNC Lathe G-Code Programming</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Evaluated on live shopfloor machine by Senior Engineer L&T</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              Score: 96%
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white">Precision Micrometer & Vernier Calibration</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Tolerance testing down to ±0.01mm on steel components</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              Score: 92%
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white">Industrial Safety & 5S Workplace Compliance</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Certified by Master Mentor Authority</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              Score: 94%
            </span>
          </div>
        </div>
      </div>

      {/* AI Radar Scan Results */}
      {radarResult && (
        <div className="glass-card p-6 rounded-3xl border border-amber-500/40 space-y-4 bg-slate-900/90 animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> AI SKILL RADAR GAP ANALYSIS
            </span>
            <span className="text-sm font-black text-cyan-300">{radarResult.coveragePercentage}% Industry Match</span>
          </div>

          <div className="space-y-3">
            {radarResult.criticalGaps?.map((gap: any, idx: number) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-white">{gap.skill}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Recommended: {gap.recommendedModule} ({gap.estimatedHours} Hours)</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-extrabold">
                  + {gap.scoreImpact} Index
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
