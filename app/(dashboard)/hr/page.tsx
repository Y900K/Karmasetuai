"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import {
  UserCheck, FileText, Users, Building, ShieldCheck, Download, Search, MapPin, Settings,
  TrendingUp, Award, ChevronRight, BarChart3, Flag, CheckCircle2
} from "lucide-react";
import FilterBar from "@/components/shared/FilterBar";
import { useFilterSort } from "@/lib/hooks/useFilterSort";
import PlacementTrendChart from "@/components/dashboard/charts/PlacementTrendChart";
import TradeDistributionChart from "@/components/dashboard/charts/TradeDistributionChart";

function HrDashboardContent() {
  const [activeTab, setActiveTab] = useState<"hr" | "admin">("hr");
  const { filters, updateFilters, clearFilters } = useFilterSort("name");

  const hrReports = [
    { name: "National Apprenticeship Placement Audit Q3", district: "Kanpur Nagar", status: "VERIFIED", candidates: 340, auditDate: "2026-08-01" },
    { name: "SIDCUL Haridwar Manufacturing Skill Pipeline", district: "Haridwar", status: "VERIFIED", candidates: 520, auditDate: "2026-08-05" },
    { name: "Noida Auto Tier-1 Hiring Compliance", district: "Noida", status: "PENDING REVIEW", candidates: 610, auditDate: "2026-08-09" },
    { name: "Pune Chakan Industrial Safety Compliance", district: "Pune", status: "VERIFIED", candidates: 480, auditDate: "2026-08-10" },
  ];

  const filtered = hrReports.filter((r) => {
    const matchSearch =
      !filters.search ||
      r.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.district.toLowerCase().includes(filters.search.toLowerCase());
    const matchStatus = !filters.status || r.status === filters.status;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in printable-area">
      
      {/* Top Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-[#1f1609] to-slate-950 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-amber-400" /> HR Regional Recruitment Lead
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold uppercase flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-cyan-400" /> System Governance & Admin
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
            HR Manager <span className="text-amber-400">& System Admin Portal</span>
          </h1>
          <p className="text-xs text-slate-300 max-w-xl mt-1">
            Unified Suite for Placement Audits, Candidate Verification, National Skill Heatmaps & System Settings.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap no-print">
          <Link
            href="/admin/analytics"
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-cyan-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all"
          >
            <MapPin className="w-4 h-4 text-black" />
            <span>AI District Skill Heatmap</span>
          </Link>

          <Link
            href="/admin/settings"
            className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-all flex items-center gap-1.5"
          >
            <Settings className="w-4 h-4 text-amber-400" />
            <span>System Settings</span>
          </Link>
        </div>
      </div>

      {/* Tab Controls: HR Ops vs Admin Governance */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 w-fit no-print">
        <button
          onClick={() => setActiveTab("hr")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "hr"
              ? "bg-amber-600 text-white shadow-md shadow-amber-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>HR Recruitment & Audits</span>
        </button>

        <button
          onClick={() => setActiveTab("admin")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "admin"
              ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Flag className="w-4 h-4" />
          <span>National Governance & Admin KPIs</span>
        </button>
      </div>

      {activeTab === "hr" ? (
        <>
          {/* HR FilterBar */}
          <FilterBar
            filters={filters}
            onUpdate={updateFilters}
            onClear={clearFilters}
            options={{
              statuses: ["VERIFIED", "PENDING REVIEW"],
              sortOptions: [
                { id: "name", label: "Report Name" },
                { id: "candidates", label: "Candidates Count" },
                { id: "auditDate", label: "Audit Date" },
              ],
            }}
            placeholder="Filter HR compliance audits by name or district..."
          />

          {/* Audit Reports Table */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" /> Verified HR Compliance Audits
              </h3>
              <button className="px-3 py-1.5 rounded-xl bg-white/10 text-slate-300 font-bold text-xs hover:bg-white/20 transition-all flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-amber-400" /> Export CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Audit Title</th>
                    <th className="p-3">District Region</th>
                    <th className="p-3">Candidates Audited</th>
                    <th className="p-3">Audit Date</th>
                    <th className="p-3">Verification Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((r, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-all">
                      <td className="p-3 font-bold text-white">{r.name}</td>
                      <td className="p-3 font-semibold text-amber-300">{r.district}</td>
                      <td className="p-3 font-extrabold text-white">{r.candidates} Trainees</td>
                      <td className="p-3 font-mono text-slate-400">{r.auditDate}</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${
                            r.status === "VERIFIED"
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                              : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Nav Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Candidate Talent Radar</span>
                </h4>
                <p className="text-xs text-slate-400 mt-1">Audit verified JobReady Index scores & candidate passports</p>
              </div>
              <Link
                href="/hr/candidates"
                className="px-3.5 py-2 rounded-xl bg-amber-500 text-black font-extrabold text-xs flex items-center gap-1 hover:bg-amber-400 transition-all flex-shrink-0"
              >
                Inspect <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Building className="w-4 h-4 text-cyan-400" />
                  <span>Institutes Directory & Audit</span>
                </h4>
                <p className="text-xs text-slate-400 mt-1">Review NCVT ITI campus accreditations & placement ratios</p>
              </div>
              <Link
                href="/hr/institutes"
                className="px-3.5 py-2 rounded-xl bg-cyan-500 text-black font-extrabold text-xs flex items-center gap-1 hover:bg-cyan-400 transition-all flex-shrink-0"
              >
                Inspect <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* National System Admin KPIs */}
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
              <div className="text-[10px] text-emerald-300 font-bold">QR & Cryptographic Audited</div>
            </div>

            <div className="glass-card p-5 rounded-3xl border border-purple-500/30 text-center space-y-1 bg-slate-900/90">
              <div className="text-xs font-bold text-slate-400 uppercase">Partner MSME Plants</div>
              <div className="text-4xl font-black text-purple-300">450 Plants</div>
              <div className="text-[10px] text-purple-300 font-bold">Active Hiring Contracts</div>
            </div>
          </div>

          {/* National Charts Grid */}
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
        </>
      )}

    </div>
  );
}

export default function HrDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 animate-pulse">Loading HR & System Admin Portal...</div>}>
      <HrDashboardContent />
    </Suspense>
  );
}
