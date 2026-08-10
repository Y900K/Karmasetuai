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

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState("STUDENT");

  const handleOpenAuth = (role = "STUDENT") => {
    setAuthRole(role);
    setAuthOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Global Glass Navbar */}
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* Hero Banner with Live Ticker */}
      <Hero onOpenAuth={handleOpenAuth} />

      {/* Interactive AI JobReady Index Demo Widget */}
      <AIDemoWidget />

      {/* Problem vs Solution Side-by-Side Comparison */}
      <ProblemSolution />

      {/* Closed-Loop 6-Step Learner Journey */}
      <WorkflowDiagram />

      {/* 4-Stakeholder Tabbed Value Grid */}
      <StakeholderGrid onOpenAuth={handleOpenAuth} />

      {/* National Impact & UN SDGs */}
      <ImpactStats />

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
