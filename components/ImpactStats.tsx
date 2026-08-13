"use client";

import React from "react";
import {
  Award, Gauge, ShieldCheck, Cpu, Users, TrendingUp, Clock, Percent,
  Building2, CheckCircle2, ArrowRight, Globe, Sparkles
} from "lucide-react";
import { Language, translations } from "@/lib/i18n";

interface ImpactStatsProps {
  onOpenAuth: (role?: string, mode?: "login" | "register") => void;
  language: Language;
}

export default function ImpactStats({ onOpenAuth, language }: ImpactStatsProps) {
  const t = translations[language] || translations.hinglish;

  return (
    <section id="impact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* SECTION 1: KEY INNOVATIONS & PROPRIETARY PILLARS (6 Core Tools) */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                KEY INNOVATIONS & PROPRIETARY PILLARS
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">6 Core Tools</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            
            <div className="glass-card p-5 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-3">
                💳
              </div>
              <h3 className="text-xs font-bold text-white mb-1">Digital Skill Passport</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Tamper-proof verifiable credential recording shop floor competencies.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10 hover:border-amber-500/40 transition-all">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                🏅
              </div>
              <h3 className="text-xs font-bold text-white mb-1">Industry Readiness Score</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Real-time Job Ready Index gauge tracking competency 42 → 94/100.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-all">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1">Competency Verification</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Master Engineers & Plant Heads verify live project execution.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1">AI Skill Gap Analysis</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Parses degree syllabus vs real-time MSME shop floor requirements.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10 hover:border-blue-500/40 transition-all">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1">Smart Candidate Matching</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Instant AI matching connecting ready candidates to employer roles.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-all">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1">Employment Tracking</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Longitudinal career trajectory & post-hiring feedback loop.
              </p>
            </div>

          </div>
        </div>

        {/* SECTION 2: NATIONAL IMPACT & ECOSYSTEM OUTCOMES (6 Quantifiable Metrics) */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                NATIONAL IMPACT & ECOSYSTEM OUTCOMES
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">Quantifiable Metrics</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            
            <div className="glass-card p-5 rounded-2xl border border-white/10 text-center">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-2xl font-black text-white">↓ 35%</div>
              <h3 className="text-xs font-bold text-white mt-1">Reduced Hiring Time</h3>
              <p className="text-[10px] text-slate-400 mt-1">90 days down to 10 days</p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10 text-center">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-2xl font-black text-white">↑ 28%</div>
              <h3 className="text-xs font-bold text-white mt-1">Higher Placement Rate</h3>
              <p className="text-[10px] text-slate-400 mt-1">85%+ direct MSME hiring</p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10 text-center">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-2xl font-black text-white">↑ 42%</div>
              <h3 className="text-xs font-bold text-white mt-1">Verified Workforce</h3>
              <p className="text-[10px] text-slate-400 mt-1">Verified skill passport</p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10 text-center">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="text-2xl font-black text-white">↑ 31%</div>
              <h3 className="text-xs font-bold text-white mt-1">MSME Productivity</h3>
              <p className="text-[10px] text-slate-400 mt-1">Zero retraining delays</p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10 text-center">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-2xl font-black text-white">↑ 36%</div>
              <h3 className="text-xs font-bold text-white mt-1">Employment Generation</h3>
              <p className="text-[10px] text-slate-400 mt-1">Sustainable career growth</p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10 text-center">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3">
                🇮🇳
              </div>
              <div className="text-2xl font-black text-white">100%</div>
              <h3 className="text-xs font-bold text-white mt-1">Future Ready India</h3>
              <p className="text-[10px] text-slate-400 mt-1">Aligned with Skill & Digital India</p>
            </div>

          </div>

          {/* NATIONAL VISION ECOSYSTEM RIBBON */}
          <div className="mt-8 glass-card p-5 rounded-2xl border border-amber-500/30 bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm">
                🌐
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-amber-400 uppercase">NATIONAL VISION ECOSYSTEM</h4>
                <p className="text-[10px] text-slate-400">Empowering Atmanirbhar Bharat Workforce Infrastructure</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300">Skill India</span>
              <span className="text-slate-600">→</span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300">Digital India</span>
              <span className="text-slate-600">→</span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300">Make in India</span>
              <span className="text-slate-600">→</span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300">MSME Growth</span>
              <span className="text-slate-600">→</span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300">Employment Generation</span>
              <span className="text-slate-600">→</span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300">Economic Growth</span>
              <span className="text-slate-600">→</span>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">Future Ready India 🇮🇳</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: WHY KARMASETU AI WORKS (4 CARDS) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-extrabold text-white">{t.whyWorksTitle}</h2>
            <p className="text-xs text-slate-400 mt-2">{t.whyWorksSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="glass-card p-6 rounded-2xl border border-white/10">
              <h3 className="text-sm font-bold text-white mb-2">AI Skill Gap Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Compares trade curriculum against real MSME shop-floor machinery requirements in real-time.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10">
              <h3 className="text-sm font-bold text-white mb-2">Digital Skill Passport</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tamper-proof verifiable credentials recording verified practical scores and CapStone videos.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10">
              <h3 className="text-sm font-bold text-white mb-2">Master Engineer Verification</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Practical project evaluations signed off by senior plant heads and industry experts.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10">
              <h3 className="text-sm font-bold text-white mb-2">Zero-Retraining Hiring</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct MSME recruitment connecting job-ready candidates with high-demand manufacturing roles.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: BOTTOM CONVERSION CTA BANNER */}
        <div className="glass-card p-10 rounded-3xl border border-cyan-500/40 bg-gradient-to-r from-blue-950/60 via-slate-900 to-emerald-950/60 text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white">{t.btnStart}</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Join thousands of ITI & Polytechnic students, top training institutes, verified industry experts, and hiring MSMEs.
          </p>
          <button
            onClick={() => onOpenAuth("STUDENT", "login")}
            className="px-8 py-4 rounded-xl text-sm font-extrabold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:scale-105 shadow-xl shadow-cyan-500/25 transition-all inline-flex items-center gap-2"
          >
            <span>{t.btnStart}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
