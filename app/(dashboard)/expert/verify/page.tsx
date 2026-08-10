"use client";

import React, { useState } from "react";
import { ClipboardCheck, Play, Award, Check, Sparkles, CheckCircle2 } from "lucide-react";

export default function ExpertVerifyPage() {
  const [verifiedMap, setVerifiedMap] = useState<Record<string, boolean>>({});

  const projects = [
    {
      id: "p1",
      student: "Rajesh Kumar",
      trade: "CNC Machinist",
      task: "Fanuc Controller Precision Lathe Fabrication",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      aiTechScore: 96,
      aiSafetyScore: 94,
      aiPrecisionScore: 92,
    },
    {
      id: "p2",
      student: "Mohit Verma",
      trade: "Industrial Electrician",
      task: "3-Phase Motor Control Panel Wiring & Testing",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      aiTechScore: 90,
      aiSafetyScore: 96,
      aiPrecisionScore: 88,
    },
  ];

  const toggleVerify = (id: string) => {
    setVerifiedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-purple-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ClipboardCheck className="w-6 h-6 text-purple-400" />
            <span>CapStone Project Verification & AI Rubric Scorer</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Review shopfloor video submissions and apply Master Mentor digital sign-off.
          </p>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((p) => (
          <div key={p.id} className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
            
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-extrabold uppercase">
                  {p.trade}
                </span>
                <h2 className="text-base font-bold text-white mt-1">{p.student} — {p.task}</h2>
              </div>

              {verifiedMap[p.id] && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Signed Off & Verified
                </span>
              )}
            </div>

            {/* Video Player & AI Rubric Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="aspect-video w-full rounded-2xl bg-black border border-white/10 overflow-hidden">
                <iframe src={p.videoUrl} title={p.task} className="w-full h-full" allowFullScreen />
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300 pb-2 border-b border-white/10">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-amber-400" /> AI PRE-ASSESSED RUBRIC SCORES
                  </span>
                  <span className="text-[10px] text-slate-400">Confidence: 94%</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Technical G-Code Accuracy</span>
                    <span className="font-extrabold text-cyan-300">{p.aiTechScore}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">5S Safety & Eye Protection</span>
                    <span className="font-extrabold text-emerald-400">{p.aiSafetyScore}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Tolerance Precision (±0.01mm)</span>
                    <span className="font-extrabold text-amber-400">{p.aiPrecisionScore}%</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleVerify(p.id)}
                  className={`w-full py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-lg ${
                    verifiedMap[p.id]
                      ? "bg-emerald-500 text-black shadow-emerald-500/20"
                      : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20"
                  }`}
                >
                  {verifiedMap[p.id] ? <Check className="w-4 h-4 text-black" /> : <Award className="w-4 h-4" />}
                  <span>{verifiedMap[p.id] ? "Signed Off & Certificate Released" : "Approve & Sign Off Capstone ➔"}</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
