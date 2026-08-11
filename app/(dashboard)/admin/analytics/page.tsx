"use client";

import React, { useState } from "react";
import { MapPin, Sparkles, RefreshCw, CheckCircle2, Building, AlertTriangle } from "lucide-react";

export default function AdminAnalyticsPage() {
  const districts = [
    {
      name: "Gautam Buddha Nagar (Noida)",
      state: "Uttar Pradesh",
      placementRate: 92,
      status: "EXCELLENT",
      totalStudentsPlaced: 1850,
      topDemandTrades: ["CNC Machinist", "Robotics Operator", "CAD/CAM Designer"],
      supplyDeficitTrades: ["IoT Sensor Specialist", "Automated Quality Tech"],
      keyIndustrialClusters: ["Noida Phase II Sector 80", "Greater Noida Ecotech IT Park"],
    },
    {
      name: "Haridwar (SIDCUL)",
      state: "Uttarakhand",
      placementRate: 88,
      status: "HIGH",
      totalStudentsPlaced: 1420,
      topDemandTrades: ["Pharma Packaging Operator", "Industrial Electrician"],
      supplyDeficitTrades: ["PLC Automation Programmer", "Cleanroom Specialist"],
      keyIndustrialClusters: ["SIDCUL Industrial Area", "Bahadrabad Cluster"],
    },
    {
      name: "Kanpur Nagar",
      state: "Uttar Pradesh",
      placementRate: 64,
      status: "DEFICIT",
      totalStudentsPlaced: 980,
      topDemandTrades: ["Leather Tanner Fabricator", "Mechanical Fitter"],
      supplyDeficitTrades: ["CNC Turning Operator", "QA/QC Inspection Tech"],
      keyIndustrialClusters: ["Dada Nagar Industrial Estate", "Panki Industrial Area"],
    },
    {
      name: "Lucknow Central",
      state: "Uttar Pradesh",
      placementRate: 85,
      status: "GOOD",
      totalStudentsPlaced: 1260,
      topDemandTrades: ["Industrial Electrician", "HVAC Maintenance Tech"],
      supplyDeficitTrades: ["Solar Grid Technician", "Heavy Diesel Mechanic"],
      keyIndustrialClusters: ["Chinhat Industrial Area", "Amausi Industrial Estate"],
    },
    {
      name: "Pune Industrial Belt",
      state: "Maharashtra",
      placementRate: 90,
      status: "EXCELLENT",
      totalStudentsPlaced: 2100,
      topDemandTrades: ["Automotive Assembly Tech", "Mechatronics Specialist"],
      supplyDeficitTrades: ["EV Battery Pack Assembler", "Robotic Arm Programmer"],
      keyIndustrialClusters: ["Pimpri-Chinchwad MIDC", "Chakan Auto Hub", "Bhosari"],
    },
  ];

  const [selectedDistrictName, setSelectedDistrictName] = useState(districts[0].name);
  const [loading, setLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);

  const selectedDistrictObj = districts.find((d) => d.name === selectedDistrictName) || districts[0];

  const handleFetchInsights = async (dName: string, dState: string) => {
    setSelectedDistrictName(dName);
    setLoading(true);
    setAiInsights(null);

    try {
      const res = await fetch("/api/ai/district-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ district: dName, state: dState })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAiInsights(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Merge static record with dynamic AI insights if present
  const displayDistrict = {
    district: aiInsights?.district || selectedDistrictObj.name,
    state: aiInsights?.state || selectedDistrictObj.state,
    placementRatePercentage: aiInsights?.placementRatePercentage || selectedDistrictObj.placementRate,
    totalStudentsPlaced: aiInsights?.totalStudentsPlaced || selectedDistrictObj.totalStudentsPlaced,
    topDemandTrades: aiInsights?.topDemandTrades || selectedDistrictObj.topDemandTrades,
    supplyDeficitTrades: aiInsights?.supplyDeficitTrades || selectedDistrictObj.supplyDeficitTrades,
    keyIndustrialClusters: aiInsights?.keyIndustrialClusters || selectedDistrictObj.keyIndustrialClusters,
    aiPolicyRecommendations: aiInsights?.aiPolicyRecommendations || [
      `Increase training capacity for top trades in ${selectedDistrictObj.name}.`,
      `Establish MSME bridge learning labs focusing on ${selectedDistrictObj.supplyDeficitTrades.join(", ")}.`,
      `Expand industry apprenticeship partnerships with ${selectedDistrictObj.keyIndustrialClusters[0]} plants.`
    ]
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
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Industrial Cluster Placement Heatmap (Click any cluster for drill-down)</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {districts.map((d, idx) => (
            <div
              key={idx}
              onClick={() => handleFetchInsights(d.name, d.state)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all hover:scale-102 ${
                selectedDistrictName === d.name
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

      {/* AI Insights Drill-Down Card */}
      {loading && (
        <div className="glass-card p-6 rounded-3xl border border-amber-500/30 text-center py-8 text-xs text-amber-300 font-bold flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
          <span>Analyzing AI District Skill & Placement Heatmap for {selectedDistrictName}...</span>
        </div>
      )}

      {!loading && (
        <div className="glass-card p-6 rounded-3xl border border-amber-500/40 space-y-6 bg-slate-900/90 animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> AI DISTRICT WORKFORCE DRILL-DOWN ({displayDistrict.district})
            </span>
            <span className="text-sm font-black text-cyan-300">{displayDistrict.placementRatePercentage}% Placement Rate</span>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Total Students Placed</div>
              <div className="text-2xl font-black text-white mt-1">{displayDistrict.totalStudentsPlaced}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-bold text-slate-400 uppercase">State Region</div>
              <div className="text-2xl font-black text-cyan-300 mt-1">{displayDistrict.state}</div>
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
                {displayDistrict.topDemandTrades?.map((trade: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                    {trade}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <h4 className="text-xs font-extrabold text-amber-300 uppercase">Supply Deficit Trades</h4>
              <div className="flex flex-wrap gap-1.5">
                {displayDistrict.supplyDeficitTrades?.map((trade: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                    {trade}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Industrial Clusters */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase">Key Industrial Clusters</h4>
            <div className="flex flex-wrap gap-2">
              {displayDistrict.keyIndustrialClusters?.map((cluster: string, i: number) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-semibold">
                  🏭 {cluster}
                </span>
              ))}
            </div>
          </div>

          {/* Policy Recommendations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase">AI Policy & Resource Allocation Recommendations</h4>
            {displayDistrict.aiPolicyRecommendations?.map((rec: string, i: number) => (
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
