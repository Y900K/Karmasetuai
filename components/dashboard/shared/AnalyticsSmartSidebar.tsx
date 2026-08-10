"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Cpu, Award, Zap, ChevronRight, X, BarChart3, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth/context";

interface AnalyticsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnalyticsSmartSidebar({ isOpen, onClose }: AnalyticsSidebarProps) {
  const { role } = useAuth();
  const [liveIndex, setLiveIndex] = useState(78.5);
  const [activeStage, setActiveStage] = useState(2); // 1: Intake, 2: Bridge Training, 3: Direct Hired

  useEffect(() => {
    // Simulate real-time score updates
    const interval = setInterval(() => {
      setLiveIndex((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 sm:w-96 bg-[#090f22]/95 backdrop-blur-xl border-l border-cyan-500/30 z-50 p-5 shadow-2xl flex flex-col justify-between animate-fade-in overflow-y-auto">
      
      {/* Top Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider">Real-Time AI Analytics</h3>
              <span className="text-[10px] text-cyan-300 font-bold">Live Ecosystem Telemetry</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Index Metric Gauge */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Live JobReady Index™</span>
            <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-400" /> LIVE TELEMETRY
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-black text-white">{liveIndex}</div>
            <div className="text-xs font-extrabold text-cyan-300">/ 100 Target</div>
          </div>

          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 transition-all duration-700"
              style={{ width: `${liveIndex}%` }}
            />
          </div>
        </div>

        {/* Interactive 2D Visual Diagram Stages */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
          <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider block">
            ECOSYSTEM TRANSFORMATION STAGE
          </span>

          <div className="grid grid-cols-3 gap-1.5 text-center">
            <button
              onClick={() => setActiveStage(1)}
              className={`p-2 rounded-xl text-[10px] font-bold border transition-all ${
                activeStage === 1
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                  : "bg-white/5 border-white/5 text-slate-400"
              }`}
            >
              1. Intake
            </button>
            <button
              onClick={() => setActiveStage(2)}
              className={`p-2 rounded-xl text-[10px] font-bold border transition-all ${
                activeStage === 2
                  ? "bg-amber-500/20 border-amber-400 text-amber-300"
                  : "bg-white/5 border-white/5 text-slate-400"
              }`}
            >
              2. Bridge AI
            </button>
            <button
              onClick={() => setActiveStage(3)}
              className={`p-2 rounded-xl text-[10px] font-bold border transition-all ${
                activeStage === 3
                  ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                  : "bg-white/5 border-white/5 text-slate-400"
              }`}
            >
              3. MSME Hired
            </button>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 space-y-1">
            {activeStage === 1 && (
              <p>Stage 1: NCVT syllabus parsed. Candidate baseline skill gap detected (-32% Fanuc G-Code).</p>
            )}
            {activeStage === 2 && (
              <p>Stage 2: 10-Question AI Quiz + Practical CapStone verification underway under Master Mentor supervision.</p>
            )}
            {activeStage === 3 && (
              <p>Stage 3: Verified Skill Passport issued! 10-day direct match active at Tata Motors Noida.</p>
            )}
          </div>
        </div>

        {/* Dynamic AI Suggestions Based on Active Role */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI SMART RECOMMENDATIONS</span>
          </div>

          <ul className="text-xs text-slate-300 space-y-2 pt-1">
            <li className="flex items-start gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>Complete 1 additional G-Code simulation module to increase score to 84.0.</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>High regional demand in Noida for CNC Operators (+18% wage premium).</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-white/10 text-center">
        <span className="text-[10px] text-slate-500 uppercase font-mono tracking-widest">
          KarmaSetu AI Analytics v2.0
        </span>
      </div>

    </div>
  );
}
