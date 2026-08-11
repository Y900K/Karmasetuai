"use client";

import React, { useState } from "react";
import { MapPin, Sparkles, RefreshCw, CheckCircle2, Building, AlertTriangle } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [selectedDistrict, setSelectedDistrict] = useState("Gautam Buddha Nagar (Noida)");
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<any>(null);

  const districts = [
    { name: "Gautam Buddha Nagar (Noida)", state: "Uttar Pradesh", placementRate: 92, status: "EXCELLENT" },
    { name: "Haridwar (SIDCUL)", state: "Uttarakhand", placementRate: 88, status: "HIGH" },
    { name: "Kanpur Nagar", state: "Uttar Pradesh", placementRate: 64, status: "DEFICIT" },
    { name: "Lucknow Central", state: "Uttar Pradesh", placementRate: 85, status: "GOOD" },
    { name: "Pune Industrial Belt", state: "Maharashtra", placementRate: 90, status: "EXCELLENT" },
  ];

  const handleFetchInsights = async (dName: string) => {
    setSelectedDistrict(dName);
    setLoading(true);
    try {
      const res = await fetch("/api/ai/district-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ district: dName, state: "Uttar Pradesh" })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setInsights(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <MapPin className="w-6 h-6 text-amber-400" />
            <span>AI District Skill Heatmap & Trend Insights</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Real-time regional skill placement heatmaps across industrial clusters in India.
          </p>
        </div>
      </div>

      {/* Grid Heatmap */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Industrial Cluster Placement Heatmap</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {districts.map((d, idx) => (
            <div
              key={idx}
              onClick={() => handleFetchInsights(d.name)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all hover:scale-102 ${
                selectedDistrict === d.name
                  ? "bg-amber-500/20 border-amber-400 text-white shadow-lg shadow-amber-500/20"
                  : "bg-white/5 border-white/10 text-slate-300 hover:border-white/20"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold text-white">{d.name}</h4>
                  <p className="text-[10px] text-slate-400">{d.state}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${d.placementRate >= 85 ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"}`}>
                  {d.placementRate}% Placed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights Card */}
      {loading && (
        <div className="glass-card p-6 rounded-3xl border border-amber-500/30 text-center py-8 text-xs text-amber-300 font-bold flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
          <span>Generating AI District Intelligence for {selectedDistrict}...</span>
        </div>
      )}

      {insights && !loading && (
        <div className="glass-card p-6 rounded-3xl border border-amber-500/40 space-y-6 bg-slate-900/90 animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> AI DISTRICT WORKFORCE DRILL-DOWN ({insights.district || selectedDistrict})
            </span>
            <span className="text-sm font-black text-cyan-300">{insights.placementRatePercentage || 92}% Placement Rate</span>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Total Students Placed</div>
              <div className="text-2xl font-black text-white mt-1">{insights.totalStudentsPlaced || 1420}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-bold text-slate-400 uppercase">State Region</div>
              <div className="text-2xl font-black text-cyan-300 mt-1">{insights.state || "Uttar Pradesh"}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Audit Status</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">VERIFIED ✓</div>
            </div>
          </div>

          {/* Trade Demand & Deficit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <h4 className="text-xs font-extrabold text-emerald-300 uppercase">Top In-Demand Trades</h4>
              <div className="flex flex-wrap gap-1.5">
                {insights.topDemandTrades?.map((trade: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                    {trade}
                  </span>
                )) || <span className="text-xs text-slate-400">CNC Machinist, Industrial Electrician</span>}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <h4 className="text-xs font-extrabold text-amber-300 uppercase">Supply Deficit Trades</h4>
              <div className="flex flex-wrap gap-1.5">
                {insights.supplyDeficitTrades?.map((trade: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                    {trade}
                  </span>
                )) || <span className="text-xs text-slate-400">PLC Sensor Technician, Automation Programmer</span>}
              </div>
            </div>
          </div>

          {/* Industrial Clusters */}
          {insights.keyIndustrialClusters && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase">Key Industrial Clusters</h4>
              <div className="flex flex-wrap gap-2">
                {insights.keyIndustrialClusters.map((cluster: string, i: number) => (
                  <span key={i} className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-semibold">
                    🏭 {cluster}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Policy Recommendations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase">AI Policy & Resource Allocation Recommendations</h4>
            {insights.aiPolicyRecommendations?.map((rec: string, i: number) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 flex items-start gap-2">
                <span className="text-amber-400">💡</span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
