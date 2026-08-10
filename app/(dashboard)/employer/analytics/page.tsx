"use client";

import React from "react";
import { BarChart3, Clock, DollarSign, Users } from "lucide-react";
import ScoreDistributionChart from "@/components/dashboard/charts/ScoreDistributionChart";

export default function EmployerAnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            <span>Real-Time Hiring & Time-to-Hire Analytics</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Track recruitment funnel metrics, cost-per-hire savings, and candidate score distributions.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-3xl border border-emerald-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Avg Time-to-Hire</div>
          <div className="text-3xl font-black text-emerald-400">4.2 Days</div>
          <div className="text-[10px] text-emerald-300 font-bold">vs 35 Days Industry Avg</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-cyan-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Cost-Per-Hire Savings</div>
          <div className="text-3xl font-black text-cyan-300">₹18,500 / Hire</div>
          <div className="text-[10px] text-cyan-300 font-bold">Zero initial retraining cost</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-amber-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Offer Acceptance Rate</div>
          <div className="text-3xl font-black text-amber-400">92.4%</div>
          <div className="text-[10px] text-amber-300 font-bold">Direct MSME offer match</div>
        </div>
      </div>

      {/* Chart */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-400" />
          <span>Candidate Skill Index Histogram</span>
        </h3>
        <ScoreDistributionChart />
      </div>

    </div>
  );
}
