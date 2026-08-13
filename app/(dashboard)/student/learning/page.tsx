"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, Play, Award, Clock, Sparkles, ChevronRight } from "lucide-react";

export default function StudentLearningPage() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setCourses(
            data.data.map((c: any) => ({
              id: c.id,
              title: c.title,
              trade: c.trade,
              modulesCount: c.modules_count || 4,
              duration: c.duration || "10 Hours",
              progressPercentage: c.progressPercentage ?? (c.id === "course-1" || c.id === "course-2" ? 100 : 75),
              passedExam: c.passedExam ?? (c.id === "course-1" || c.id === "course-2"),
              certCode: c.certCode || (c.id === "course-1" ? "CRT-8A92F1" : c.id === "course-2" ? "CRT-3B41C2" : null),
            }))
          );
        }
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-cyan-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <span>Focused Learning Hub & LMS</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Complete Video Watch → Reading Material → Mandatory 10-Q AI Exam → Earn Verified Skill Passport Certificate.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
            3 Certificates Earned
          </span>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((c) => (
          <div key={c.id} className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90 hover:border-cyan-500/40 transition-all">
            
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-extrabold uppercase border border-cyan-500/30">
                  {c.trade}
                </span>
                <h2 className="text-base font-bold text-white mt-2">{c.title}</h2>
              </div>

              {c.passedExam ? (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                  {c.progressPercentage}% Complete
                </span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400 font-bold">
                <span>Course Completion Progress</span>
                <span className="text-cyan-300">{c.progressPercentage}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${c.progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> {c.duration} ({c.modulesCount} Topics)
              </span>

              <Link
                href={`/student/learning/${c.id}`}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs flex items-center gap-1 transition-all"
              >
                <span>{c.progressPercentage === 100 ? "Review Course" : "Continue Course"}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
