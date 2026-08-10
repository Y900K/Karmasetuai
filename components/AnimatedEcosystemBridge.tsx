"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, ChevronRight, Sparkles, CheckCircle2, Cpu, UserCheck, Briefcase, RefreshCw } from "lucide-react";

const STAGES = [
  {
    step: 1,
    title: "STAGE 01: LEARNER INTAKE & AI DIAGNOSTIC",
    badge: "STUDENT INGESTION",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    image: "/karmasetu_frame1.jpg",
    headline: "Passout ITI & Polytechnic Graduates Enter AI System",
    description: "AI extracts candidate trade history, theory marks, and practical experience to calculate baseline skill score (62/100).",
    stats: [
      { label: "Theory Score", val: "62%" },
      { label: "Shopfloor Gap", val: "-32%" },
      { label: "Assigned Pathway", val: "Industrial CNC & PLC" },
    ],
  },
  {
    step: 2,
    title: "STAGE 02: THE TRANSFORMATION BRIDGE",
    badge: "PRACTICAL SKILLING",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    image: "/karmasetu_frame2.jpg",
    headline: "Master Mentor Verification & Live Factory Capstones",
    description: "Candidates complete 40 hours of hands-on precision training and live MSME projects signed off by senior plant engineers.",
    stats: [
      { label: "Practical Projects", val: "3 Factory Tasks" },
      { label: "Mentor Sign-off", val: "15+ Yrs Plant Head" },
      { label: "Passport Status", val: "Verifying CapStone" },
    ],
  },
  {
    step: 3,
    title: "STAGE 03: VERIFIED EMPLOYER MATCHING & HIRING",
    badge: "DIRECT PLACEMENT",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    image: "/karmasetu_bridge.jpg",
    headline: "JobReady Index 94/100 — Direct MSME Placement",
    description: "Student transforms into a verified shop floor professional. Employer handshake completed in 10-day hiring cycle with zero retraining required.",
    stats: [
      { label: "JobReady Index", val: "94 / 100 ELEVATED" },
      { label: "Role Fit", val: "94% Skill Match" },
      { label: "Hiring Outcome", val: "PLACED (Zero Retraining)" },
    ],
  },
];

export default function AnimatedEcosystemBridge() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % STAGES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeStage = STAGES[currentStep];

  return (
    <div className="glass-card p-4 sm:p-6 rounded-3xl border border-cyan-500/40 overflow-hidden shadow-2xl relative">
      
      {/* Top Video Header HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
          <span className="text-xs font-black text-cyan-300 uppercase tracking-wider">
            KarmaSetu Live Ecosystem • Animated Video Simulation
          </span>
        </div>

        {/* Video Play/Pause & Step Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/15 hover:border-cyan-400 text-xs font-bold text-white flex items-center gap-1.5 transition-all"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span>Pause Stream</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span>Play Live GIF Stream</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Animated Video Canvas Frame */}
      <div className="relative w-full h-[320px] sm:h-[460px] rounded-2xl overflow-hidden group">
        
        {/* Animated Background Image Frame */}
        <Image
          src={activeStage.image}
          alt={activeStage.title}
          fill
          priority
          className="object-cover object-center transition-all duration-1000 transform group-hover:scale-105"
        />

        {/* Cyber Laser Scanning Line Effect */}
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-laser-scan top-0 z-20 pointer-events-none" />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-slate-950/40 to-transparent z-10" />

        {/* Floating Top Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className={`px-3 py-1.5 rounded-full border text-xs font-extrabold tracking-wider backdrop-blur-md uppercase ${activeStage.badgeColor}`}>
            {activeStage.badge}
          </span>
        </div>

        {/* Holographic Stage Overlay Box at Bottom */}
        <div className="absolute bottom-4 left-4 right-4 z-20 p-4 sm:p-6 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 space-y-3 transition-all duration-500">
          
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{activeStage.headline}</span>
            </h3>
            <span className="text-xs font-mono text-cyan-300 font-bold">{activeStage.title}</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed hidden sm:block">
            {activeStage.description}
          </p>

          {/* Real-time Stage Stats Cards */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
            {activeStage.stats.map((s, idx) => (
              <div key={idx} className="p-2 rounded-xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] text-slate-400">{s.label}</div>
                <div className="text-xs font-bold text-cyan-300 mt-0.5">{s.val}</div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Bottom Step-by-Step Progress Bar & Stage Buttons */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {STAGES.map((s, idx) => {
          const isActive = currentStep === idx;
          return (
            <button
              key={s.step}
              onClick={() => {
                setCurrentStep(idx);
                setIsPlaying(false);
              }}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                isActive
                  ? "bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">Step 0{s.step}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
              </div>
              <div className="text-xs font-bold truncate">{s.badge}</div>

              {/* Progress Line */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}
