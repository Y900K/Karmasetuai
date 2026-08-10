"use client";

import React from "react";
import { ShieldCheck, Target, TrendingUp, HeartHandshake, CheckCircle } from "lucide-react";

export default function ImpactStats() {
  return (
    <section id="impact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase mb-3">
            National Vision & Impact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Stronger India Through <span className="gradient-text">Skilled India</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Funding employability infrastructure—not just an app. Aligned with Skill India, Make in India, and UN Sustainable Development Goals.
          </p>
        </div>

        {/* 3 Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card p-8 rounded-3xl border border-white/10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-white gradient-text">1,000+</div>
            <h3 className="text-base font-bold text-white mt-1">Direct Jobs Enabled</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Targeted across 3 years in UP & Uttarakhand manufacturing hubs like Noida, Kanpur, Haridwar, and Pantnagar.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-white gradient-text">3 UN SDGs</div>
            <h3 className="text-base font-bold text-white mt-1">Global Impact Aligned</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Directly advances Quality Education (SDG 4), Decent Work & Economic Growth (SDG 8), and Industry Innovation (SDG 9).
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-white gradient-text">1st AI Layer</div>
            <h3 className="text-base font-bold text-white mt-1">Skill India Alignment</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Pioneering the first AI-driven closed-loop employability intelligence layer aligned with State Skill Development Missions.
            </p>
          </div>

        </div>

        {/* National Strategic Vision Ribbon */}
        <div className="mt-16 glass-card p-6 rounded-2xl border border-blue-500/30 max-w-4xl mx-auto flex flex-wrap items-center justify-around gap-4 text-center">
          <div className="text-xs font-bold text-slate-300">Skill India</div>
          <span className="text-slate-600">→</span>
          <div className="text-xs font-bold text-blue-400">Digital India</div>
          <span className="text-slate-600">→</span>
          <div className="text-xs font-bold text-indigo-400">Make in India</div>
          <span className="text-slate-600">→</span>
          <div className="text-xs font-bold text-emerald-400">MSME Growth</div>
          <span className="text-slate-600">→</span>
          <div className="text-xs font-bold text-amber-400">Future Ready India</div>
        </div>

      </div>
    </section>
  );
}
