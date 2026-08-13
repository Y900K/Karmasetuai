"use client";

import React, { Suspense } from "react";
import { Landmark, ShieldCheck, Search, MapPin, Building } from "lucide-react";
import FilterBar from "@/components/shared/FilterBar";
import { useFilterSort } from "@/lib/hooks/useFilterSort";

function HrInstitutesContent() {
  const { filters, updateFilters, clearFilters } = useFilterSort("name");

  const institutes = [
    { name: "Government ITI Lucknow Main", district: "Lucknow Central", code: "ITI-UP-20419", status: "VERIFIED", trainees: 450, placementRate: 85 },
    { name: "Government ITI Kanpur Nagar", district: "Kanpur Nagar", code: "ITI-UP-10284", status: "VERIFIED", trainees: 520, placementRate: 64 },
    { name: "Government ITI Noida Industrial Belt", district: "Gautam Buddha Nagar", code: "ITI-UP-30912", status: "VERIFIED", trainees: 610, placementRate: 92 },
    { name: "Government ITI Haridwar SIDCUL", district: "Haridwar", code: "ITI-UK-40115", status: "VERIFIED", trainees: 380, placementRate: 88 },
  ];

  const filtered = institutes.filter((inst) => {
    const matchSearch =
      !filters.search ||
      inst.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      inst.district.toLowerCase().includes(filters.search.toLowerCase()) ||
      inst.code.toLowerCase().includes(filters.search.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-6 rounded-3xl border border-indigo-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Landmark className="w-6 h-6 text-indigo-400" />
              <span>Regional Institutes Directory</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold uppercase">
              HR Audit Scope
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Verified NCVT & SCVT Accredited Training Institutes across monitored regional hubs.
          </p>
        </div>
      </div>

      <FilterBar
        filters={filters}
        onUpdate={updateFilters}
        onClear={clearFilters}
        placeholder="Filter institutes by name, district, or code..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((inst, idx) => (
          <div key={idx} className="glass-card p-5 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-indigo-400" />
                  {inst.name}
                </h3>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-cyan-400" />{inst.district}</span>
                  <span>•</span>
                  <span className="font-mono text-indigo-300">{inst.code}</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {inst.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Enrolled Trainees</span>
                <span className="font-extrabold text-white text-sm">{inst.trainees}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">MSME Placement Rate</span>
                <span className="font-extrabold text-emerald-400 text-sm">{inst.placementRate}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HrInstitutesPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading HR Institutes directory...</div>}>
      <HrInstitutesContent />
    </Suspense>
  );
}
