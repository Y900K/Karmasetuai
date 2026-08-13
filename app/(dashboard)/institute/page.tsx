"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Landmark, Users, TrendingUp, Award, Download, Sparkles, BookOpen, ChevronRight, BarChart3,
  ClipboardCheck, Video, Upload, Play, UserCheck, ShieldCheck, CheckCircle2
} from "lucide-react";
import PlacementTrendChart from "@/components/dashboard/charts/PlacementTrendChart";
import TradeDistributionChart from "@/components/dashboard/charts/TradeDistributionChart";
import CourseProgressChart from "@/components/dashboard/charts/CourseProgressChart";

export default function InstituteDashboardPage() {
  const [activeTab, setActiveTab] = useState<"institute" | "expert">("institute");

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-r from-slate-900 via-[#0a1532] to-slate-950 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold uppercase">
              NCVT Institute Administration
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold uppercase flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-purple-400" /> Master Mentor Authority
            </span>
            <span className="text-xs text-slate-400 font-mono">Code: ITI-UP-20419</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Government ITI Lucknow <span className="text-blue-400">& Expert Faculty Suite</span>
          </h1>
          <p className="text-xs text-slate-300 max-w-xl mt-1">
            Unified Portal for Institute Operations, Batch Analytics, Expert Masterclasses & CapStone Verification.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/expert/verify"
            className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20 flex items-center gap-1.5 transition-all"
          >
            <ClipboardCheck className="w-4 h-4 text-purple-200" />
            <span>Verify Capstones (2 Pending)</span>
          </Link>

          <Link
            href="/institute/courses/create"
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-extrabold text-xs shadow-lg shadow-blue-500/20 flex items-center gap-1.5 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Create New Course</span>
          </Link>
        </div>
      </div>

      {/* Tab Controls: Institute Ops vs Expert Suite */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 w-fit">
        <button
          onClick={() => setActiveTab("institute")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "institute"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>Institute Administration</span>
        </button>

        <button
          onClick={() => setActiveTab("expert")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "expert"
              ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Expert Mentor & Capstone Suite</span>
          <span className="px-1.5 py-0.5 rounded-full bg-purple-400 text-black text-[9px] font-black">2</span>
        </button>
      </div>

      {activeTab === "institute" ? (
        <>
          {/* Metric Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-3xl border border-blue-500/30 text-center space-y-1 bg-slate-900/90">
              <div className="text-xs font-bold text-slate-400 uppercase">Enrolled Trainees</div>
              <div className="text-4xl font-black text-white">450</div>
              <div className="text-[10px] text-blue-300 font-bold">across 4 Trade Branches</div>
            </div>

            <div className="glass-card p-5 rounded-3xl border border-emerald-500/30 text-center space-y-1 bg-slate-900/90">
              <div className="text-xs font-bold text-slate-400 uppercase">Direct MSME Placements</div>
              <div className="text-4xl font-black text-emerald-400">382 (85%)</div>
              <div className="text-[10px] text-emerald-300 font-bold flex items-center justify-center gap-1">
                <TrendingUp className="w-3 h-3" /> ↑ 18% vs Last Year
              </div>
            </div>

            <div className="glass-card p-5 rounded-3xl border border-purple-500/30 text-center space-y-1 bg-slate-900/90">
              <div className="text-xs font-bold text-slate-400 uppercase">Avg JobReady Index™</div>
              <div className="text-4xl font-black text-purple-300">88.4</div>
              <div className="text-[10px] text-purple-300 font-bold">Top 5% in Uttar Pradesh</div>
            </div>

            <div className="glass-card p-5 rounded-3xl border border-amber-500/30 text-center space-y-1 bg-slate-900/90">
              <div className="text-xs font-bold text-slate-400 uppercase">Partner MSMEs</div>
              <div className="text-4xl font-black text-amber-400">42 Companies</div>
              <div className="text-[10px] text-amber-300 font-bold">Noida & Kanpur Hubs</div>
            </div>
          </div>

          {/* Analytics Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <span>Monthly Placement Velocity vs Target</span>
                </h3>
                <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                  Live Real-Time
                </span>
              </div>
              <PlacementTrendChart />
            </div>

            <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>Trade Branch Enrollment Distribution</span>
                </h3>
                <span className="text-[10px] font-extrabold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30">
                  Active Cohort
                </span>
              </div>
              <TradeDistributionChart />
            </div>
          </div>

          {/* Course Completion Analytics Chart */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  <span>Batch Average Course Completion % & Certificates Issued</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Real-time LMS metrics across all active institute modules</p>
              </div>

              <Link href="/institute/analytics" className="text-xs text-blue-400 font-bold hover:underline flex items-center gap-1">
                Deep Batch Analytics <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <CourseProgressChart />
          </div>
        </>
      ) : (
        <>
          {/* Expert Mentor & Capstone Suite */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-3xl border border-amber-500/30 text-center space-y-1 bg-slate-900/90">
              <div className="text-xs font-bold text-slate-400 uppercase">Pending Verifications</div>
              <div className="text-4xl font-black text-amber-400">2 Projects</div>
              <div className="text-[10px] text-amber-300 font-bold">Video Capstones Uploaded</div>
            </div>

            <div className="glass-card p-5 rounded-3xl border border-emerald-500/30 text-center space-y-1 bg-slate-900/90">
              <div className="text-xs font-bold text-slate-400 uppercase">Signed Off This Month</div>
              <div className="text-4xl font-black text-emerald-400">18 Trainees</div>
              <div className="text-[10px] text-emerald-300 font-bold">Verified for MSME Hiring</div>
            </div>

            <div className="glass-card p-5 rounded-3xl border border-cyan-500/30 text-center space-y-1 bg-slate-900/90">
              <div className="text-xs font-bold text-slate-400 uppercase">Masterclasses Conducted</div>
              <div className="text-4xl font-black text-cyan-300">12 Sessions</div>
              <div className="text-[10px] text-cyan-300 font-bold">340 Total Trainees Attended</div>
            </div>

            <div className="glass-card p-5 rounded-3xl border border-pink-500/30 text-center space-y-1 bg-slate-900/90">
              <div className="text-xs font-bold text-slate-400 uppercase">Avg Trainee Score Given</div>
              <div className="text-4xl font-black text-pink-400">92.4%</div>
              <div className="text-[10px] text-pink-300 font-bold">Strict Shopfloor Standard</div>
            </div>
          </div>

          {/* Pending Capstones Section */}
          <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-4 bg-slate-900/90">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-purple-400" />
                  <span>Pending Capstone Video Verification Queue</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Evaluate shopfloor practical execution using AI Multi-Dimensional Rubric</p>
              </div>

              <Link
                href="/expert/verify"
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs flex items-center gap-1 transition-all"
              >
                <span>Open Full Queue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-white">Rajesh Kumar (CNC Machinist & Programmer)</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Fanuc Controller Precision Lathe Fabrication & G-Code</p>
                  <span className="text-[10px] text-cyan-300 flex items-center gap-1 mt-1 font-bold">
                    <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" /> Live Workshop Video (2:30 min)
                  </span>
                </div>

                <Link
                  href="/expert/verify"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-purple-500/20 transition-all"
                >
                  <Award className="w-4 h-4" /> Verify Capstone
                </Link>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-white">Mohit Verma (Industrial Electrician)</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">3-Phase Motor Starter Wiring & PLC Panel Troubleshooting</p>
                  <span className="text-[10px] text-cyan-300 flex items-center gap-1 mt-1 font-bold">
                    <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" /> Live Electrical Panel Video (3:15 min)
                  </span>
                </div>

                <Link
                  href="/expert/verify"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-purple-500/20 transition-all"
                >
                  <Award className="w-4 h-4" /> Verify Capstone
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Action Cards for Masterclasses & Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Video className="w-4 h-4 text-cyan-400" />
                  <span>Expert Masterclasses Manager</span>
                </h4>
                <p className="text-xs text-slate-400 mt-1">Schedule live video sessions & shopfloor Q&A for trainees</p>
              </div>
              <Link
                href="/expert/masterclass"
                className="px-3.5 py-2 rounded-xl bg-cyan-500 text-black font-extrabold text-xs flex items-center gap-1 hover:bg-cyan-400 transition-all flex-shrink-0"
              >
                Manage <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-purple-400" />
                  <span>Upload Expert Learning Content</span>
                </h4>
                <p className="text-xs text-slate-400 mt-1">Publish CNC blueprints, G-Code references & safety guides</p>
              </div>
              <Link
                href="/expert/content"
                className="px-3.5 py-2 rounded-xl bg-purple-600 text-white font-extrabold text-xs flex items-center gap-1 hover:bg-purple-500 transition-all flex-shrink-0"
              >
                Upload <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
