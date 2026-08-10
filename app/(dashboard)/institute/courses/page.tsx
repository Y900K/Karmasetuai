"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Plus, Users, Award, CheckCircle2, FileText, ChevronRight } from "lucide-react";

export default function InstituteCoursesPage() {
  const courses = [
    { id: "course-1", title: "CNC Lathe Fanuc G-Code Programming", trade: "CNC Machinist", enrolled: 145, avgCompletion: 92, status: "PUBLISHED" },
    { id: "course-2", title: "Precision Micrometer & Vernier Calibration", trade: "Quality Inspection", enrolled: 110, avgCompletion: 88, status: "PUBLISHED" },
    { id: "course-3", title: "3-Phase Motor Diagnostics & Control Wiring", trade: "Industrial Electrician", enrolled: 95, avgCompletion: 78, status: "PUBLISHED" },
    { id: "course-4", title: "5S Industrial Safety & Shopfloor Compliance", trade: "General Technical", enrolled: 180, avgCompletion: 96, status: "PUBLISHED" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-blue-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <span>Institute LMS Course Management</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Manage trade courses, YouTube/Drive media embeds, and mandatory 10-question AI exams.
          </p>
        </div>

        <Link
          href="/institute/courses/create"
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-500/20 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" /> Create New Course
        </Link>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((c) => (
          <div key={c.id} className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-extrabold uppercase">
                  {c.trade}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  {c.status}
                </span>
              </div>

              <h2 className="text-base font-bold text-white">{c.title}</h2>
              <p className="text-xs text-slate-400">Includes YouTube video tutorials, Google Drive docs & mandatory 10-Q AI Exam.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs border-t border-b border-white/10 py-3">
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Enrolled Students</div>
                <div className="font-extrabold text-white text-base">{c.enrolled}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Avg Completion %</div>
                <div className="font-extrabold text-cyan-300 text-base">{c.avgCompletion}%</div>
              </div>
            </div>

            <Link
              href="/institute/courses/create"
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center justify-center gap-1 transition-all"
            >
              <span>Edit Course & Quizzes</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}
