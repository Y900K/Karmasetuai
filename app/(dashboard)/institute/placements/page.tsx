"use client";

import React from "react";
import { TrendingUp, Download, Building, Award, CheckCircle2, Printer } from "lucide-react";
import { exportToCSV } from "@/lib/utils/export";

export default function InstitutePlacementsPage() {
  const placements = [
    { student: "Rajesh Kumar", trade: "CNC Machinist", company: "Tata Motors Noida", salary: "₹28,000 / mo", date: "2026-08-01" },
    { student: "Anit Sharma", trade: "Electrician", company: "Havells Haridwar", salary: "₹25,000 / mo", date: "2026-07-28" },
    { student: "Suman Patel", trade: "CNC Machinist", company: "L&T Defense", salary: "₹32,000 / mo", date: "2026-07-15" },
    { student: "Vikram Malhotra", trade: "Fitter & Assembly", company: "Godrej Aerospace", salary: "₹30,000 / mo", date: "2026-07-05" },
  ];

  return (
    <div className="space-y-6 animate-fade-in printable-area">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-blue-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <span>Placement Records & NCVT Compliance Export</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Track student hiring by MSME manufacturing plants and generate official government reports.
          </p>
        </div>

        <div className="flex items-center gap-2 no-print">
          <button
            onClick={() => exportToCSV("placement_records_ncvt", placements)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-blue-500/20"
          >
            <Download className="w-4 h-4" /> Export Placement CSV
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <Printer className="w-4 h-4 text-cyan-400" /> Print PDF Report
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Verified Direct Placements</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Trade</th>
                <th className="p-3">Hiring Company</th>
                <th className="p-3">Package / Salary</th>
                <th className="p-3">Offer Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {placements.map((p, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-all">
                  <td className="p-3 font-bold text-white">{p.student}</td>
                  <td className="p-3">{p.trade}</td>
                  <td className="p-3 font-bold text-cyan-300">{p.company}</td>
                  <td className="p-3 font-extrabold text-emerald-400">{p.salary}</td>
                  <td className="p-3 text-slate-400">{p.date}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] border border-emerald-500/30">
                      OFFER JOINED
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
