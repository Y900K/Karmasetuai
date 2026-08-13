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
import { useAuth } from "@/lib/auth/context";
import { useEcosystem } from "@/lib/context/EcosystemContext";
import { getRouteForRole } from "@/lib/constants";

export default function Home() {
  const router = useRouter();
  const { login } = useAuth();
  const { language, setLanguage, theme, setTheme } = useEcosystem();
  const [authOpen, setAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState("STUDENT");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleOpenAuth = (role = "STUDENT", mode: "login" | "register" = "login") => {
    setAuthRole(role);
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const handleLoginSuccess = async (userObj: { id: string; email: string; full_name: string }, userRole: string, session?: { access_token: string; refresh_token: string } | null) => {
    await login({ ...userObj, role: userRole }, userRole, session);
    setAuthOpen(false);

    // Route to role-specific dashboard using canonical route map
    const targetRoute = getRouteForRole(userRole);
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
