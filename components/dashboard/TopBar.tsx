"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell, Search, User, ChevronDown, CheckCircle2, Briefcase, Sparkles,
  BookOpen, Check, LogOut, Globe, Palette, Menu
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import { Language } from "@/lib/i18n";
import { useEcosystem } from "@/lib/context/EcosystemContext";

interface TopBarProps {
  onToggleSidebar?: () => void;
  onToggleAnalytics?: () => void;
}

export default function TopBar({ onToggleSidebar, onToggleAnalytics }: TopBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, logout } = useAuth();

  // Notifications initialized with persisted read state
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    const defaultList = [
      { id: "1", title: "New Job Match", desc: "CNC Operator job at Tata Motors Noida matches 94% of your score", time: "5m ago", icon: Briefcase, color: "text-emerald-400", route: "/student/jobs", unread: true },
      { id: "2", title: "CapStone Verified", desc: "Your Fanuc Lathe G-Code project signed off by Master Mentor", time: "1h ago", icon: CheckCircle2, color: "text-cyan-400", route: "/student/passport", unread: true },
      { id: "3", title: "New Masterclass", desc: "3-Phase PLC Control panel session scheduled for tomorrow", time: "3h ago", icon: BookOpen, color: "text-purple-400", route: "/student/learning", unread: true },
    ];

    if (typeof window !== "undefined") {
      try {
        const savedRead = localStorage.getItem("karmasetu_notifications_read");
        if (savedRead) {
          const readIds: string[] = JSON.parse(savedRead);
          return defaultList.map((n) => (readIds.includes(n.id) ? { ...n, unread: false } : n));
        }
      } catch (e) {}
    }
    return defaultList;
  });

  const saveReadStatus = (readIds: string[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("karmasetu_notifications_read", JSON.stringify(readIds));
    }
  };

  // Language & Theme from EcosystemContext
  const { language, setLanguage, theme, setTheme } = useEcosystem();
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const themes = [
    { id: "cyberpunk", label: "Cyberpunk Dark", color: "bg-slate-800" },
    { id: "electric", label: "Electric Blue", color: "bg-blue-900" },
    { id: "contrast", label: "High Contrast", color: "bg-black" },
  ];

  const languages: { id: Language; label: string; flag: string }[] = [
    { id: "en", label: "English", flag: "🇮🇳" },
    { id: "hinglish", label: "Hinglish", flag: "🔀" },
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLangOpen(false);
  };

  const handleThemeChange = (t: string) => {
    setTheme(t);
    setThemeOpen(false);
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    const allIds = notifications.map((n) => n.id);
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    saveReadStatus(allIds);
  };

  const handleNotificationClick = (n: typeof notifications[0]) => {
    const updated = notifications.map((item) => (item.id === n.id ? { ...item, unread: false } : item));
    setNotifications(updated);
    saveReadStatus(updated.filter((item) => !item.unread).map((item) => item.id));
    setNotificationsOpen(false);
    if (n.route) {
      router.push(n.route);
    }
  };

  const topBarRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (topBarRef.current && !topBarRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
        setLangOpen(false);
        setThemeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    if (pathname.includes("/student/skills")) return "My Verified Skills & AI Radar Gaps";
    if (pathname.includes("/student/jobs")) return "Live Pre-Filtered MSME Jobs";
    if (pathname.includes("/student/passport")) return "Digital Skill Passport Verification";
    if (pathname.includes("/student/learning")) return "Focused Learning Hub & LMS";
    if (pathname.includes("/student/ai-mentor")) return "Buddy AI — Trainee Assistant";
    if (pathname.includes("/student/profile")) return "My Profile & AI Resume Parser";
    if (pathname.includes("/student")) return "Student Overview Dashboard";

    if (pathname.includes("/institute/students")) return "Active Student Batch Roster & Live Scores";
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
    if (pathname.includes("/expert/profile")) return "Master Mentor Profile";
    if (pathname.includes("/expert")) return "Master Mentor Hub";

    if (pathname.includes("/employer/post-job")) return "Post MSME Job & AI JD Generator";
    if (pathname.includes("/employer/candidates")) return "JobReady Candidates & AI Match Explainer";
    if (pathname.includes("/employer/hiring")) return "10-Day Kanban Hiring Tracker";
    if (pathname.includes("/employer/analytics")) return "Real-Time Hiring & Time-to-Hire Analytics";
    if (pathname.includes("/employer/settings")) return "Company Profile & Settings";
    if (pathname.includes("/employer")) return "MSME Employer Hiring Portal";

    if (pathname.includes("/admin/analytics")) return "AI Regional Heatmap & District Analytics";
    if (pathname.includes("/admin/institutes")) return "National ITI & Institute Directory";
    if (pathname.includes("/admin/reports")) return "Compliance Reports & AI Summary Generator";
    if (pathname.includes("/admin/settings")) return "National Admin Settings";
    if (pathname.includes("/admin")) return "National Skill Governance Dashboard";

    return "KarmaSetu AI Portal";
  };

  const currentLangObj = languages.find((l) => l.id === language) || languages[0];

  return (
    <header className="h-14 sm:h-16 border-b border-white/10 bg-[#070b16]/90 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between z-30 sticky top-0">
      
      {/* Left: Mobile Hamburger + Title */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Mobile Hamburger */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSidebar?.(); }}
          className="md:hidden w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-xs sm:text-sm md:text-base font-extrabold text-white flex items-center gap-2 min-w-0">
          <span className="truncate max-w-[160px] sm:max-w-none" title={getPageTitle()}>{getPageTitle()}</span>
          <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex-shrink-0">
            {role}
          </span>
        </h1>
      </div>

      {/* Right: Action Bar */}
      <div ref={topBarRef} className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">

        {/* Global Search Bar (desktop only) */}
        <div className="relative hidden lg:block w-52 xl:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students, trades, jobs..."
            className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>



        {/* Language Toggle */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => { setLangOpen(!langOpen); setThemeOpen(false); setNotificationsOpen(false); }}
            className="h-8 sm:h-9 px-2 sm:px-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 flex items-center gap-1.5 transition-all text-xs"
            title="Language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline text-[10px] font-bold">{currentLangObj.flag} {currentLangObj.id.toUpperCase()}</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {langOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl bg-[#090e1e] border border-white/15 shadow-2xl p-1.5 z-50 animate-fade-in">
              {languages.map((l) => (
                <button
                  key={l.id}
                  onClick={() => handleLanguageChange(l.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    language === l.id
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                  {language === l.id && <Check className="w-3 h-3 ml-auto text-cyan-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <div className="relative hidden sm:block" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => { setThemeOpen(!themeOpen); setLangOpen(false); setNotificationsOpen(false); }}
            className="h-8 sm:h-9 px-2 sm:px-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 flex items-center gap-1.5 transition-all"
            title="Theme"
          >
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {themeOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#090e1e] border border-white/15 shadow-2xl p-1.5 z-50 animate-fade-in">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    theme === t.id
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full ${t.color} border border-white/20`} />
                  <span>{t.label}</span>
                  {theme === t.id && <Check className="w-3 h-3 ml-auto text-purple-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => { setNotificationsOpen(!notificationsOpen); setLangOpen(false); setThemeOpen(false); }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 flex items-center justify-center relative transition-all"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <>
                <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
              </>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#090e1e] border border-white/15 shadow-2xl p-3 z-50 animate-fade-in space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> NOTIFICATIONS
                </span>
                {unreadCount > 0 ? (
                  <button
                    onClick={markAllRead}
                    className="text-[10px] text-cyan-400 hover:underline font-bold flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Mark all read
                  </button>
                ) : (
                  <span className="text-[10px] text-slate-500 font-bold">All caught up ✓</span>
                )}
              </div>

              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {notifications.map((n) => {
                  const NIcon = n.icon;
                  return (
                    <div
                      key={n.id}
                      onClick={() => handleNotificationClick(n)}
                      className={`p-2.5 rounded-xl border flex gap-2.5 items-start cursor-pointer transition-all ${
                        n.unread
                          ? "bg-cyan-500/10 border-cyan-500/30 text-white font-semibold"
                          : "bg-white/5 border-white/5 text-slate-300 opacity-70"
                      }`}
                    >
                      <NIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${n.color}`} />
                      <div className="w-full min-w-0">
                        <div className="text-xs font-bold text-white flex justify-between">
                          <span className="truncate">{n.title}</span>
                          <span className="text-[9px] text-slate-400 flex-shrink-0 ml-2">{n.time}</span>
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

      </div>

    </header>
  );
}
