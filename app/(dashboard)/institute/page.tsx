"use client";

import React from "react";
import Link from "next/link";
import { Landmark, Users, TrendingUp, Award, Download, Sparkles, BookOpen, ChevronRight, BarChart3 } from "lucide-react";
import PlacementTrendChart from "@/components/dashboard/charts/PlacementTrendChart";
import TradeDistributionChart from "@/components/dashboard/charts/TradeDistributionChart";
import CourseProgressChart from "@/components/dashboard/charts/CourseProgressChart";

export default function InstituteDashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-r from-slate-900 via-[#0a1532] to-slate-950 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold uppercase">
              NCVT Institute Administration
            </span>
            <span className="text-xs text-slate-400 font-mono">Code: ITI-UP-20419</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Government ITI Lucknow <span className="text-blue-400">Main Campus</span>
          </h1>
          <p className="text-xs text-slate-300 max-w-xl mt-1">
            Batch 2024-2026 • 450 Trainees Enrolled • 85% Direct MSME Placement Rate
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/institute/courses/create"
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-extrabold text-xs shadow-lg shadow-blue-500/20 flex items-center gap-1.5 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Create New Course</span>
          </Link>

          <Link
            href="/institute/placements"
            className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span>Export NCVT Report</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-3xl border border-blue-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Enrolled Trainees</div>
          <div className="text-4xl font-black text-white">450</div>
          <div className="text-[10px] text-blue-300 font-bold">across 4 Trade Branches</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-emerald-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Direct MSME Placements</div>
          <div className="text-4xl font-black text-emerald-400">382 (85%)</div>
          <div className="text-[10px] text-emerald-300 font-bold flex items-center justify-center gap-1">
            <TrendingUp className="w-3 h-3" /> ↑ 18% vs Last Year
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-purple-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Avg JobReady Index™</div>
          <div className="text-4xl font-black text-purple-300">88.4</div>
          <div className="text-[10px] text-purple-300 font-bold">Top 5% in Uttar Pradesh</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-amber-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Partner MSMEs</div>
          <div className="text-4xl font-black text-amber-400">42 Companies</div>
          <div className="text-[10px] text-amber-300 font-bold">Noida & Kanpur Hubs</div>
        </div>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span>Monthly Placement Velocity vs Target</span>
            </h3>
            <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              Live Real-Time
            </span>
          </div>

          <PlacementTrendChart />
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>Trade Branch Enrollment Distribution</span>
            </h3>
            <span className="text-[10px] font-extrabold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30">
              Active Cohort
            </span>
          </div>

          <TradeDistributionChart />
        </div>

      </div>

      {/* Course Completion Analytics Chart */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <span>Batch Average Course Completion % & Certificates Issued</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Real-time LMS metrics across all active institute modules</p>
          </div>

          <Link href="/institute/analytics" className="text-xs text-blue-400 font-bold hover:underline flex items-center gap-1">
            Deep Batch Analytics <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <CourseProgressChart />
      </div>

    </div>
  );
}
