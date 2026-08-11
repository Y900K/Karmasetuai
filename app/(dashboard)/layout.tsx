"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import AnalyticsSmartSidebar from "@/components/dashboard/shared/AnalyticsSmartSidebar";
import { AuthProvider, useAuth } from "@/lib/auth/context";
import { EcosystemProvider, useEcosystem } from "@/lib/context/EcosystemContext";
import FloatingBuddyAI from "@/components/dashboard/shared/FloatingBuddyAI";
import { BarChart3 } from "lucide-react";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  const { theme } = useEcosystem();
  const pathname = usePathname();
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Determine current active role based on path or fallback to auth role
  let currentRole = role || "STUDENT";
  if (pathname.startsWith("/student")) currentRole = "STUDENT";
  else if (pathname.startsWith("/institute")) currentRole = "INSTITUTE";
  else if (pathname.startsWith("/expert")) currentRole = "INDUSTRY";
  else if (pathname.startsWith("/employer")) currentRole = "EMPLOYER";
  else if (pathname.startsWith("/admin")) currentRole = "NATIONAL";

  // Auto-close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div
      id="dashboard-root"
      className={`min-h-screen bg-[var(--bg-primary)] text-slate-100 flex font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden relative transition-colors duration-300 theme-${theme}`}
    >
      {/* Desktop Sidebar — always visible on md+ */}
      <div className="hidden md:block">
        <Sidebar currentRole={currentRole} />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <div className="relative z-50 animate-slide-in-left">
            <Sidebar
              currentRole={currentRole}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto relative">
          {children}
        </main>
      </div>

      {/* Floating Real-Time Analytics Sidebar Toggle Button */}
      <button
        onClick={() => setAnalyticsOpen(!analyticsOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 p-3 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs shadow-2xl shadow-cyan-500/40 flex items-center gap-2 hover:scale-105 transition-all"
      >
        <BarChart3 className="w-4 h-4 text-black animate-pulse" />
        <span className="hidden sm:inline">Real-Time AI Analytics</span>
      </button>

      {/* Real-Time Analytics Drawer */}
      <AnalyticsSmartSidebar
        isOpen={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
      />

      {/* Floating Buddy AI Assistant Widget */}
      <FloatingBuddyAI />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <EcosystemProvider>
        <DashboardContent>{children}</DashboardContent>
      </EcosystemProvider>
    </AuthProvider>
  );
}
