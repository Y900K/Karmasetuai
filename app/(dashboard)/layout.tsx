"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import AnalyticsSmartSidebar from "@/components/dashboard/shared/AnalyticsSmartSidebar";
import { AuthProvider, useAuth } from "@/lib/auth/context";
import { BarChart3 } from "lucide-react";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  // Determine current active role based on path or fallback to auth role
  let currentRole = role || "STUDENT";
  if (pathname.startsWith("/student")) currentRole = "STUDENT";
  else if (pathname.startsWith("/institute")) currentRole = "INSTITUTE";
  else if (pathname.startsWith("/expert")) currentRole = "INDUSTRY";
  else if (pathname.startsWith("/employer")) currentRole = "EMPLOYER";
  else if (pathname.startsWith("/admin")) currentRole = "NATIONAL";

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 flex font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden relative">
      {/* Persistent Left Sidebar */}
      <Sidebar currentRole={currentRole} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <TopBar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto relative">
          {children}
        </main>
      </div>

      {/* Floating Real-Time Analytics Sidebar Toggle Button */}
      <button
        onClick={() => setAnalyticsOpen(!analyticsOpen)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs shadow-2xl shadow-cyan-500/40 flex items-center gap-2 hover:scale-105 transition-all"
      >
        <BarChart3 className="w-4 h-4 text-black animate-pulse" />
        <span>Real-Time AI Analytics</span>
      </button>

      {/* Real-Time Analytics Drawer */}
      <AnalyticsSmartSidebar
        isOpen={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
      />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardContent>{children}</DashboardContent>
    </AuthProvider>
  );
}
