"use client";

import React, { useState } from "react";
import { Cpu, UserCheck, ShieldCheck, ChevronRight } from "lucide-react";

interface NavbarProps {
  onOpenAuth: (role?: string) => void;
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
                <Cpu className="w-6 h-6 text-blue-400 group-hover:text-emerald-400 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                KarmaSetu <span className="gradient-text font-black">AI</span>
              </span>
              <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase">
                Employability Intelligence
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#demo" className="hover:text-blue-400 transition-colors">AI Demo</a>
            <a href="#problem" className="hover:text-blue-400 transition-colors">Problem & Solution</a>
            <a href="#workflow" className="hover:text-blue-400 transition-colors">How It Works</a>
            <a href="#stakeholders" className="hover:text-blue-400 transition-colors">Stakeholders</a>
            <a href="#impact" className="hover:text-blue-400 transition-colors">National Impact</a>
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onOpenAuth("STUDENT")}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white btn-secondary-glass rounded-lg"
            >
              Sign In
            </button>
            <button
              onClick={() => onOpenAuth("STUDENT")}
              className="px-5 py-2.5 text-xs font-bold text-white btn-primary-glow rounded-xl flex items-center gap-2"
            >
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0b0f19]/95 border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
          <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-300">AI Demo</a>
          <a href="#problem" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-300">Problem & Solution</a>
          <a href="#workflow" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-300">How It Works</a>
          <a href="#stakeholders" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-300">Stakeholders</a>
          <a href="#impact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-300">National Impact</a>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAuth("STUDENT"); }}
              className="w-full py-2.5 text-xs font-bold text-white btn-primary-glow rounded-xl text-center"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
