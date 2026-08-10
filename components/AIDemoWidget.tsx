"use client";

import React, { useState } from "react";
import { Cpu, Sparkles, AlertCircle, CheckCircle2, TrendingUp, BookOpen, Wrench, ShieldAlert } from "lucide-react";

const SAMPLE_TRADES = [
  { id: "CNC Machinist", label: "CNC Machinist & Programmer", icon: "⚙️" },
  { id: "Electrician", label: "Industrial Electrician", icon: "⚡" },
  { id: "Fitter", label: "Mechanical Fitter & Assembly", icon: "🔧" },
  { id: "Welder", label: "TIG/MIG Welder", icon: "🔥" },
  { id: "Quality Inspector", label: "QA/QC Quality Inspector", icon: "📐" },
];

export default function AIDemoWidget() {
  const [selectedTrade, setSelectedTrade] = useState("CNC Machinist");
  const [bioSkills, setBioSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleEvaluate = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/ai/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trade: selectedTrade,
          bioSkills: bioSkills || `Standard ITI ${selectedTrade} candidate with 1 year workshop training.`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate AI evaluation.");
      }

      setResult(data.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Evaluation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase mb-3">
            <Cpu className="w-3.5 h-3.5" /> Interactive AI Demo
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Experience the <span className="gradient-text">JobReady Index™</span> Engine
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Select a trade or input candidate skills below to see how KarmaSetu AI evaluates 
            practical competency, identifies skill gaps, and builds tailored learning paths.
          </p>
        </div>

        {/* Interactive Demo Card */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl max-w-4xl mx-auto border border-white/10 shadow-2xl">
          
          {/* Trade Selectors */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Select Technical Trade:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {SAMPLE_TRADES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrade(t.id)}
                  className={`p-3 rounded-xl border text-xs font-medium text-center transition-all flex flex-col items-center gap-1.5 ${
                    selectedTrade === t.id
                      ? "bg-blue-600/30 border-blue-400 text-white shadow-lg shadow-blue-500/20"
                      : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{t.icon}</span>
                  <span className="truncate w-full">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bio / Skill Snippet Input */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Additional Candidate Skills / Background (Optional):
            </label>
            <textarea
              rows={2}
              value={bioSkills}
              onChange={(e) => setBioSkills(e.target.value)}
              placeholder={`e.g. ITI diploma in ${selectedTrade}, trained on Fanuc controllers, lathe operation, safety standards...`}
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Submit Action */}
          <button
            onClick={handleEvaluate}
            disabled={loading}
            className="w-full py-4 rounded-xl text-sm font-bold text-white btn-primary-glow flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Cpu className="w-5 h-5 animate-spin text-blue-300" />
                <span>NVIDIA AI is evaluating candidate competencies...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Calculate JobReady Index™ with KarmaSetu AI</span>
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* AI Result Card Output */}
          {result && (
            <div className="mt-8 pt-8 border-t border-white/10 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                
                {/* Score Gauge */}
                <div className="bg-slate-900/90 border border-blue-500/30 p-5 rounded-2xl text-center flex flex-col items-center justify-center">
                  <span className="text-xs font-semibold text-slate-400 uppercase">Overall JobReady Index™</span>
                  <div className="text-5xl font-black text-white gradient-text my-2">
                    {result.jobReadyIndex} <span className="text-xl text-slate-400">/ 100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-1000"
                      style={{ width: `${result.jobReadyIndex}%` }}
                    />
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="md:col-span-2 bg-slate-900/60 border border-white/10 p-5 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Competency Score Breakdown</h4>
                  
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                      <span>Technical Skill Knowledge</span>
                      <span className="text-blue-400">{result.technicalScore}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${result.technicalScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                      <span>Practical Workshop Readiness</span>
                      <span className="text-emerald-400">{result.practicalScore}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400" style={{ width: `${result.practicalScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                      <span>Workplace Safety & Soft Skills</span>
                      <span className="text-amber-400">{result.softSkillScore}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400" style={{ width: `${result.softSkillScore}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Assessment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Verified Skills & Gaps */}
                <div className="bg-slate-900/60 border border-white/10 p-5 rounded-2xl space-y-4">
                  <div>
                    <h5 className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-4 h-4" /> Verified Top Strengths
                    </h5>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {result.topSkills?.map((s: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5 mb-2">
                      <ShieldAlert className="w-4 h-4" /> Identified Skill Gaps
                    </h5>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {result.skillGaps?.map((g: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* AI Learning Roadmap */}
                <div className="bg-slate-900/60 border border-blue-500/20 p-5 rounded-2xl">
                  <h5 className="text-xs font-bold text-blue-400 uppercase flex items-center gap-1.5 mb-3">
                    <BookOpen className="w-4 h-4" /> Actionable 3-Step Learning Roadmap
                  </h5>
                  <ol className="space-y-2 text-xs text-slate-300">
                    {result.actionPlan?.map((plan: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                        <span className="font-bold text-blue-400">{i + 1}.</span>
                        <span>{plan}</span>
                      </li>
                    ))}
                  </ol>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
