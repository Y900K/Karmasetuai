"use client";

import React, { useState } from "react";
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

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState("STUDENT");
  const [language, setLanguage] = useState<Language>("hinglish");
  const [theme, setTheme] = useState("cyberpunk");

  const handleOpenAuth = (role = "STUDENT") => {
    setAuthRole(role);
    setAuthOpen(true);
  };

  return (
    <main
      className={`min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-black transition-colors ${
        theme === "electric"
          ? "bg-[#050e24]"
          : theme === "contrast"
          ? "bg-[#000000]"
          : "bg-[#070b14]"
      }`}
    >
      {/* Navbar with Language & Theme Selectors (No Supabase Floating Badge) */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeChange={setTheme}
      />

      {/* Hero Banner with Dynamic Language Translation */}
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
      <Footer />

      {/* Multi-Role Authentication Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultRole={authRole}
      />
    </main>
  );
}
