"use client";

import React from "react";
import Link from "next/link";
import {
  Award, Briefcase, CreditCard, BookOpen, Bot, CheckCircle2, TrendingUp, Sparkles, Play, ChevronRight, FileText
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import { useEcosystem } from "@/lib/context/EcosystemContext";
import { useEcosystemStore } from "@/lib/store/EcosystemStore";
import CourseProgressChart from "@/components/dashboard/charts/CourseProgressChart";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const { t } = useEcosystem();
  const { students, jobs } = useEcosystemStore();

  const rajesh = students.find(s => s.name === "Rajesh Kumar") || students[0];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Welcome Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-[#0a1329] to-slate-950 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold uppercase">
                {t("dashPassportActive", "Digital Skill Passport Active")}
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: KMP-8A92F1</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
              {t("dashWelcomeBack", "Welcome back")}, <span className="text-cyan-400">{user?.full_name || rajesh.name}</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-xl mt-1">
              Govt ITI Lucknow • {rajesh.trade} • Batch 2026. {t("dashReadinessElevated", "Your shopfloor readiness is elevated.")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/student/learning"
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 hover:scale-102 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t("btnResumeLearning", "Resume Learning Hub")}</span>
            </Link>

            <Link
              href="/student/passport"
              className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-all flex items-center gap-1.5"
            >
              <CreditCard className="w-4 h-4 text-cyan-400" />
              <span>{t("btnViewPassportCard", "View Passport Card")}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Row (Real-Time Synced) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-3xl border border-emerald-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">{t("metricJobReady", "JobReady Index™")}</div>
          <div className="text-4xl font-black text-emerald-400">{rajesh.jobReadyIndex.toFixed(1)}</div>
          <div className="text-[10px] text-emerald-300 font-bold flex items-center justify-center gap-1">
            <TrendingUp className="w-3 h-3" /> ↑ 12% vs Industry Baseline
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-cyan-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">{t("metricCourseCompletion", "Overall Course Completion %")}</div>
          <div className="text-4xl font-black text-cyan-300">{rajesh.courseCompletion}%</div>
          <div className="text-[10px] text-cyan-300 font-bold flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 4 of 5 Courses Passed
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-amber-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">{t("metricCertificates", "Certificates Earned")}</div>
          <div className="text-4xl font-black text-amber-400">{rajesh.certificatesEarned} Verified</div>
          <div className="text-[10px] text-amber-300 font-bold">QR & Blockchain Ready</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-purple-500/30 text-center space-y-1 bg-slate-900/90">
          <div className="text-xs font-bold text-slate-400 uppercase">{t("metricMsmeMatches", "Live MSME Matches")}</div>
          <div className="text-4xl font-black text-purple-300">{jobs.length} Jobs</div>
          <div className="text-[10px] text-purple-300 font-bold">Pre-filtered Score &gt; 80</div>
        </div>

      </div>

      {/* Main Grid: Learning Progress Chart & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Real-Time % Completion Chart */}
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>{t("chartCourseTitle", "Real-Time Course Completion Analytics (%)")}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{t("chartCourseSub", "Live tracking of your learning progress & exam scores")}</p>
            </div>

            <Link href="/student/learning" className="text-xs text-cyan-400 font-bold hover:underline flex items-center gap-1">
              Full Hub <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <CourseProgressChart />
        </div>

        {/* Right 1 Col: AI Learning Recommendations */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">{t("aiPathSuggestions", "AI Learning Path Suggestions")}</h3>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
              <div className="text-xs font-bold text-amber-300">Industrial PLC Diagnostics</div>
              <p className="text-[11px] text-slate-300">Recommended based on 14% gap in 3-phase motor troubleshooting.</p>
              <div className="text-[10px] text-amber-400 font-extrabold pt-1">Est. Score Boost: +4.5 Index</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-1">
              <div className="text-xs font-bold text-cyan-300">Automated CAD Import</div>
              <p className="text-[11px] text-slate-300">Master DXF/STEP file import directly on Fanuc CNC controller panel.</p>
              <div className="text-[10px] text-cyan-400 font-extrabold pt-1">Est. Score Boost: +3.2 Index</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
