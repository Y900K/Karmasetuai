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
import RoleDashboard from "@/components/RoleDashboard";
import { Language } from "@/lib/i18n";

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState("STUDENT");
  const [language, setLanguage] = useState<Language>("hinglish");
  const [theme, setTheme] = useState("cyberpunk");

  // Logged In State
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [activeRole, setActiveRole] = useState<string>("STUDENT");

  const handleOpenAuth = (role = "STUDENT") => {
    setAuthRole(role);
    setAuthOpen(true);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const handleSwitchRole = (newRole: string) => {
    setActiveRole(newRole);
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
      {loggedInUser ? (
        /* LOGGED-IN ROLE DASHBOARD PORTAL */
        <RoleDashboard
          user={loggedInUser}
          role={activeRole}
          onLogout={handleLogout}
          onSwitchRole={handleSwitchRole}
        />
      ) : (
        /* PUBLIC LANDING PAGE (ALL ORIGINAL SECTIONS PRESERVED) */
        <>
          {/* Navbar with Language & Theme Selectors */}
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
          <Footer />

          {/* Multi-Role Authentication Modal with Login Portal Redirection */}
          <AuthModal
            isOpen={authOpen}
            onClose={() => setAuthOpen(false)}
            defaultRole={authRole}
            onLoginSuccess={(userObj, userRole) => {
              setLoggedInUser(userObj);
              setActiveRole(userRole || "STUDENT");
              setAuthOpen(false);
            }}
          />
        </>
      )}
    </main>
  );
}
