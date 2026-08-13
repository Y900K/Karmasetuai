"use client";

import React, { Suspense } from "react";
import { Users, UserCheck, Search, ShieldCheck } from "lucide-react";
import FilterBar from "@/components/shared/FilterBar";
import { useFilterSort } from "@/lib/hooks/useFilterSort";
import { useEcosystemStore } from "@/lib/store/EcosystemStore";

function HrCandidatesContent() {
  const { filters, updateFilters, clearFilters } = useFilterSort("name");
  const { students } = useEcosystemStore();

  const filtered = students.filter((s) => {
    const matchSearch =
      !filters.search ||
      s.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      s.trade.toLowerCase().includes(filters.search.toLowerCase()) ||
      s.institute.toLowerCase().includes(filters.search.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-6 rounded-3xl border border-indigo-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-400" />
              <span>Candidate Compliance Audits</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold uppercase">
              Verification Pipeline
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Verified trainee profiles, JobReady Index™ audit credentials, and shopfloor practical readiness metrics.
          </p>
        </div>
      </div>

      <FilterBar
        filters={filters}
        onUpdate={updateFilters}
        onClear={clearFilters}
        placeholder="Filter candidate audits by name, trade, or institute..."
      />

      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Candidate Name</th>
                <th className="p-3">Trade Branch</th>
                <th className="p-3">Technical Institute</th>
                <th className="p-3">JobReady Index™</th>
                <th className="p-3">Certificates</th>
                <th className="p-3">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-white/5 transition-all">
                  <td className="p-3 font-bold text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    {s.name}
                  </td>
                  <td className="p-3 font-semibold text-cyan-300">{s.trade}</td>
                  <td className="p-3 text-slate-300">{s.institute}</td>
                  <td className="p-3 font-black text-emerald-400 text-sm">{s.jobReadyIndex.toFixed(1)}</td>
                  <td className="p-3 font-bold text-amber-300">{s.certificatesEarned} Verified</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${s.status === "VERIFIED" || s.status === "PLACED" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-amber-500/20 text-amber-300 border border-amber-500/40"}`}>
                      {s.status}
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

export default function HrCandidatesPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading Candidate Audits...</div>}>
      <HrCandidatesContent />
    </Suspense>
  );
}
