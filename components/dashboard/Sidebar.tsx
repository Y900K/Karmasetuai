"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Award, Briefcase, CreditCard, BookOpen, Bot, User, LogOut,
  Users, TrendingUp, FilePlus, BarChart3, Brain, Settings, ClipboardCheck, Video,
  Upload, MapPin, Landmark, FileText, ChevronLeft, ChevronRight, Cpu, Sparkles, Clock, X
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";

interface SidebarProps {
  currentRole: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ currentRole, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout, switchRole } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Role Configuration & Navigation Links
  const roleConfigs: Record<string, { title: string; color: string; bg: string; border: string; items: any[] }> = {
    STUDENT: {
      title: "Student Portal",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      items: [
        { label: "Dashboard", href: "/student", icon: LayoutDashboard },
        { label: "My Skills & Radar", href: "/student/skills", icon: Award },
        { label: "Job Matches", href: "/student/jobs", icon: Briefcase },
        { label: "Skill Passport", href: "/student/passport", icon: CreditCard },
        { label: "My Learning Hub", href: "/student/learning", icon: BookOpen, badge: "LMS" },
        { label: "Buddy AI", href: "/student/ai-mentor", icon: Bot, badge: "AI" },
        { label: "My Profile", href: "/student/profile", icon: User },
      ],
    },
    INSTITUTE: {
      title: "NCVT Institute",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      items: [
        { label: "Dashboard", href: "/institute", icon: LayoutDashboard },
        { label: "Student Roster", href: "/institute/students", icon: Users },
        { label: "Placements Report", href: "/institute/placements", icon: TrendingUp },
        { label: "Course Manager", href: "/institute/courses", icon: BookOpen },
        { label: "Create Course", href: "/institute/courses/create", icon: FilePlus, badge: "New" },
        { label: "Batch Analytics", href: "/institute/analytics", icon: BarChart3, badge: "Live" },
        { label: "AI Curriculum Analyzer", href: "/institute/ai-curriculum", icon: Brain, badge: "AI" },
        { label: "Settings", href: "/institute/settings", icon: Settings },
      ],
    },
    INDUSTRY: {
      title: "Master Mentor",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      items: [
        { label: "Dashboard", href: "/expert", icon: LayoutDashboard },
        { label: "Verify Capstone", href: "/expert/verify", icon: ClipboardCheck, badge: "AI Rubric" },
        { label: "Masterclasses", href: "/expert/masterclass", icon: Video },
        { label: "Upload Content", href: "/expert/content", icon: Upload },
        { label: "My Profile", href: "/expert/profile", icon: User },
      ],
    },
    EMPLOYER: {
      title: "MSME Employer",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      items: [
        { label: "Dashboard", href: "/employer", icon: LayoutDashboard },
        { label: "Post New Job", href: "/employer/post-job", icon: FilePlus, badge: "AI JD" },
        { label: "Candidate Pipeline", href: "/employer/candidates", icon: Users },
        { label: "Hiring Tracker", href: "/employer/hiring", icon: Clock, badge: "10-Day" },
        { label: "Hiring Analytics", href: "/employer/analytics", icon: BarChart3, badge: "Live" },
        { label: "Company Profile", href: "/employer/settings", icon: Settings },
      ],
    },
    NATIONAL: {
      title: "National Governance",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      items: [
        { label: "National KPIs", href: "/admin", icon: LayoutDashboard },
        { label: "AI Regional Heatmap", href: "/admin/analytics", icon: MapPin, badge: "AI" },
        { label: "Institutes Directory", href: "/admin/institutes", icon: Landmark },
        { label: "Compliance Reports", href: "/admin/reports", icon: FileText },
        { label: "Admin Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  };

  const activeConfig = roleConfigs[currentRole] || roleConfigs.STUDENT;

  const demoRoles = [
    { id: "STUDENT", label: "Student" },
    { id: "INSTITUTE", label: "Institute" },
    { id: "INDUSTRY", label: "Expert" },
    { id: "EMPLOYER", label: "Employer" },
    { id: "NATIONAL", label: "Admin" },
  ];

  const handleNavClick = () => {
    // Auto-close sidebar on mobile when a nav link is clicked
    if (onClose) onClose();
  };

  const sidebarContent = (
    <aside
      className={`relative z-50 bg-[#070b16]/98 border-r border-white/10 flex flex-col justify-between transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } min-h-screen select-none`}
    >
      {/* Sidebar Header & Branding */}
      <div>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-emerald-400 p-0.5 flex-shrink-0 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-[#070b16] rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            {!collapsed && (
              <div className="truncate">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-black text-white">Karma<span className="text-cyan-400">Setu</span></span>
                  <span className="text-[9px] font-black bg-amber-500/20 text-amber-300 px-1 py-0.5 rounded border border-amber-500/30">AI</span>
                </div>
                <div className={`text-[10px] font-extrabold uppercase ${activeConfig.color}`}>
                  {activeConfig.title}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Mobile close button */}
            {onClose && (
              <button
                onClick={onClose}
                className="md:hidden w-7 h-7 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {/* Desktop collapse button */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex w-7 h-7 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white items-center justify-center transition-all"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Demo Switcher Quick Menu */}
        {!collapsed && (
          <div className="p-3 border-b border-white/10 bg-slate-900/50">
            <div className="text-[9px] font-extrabold text-slate-400 uppercase mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> SWITCH PORTAL DEMO
            </div>
            <div className="flex flex-wrap gap-1">
              {demoRoles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => switchRole(r.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                    currentRole === r.id
                      ? "bg-cyan-500 text-black font-black"
                      : "bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
          {activeConfig.items.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/student" && item.href !== "/institute" && item.href !== "/expert" && item.href !== "/employer" && item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={idx}
                href={item.href}
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all relative group ${
                  isActive
                    ? `${activeConfig.bg} text-white border ${activeConfig.border} shadow-lg shadow-black/40`
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? activeConfig.color : "group-hover:text-slate-200"}`} />
                {!collapsed && (
                  <span className="truncate flex-1 flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {item.badge}
                      </span>
                    )}
                  </span>
                )}
                {isActive && (
                  <div className={`absolute left-0 top-2 bottom-2 w-1 rounded-r ${activeConfig.color.replace('text-', 'bg-')}`} />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer Bar */}
      <div className="p-3 border-t border-white/10 bg-slate-950/80">
        <div className="flex items-center justify-between gap-2">
          {!collapsed && (
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">{user?.full_name || "KarmaSetu User"}</div>
              <div className="text-[10px] text-slate-400 truncate">{user?.email || "user@karmasetu.ai"}</div>
            </div>
          )}
          <button
            onClick={logout}
            className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all flex-shrink-0"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );

  return sidebarContent;
}
