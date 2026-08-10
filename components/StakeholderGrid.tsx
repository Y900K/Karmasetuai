"use client";

import React, { useState } from "react";
import { GraduationCap, Building2, Landmark, Factory, CheckCircle2 } from "lucide-react";

interface StakeholderGridProps {
  onOpenAuth: (role: string) => void;
}

const STAKEHOLDERS = [
  {
    id: "STUDENT",
    title: "Students & Job Seekers",
    subtitle: "ITI, Polytechnic & Degree Technical Graduates",
    icon: GraduationCap,
    color: "from-blue-500 to-indigo-500",
    benefits: [
      "Digital Skill Passport with tamper-proof QR verification",
      "Personalized AI learning roadmap to close identified skill gaps",
      "AI-simulated interview practice with real-time feedback",
      "Direct visibility to verified hiring MSMEs in UP & Uttarakhand",
    ],
    cta: "Sign Up as Student",
  },
  {
    id: "INSTITUTE_ADMIN",
    title: "ITIs, Polytechnics & Colleges",
    subtitle: "Technical Vocational Institutes & Universities",
    icon: Landmark,
    color: "from-indigo-500 to-purple-500",
    benefits: [
      "SaaS dashboard tracking institutional skill gap heatmaps",
      "Accelerated placement rates & improved employer satisfaction",
      "Streamlined NIRF, NCTVT, and Accreditation reporting",
      "Direct integration of Industry Expert-Led practical modules",
    ],
    cta: "Partner Your Institute",
  },
  {
    id: "EMPLOYER_MSME",
    title: "MSMEs & Industrial Plants",
    subtitle: "Manufacturing, Automotive & Technical Enterprises",
    icon: Factory,
    color: "from-purple-500 to-emerald-500",
    benefits: [
      "Access pre-verified candidates with JobReady Index™ scores",
      "Reduce hiring time from 60–90 days down to a few days",
      "Success-based hiring model with zero initial upfront risk",
      "Significantly reduced onboarding time & lower early attrition",
    ],
    cta: "Hire Verified Candidates",
  },
  {
    id: "SUPER_ADMIN",
    title: "State & Central Government",
    subtitle: "Skill Development Missions & Department Partnerships",
    icon: Building2,
    color: "from-emerald-500 to-teal-500",
    benefits: [
      "Transparent workforce intelligence and skilling expenditure ROI",
      "Full alignment with Skill India Mission, NEP 2020 & MSME initiatives",
      "State-level skill deficit mapping for targeted curriculum updates",
      "Verifiable employment tracking data at regional scale",
    ],
    cta: "Explore Government Data API",
  },
];

export default function StakeholderGrid({ onOpenAuth }: StakeholderGridProps) {
  const [activeTab, setActiveTab] = useState("STUDENT");

  const current = STAKEHOLDERS.find((s) => s.id === activeTab) || STAKEHOLDERS[0];
  const Icon = current.icon;

  return (
    <section id="stakeholders" className="py-20 bg-slate-950/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Designed for Every <span className="gradient-text">Workforce Stakeholder</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            KarmaSetu AI delivers tailored value across the entire technical education and manufacturing value chain.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {STAKEHOLDERS.map((s) => {
            const TabIcon = s.icon;
            const isSelected = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "glass-card text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{s.title.split("&")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Detail Card */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl max-w-4xl mx-auto border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          <div className="md:col-span-1 text-center md:text-left">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${current.color} p-0.5 shadow-xl mx-auto md:mx-0 mb-4`}>
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white">{current.title}</h3>
            <p className="text-xs text-slate-400 mt-1">{current.subtitle}</p>

            <button
              onClick={() => onOpenAuth(current.id)}
              className="mt-6 w-full py-3 px-4 rounded-xl text-xs font-bold text-white btn-primary-glow"
            >
              {current.cta}
            </button>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Key Benefits & Capabilities:</h4>
            <div className="space-y-3">
              {current.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
