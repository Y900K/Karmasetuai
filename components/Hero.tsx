"use client";

import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Award, Building2, GraduationCap, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onOpenAuth: (role: string) => void;
}

export default function Hero({ onOpenAuth }: HeroProps) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>India&apos;s AI-Powered Employability Ecosystem</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
          Bridging India&apos;s <br className="hidden sm:block" />
          <span className="gradient-text">Industry Readiness Gap</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Connecting technical learners (ITIs & Polytechnics), training institutes, MSMEs, and government 
          through one intelligent, verified workforce ecosystem.
        </p>

        {/* Dual Role Call To Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => onOpenAuth("STUDENT")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-white btn-primary-glow flex items-center justify-center gap-3 group"
          >
            <GraduationCap className="w-5 h-5 text-blue-200" />
            <span>Check JobReady Index™</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => onOpenAuth("EMPLOYER_MSME")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-slate-200 btn-secondary-glass flex items-center justify-center gap-3 hover:text-white"
          >
            <Building2 className="w-5 h-5 text-emerald-400" />
            <span>Hire Job-Ready Talent</span>
          </button>
        </div>

        {/* Key Feature Highlights Pill Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Digital Skill Passport
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-blue-400" /> Competency Verification
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Smart MSME Matching
          </span>
        </div>

        {/* Live Pilot Metric Ticker Banner */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="glass-card p-4 rounded-2xl text-center">
            <div className="text-3xl font-black text-white gradient-text">2,000+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Phase-1 Learners</div>
          </div>
          <div className="glass-card p-4 rounded-2xl text-center">
            <div className="text-3xl font-black text-white gradient-text">50+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">MSME Partners</div>
          </div>
          <div className="glass-card p-4 rounded-2xl text-center">
            <div className="text-3xl font-black text-white gradient-text">20+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Partner Institutes</div>
          </div>
          <div className="glass-card p-4 rounded-2xl text-center">
            <div className="text-3xl font-black text-emerald-400">90 Days</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Placement Goal</div>
          </div>
        </div>

      </div>
    </section>
  );
}
