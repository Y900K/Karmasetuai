"use client";

import React from "react";
import { GraduationCap, Landmark, Factory, Building2, UserCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { Language, translations } from "@/lib/i18n";

interface StakeholderGridProps {
  onOpenAuth: (role: string, mode?: "login" | "register") => void;
  language: Language;
}

const ROLES = [
  {
    id: "STUDENT",
    title: "JobReady Passport",
    subtitle: "Student",
    desc: "Skill Passport & JobReady Index",
    icon: GraduationCap,
    color: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
    features: [
      "Verifiable Skill Passport",
      "AI Skill Gap Radar",
      "Direct MSME Matching",
    ],
  },
  {
    id: "INSTITUTE_ADMIN",
    title: "NCVT Batch Portal",
    subtitle: "Institute",
    desc: "Batch tracking & placement dashboard",
    icon: Landmark,
    color: "border-blue-500/40 text-blue-400 bg-blue-500/10",
    features: [
      "Curriculum Gap Insights",
      "Employer Demand Feeds",
      "Automated Placement Reports",
    ],
  },
  {
    id: "INDUSTRY_MENTOR",
    title: "Master Mentor Hub",
    subtitle: "Industry",
    desc: "Practical verification & master portal",
    icon: UserCheck,
    color: "border-purple-500/40 text-purple-400 bg-purple-500/10",
    features: [
      "CapStone Project Verification",
      "Live Masterclasses",
      "Skill Rating Authority",
    ],
  },
  {
    id: "EMPLOYER_MSME",
    title: "MSME Direct Hiring",
    subtitle: "Employer",
    desc: "Zero-retraining candidate hiring",
    icon: Factory,
    color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    features: [
      "JobReady 80+ Pre-Filtered",
      "Instant CapStone Video Reviews",
      "10-Day Hiring Cycles",
    ],
  },
  {
    id: "HR_MANAGER",
    title: "HR Talent Suite",
    subtitle: "HR / Manager",
    desc: "Team panel & internal hiring control",
    icon: Building2,
    color: "border-amber-500/40 text-amber-400 bg-amber-500/10",
    features: [
      "Team Role Authorization",
      "Internal Talent Pipeline",
      "Placement Metrics",
    ],
  },
];

export default function StakeholderGrid({ onOpenAuth, language }: StakeholderGridProps) {
  const t = translations[language] || translations.hinglish;

  return (
    <section id="stakeholders" className="py-20 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.selectRoleTitle}
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.selectRoleSub}
          </p>
        </div>

        {/* 5 Role Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {ROLES.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                className="glass-card p-6 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${r.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                      {r.subtitle}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 mb-4 leading-normal">
                    {r.desc}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-white/10 mb-6">
                    {r.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="text-[11px] leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenAuth(r.id, "login")}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800/90 border border-white/15 hover:border-cyan-400 hover:bg-cyan-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Login / Register</span>
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
