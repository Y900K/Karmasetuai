"use client";

import React, { useState } from "react";
import {
  FilePlus, Sparkles, RefreshCw, Save, Check, Plus, Trash2, HelpCircle,
  Clock, MapPin, DollarSign, Award, CheckCircle2, ShieldCheck, Zap
} from "lucide-react";
import AutosaveIndicator from "@/components/dashboard/shared/AutosaveIndicator";

export default function EmployerPostJobPage() {
  const [roleSummary, setRoleSummary] = useState("Senior CNC Lathe Operator & Fanuc Programmer");
  const [tradeSelect, setTradeSelect] = useState("CNC Machinist & Programmer");
  const [customTrade, setCustomTrade] = useState("");
  const [location, setLocation] = useState("Noida Sector 63 Industrial Belt");
  const [salary, setSalary] = useState("₹26,000 - ₹34,000 / month");
  const [minScore, setMinScore] = useState(80);
  const [shiftType, setShiftType] = useState("Rotational 3-Shift");
  const [hiringUrgency, setHiringUrgency] = useState("Immediate (0-15 Days)");
  const [jdDescription, setJdDescription] = useState("");
  const [generating, setGenerating] = useState(false);
  const [status, setStatus] = useState<"SAVED" | "SAVING" | "ERROR">("SAVED");
  const [published, setPublished] = useState(false);

  // Naukri-style Screening Questions State
  const [screeningQuestions, setScreeningQuestions] = useState<string[]>([
    "Do you possess a valid NCVT ITI Trade Certificate in Turner / Machinist?",
    "How many months of practical Fanuc 0i-TF CNC controller experience do you have?",
    "Are you ready for immediate shopfloor joining at Noida Sector 63 plant?"
  ]);
  const [newQuestionText, setNewQuestionText] = useState("");

  // Perks toggles
  const [accommodation, setAccommodation] = useState(true);
  const [canteen, setCanteen] = useState(true);
  const [transport, setTransport] = useState(false);
  const [overtime, setOvertime] = useState(true);

  const effectiveTrade = tradeSelect === "OTHER" ? customTrade : tradeSelect;

  const handleAddQuestion = () => {
    if (!newQuestionText.trim()) return;
    setScreeningQuestions([...screeningQuestions, newQuestionText.trim()]);
    setNewQuestionText("");
    triggerAutosave();
  };

  const handleRemoveQuestion = (index: number) => {
    setScreeningQuestions(screeningQuestions.filter((_, i) => i !== index));
    triggerAutosave();
  };

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
      const activePerks = [];
      if (accommodation) activePerks.push("Accommodation Provided");
      if (canteen) activePerks.push("Free Canteen Facility");
      if (transport) activePerks.push("Subsidized Transportation");
      if (overtime) activePerks.push("Overtime Bonus");

      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: roleSummary || effectiveTrade,
          location,
          requiredTrade: effectiveTrade,
          salaryRange: salary,
          minScore,
          shiftType,
          hiringUrgency,
          perks: activePerks,
          screeningQuestions,
          description: jdDescription
        }),
      });

      if (!response.ok) throw new Error();
      setPublished(true);
      setTimeout(() => setPublished(false), 4000);
      setStatus("SAVED");
    } catch {
      setStatus("ERROR");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in printable-area">
      
      {/* Top Banner */}
      <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <FilePlus className="w-6 h-6 text-emerald-400" />
              <span>Advanced MSME Job Posting Engine</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase">
              Naukri.com Style Hiring Suite
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Post vocational hiring requirements with AI job description generation, shift parameters, and custom screening questions.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {published && (
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold animate-pulse flex items-center gap-1">
              <Zap className="w-4 h-4 text-emerald-400" /> Broadcasted to Matched Trainees!
            </span>
          )}
          <AutosaveIndicator status={status} />
          <button
            onClick={handlePublishJob}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all hover:scale-102"
          >
            <Check className="w-4 h-4 text-black" />
            <span>Publish & Broadcast Job Post</span>
          </button>
        </div>
      </div>

      {/* Main Form Cards Container */}
      <div className="space-y-6">
        
        {/* Card 1: 1-Click AI Job Description Generator */}
        <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-slate-900/90 space-y-3">
          <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" /> 1-CLICK AI JOB DESCRIPTION & BENCHMARK GENERATOR
          </span>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={roleSummary}
              onChange={(e) => setRoleSummary(e.target.value)}
              placeholder="e.g. Senior CNC Lathe Operator, Quality Inspector, PLC Technician..."
              className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={handleGenerateJd}
              disabled={generating}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md hover:scale-102"
            >
              {generating ? <RefreshCw className="w-4 h-4 animate-spin text-black" /> : <Sparkles className="w-4 h-4 text-black" />}
              <span>Generate AI Job Description</span>
            </button>
          </div>
        </div>

        {/* Card 2: Core Job Parameters */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" /> Job Identity & Work Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Required Trade Specialization</label>
              <select
                value={tradeSelect}
                onChange={(e) => {
                  setTradeSelect(e.target.value);
                  triggerAutosave();
                }}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="CNC Machinist & Programmer">CNC Machinist & Programmer</option>
                <option value="Industrial Electrician & PLC">Industrial Electrician & PLC</option>
                <option value="Fitter & Quality Inspection">Fitter & Quality Inspection</option>
                <option value="Welder & Metal Fabrication">Welder & Metal Fabrication</option>
                <option value="OTHER">Other (Specify Custom Role Below)</option>
              </select>

              {tradeSelect === "OTHER" && (
                <input
                  type="text"
                  value={customTrade}
                  onChange={(e) => {
                    setCustomTrade(e.target.value);
                    triggerAutosave();
                  }}
                  placeholder="Type custom role (e.g. Maintenance Supervisor)..."
                  className="w-full bg-slate-950 border border-amber-400/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400 mt-2"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Industrial Hub Location</label>
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
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Monthly Salary Range (₹)</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => {
                  setSalary(e.target.value);
                  triggerAutosave();
                }}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Shift Type</label>
              <select
                value={shiftType}
                onChange={(e) => {
                  setShiftType(e.target.value);
                  triggerAutosave();
                }}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Day Shift (8 AM - 5 PM)">Day Shift (8 AM - 5 PM)</option>
                <option value="Night Shift (8 PM - 5 AM)">Night Shift (8 PM - 5 AM)</option>
                <option value="Rotational 3-Shift">Rotational 3-Shift</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Hiring Urgency Timeline</label>
              <select
                value={hiringUrgency}
                onChange={(e) => {
                  setHiringUrgency(e.target.value);
                  triggerAutosave();
                }}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Immediate (0-15 Days)">Immediate (0-15 Days)</option>
                <option value="15-30 Days">15-30 Days</option>
                <option value="Standard Pipeline">Standard Pipeline</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Min. JobReady Index™ Score</label>
              <input
                type="number"
                value={minScore}
                onChange={(e) => {
                  setMinScore(Number(e.target.value));
                  triggerAutosave();
                }}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-emerald-400 font-extrabold focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Perks Checkbox Bar */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase">Additional Perks & Stipend Facilities</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accommodation}
                  onChange={(e) => setAccommodation(e.target.checked)}
                  className="accent-emerald-400 rounded"
                />
                <span>Free Accommodation</span>
              </label>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={canteen}
                  onChange={(e) => setCanteen(e.target.checked)}
                  className="accent-emerald-400 rounded"
                />
                <span>Food Canteen Facility</span>
              </label>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={transport}
                  onChange={(e) => setTransport(e.target.checked)}
                  className="accent-emerald-400 rounded"
                />
                <span>Bus Transportation</span>
              </label>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={overtime}
                  onChange={(e) => setOvertime(e.target.checked)}
                  className="accent-emerald-400 rounded"
                />
                <span>Overtime Bonus</span>
              </label>
            </div>
          </div>
        </div>

        {/* Card 3: Naukri.com-Style Candidate Screening Questions */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" /> Naukri-Style Candidate Screening Questions ({screeningQuestions.length})
            </h3>
            <span className="text-xs text-slate-400">Candidates answer these when applying</span>
          </div>

          <div className="space-y-2">
            {screeningQuestions.map((q, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold font-mono">Q{idx + 1}.</span>
                  <span className="text-slate-200 font-semibold">{q}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(idx)}
                  className="p-1 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all flex-shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              placeholder="e.g. Do you have experience operating Fanuc CNC controllers?"
              className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
            <button
              type="button"
              onClick={handleAddQuestion}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1 transition-all flex-shrink-0"
            >
              <Plus className="w-3.5 h-3.5 text-black" /> Add Question
            </button>
          </div>
        </div>

        {/* Card 4: Full Job Description Editor */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300 uppercase">Full Job Description & Shopfloor Guidelines</label>
            {jdDescription && (
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(jdDescription);
                  alert("Copied full Job Description to clipboard!");
                }}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-extrabold flex items-center gap-1 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30"
              >
                <span>📋 Copy JD Text</span>
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
            placeholder="Responsibilities, required shopfloor skills, machine operating standards..."
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 leading-relaxed font-sans resize-none"
          />
        </div>

      </div>

    </div>
  );
}
