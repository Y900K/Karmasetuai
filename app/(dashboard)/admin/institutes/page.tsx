"use client";

import React, { useState } from "react";
import { Landmark, Search, Download, Award } from "lucide-react";

export default function AdminInstitutesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const institutes = [
    { name: "Government ITI Lucknow Main Campus", code: "ITI-UP-20419", state: "Uttar Pradesh", district: "Lucknow", trainees: 450, placementRate: 85, score: 88.4 },
    { name: "Government ITI Kanpur Industrial", code: "ITI-UP-10294", state: "Uttar Pradesh", district: "Kanpur", trainees: 380, placementRate: 64, score: 79.2 },
    { name: "Government ITI Haridwar SIDCUL", code: "ITI-UK-30112", state: "Uttarakhand", district: "Haridwar", trainees: 520, placementRate: 88, score: 91.0 },
    { name: "VJTI Skill Center Mumbai", code: "ITI-MH-40912", state: "Maharashtra", district: "Mumbai", trainees: 610, placementRate: 90, score: 92.5 },
  ];

  const filtered = institutes.filter(
    (i) =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Landmark className="w-6 h-6 text-amber-400" />
            <span>National ITI & Institute Directory</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Master registry of 127 accredited ITIs, Polytechnics, and Skill Centers in India.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-amber-500/20">
          <Download className="w-4 h-4 text-black" /> Export Directory CSV
        </button>
      </div>

      {/* Directory Table */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by institute name, NCVT code, or district..."
            className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Institute Name</th>
                <th className="p-3">NCVT Code</th>
                <th className="p-3">State / District</th>
                <th className="p-3">Enrolled Trainees</th>
                <th className="p-3">Placement Rate</th>
                <th className="p-3">Avg JobReady Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((inst, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-all">
                  <td className="p-3 font-bold text-white">{inst.name}</td>
                  <td className="p-3 font-mono text-cyan-300 font-bold">{inst.code}</td>
                  <td className="p-3">{inst.state} ({inst.district})</td>
                  <td className="p-3 font-bold text-white">{inst.trainees}</td>
                  <td className="p-3 font-extrabold text-emerald-400">{inst.placementRate}%</td>
                  <td className="p-3 font-bold text-amber-300">{inst.score} / 100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
