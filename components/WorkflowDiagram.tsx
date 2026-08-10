"use client";

import React, { useState } from "react";
import { UserCheck, Search, BookOpen, Award, CheckCircle2, TrendingUp, ChevronRight } from "lucide-react";

const WORKFLOW_STEPS = [
  {
    step: 1,
    title: "AI Diagnostic Assessment",
    desc: "Initial AI skills diagnostic mapping current capabilities against live industry benchmarks.",
    icon: Search,
    color: "from-blue-500 to-indigo-500",
  },
  {
    step: 2,
    title: "Skill Gap Identification",
    desc: "Instant breakdown highlighting trade deficits for targeted industrial roles.",
    icon: UserCheck,
    color: "from-indigo-500 to-purple-500",
  },
  {
    step: 3,
    title: "Targeted Learning Roadmap",
    desc: "Personalized micro-modules and practical exercises to close identified skill gaps.",
    icon: BookOpen,
    color: "from-purple-500 to-pink-500",
  },
  {
    step: 4,
    title: "Industry Expert-Led Training",
    desc: "Hands-on sessions, live workshop projects, and direct mentor feedback.",
    icon: Award,
    color: "from-pink-500 to-amber-500",
  },
  {
    step: 5,
    title: "JobReady Index™ Scoring",
    desc: "Verified 0–100 score updated on candidate's Digital Skill Passport.",
    icon: CheckCircle2,
    color: "from-amber-500 to-emerald-500",
  },
  {
    step: 6,
    title: "Matched MSME Employment",
    desc: "Precision matching to live openings with continuous career growth tracking.",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-500",
  },
];

export default function WorkflowDiagram() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="workflow" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase mb-3">
            Closed-Loop Intelligence Flow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            The KarmaSetu AI <span className="gradient-text">Learner Journey</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            From first assessment to verified placement—a continuous feedback ecosystem ensuring true industry readiness.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {WORKFLOW_STEPS.map((s) => {
            const Icon = s.icon;
            const isActive = activeStep === s.step;
            return (
              <div
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`glass-card p-6 rounded-2xl cursor-pointer border transition-all ${
                  isActive
                    ? "border-blue-400 bg-slate-900/90 shadow-xl shadow-blue-500/10 scale-[1.02]"
                    : "border-white/10 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${s.color} p-0.5 shadow-lg`}>
                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <span className="text-2xl font-black text-slate-600">0{s.step}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Closed-Loop Indicator Footer */}
        <div className="mt-12 p-6 rounded-2xl glass-card border border-blue-500/20 text-center max-w-2xl mx-auto">
          <p className="text-xs text-slate-300 font-medium flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Outcome Feedback automatically feeds back into the AI Assessment engine to refine future matching models.
          </p>
        </div>

      </div>
    </section>
  );
}
