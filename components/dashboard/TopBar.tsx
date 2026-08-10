"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell, Search, User, Shield, ChevronDown, CheckCircle2, Award, Briefcase, Sparkles, BookOpen
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";

export default function TopBar() {
  const pathname = usePathname();
  const { user, role } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Derive title from pathname
  const getPageTitle = () => {
    if (pathname.includes("/student/skills")) return "My Verified Skills & AI Radar Gaps";
    if (pathname.includes("/student/jobs")) return "Live Pre-Filtered MSME Jobs";
    if (pathname.includes("/student/passport")) return "Digital Skill Passport Verification";
    if (pathname.includes("/student/learning")) return "Focused Learning Hub & LMS";
    if (pathname.includes("/student/ai-mentor")) return "NVIDIA NIM AI Career Mentor";
    if (pathname.includes("/student/profile")) return "My Profile & AI Resume Parser";
    if (pathname.includes("/student")) return "Student Overview Dashboard";

    if (pathname.includes("/institute/students")) return "Student Batch Roster & Live Scores";
    if (pathname.includes("/institute/placements")) return "Placement Records & NCVT Report Export";
    if (pathname.includes("/institute/courses/create")) return "LMS Course Builder (YouTube & Drive Embed)";
    if (pathname.includes("/institute/courses")) return "Institute Course Management";
    if (pathname.includes("/institute/analytics")) return "Real-Time Batch Analytics Dashboard";
    if (pathname.includes("/institute/ai-curriculum")) return "AI NCVT Curriculum Gap Analyzer";
    if (pathname.includes("/institute/settings")) return "Institute Profile Settings";
    if (pathname.includes("/institute")) return "Institute Portal Dashboard";

    if (pathname.includes("/expert/verify")) return "CapStone Project Verification Queue";
    if (pathname.includes("/expert/masterclass")) return "Industry 4.0 Masterclass Manager";
    if (pathname.includes("/expert/content")) return "Upload Industry Learning Content";
    if (pathname.includes("/expert")) return "Master Mentor Hub";

    if (pathname.includes("/employer/post-job")) return "Post MSME Job & AI JD Generator";
    if (pathname.includes("/employer/candidates")) return "JobReady Candidates & AI Match Explainer";
    if (pathname.includes("/employer/hiring")) return "10-Day Kanban Hiring Tracker";
    if (pathname.includes("/employer/analytics")) return "Real-Time Hiring & Time-to-Hire Analytics";
    if (pathname.includes("/employer")) return "MSME Employer Hiring Portal";

    if (pathname.includes("/admin/analytics")) return "AI Regional Heatmap & District Analytics";
    if (pathname.includes("/admin/institutes")) return "National ITI & Institute Directory";
    if (pathname.includes("/admin/reports")) return "Compliance Reports & AI Summary Generator";
    if (pathname.includes("/admin")) return "National Skill Governance Dashboard";

    return "KarmaSetu AI Portal";
  };

  const sampleNotifications = [
    { title: "New Job Match", desc: "CNC Operator job at Tata Motors Noida matches 94% of your score", time: "5m ago", icon: Briefcase, color: "text-emerald-400" },
    { title: "CapStone Verified", desc: "Your Fanuc Lathe G-Code project signed off by Master Mentor", time: "1h ago", icon: CheckCircle2, color: "text-cyan-400" },
    { title: "New Masterclass", desc: "3-Phase PLC Control panel session scheduled for tomorrow", time: "3h ago", icon: BookOpen, color: "text-purple-400" },
  ];

  return (
    <header className="h-16 border-b border-white/10 bg-[#070b16]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0">
      
      {/* Title & Breadcrumb */}
      <div>
        <h1 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
          <span>{getPageTitle()}</span>
          <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            Role: {role}
          </span>
        </h1>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-3">

        {/* Global Search Bar */}
        <div className="relative hidden md:block w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students, trades, jobs..."
            className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 flex items-center justify-center relative transition-all"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#090e1e] border border-white/15 shadow-2xl p-3 z-50 animate-fade-in space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> REAL-TIME NOTIFICATIONS
                </span>
                <span className="text-[10px] text-cyan-400 font-bold">3 Unread</span>
              </div>

              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {sampleNotifications.map((n, i) => {
                  const NIcon = n.icon;
                  return (
                    <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex gap-2.5 items-start hover:bg-white/10 transition-all">
                      <NIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${n.color}`} />
                      <div>
                        <div className="text-xs font-bold text-white flex justify-between">
                          <span>{n.title}</span>
                          <span className="text-[9px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{n.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-bold text-xs">
            {user?.full_name?.charAt(0) || "U"}
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-white leading-none">{user?.full_name || "KarmaSetu User"}</div>
            <div className="text-[10px] text-slate-400 leading-none mt-1">{user?.email || "user@karmasetu.ai"}</div>
          </div>
        </div>

      </div>

    </header>
  );
}
