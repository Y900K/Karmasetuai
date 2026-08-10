"use client";

import React from "react";
import { BarChart3, TrendingUp, Users, Award, BookOpen } from "lucide-react";
import PlacementTrendChart from "@/components/dashboard/charts/PlacementTrendChart";
import TradeDistributionChart from "@/components/dashboard/charts/TradeDistributionChart";
import ScoreDistributionChart from "@/components/dashboard/charts/ScoreDistributionChart";
import CourseProgressChart from "@/components/dashboard/charts/CourseProgressChart";

export default function InstituteAnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-blue-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            <span>Real-Time Batch Analytics Dashboard</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Live Recharts data visualization tracking JobReady Index™ distributions, course completion %, and placement velocity.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
          Supabase Realtime Active
        </span>
      </div>

      {/* Grid of 4 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Monthly Placement Velocity Trends</span>
          </h3>
          <PlacementTrendChart />
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span>Trade Branch Distribution</span>
          </h3>
          <TradeDistributionChart />
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>JobReady Index™ Score Histogram</span>
          </h3>
          <ScoreDistributionChart />
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Course Completion % & Certificates Issued</span>
          </h3>
          <CourseProgressChart />
        </div>

      </div>

    </div>
  );
}
