"use client";

import React from "react";
import { Sparkles, ArrowRight, Lock, Cpu, Award, UserCheck, Briefcase } from "lucide-react";
import { Language, translations } from "@/lib/i18n";
import AnimatedEcosystemBridge from "@/components/AnimatedEcosystemBridge";

interface HeroProps {
  onOpenAuth: (role: string) => void;
  language: Language;
}

export default function Hero({ onOpenAuth, language }: HeroProps) {
  const t = translations[language] || translations.hinglish;

  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse-glow">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{t.heroTag}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
          From Learning to Earning <br className="hidden sm:block" />
          — <span className="gradient-text">Powered by AI</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          {t.heroSub}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => onOpenAuth("STUDENT")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-extrabold text-black bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 hover:scale-105 shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group"
          >
            <span>{t.btnStart}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => onOpenAuth("STUDENT")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-slate-200 bg-slate-900/80 border border-white/15 hover:border-white/30 hover:bg-slate-800 flex items-center justify-center gap-2 transition-all"
          >
            <Lock className="w-4 h-4 text-amber-400" />
            <span>{t.btnLogin}</span>
          </button>
        </div>

        {/* Real Animated Live Ecosystem Video-like Bridge Component */}
        <div className="mt-14 max-w-6xl mx-auto relative">
          
          <AnimatedEcosystemBridge />

          {/* 4 Feature Cards Grid below Animated Video Bridge */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-left">
            
            <div className="glass-card p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{t.radarTitle}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{t.radarDesc}</p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{t.passportTitle}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{t.passportDesc}</p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-3">
                <UserCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{t.mentorTitle}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{t.mentorDesc}</p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{t.hiringTitle}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{t.hiringDesc}</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
