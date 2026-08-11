"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AIDemoWidget from "@/components/AIDemoWidget";
import ProblemSolution from "@/components/ProblemSolution";
import WorkflowDiagram from "@/components/WorkflowDiagram";
import StakeholderGrid from "@/components/StakeholderGrid";
import ImpactStats from "@/components/ImpactStats";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import { Language } from "@/lib/i18n";
import { useAuth } from "@/lib/auth/context";
import { useEcosystem } from "@/lib/context/EcosystemContext";

export default function Home() {
  const router = useRouter();
  const { login } = useAuth();
  const { language, setLanguage, theme, setTheme } = useEcosystem();
  const [authOpen, setAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState("STUDENT");
  const [authMode, setAuthMode] = useState<"login" | "register">("register");

  const handleOpenAuth = (role = "STUDENT", mode: "login" | "register" = "register") => {
    setAuthRole(role);
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const handleLoginSuccess = (userObj: any, userRole: string) => {
    login(userObj, userRole);
    setAuthOpen(false);

    // Route to role-specific dashboard with persistent sidebars
    const roleRoutes: Record<string, string> = {
      STUDENT: "/student",
      INSTITUTE: "/institute",
      INDUSTRY: "/expert",
      EMPLOYER: "/employer",
      HR: "/admin",
      NATIONAL: "/admin",
      SUPER_ADMIN: "/admin",
    };

    const targetRoute = roleRoutes[userRole] || "/student";
    router.push(targetRoute);
  };

  return (
    <main
      className={`min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-cyan-500 selection:text-black transition-colors duration-300 theme-${theme}`}
    >
      {/* PUBLIC LANDING PAGE (ALL ORIGINAL SECTIONS PRESERVED) */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeChange={setTheme}
      />

      {/* Hero Banner with Animated Live Ecosystem Video-like Bridge */}
      <Hero onOpenAuth={handleOpenAuth} language={language} />

      {/* Interactive AI JobReady Index Demo Widget */}
      <AIDemoWidget />

      {/* Problem vs Solution Side-by-Side Comparison */}
      <ProblemSolution onOpenAuth={handleOpenAuth} language={language} />

      {/* 2D Workforce Transformation Ecosystem Map Canvas */}
      <WorkflowDiagram onOpenAuth={handleOpenAuth} language={language} />

      {/* 5-Role Detailed Portal Access Cards */}
      <StakeholderGrid onOpenAuth={handleOpenAuth} language={language} />

      {/* National Impact, 6 Proprietary Pillars, 6 Metrics & National Vision Ribbon */}
      <ImpactStats onOpenAuth={handleOpenAuth} language={language} />

      {/* Modern Footer */}
      <Footer language={language} />

      {/* Multi-Role Authentication Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultRole={authRole}
        defaultMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />
    </main>
  );
}
