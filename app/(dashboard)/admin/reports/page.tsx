"use client";

import React, { useState } from "react";
import { FileText, Download, Sparkles, RefreshCw, FileSpreadsheet } from "lucide-react";
import { exportToCSV } from "@/lib/utils/export";

export default function AdminReportsPage() {
  const [generating, setGenerating] = useState(false);
  const [executiveSummary, setExecutiveSummary] = useState<string | null>(null);
  const [quarter, setQuarter] = useState("Q2 2026");
  const [district, setDistrict] = useState("Gautam Buddha Nagar (Noida)");
  const [itiCount, setItiCount] = useState("127");

  const complianceReports = [
    { reportName: "NCVT Curriculum & Lab Equipment Audit Q2", cluster: "Noida Sector 63", status: "100% COMPLIANT", score: 94 },
    { reportName: "MSME Apprenticeship Attendance Audit", cluster: "Haridwar SIDCUL", status: "VERIFIED", score: 88 },
    { reportName: "Dual Training System Placement Velocity", cluster: "Kanpur Industrial", status: "ACTION REQUIRED", score: 64 },
    { reportName: "Industry 4.0 PLC Lab Readiness Index", cluster: "Lucknow Main", status: "VERIFIED", score: 91 },
  ];

  const handleGenerateSummary = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/executive-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Generate an executive narrative summary for Skill India ${quarter} workforce compliance across ${itiCount} ITIs in ${district} cluster.`
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



  const handleDownloadNarrative = () => {
    if (!executiveSummary) return;
    const text = `KarmaSetu AI — Executive Compliance Narrative\nPeriod: ${quarter}\nDistrict: ${district}\nITIs: ${itiCount}\n\n${executiveSummary}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `executive_narrative_${quarter.replace(/\s/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in printable-area">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-400" />
            <span>National Compliance Reports & AI Executive Summary</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Generate and export MSDE Skill India compliance reports with automated AI narratives.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap no-print">
          <button
            onClick={() => exportToCSV("compliance_reports", complianceReports)}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-amber-500/20"
          >
            <FileSpreadsheet className="w-4 h-4 text-black" /> Export CSV
          </button>

          {executiveSummary && (
            <button
              onClick={handleDownloadNarrative}
              className="px-3.5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-purple-500/20"
            >
              <Download className="w-4 h-4" /> Download Narrative (TXT)
            </button>
          )}
        </div>
      </div>

      {/* AI Summary Generator Action */}
      <div className="glass-card p-6 rounded-3xl border border-amber-500/40 space-y-4 bg-slate-900/90">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" /> AI EXECUTIVE NARRATIVE GENERATOR
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Period</label>
            <select
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="Q2 2026">Q2 2026 (Current)</option>
              <option value="Q1 2026">Q1 2026 (Historical)</option>
              <option value="Q3 2026 Projection">Q3 2026 Projection</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Focus Cluster / District</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Active ITIs Count</label>
            <input
              type="text"
              value={itiCount}
              onChange={(e) => setItiCount(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerateSummary}
            disabled={generating}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-cyan-400 text-black font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all hover:scale-102"
          >
            {generating ? <RefreshCw className="w-4 h-4 animate-spin text-black" /> : <Sparkles className="w-4 h-4 text-black" />}
            <span>Generate Custom AI Summary Narrative</span>
          </button>
        </div>

        {generating && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-amber-300 font-bold text-center flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
            <span>Synthesizing MSDE Skill India Compliance Narrative for {district}...</span>
          </div>
        )}

        {executiveSummary && !generating && (
          <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/30 text-xs text-slate-200 leading-relaxed font-sans animate-fade-in space-y-2">
            <p className="font-bold text-amber-300">Executive Summary Narrative ({quarter} • {district}):</p>
            <div className="whitespace-pre-wrap">{executiveSummary}</div>
          </div>
        )}
      </div>

    </div>
  );
}
