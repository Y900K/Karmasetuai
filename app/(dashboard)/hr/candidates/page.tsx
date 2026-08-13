"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { Users, UserCheck, Search, ShieldCheck, ExternalLink, Download, CheckCircle2, Award, FileText } from "lucide-react";
import FilterBar from "@/components/shared/FilterBar";
import { useFilterSort } from "@/lib/hooks/useFilterSort";
import { exportToCSV, exportToTSV, exportToFormattedText, triggerPrintableDocument } from "@/lib/utils/export";
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
    <div className="space-y-6 animate-fade-in printable-area">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-amber-400" />
              <span>Candidate Compliance & Talent Audits</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase">
              HR & System Admin Audit
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Verified candidate Skill Passports, JobReady Index™ breakdown, and public certificate verification.
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap no-print">
          <button
            onClick={() => exportToCSV("candidate_audits", filtered)}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1 transition-all shadow-md shadow-amber-500/20"
          >
            <Download className="w-3.5 h-3.5" /> CSV
          </button>

          <button
            onClick={() => exportToTSV("candidate_audits", filtered)}
            className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center gap-1 transition-all shadow-md shadow-emerald-500/20"
          >
            <Download className="w-3.5 h-3.5" /> Excel (TSV)
          </button>

          <button
            onClick={() => triggerPrintableDocument()}
            className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-all flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" /> PDF / Print
          </button>
        </div>
      </div>

      {/* FilterBar */}
      <FilterBar
        filters={filters}
        onUpdate={updateFilters}
        onClear={clearFilters}
        placeholder="Filter candidate audits by candidate name, trade, or institute..."
      />

      {/* Table Card */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" /> Monitored Candidate Records ({filtered.length})
          </h3>
          <span className="text-xs text-slate-400">Cryptographic Verification: Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Candidate Name</th>
                <th className="p-3">Trade Specialization</th>
                <th className="p-3">Technical Institute</th>
                <th className="p-3">JobReady Index™</th>
                <th className="p-3">Certificates</th>
                <th className="p-3">Audit Verification</th>
                <th className="p-3 text-right">Public Verifier Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-white/5 transition-all">
                  <td className="p-3 font-bold text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    {s.name}
                  </td>
                  <td className="p-3 font-semibold text-cyan-300">{s.trade}</td>
                  <td className="p-3 text-slate-300">{s.institute}</td>
                  <td className="p-3 font-black text-emerald-400 text-sm">
                    {s.jobReadyIndex.toFixed(1)}
                  </td>
                  <td className="p-3 font-bold text-amber-300">{s.certificatesEarned} Verified</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        s.status === "VERIFIED" || s.status === "PLACED"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/verify/CRT-8A92F1`}
                      target="_blank"
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold hover:bg-cyan-500/20 text-[11px] inline-flex items-center gap-1 transition-all"
                    >
                      <span>Verify 🌐</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
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
    <Suspense fallback={<div className="text-white p-6">Loading Candidate Compliance Audits...</div>}>
      <HrCandidatesContent />
    </Suspense>
  );
}
