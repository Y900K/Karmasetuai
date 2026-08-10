"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, Users, Clock, BarChart3, FilePlus, Sparkles, ChevronRight, TrendingUp } from "lucide-react";
import ScoreDistributionChart from "@/components/dashboard/charts/ScoreDistributionChart";

export default function EmployerDashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-[#0a2418] to-slate-950 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase">
              MSME Verified Employer
            </span>
            <span className="text-xs text-slate-400 font-mono">10-Day Cycle Active</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Tata Motors <span className="text-emerald-400">Manufacturing Plant</span>
          </h1>
          <p className="text-xs text-slate-300 max-w-xl mt-1">
            Noida Sector 63 • Zero-Retraining Candidate Hiring • Pre-Filtered Skill Passport Matching
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/employer/post-job"
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
          >
            <FilePlus className="w-4 h-4" />
            <span>Post New Job (AI Generator)</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-3xl border border-emerald-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Active Job Postings</div>
          <div className="text-4xl font-black text-emerald-400">4 Roles</div>
          <div className="text-[10px] text-emerald-300 font-bold">CNC & Electrician Demand</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-cyan-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Pre-Filtered Candidates</div>
          <div className="text-4xl font-black text-cyan-300">28 Candidates</div>
          <div className="text-[10px] text-cyan-300 font-bold">JobReady Score &gt; 80</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-amber-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">10-Day Cycle Days Left</div>
          <div className="text-4xl font-black text-amber-400">4 Days</div>
          <div className="text-[10px] text-amber-300 font-bold">Cycle Closes Aug 14</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-purple-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Hired This Cycle</div>
          <div className="text-4xl font-black text-purple-300">12 Hired</div>
          <div className="text-[10px] text-purple-300 font-bold">Zero Retraining Required</div>
        </div>
      </div>

      {/* Main Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <span>Top Ranked Candidates (Score &gt; 80)</span>
            </h3>
            <Link href="/employer/candidates" className="text-xs text-emerald-400 font-bold hover:underline flex items-center gap-1">
              View All Pipeline <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">Rajesh Kumar</h4>
                <p className="text-[11px] text-slate-400">CNC Machinist & Programmer (Govt ITI Lucknow)</p>
                <div className="text-[10px] text-emerald-400 font-bold mt-1">Verified: Fanuc G-Code (96%), Micrometer (92%)</div>
              </div>

              <Link
                href="/employer/candidates"
                className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-md"
              >
                Direct Offer ➔
              </Link>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <span>Candidate Skill Score Distribution</span>
            </h3>
          </div>

          <ScoreDistributionChart />
        </div>

      </div>

    </div>
  );
}
