"use client";

import React, { useState } from "react";
import { FilePlus, Sparkles, RefreshCw, Save, Check } from "lucide-react";
import AutosaveIndicator from "@/components/dashboard/shared/AutosaveIndicator";

export default function EmployerPostJobPage() {
  const [roleSummary, setRoleSummary] = useState("CNC Lathe Operator for Noida Plant");
  const [tradeSelect, setTradeSelect] = useState("CNC Machinist & Programmer");
  const [customTrade, setCustomTrade] = useState("");
  const [location, setLocation] = useState("Noida Sector 63");
  const [salary, setSalary] = useState("₹24,000 - ₹32,000 / month");
  const [minScore, setMinScore] = useState(80);
  const [jdDescription, setJdDescription] = useState("");
  const [generating, setGenerating] = useState(false);
  const [status, setStatus] = useState<"SAVED" | "SAVING" | "ERROR">("SAVED");
  const [published, setPublished] = useState(false);

  const effectiveTrade = tradeSelect === "OTHER" ? customTrade : tradeSelect;

  const handleGenerateJd = async () => {
    if (!roleSummary) return;
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/jd-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleSummary, trade: effectiveTrade, location })
      });
      const data = await res.json();
      if (data.success && data.data) {
        if (data.data.fullJdText) setJdDescription(data.data.fullJdText);
        if (data.data.requiredTrade) {
          setCustomTrade(data.data.requiredTrade);
          setTradeSelect("OTHER");
        }
        if (data.data.suggestedSalary) setSalary(data.data.suggestedSalary);
        if (data.data.minJobReadyScore) setMinScore(data.data.minJobReadyScore);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
      triggerAutosave();
    }
  };

  const triggerAutosave = () => {
    setStatus("SAVING");
    setTimeout(() => setStatus("SAVED"), 600);
  };

  const handlePublishJob = async () => {
    setStatus("SAVING");
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: roleSummary || effectiveTrade, location, requiredTrade: effectiveTrade, salaryRange: salary, minScore, description: jdDescription }),
      });
      if (!response.ok) throw new Error();
      setPublished(true);
      setTimeout(() => setPublished(false), 3000);
      setStatus("SAVED");
    } catch {
      setStatus("ERROR");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <FilePlus className="w-6 h-6 text-emerald-400" />
            <span>Post MSME Job & AI JD Generator</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Generate professional job descriptions for any trade or custom role with AI market benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {published && (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold animate-pulse">
              ✓ Broadcasted to Student Matches in Real Time!
            </span>
          )}
          <AutosaveIndicator status={status} />
          <button
            onClick={handlePublishJob}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
          >
            <Check className="w-4 h-4 text-black" />
            <span>Publish Job Post</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        
        {/* Quick AI Summary Generator */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
          <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" /> 1-CLICK AI JOB DESCRIPTION GENERATOR
          </span>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={roleSummary}
              onChange={(e) => setRoleSummary(e.target.value)}
              placeholder="e.g. HR Executive, CNC Operator, Quality Technician, Safety Officer..."
              className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={handleGenerateJd}
              disabled={generating}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              {generating ? <RefreshCw className="w-4 h-4 animate-spin text-black" /> : <Sparkles className="w-4 h-4 text-black" />}
              <span>Generate AI JD</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Required Trade / Specialized Role</label>
            <select
              value={tradeSelect}
              onChange={(e) => {
                setTradeSelect(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 mb-2"
            >
              <option value="CNC Machinist & Programmer">CNC Machinist & Programmer</option>
              <option value="Industrial Electrician & PLC">Industrial Electrician & PLC</option>
              <option value="Fitter & Quality Inspection">Fitter & Quality Inspection</option>
              <option value="Welder & Metal Fabrication">Welder & Metal Fabrication</option>
              <option value="OTHER">Other (Type custom role manually below)</option>
            </select>

            {tradeSelect === "OTHER" && (
              <input
                type="text"
                value={customTrade}
                onChange={(e) => {
                  setCustomTrade(e.target.value);
                  triggerAutosave();
                }}
                placeholder="Specify custom role (e.g. HR Executive, Maintenance Lead, Quality Auditor)..."
                className="w-full bg-slate-950 border border-amber-400/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Factory / Office Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Salary Range</label>
            <input
              type="text"
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Min. JobReady Index™ Score Required</label>
            <input
              type="number"
              value={minScore}
              onChange={(e) => {
                setMinScore(Number(e.target.value));
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-extrabold text-emerald-400"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-300 uppercase">Job Description Content</label>
            {jdDescription && (
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(jdDescription);
                  alert("Copied full Job Description to clipboard!");
                }}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-extrabold flex items-center gap-1 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30"
              >
                <span>📋 Copy to Clipboard</span>
              </button>
            )}
          </div>
          <textarea
            rows={6}
            value={jdDescription}
            onChange={(e) => {
              setJdDescription(e.target.value);
              triggerAutosave();
            }}
            placeholder="Responsibilities, required shopfloor skills, equipment operating standards..."
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 leading-relaxed font-sans"
          />
        </div>

      </div>

    </div>
  );
}
