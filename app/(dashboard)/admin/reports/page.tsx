"use client";

import React, { useState } from "react";
import { FileText, Download, Sparkles, RefreshCw, Printer } from "lucide-react";

export default function AdminReportsPage() {
  const [generating, setGenerating] = useState(false);
  const [executiveSummary, setExecutiveSummary] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: "Generate a 1-page executive narrative summary for Skill India Q2 2026 workforce compliance: 127 ITIs, 84.2% placement rate, top district Noida (92%)."
        })
      });
      const data = await res.json();
      if (data.success && data.response) {
        setExecutiveSummary(data.response);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-400" />
            <span>National Compliance Reports & AI Executive Summary</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Generate and export MSDE Skill India compliance reports with NVIDIA NIM automated narratives.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <Printer className="w-4 h-4 text-amber-400" /> Print PDF Report
          </button>
        </div>
      </div>

      {/* AI Summary Generator Action */}
      <div className="glass-card p-6 rounded-3xl border border-amber-500/40 space-y-4 bg-slate-900/90">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" /> AI EXECUTIVE NARRATIVE GENERATOR (NVIDIA NIM)
          </span>

          <button
            onClick={handleGenerateSummary}
            disabled={generating}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-cyan-400 text-black font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
          >
            {generating ? <RefreshCw className="w-4 h-4 animate-spin text-black" /> : <Sparkles className="w-4 h-4 text-black" />}
            <span>Generate Executive Summary</span>
          </button>
        </div>

        {executiveSummary && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 leading-relaxed font-sans animate-fade-in">
            <p className="font-bold text-white mb-1">Executive Summary Narrative (Q2 2026):</p>
            {executiveSummary}
          </div>
        )}
      </div>

    </div>
  );
}
