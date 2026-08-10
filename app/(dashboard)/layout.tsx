"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { AuthProvider, useAuth } from "@/lib/auth/context";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { role, isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Determine current active role based on path or fallback to auth role
  let currentRole = role || "STUDENT";
  if (pathname.startsWith("/student")) currentRole = "STUDENT";
  else if (pathname.startsWith("/institute")) currentRole = "INSTITUTE";
  else if (pathname.startsWith("/expert")) currentRole = "INDUSTRY";
  else if (pathname.startsWith("/employer")) currentRole = "EMPLOYER";
  else if (pathname.startsWith("/admin")) currentRole = "NATIONAL";

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 flex font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar currentRole={currentRole} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <TopBar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto">
          {children}
        </main>
      </div>
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
