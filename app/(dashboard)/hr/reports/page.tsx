"use client";

import React, { Suspense } from "react";
import { FileText, Download, ShieldCheck } from "lucide-react";
import FilterBar from "@/components/shared/FilterBar";
import { useFilterSort } from "@/lib/hooks/useFilterSort";

function HrReportsContent() {
  const { filters, updateFilters, clearFilters } = useFilterSort("name");

  const reports = [
    { name: "National Apprenticeship Placement Audit Q3", district: "Kanpur Nagar", status: "VERIFIED", candidates: 340, auditDate: "2026-08-01" },
    { name: "SIDCUL Haridwar Manufacturing Skill Pipeline", district: "Haridwar", status: "VERIFIED", candidates: 520, auditDate: "2026-08-05" },
    { name: "Noida Auto Tier-1 Hiring Compliance", district: "Noida", status: "PENDING REVIEW", candidates: 610, auditDate: "2026-08-09" },
    { name: "Pune Chakan Industrial Safety Compliance", district: "Pune", status: "VERIFIED", candidates: 480, auditDate: "2026-08-10" },
    { name: "Lucknow Electronics Cluster Apprenticeship Audit", district: "Lucknow", status: "VERIFIED", candidates: 290, auditDate: "2026-08-12" },
  ];

  const filtered = reports.filter((r) => {
    const matchSearch =
      !filters.search ||
      r.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.district.toLowerCase().includes(filters.search.toLowerCase());
    const matchStatus = !filters.status || r.status === filters.status;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in printable-area">
      <div className="glass-card p-6 rounded-3xl border border-indigo-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-400" />
              <span>HR Compliance Reports</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold uppercase">
              Scoped Governance
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Regional audit archives and placement compliance reports.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-500/20 no-print">
          <Download className="w-4 h-4" /> Export All PDF
        </button>
      </div>

      <FilterBar
        filters={filters}
        onUpdate={updateFilters}
        onClear={clearFilters}
        options={{
          statuses: ["VERIFIED", "PENDING REVIEW"],
        }}
        placeholder="Search compliance reports..."
      />

      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Report Title</th>
                <th className="p-3">District Region</th>
                <th className="p-3">Candidates Audited</th>
                <th className="p-3">Audit Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((r, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-all">
                  <td className="p-3 font-bold text-white">{r.name}</td>
                  <td className="p-3 font-semibold text-indigo-300">{r.district}</td>
                  <td className="p-3 font-extrabold text-white">{r.candidates} Trainees</td>
                  <td className="p-3 font-mono text-slate-400">{r.auditDate}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${r.status === "VERIFIED" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-amber-500/20 text-amber-300 border border-amber-500/40"}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function HrReportsPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading HR Reports...</div>}>
      <HrReportsContent />
    </Suspense>
  );
}
