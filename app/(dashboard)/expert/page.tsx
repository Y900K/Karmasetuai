"use client";

import React from "react";
import Link from "next/link";
import { UserCheck, ClipboardCheck, Video, Upload, Award, Play, CheckCircle2, ChevronRight } from "lucide-react";

export default function ExpertDashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-slate-900 via-[#120a24] to-slate-950 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold uppercase">
              Master Mentor Authority
            </span>
            <span className="text-xs text-slate-400 font-mono">Senior Engineer L&T</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Vikram Malhotra <span className="text-purple-400">Shopfloor Expert</span>
          </h1>
          <p className="text-xs text-slate-300 max-w-xl mt-1">
            22 Years Experience in Precision Tooling & CNC Manufacturing • 124 CapStone Projects Signed Off
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/expert/verify"
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-400 to-cyan-400 text-black font-extrabold text-xs shadow-lg shadow-purple-500/20 flex items-center gap-1.5 transition-all"
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Verify CapStone Queue (2 Pending)</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-3xl border border-purple-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Pending Verifications</div>
          <div className="text-4xl font-black text-amber-400">2 Projects</div>
          <div className="text-[10px] text-amber-300 font-bold">Video Capstones Uploaded</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-emerald-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Signed Off This Month</div>
          <div className="text-4xl font-black text-emerald-400">18 Trainees</div>
          <div className="text-[10px] text-emerald-300 font-bold">Verified for MSME Hiring</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-cyan-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Masterclasses Conducted</div>
          <div className="text-4xl font-black text-cyan-300">12 Sessions</div>
          <div className="text-[10px] text-cyan-300 font-bold">340 Total Trainees Attended</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-pink-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Avg Trainee Score Given</div>
          <div className="text-4xl font-black text-pink-400">92.4%</div>
          <div className="text-[10px] text-pink-300 font-bold">Strict Shopfloor Standard</div>
        </div>
      </div>

      {/* Pending Queue Quick Action */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-purple-400" />
            <span>Pending CapStone Video Reviews</span>
          </h3>
          <Link href="/expert/verify" className="text-xs text-purple-400 font-bold hover:underline flex items-center gap-1">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-white">Rajesh Kumar (CNC Machinist)</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Fanuc Controller Precision Lathe Fabrication</p>
              <span className="text-[10px] text-cyan-300 flex items-center gap-1 mt-1 font-bold">
                <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" /> Live Workshop Video (2:30)
              </span>
            </div>

            <Link
              href="/expert/verify"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-purple-500/20 transition-all"
            >
              <Award className="w-4 h-4" /> Verify Capstone with AI Rubric
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
