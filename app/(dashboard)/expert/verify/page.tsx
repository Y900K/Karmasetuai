"use client";

import React, { useState } from "react";
import { ClipboardCheck, Play, Award, Check, Sparkles, CheckCircle2, Video } from "lucide-react";
import { useEcosystemStore } from "@/lib/store/EcosystemStore";

export default function ExpertVerifyPage() {
  const { capstones, verifyCapstone } = useEcosystemStore();
  const [verifiedMap, setVerifiedMap] = useState<Record<string, boolean>>({});

  const toggleVerify = (id: string) => {
    setVerifiedMap((prev) => ({ ...prev, [id]: true }));
    verifyCapstone(id);
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
            Review shopfloor video submissions and apply Master Mentor digital sign-off. Real-time updates propagate to Student & Institute dashboards.
          </p>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {capstones.map((p) => {
          const isVerified = p.status === "VERIFIED" || verifiedMap[p.id];

          return (
            <div key={p.id} className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-extrabold uppercase">
                    {p.trade}
                  </span>
                  <h2 className="text-base font-bold text-white mt-1">{p.studentName} — {p.task}</h2>
                </div>

                {isVerified && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Signed Off & Verified
                  </span>
                )}
              </div>

              {/* Video Player & AI Rubric Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="aspect-video w-full rounded-2xl bg-gradient-to-tr from-slate-950 via-[#0a1128] to-slate-900 border border-cyan-500/30 overflow-hidden relative p-4 flex flex-col justify-between group">
                  <div className="flex items-center justify-between text-xs z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-extrabold uppercase flex items-center gap-1">
                      <Video className="w-3 h-3 text-cyan-400" /> CapStone Video Submission
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">1080p HD • Verified Audio/Visual</span>
                  </div>

                  <div className="my-auto text-center space-y-2 z-10">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 mx-auto flex items-center justify-center group-hover:scale-110 transition-all shadow-lg shadow-cyan-500/30">
                      <Play className="w-6 h-6 ml-1 fill-cyan-400 text-cyan-400" />
                    </div>
                    <div className="text-xs font-extrabold text-white">{p.task}</div>
                    <p className="text-[11px] text-slate-400 max-w-xs mx-auto">Recorded live on Government ITI shopfloor machine by {p.studentName}</p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/10 z-10">
                    <span>Trainee: {p.studentName} ({p.trade})</span>
                    <span className="text-emerald-400 font-bold">✓ Geo-Fenced ITI Shopfloor Stamp</span>
                  </div>

                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
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
                    disabled={isVerified}
                    className={`w-full py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-lg ${
                      isVerified
                        ? "bg-emerald-500 text-black shadow-emerald-500/20 cursor-default"
                        : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20"
                    }`}
                  >
                    {isVerified ? <Check className="w-4 h-4 text-black" /> : <Award className="w-4 h-4" />}
                    <span>{isVerified ? "Signed Off & Certificate Released" : "Approve & Sign Off Capstone ➔"}</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
