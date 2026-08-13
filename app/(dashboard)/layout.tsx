"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import AnalyticsSmartSidebar from "@/components/dashboard/shared/AnalyticsSmartSidebar";
import { useAuth } from "@/lib/auth/context";
import { useEcosystem } from "@/lib/context/EcosystemContext";
import FloatingBuddyAI from "@/components/dashboard/shared/FloatingBuddyAI";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { role, isAuthenticated, isLoading } = useAuth();
  const { theme } = useEcosystem();
  const pathname = usePathname();
  const router = useRouter();
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth guard — redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
      if (!isDemoMode) {
        router.push("/?auth=required");
      }
    }
  }, [isLoading, isAuthenticated, router]);

  // Determine current active role based on path or fallback to auth role
  let currentRole = role || "STUDENT";
  if (role === "HR") {
    currentRole = "HR";
  } else if (pathname.startsWith("/student")) {
    currentRole = "STUDENT";
  } else if (pathname.startsWith("/institute")) {
    currentRole = "INSTITUTE";
  } else if (pathname.startsWith("/expert")) {
    currentRole = "INDUSTRY";
  } else if (pathname.startsWith("/employer")) {
    currentRole = "EMPLOYER";
  } else if (pathname.startsWith("/admin")) {
    currentRole = "NATIONAL";
  }

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
        <TopBar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onToggleAnalytics={() => setAnalyticsOpen(!analyticsOpen)}
        />
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 pt-5 sm:pt-6 pb-20 space-y-4 sm:space-y-6 overflow-y-auto relative">
          {children}
        </main>
      </div>

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
