"use client";

import React, { Suspense } from "react";
import { Users, Download, Printer } from "lucide-react";
import FilterBar from "@/components/shared/FilterBar";
import { useFilterSort } from "@/lib/hooks/useFilterSort";

function StudentRosterContent() {
  const { filters, updateFilters, clearFilters } = useFilterSort("score");

  const students = [
    { name: "Rajesh Kumar", trade: "CNC Machinist", passportId: "KMP-8A92F1", score: 94, progress: 100, status: "PLACED (Tata Motors)" },
    { name: "Anit Sharma", trade: "Electrician", passportId: "KMP-3B41C2", score: 91, progress: 100, status: "PLACED (Havells)" },
    { name: "Vikram Singh", trade: "Fitter & Assembly", passportId: "KMP-7D19E4", score: 86, progress: 75, status: "INTERVIEWING" },
    { name: "Mohit Verma", trade: "Welder & Fab", passportId: "KMP-2A18F9", score: 88, progress: 90, status: "SHORTLISTED" },
    { name: "Suman Patel", trade: "CNC Machinist", passportId: "KMP-9C44E1", score: 92, progress: 100, status: "PLACED (L&T)" },
  ];

  const trades = Array.from(new Set(students.map((s) => s.trade)));
  const statuses = Array.from(new Set(students.map((s) => s.status)));

  const filtered = students
    .filter((s) => {
      const matchSearch =
        !filters.search ||
        s.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        s.trade.toLowerCase().includes(filters.search.toLowerCase()) ||
        s.passportId.toLowerCase().includes(filters.search.toLowerCase());
      const matchTrade = !filters.trade || s.trade === filters.trade;
      const matchStatus = !filters.status || s.status === filters.status;
      return matchSearch && matchTrade && matchStatus;
    })
    .sort((a, b) => {
      let valA = (a as any)[filters.sortBy] || a.name;
      let valB = (b as any)[filters.sortBy] || b.name;
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      if (valA < valB) return filters.sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return filters.sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="space-y-6 animate-fade-in printable-area">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-blue-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" />
            <span>Active Student Batch Roster & Live Scores</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Real-time tracking of JobReady Index™ scores, LMS course completion %, and placement status.
          </p>
        </div>

        <div className="flex items-center gap-2 no-print">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <Printer className="w-4 h-4 text-cyan-400" /> Print Roster
          </button>
          <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all">
            <Download className="w-4 h-4" /> Export CSV Roster
          </button>
        </div>
      </div>

      {/* FilterBar */}
      <FilterBar
        filters={filters}
        onUpdate={updateFilters}
        onClear={clearFilters}
        options={{
          trades,
          statuses,
          sortOptions: [
            { id: "name", label: "Student Name" },
            { id: "score", label: "JobReady Score" },
            { id: "progress", label: "Course Completion %" },
          ],
        }}
        placeholder="Filter by student name, trade, or Passport ID..."
      />

      {/* Roster Table Container */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Trade</th>
                <th className="p-3">Skill Passport ID</th>
                <th className="p-3">JobReady Index</th>
                <th className="p-3">Course Completion %</th>
                <th className="p-3">Placement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((s, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-all">
                  <td className="p-3 font-bold text-white">{s.name}</td>
                  <td className="p-3">{s.trade}</td>
                  <td className="p-3 font-mono text-cyan-300 font-bold">{s.passportId}</td>
                  <td className="p-3 font-extrabold text-emerald-400">{s.score} / 100</td>
                  <td className="p-3 font-bold text-cyan-300">{s.progress}%</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold ${s.status.includes("PLACED") ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"}`}>
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

export default function InstituteStudentsPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading student roster...</div>}>
      <StudentRosterContent />
    </Suspense>
  );
}
