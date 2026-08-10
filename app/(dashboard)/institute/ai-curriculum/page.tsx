"use client";

import React, { useState } from "react";
import { Brain, Sparkles, RefreshCw, CheckCircle2, AlertTriangle, Building } from "lucide-react";

export default function AiCurriculumPage() {
  const [trade, setTrade] = useState("Electrician");
  const [syllabus, setSyllabus] = useState("Standard 2-Year NCVT Electrical Trade Syllabus covering transformer winding, AC/DC motors, basic wiring, and safety.");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/curriculum-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ syllabus, trade, targetCompanies: ["Tata Motors", "Havells"] })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-blue-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-400" />
            <span>NVIDIA NIM AI NCVT Curriculum Gap Analyzer</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Compare your ITI syllabus against live shopfloor requirements from Tata Motors, L&T, Havells & MSME plants.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Select Trade</label>
            <select
              value={trade}
              onChange={(e) => setTrade(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
            >
              <option value="Electrician">Industrial Electrician</option>
              <option value="CNC Machinist">CNC Machinist & Programmer</option>
              <option value="Fitter">Fitter & Assembly</option>
              <option value="Welder">Welder & Fabrication</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Current Syllabus Summary / Topics</label>
          <textarea
            rows={3}
            value={syllabus}
            onChange={(e) => setSyllabus(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-400"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin text-black" /> : <Sparkles className="w-4 h-4 text-black" />}
          <span>Run AI Curriculum Gap Analysis</span>
        </button>
      </div>

      {/* Results Panel */}
      {result && (
        <div className="glass-card p-6 rounded-3xl border border-blue-500/40 space-y-4 bg-slate-900/90 animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-extrabold text-blue-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI GAP ANALYSIS REPORT
            </span>
            <span className="text-sm font-black text-emerald-400">{result.industryCoveragePercent}% Industry Coverage</span>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase">Recommended Syllabus Additions</h4>
            {result.recommendedSyllabusAdditions?.map((add: any, idx: number) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-white">{add.topic}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Target Standard: {add.targetIndustryStandard}</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 font-extrabold">
                  {add.practicalLabHours} Hours Lab
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
