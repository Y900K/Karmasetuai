"use client";

import React from "react";
import { AlertTriangle, TrendingUp, GraduationCap, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Language, translations } from "@/lib/i18n";

interface ProblemSolutionProps {
  onOpenAuth: (role: string) => void;
  language: Language;
}

export default function ProblemSolution({ onOpenAuth, language }: ProblemSolutionProps) {
  const t = translations[language] || translations.hinglish;

  return (
    <section id="problem" className="py-20 relative bg-[#070b14]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section Header Pill & Titles */}
        {/* Top Section Header Pill & Titles */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.problemTag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t.problemHeading}
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.mapSub}
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => onOpenAuth("STUDENT")}
              className="px-6 py-3 rounded-xl text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{t.btnStart}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split: System Friction vs Solution Pathway */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column: System Friction */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-red-500/30 bg-slate-900/70 relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 flex items-center justify-center">
                  <AlertTriangle className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block">{t.systemFrictionTitle}</span>
                  <h3 className="text-lg font-bold text-white uppercase">{t.systemFrictionSub}</h3>
                </div>
              </div>

              <span className="px-2.5 py-1 text-[10px] font-extrabold bg-red-500/10 border border-red-500/30 text-red-300 rounded-full">
                TRADITIONAL BOTTLENECKS
              </span>
            </div>

            {/* 4 Gap Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 relative">
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1">GAP 01</span>
                <h4 className="text-sm font-bold text-white">{t.gap1Title}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {t.gap1Desc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 relative">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">GAP 02</span>
                <h4 className="text-sm font-bold text-white">{t.gap2Title}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {t.gap2Desc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 relative">
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1">GAP 03</span>
                <h4 className="text-sm font-bold text-white">{t.gap3Title}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {t.gap3Desc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 relative">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">GAP 04</span>
                <h4 className="text-sm font-bold text-white">{t.gap4Title}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {t.gap4Desc}
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Solution Pathway */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-slate-900/70 relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">SOLUTION PATHWAY</span>
                  <h3 className="text-lg font-bold text-white uppercase">TRANSFORMATION JOURNEY</h3>
                </div>
              </div>

              <span className="px-2.5 py-1 text-[10px] font-extrabold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-full">
                VERIFIED PIPELINE
              </span>
            </div>

            {/* 6 Journey Steps Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-xs font-bold text-cyan-300">1. Passout Student</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Fresh ITI / Diploma entry</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-xs font-bold text-purple-300">2. AI Assessment</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Skill parsing & gap analysis</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-500/30 text-center bg-amber-500/5">
                <div className="text-xs font-bold text-amber-300">3. Industry Ready</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Job Ready Index 94/100</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-xs font-bold text-emerald-300">4. Employer Match</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Instant AI role fit</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-emerald-500/30 text-center bg-emerald-500/5">
                <div className="text-xs font-bold text-emerald-400">5. Job Offer</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Zero retraining placement</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-xs font-bold text-blue-300">6. Career Loop</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Closed-loop feedback arc</div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
