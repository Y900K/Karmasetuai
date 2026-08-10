"use client";

import React from "react";
import Link from "next/link";
import { Flag, Landmark, Users, TrendingUp, Award, MapPin, FileText, ChevronRight } from "lucide-react";
import PlacementTrendChart from "@/components/dashboard/charts/PlacementTrendChart";
import TradeDistributionChart from "@/components/dashboard/charts/TradeDistributionChart";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-[#241a0a] to-slate-950 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase">
              Skill India & Digital India Governance
            </span>
            <span className="text-xs text-slate-400 font-mono">MSDE Public Infrastructure</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
            National Workforce <span className="text-amber-400">Governance Portal</span>
          </h1>
          <p className="text-xs text-slate-300 max-w-xl mt-1">
            Real-Time Intelligence Across 127 ITIs, 450 MSMEs, and 12,400 Certified Trainees in India.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/analytics"
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-cyan-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all"
          >
            <MapPin className="w-4 h-4 text-black" />
            <span>AI District Skill Heatmap</span>
          </Link>
        </div>
      </div>

      {/* National KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-3xl border border-amber-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">National Placement Rate</div>
          <div className="text-4xl font-black text-amber-400">84.2%</div>
          <div className="text-[10px] text-amber-300 font-bold">↑ 14% YoY Growth</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-cyan-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Registered ITIs / Institutes</div>
          <div className="text-4xl font-black text-cyan-300">127 ITIs</div>
          <div className="text-[10px] text-cyan-300 font-bold">UP & Uttarakhand Hubs</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-emerald-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Verified Skill Passports</div>
          <div className="text-4xl font-black text-emerald-400">12,400</div>
          <div className="text-[10px] text-emerald-300 font-bold">QR & Blockchain Audited</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-purple-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">Partner MSME Plants</div>
          <div className="text-4xl font-black text-purple-300">450 Plants</div>
          <div className="text-[10px] text-purple-300 font-bold">Active Hiring Contracts</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>National Monthly Placement Velocity</span>
          </h3>
          <PlacementTrendChart />
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>National Trade Branch Breakdown</span>
          </h3>
          <TradeDistributionChart />
        </div>
      </div>

    </div>
  );
}
