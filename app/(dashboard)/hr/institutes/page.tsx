"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { Landmark, ShieldCheck, Search, MapPin, Building, Download, CheckCircle2, TrendingUp, Users } from "lucide-react";
import FilterBar from "@/components/shared/FilterBar";
import { useFilterSort } from "@/lib/hooks/useFilterSort";

function HrInstitutesContent() {
  const { filters, updateFilters, clearFilters } = useFilterSort("name");

  const institutes = [
    { name: "Government ITI Lucknow Main", district: "Lucknow Central", code: "ITI-UP-20419", status: "NCVT ACCREDITED", trainees: 450, placementRate: 85, accreditationYear: 2024 },
    { name: "Government ITI Kanpur Nagar", district: "Kanpur Nagar", code: "ITI-UP-10284", status: "NCVT ACCREDITED", trainees: 520, placementRate: 64, accreditationYear: 2023 },
    { name: "Government ITI Noida Industrial Belt", district: "Gautam Buddha Nagar", code: "ITI-UP-30912", status: "NCVT ACCREDITED", trainees: 610, placementRate: 92, accreditationYear: 2025 },
    { name: "Government ITI Haridwar SIDCUL", district: "Haridwar", code: "ITI-UK-40115", status: "NCVT ACCREDITED", trainees: 380, placementRate: 88, accreditationYear: 2024 },
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
    <div className="space-y-6 animate-fade-in printable-area">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Landmark className="w-6 h-6 text-amber-400" />
              <span>National ITI & Institutes Directory</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase">
              NCVT Accreditation Audit
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Governance audit of NCVT & SCVT Accredited Training Institutes across national industrial hubs.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all no-print shadow-lg shadow-amber-500/20"
        >
          <Download className="w-4 h-4" /> Export Institute Directory
        </button>
      </div>

      {/* FilterBar */}
      <FilterBar
        filters={filters}
        onUpdate={updateFilters}
        onClear={clearFilters}
        placeholder="Filter institutes by campus name, district, or NCVT code..."
      />

      {/* Grid of Institutes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((inst, idx) => (
          <div key={idx} className="glass-card p-5 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90 hover:border-amber-500/30 transition-all">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  {inst.name}
                </h3>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-1 flex-wrap">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-cyan-400" />{inst.district}</span>
                  <span>•</span>
                  <span className="font-mono text-amber-300">{inst.code}</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex-shrink-0">
                {inst.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/5 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Trainees Enrolled</span>
                <span className="font-extrabold text-white text-sm">{inst.trainees}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase">MSME Placement</span>
                <span className="font-extrabold text-emerald-400 text-sm">{inst.placementRate}%</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Accredited Year</span>
                <span className="font-extrabold text-cyan-300 text-sm">{inst.accreditationYear}</span>
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
    <Suspense fallback={<div className="text-white p-6">Loading Institutes Directory...</div>}>
      <HrInstitutesContent />
    </Suspense>
  );
}
