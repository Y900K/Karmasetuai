"use client";

import React, { useState } from "react";
import {
  GraduationCap, FileText, Cpu, CheckCircle2, ShieldCheck, Sparkles, RefreshCw,
  Award, Factory, Check, ArrowRight, Activity, Users, Layers, ExternalLink, HelpCircle
} from "lucide-react";
import { Language, translations } from "@/lib/i18n";

interface WorkflowDiagramProps {
  onOpenAuth: (role: string) => void;
  language: Language;
}

const STATIONS = [
  {
    id: "01",
    name: "Industry Experts",
    icon: "💡",
    desc: "Master Engineers & Plant Heads deliver shopfloor insights.",
    detail: "Direct masterclasses by 15+ year manufacturing veterans from Noida, Haridwar & Kanpur industrial clusters.",
    competency: "Industry 4.0 Standards",
  },
  {
    id: "02",
    name: "Practical Training",
    icon: "👥",
    desc: "Hands-on machine operation & precision calibration.",
    detail: "Intensive 40-hour practical workshop exercises on live CNC lathes, PLC panels, and industrial IoT sensors.",
    competency: "Shopfloor Operations",
  },
  {
    id: "03",
    name: "Live Projects",
    icon: "⚙️",
    desc: "Real Factory Industry 4.0 CapStone Tasks.",
    detail: "Execution of real MSME component fabrication and quality audit projects evaluated by senior plant heads.",
    competency: "Verified Practical Competency",
  },
  {
    id: "04",
    name: "Assessment & Feedback",
    icon: "📝",
    desc: "Continuous score updates & readiness certification.",
    detail: "AI-driven scoring combined with expert sign-off updating the student's Digital Skill Passport in real-time.",
    competency: "Certified Readiness",
  },
];

export default function WorkflowDiagram({ onOpenAuth, language }: WorkflowDiagramProps) {
  const [selectedStation, setSelectedStation] = useState("03");
  const activeStationObj = STATIONS.find((s) => s.id === selectedStation) || STATIONS[2];

  return (
    <section id="workflow" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Map Outer Card */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-blue-500/30 bg-[#060a14]/90 shadow-2xl relative">
          
          {/* Header Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold">
                ⚡
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  2D WORKFORCE TRANSFORMATION ECOSYSTEM MAP
                </h2>
                <p className="text-xs text-slate-400">
                  Interactive visual flow connecting education, skills, bridge training, and employment.
                </p>
              </div>
            </div>

            <span className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Interactive Node Active
            </span>
          </div>

          {/* 3-Column Storytelling Interactive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT SIDE • CANDIDATE INPUT (Cols 1-3) */}
            <div className="lg:col-span-3 space-y-4">
              
              <div className="text-[11px] font-extrabold text-cyan-400 tracking-wider uppercase flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                LEFT SIDE • CANDIDATE INPUT
              </div>

              {/* Box 1: Passout Students */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase">PASSOUT STUDENTS</h4>
                      <span className="text-[10px] text-slate-400">ITI / Diploma / Degree</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-500/20 text-blue-300">01</span>
                </div>
                <div className="text-[10px] font-bold text-cyan-300 flex items-center gap-1.5 pt-2 border-t border-white/5">
                  <Users className="w-3 h-3 text-cyan-400" />
                  <span>Entering KarmaSetu System</span>
                </div>
              </div>

              {/* Box 2: Resume Upload */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-white">Resume Upload</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Candidate Profile</span>
              </div>

              {/* Box 3: AI Parsing */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 relative">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-white">AI Parsing</span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-300">AI Scanner</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">AI extracts candidate trade history and grades.</p>
              </div>

              {/* Box 4: Skill Extraction Tags */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Skill Extraction</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-semibold text-cyan-300">PLC Automation</span>
                  <span className="px-2 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-semibold text-cyan-300">CAD Design</span>
                  <span className="px-2 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-semibold text-cyan-300">CNC Machining</span>
                  <span className="px-2 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-semibold text-cyan-300">Industrial IoT</span>
                  <span className="px-2 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-semibold text-cyan-300">Electrical Wiring</span>
                </div>
              </div>

              {/* Box 5: Skill Score 62 / 100 */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-2">
                  <span>⭐ Skill Score: 62 / 100</span>
                  <span className="text-[10px] text-slate-400">Current Level</span>
                </div>
                <div className="space-y-2 text-[10px]">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Theory Score</span>
                      <span className="text-white font-bold">62%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: "62%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>MSME Shop Floor Need</span>
                      <span className="text-emerald-400 font-bold">94%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400" style={{ width: "94%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 6: Learning Recommendation */}
              <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs font-bold text-purple-200 flex items-center justify-between">
                <span>Learning Recommendation</span>
                <span className="text-[10px] font-normal text-purple-300">Personalized pathway assigned</span>
              </div>

            </div>

            {/* CENTER • THE KARMASETU AI BRIDGE (Cols 4-8) */}
            <div className="lg:col-span-5 space-y-5">
              
              <div className="text-[11px] font-extrabold text-amber-400 tracking-wider uppercase flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  CENTER • THE KARMASETU AI BRIDGE
                </div>
                <span className="text-[10px] text-slate-400">TRANSFORMATION HUB</span>
              </div>

              {/* Bridge Visual Card with Clickable Stations */}
              <div className="glass-card p-6 rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-slate-900 to-[#040810] relative text-center overflow-hidden">
                
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold uppercase mb-4">
                  CENTRAL TRANSFORMATION BRIDGE (Education → Skills → Industry → Employment)
                </div>

                <div className="my-3 py-2 border-y border-white/10">
                  <div className="text-lg font-black text-white gradient-text tracking-wider">
                    KARMASETU AI
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                    AI Workforce Intelligence Engine
                  </div>
                </div>

                {/* 4 Interactive Clickable Nodes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-6">
                  {STATIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStation(s.id)}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                        selectedStation === s.id
                          ? "bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/30 scale-105"
                          : "bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      <span className="text-xl">{s.icon}</span>
                      <span className="text-[11px] font-bold truncate w-full">{s.name}</span>
                    </button>
                  ))}
                </div>

                {/* Selected Station Inspector Panel */}
                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-left space-y-1.5 animate-fade-in">
                  <div className="flex items-center justify-between text-xs font-extrabold text-cyan-300">
                    <span>STATION {activeStationObj.id}: {activeStationObj.name}</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-[10px]">{activeStationObj.competency}</span>
                  </div>
                  <p className="text-xs font-bold text-white">{activeStationObj.desc}</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{activeStationObj.detail}</p>
                </div>

              </div>

              {/* Digital Skill Passport Card */}
              <div className="p-5 rounded-3xl glass-card border border-emerald-500/30 bg-slate-900/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
                    💳
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                      DIGITAL SKILL PASSPORT <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </h4>
                    <p className="text-[11px] text-slate-400">Verifiable credentials linked to candidate profile & employment history.</p>
                  </div>
                </div>

                <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-extrabold uppercase whitespace-nowrap">
                  PASSPORT VERIFIED
                </span>
              </div>

              {/* Closed Loop Outcome Feedback Ribbon */}
              <div className="p-5 rounded-3xl glass-card border border-blue-500/30 bg-slate-900/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-extrabold text-blue-300">
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                    CLOSED LOOP OUTCOME FEEDBACK
                  </span>
                  <span className="text-[10px] text-amber-400 uppercase tracking-widest">CONTINUOUS LEARNING</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Post-hiring performance & employer feedback flows continuously back to refine training modules and AI matching accuracy.
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Outcome Loop: Employment → Analytics → AI Core → Better Matching</span>
                  <span className="text-emerald-400 font-bold">Loop Active ↺</span>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE • INDUSTRY & EMPLOYMENT (Cols 9-12) */}
            <div className="lg:col-span-4 space-y-4">
              
              <div className="text-[11px] font-extrabold text-emerald-400 tracking-wider uppercase flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                RIGHT SIDE • INDUSTRY & EMPLOYMENT
              </div>

              {/* JobReady Index Score Box */}
              <div className="p-5 rounded-3xl glass-card border border-emerald-500/40 bg-slate-900/90 text-center space-y-3">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-300">
                  <span>JOB READY INDEX</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">94 / 100</span>
                </div>

                <div className="relative w-28 h-28 mx-auto flex items-center justify-center my-2">
                  <div className="w-full h-full rounded-full border-4 border-slate-800 border-t-emerald-400 border-r-emerald-400 border-b-emerald-400 animate-spin-slow flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-black text-white">94%</div>
                      <div className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">ELEVATED</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-left text-[11px]">
                  <div className="flex justify-between text-slate-300">
                    <span>Technical Skills</span>
                    <span className="text-emerald-400 font-bold">92%</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Industry Competency</span>
                    <span className="text-emerald-400 font-bold">96%</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Project Experience</span>
                    <span className="text-emerald-400 font-bold">91%</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Interview Readiness</span>
                    <span className="text-emerald-400 font-bold">93%</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button className="w-full py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold uppercase">
                    ✓ INDUSTRY READY BADGE
                  </button>
                </div>
              </div>

              {/* Employer Matching Card */}
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-extrabold text-purple-300">
                  <span>Employer Matching</span>
                  <span className="text-[10px] text-purple-400">AI Match</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>Skill Match</span>
                  <span className="text-purple-300">94%</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>Role Fit</span>
                  <span className="text-purple-300">91%</span>
                </div>
              </div>

              {/* Interview Readiness Card */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-1">
                <div className="text-xs font-extrabold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Interview Readiness</span>
                </div>
                <p className="text-[11px] text-slate-400">Technical mock interview verified.</p>
              </div>

              {/* Employment & Offer Placed Card */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                <div className="flex items-center justify-between text-xs font-extrabold text-white">
                  <span>Employment & Offer</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500 text-black font-extrabold text-[10px]">PLACED</span>
                </div>
                <p className="text-[11px] text-emerald-200">Student transforms into a verified shop floor professional.</p>
              </div>

              {/* Longitudinal Career Growth */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">Career Growth</span>
                <span className="text-[10px] font-bold text-amber-400 uppercase">Longitudinal</span>
              </div>

            </div>

          </div>

          {/* Footer Note inside Map */}
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
            <span>Hover over or click any station node on the map to inspect system logic and details.</span>
            <span className="font-mono text-cyan-400">KarmaSetu Interactive Map v2.0</span>
          </div>

        </div>

      </div>
    </section>
  );
}
