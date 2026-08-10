"use client";

import React, { useState } from "react";
import {
  GraduationCap, Landmark, UserCheck, Briefcase, Shield, Flag, LogOut,
  ArrowLeft, CheckCircle2, Award, Cpu, AlertTriangle, TrendingUp, Users,
  FileText, Play, Download, Search, Sparkles, RefreshCw, Layers, Check
} from "lucide-react";

interface RoleDashboardProps {
  user: any;
  role: string;
  onLogout: () => void;
  onSwitchRole: (newRole: string) => void;
}

const ROLES = [
  { id: "STUDENT", title: "Student Passport", icon: GraduationCap, color: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10" },
  { id: "INSTITUTE", title: "NCVT Institute", icon: Landmark, color: "text-blue-400 border-blue-500/40 bg-blue-500/10" },
  { id: "INDUSTRY", title: "Master Mentor", icon: UserCheck, color: "text-purple-400 border-purple-500/40 bg-purple-500/10" },
  { id: "EMPLOYER", title: "MSME Employer", icon: Briefcase, color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10" },
  { id: "HR", title: "HR Suite", icon: Shield, color: "text-amber-400 border-amber-500/40 bg-amber-500/10" },
  { id: "NATIONAL", title: "National Governance", icon: Flag, color: "text-pink-400 border-pink-500/40 bg-pink-500/10" },
];

export default function RoleDashboard({ user, role, onLogout, onSwitchRole }: RoleDashboardProps) {
  const [activeTab, setActiveTab] = useState(role || "STUDENT");
  const [verifiedProjects, setVerifiedProjects] = useState<Record<string, boolean>>({});

  const toggleVerify = (id: string) => {
    setVerifiedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentRoleObj = ROLES.find((r) => r.id === activeTab) || ROLES[0];

  return (
    <div className="min-h-screen bg-[#060a14] text-slate-100 p-4 sm:p-8 space-y-8 selection:bg-cyan-500 selection:text-black">
      
      {/* Top Portal Header Bar */}
      <header className="glass-card p-4 sm:p-6 rounded-3xl border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#070b16] rounded-[14px] flex items-center justify-center">
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white">Karma<span className="text-cyan-400">Setu</span> AI</span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase">
                {currentRoleObj.title}
              </span>
            </div>
            <p className="text-xs text-slate-400">Logged in as: <strong className="text-white">{user?.email || "user@karmasetu.ai"}</strong></p>
          </div>
        </div>

        {/* Demo Switcher & Actions */}
        <div className="flex items-center gap-3">
          
          <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-white/10 text-xs font-bold">
            <span className="text-slate-400 px-2 hidden sm:inline">Switch Portal:</span>
            {ROLES.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setActiveTab(r.id);
                  onSwitchRole(r.id);
                }}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === r.id
                    ? "bg-cyan-500 text-black font-extrabold shadow-md shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {r.title.split(" ")[0]}
              </button>
            ))}
          </div>

          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

        </div>
      </header>

      {/* DASHBOARD CONTENT BASED ON ACTIVE ROLE */}

      {/* 1. STUDENT DASHBOARD */}
      {activeTab === "STUDENT" && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Top Score Banner */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="glass-card p-6 rounded-3xl border border-cyan-500/30 text-center">
              <div className="text-xs font-bold text-slate-400 uppercase">Skill Passport ID</div>
              <div className="text-2xl font-black text-cyan-300 font-mono my-1">KMP-8A92F1</div>
              <div className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> QR Verifiable
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 text-center">
              <div className="text-xs font-bold text-slate-400 uppercase">JobReady Index™</div>
              <div className="text-4xl font-black text-emerald-400 my-1">94 / 100</div>
              <div className="text-[10px] text-slate-300">Elevated Shopfloor Readiness</div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-purple-500/30 text-center">
              <div className="text-xs font-bold text-slate-400 uppercase">Trade Specialization</div>
              <div className="text-lg font-bold text-white my-1">CNC Machinist & Programmer</div>
              <div className="text-[10px] text-purple-300">Govt ITI Lucknow • 2026 Batch</div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-amber-500/30 text-center">
              <div className="text-xs font-bold text-slate-400 uppercase">Live MSME Matches</div>
              <div className="text-4xl font-black text-amber-400 my-1">12 Jobs</div>
              <div className="text-[10px] text-amber-300">Pre-filtered Score &gt; 80</div>
            </div>

          </div>

          {/* Student Detailed Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <span>Verified Practical Competencies</span>
              </h3>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">Fanuc CNC Lathe G-Code Programming</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Evaluated on live shopfloor machine by Senior Engineer L&T</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    Score: 96%
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">Precision Micrometer & Vernier Calibration</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Tolerance testing down to ±0.01mm on steel components</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    Score: 92%
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">Industrial Safety & 5S Workplace Compliance</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Certified by Master Mentor Authority</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    Score: 94%
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>AI Skill Radar Gaps</span>
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  <div className="text-xs font-bold text-amber-300">Digital Sensor Diagnostics</div>
                  <p className="text-[11px] text-slate-400 mt-1">Recommended: Complete 2-hour micro-module on Industry 4.0 PLC troubleshooting.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
                  <div className="text-xs font-bold text-cyan-300">Automated CAD Import</div>
                  <p className="text-[11px] text-slate-400 mt-1">Recommended: Master DXF/STEP file import on CNC controller panel.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 2. INSTITUTE DASHBOARD */}
      {activeTab === "INSTITUTE" && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-3xl border border-blue-500/30 text-center">
              <div className="text-xs font-bold text-slate-400 uppercase">Total Enrolled Batch</div>
              <div className="text-3xl font-black text-white my-1">450 Students</div>
              <div className="text-[10px] text-blue-300 font-bold">Govt ITI Lucknow</div>
            </div>

            <div className="glass-card p-5 rounded-3xl border border-emerald-500/30 text-center">
              <div className="text-xs font-bold text-slate-400 uppercase">Placed Students</div>
              <div className="text-3xl font-black text-emerald-400 my-1">382 (85%)</div>
              <div className="text-[10px] text-emerald-300">Direct MSME Hiring</div>
            </div>

            <div className="glass-card p-5 rounded-3xl border border-purple-500/30 text-center">
              <div className="text-xs font-bold text-slate-400 uppercase">Avg JobReady Index</div>
              <div className="text-3xl font-black text-purple-300 my-1">88.4 / 100</div>
              <div className="text-[10px] text-purple-300">↑ 24% vs Prev Year</div>
            </div>

            <div className="glass-card p-5 rounded-3xl border border-amber-500/30 text-center">
              <div className="text-xs font-bold text-slate-400 uppercase">Partner MSMEs</div>
              <div className="text-3xl font-black text-amber-400 my-1">42 Companies</div>
              <div className="text-[10px] text-amber-300">Noida & Kanpur Plants</div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Active Student Batch Roster</h3>
              <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> Export NCVT Placement Report
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-900 text-slate-400 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Trade</th>
                    <th className="p-3">Skill Passport ID</th>
                    <th className="p-3">JobReady Index</th>
                    <th className="p-3">Placement Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-3 font-bold text-white">Rajesh Kumar</td>
                    <td className="p-3">CNC Machinist</td>
                    <td className="p-3 font-mono text-cyan-300">KMP-8A92F1</td>
                    <td className="p-3 font-bold text-emerald-400">94 / 100</td>
                    <td className="p-3"><span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">PLACED (Tata Motors)</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Anit Sharma</td>
                    <td className="p-3">Electrician</td>
                    <td className="p-3 font-mono text-cyan-300">KMP-3B41C2</td>
                    <td className="p-3 font-bold text-emerald-400">91 / 100</td>
                    <td className="p-3"><span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">PLACED (Havells)</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Vikram Singh</td>
                    <td className="p-3">Fitter & Assembly</td>
                    <td className="p-3 font-mono text-cyan-300">KMP-7D19E4</td>
                    <td className="p-3 font-bold text-amber-400">86 / 100</td>
                    <td className="p-3"><span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold">INTERVIEWING</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* 3. INDUSTRY EXPERT HUB */}
      {activeTab === "INDUSTRY" && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-purple-400" />
              <span>Pending CapStone Project Verifications</span>
            </h3>

            <div className="space-y-3">
              {[
                { id: "p1", student: "Rajesh Kumar", trade: "CNC Machinist", task: "Fanuc Controller Precision Lathe Fabrication", video: "Live Workshop Video (2:30)" },
                { id: "p2", student: "Mohit Verma", trade: "Industrial Electrician", task: "3-Phase Motor Control Panel Wiring & Testing", video: "Live Workshop Video (1:45)" },
              ].map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white">{p.student} ({p.trade})</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{p.task}</p>
                    <span className="text-[10px] text-cyan-300 flex items-center gap-1 mt-1 font-bold">
                      <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" /> {p.video}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleVerify(p.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      verifiedProjects[p.id]
                        ? "bg-emerald-500 text-black font-extrabold"
                        : "bg-purple-600 text-white hover:bg-purple-500 shadow-md shadow-purple-500/20"
                    }`}
                  >
                    {verifiedProjects[p.id] ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                    <span>{verifiedProjects[p.id] ? "Signed Off & Verified" : "Verify Practical Capstone"}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 4. MSME EMPLOYER DASHBOARD */}
      {activeTab === "EMPLOYER" && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                  <span>JobReady Pre-Filtered Candidates (Score &gt; 80)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Direct hiring with zero initial retraining required</p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold">
                10-Day Hiring Cycle Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-white">Rajesh Kumar</h4>
                    <p className="text-[11px] text-slate-400">CNC Machinist & Programmer</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-black">
                    94 / 100
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 bg-white/5 p-2 rounded-xl border border-white/5">
                  Verified Skills: Fanuc Lathe G-Code, Precision Calibration (±0.01mm), 5S Safety.
                </div>
                <button className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs">
                  Issue Direct Job Offer ➔
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-white">Anit Sharma</h4>
                    <p className="text-[11px] text-slate-400">Industrial Electrician</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-black">
                    91 / 100
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 bg-white/5 p-2 rounded-xl border border-white/5">
                  Verified Skills: 3-Phase Control Wiring, Motor Diagnostics, Industrial Safety.
                </div>
                <button className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs">
                  Issue Direct Job Offer ➔
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 5. HR & NATIONAL GOVERNANCE DASHBOARD */}
      {(activeTab === "HR" || activeTab === "NATIONAL") && (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-card p-6 rounded-3xl border border-amber-500/30 text-center space-y-3">
            <h3 className="text-lg font-bold text-white">National & Internal Workforce Analytics</h3>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              Real-time regional skill heatmaps across Uttar Pradesh & Uttarakhand industrial hubs. Fully aligned with Skill India & Digital India missions.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold">
                Noida Sector 63: 92% Placement
              </span>
              <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                Haridwar SIDCUL: 88% Placement
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
