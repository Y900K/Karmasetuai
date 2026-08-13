"use client";

import React, { useState } from "react";
import { Cpu, Globe, Palette, LogIn, ChevronRight, Menu, X } from "lucide-react";
import { Language } from "@/lib/i18n";

interface NavbarProps {
  onOpenAuth: (role?: string, mode?: "login" | "register") => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: string;
  onThemeChange: (theme: string) => void;
}

export default function Navbar({
  onOpenAuth,
  language,
  onLanguageChange,
  theme,
  onThemeChange,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
                <Cpu className="w-6 h-6 text-cyan-400 group-hover:text-emerald-400 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">
                  Karma <span className="text-cyan-400">Setu</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-black bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded uppercase">
                  AI
                </span>
              </div>
              <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase">
                Employability Intelligence Platform
              </span>
            </div>
          </a>

          {/* Desktop Navigation Controls */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* Language Selector Dropdown */}
            <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-semibold text-slate-300 hover:border-cyan-500/40 transition-colors">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent text-white font-bold cursor-pointer focus:outline-none pr-1"
              >
                <option value="en" className="bg-slate-900 text-white">EN ENGLISH</option>
                <option value="hinglish" className="bg-slate-900 text-white">IN HINGLISH</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-semibold text-slate-300 hover:border-cyan-500/40 transition-colors">
              <Palette className="w-3.5 h-3.5 text-emerald-400" />
              <select
                value={theme}
                onChange={(e) => onThemeChange(e.target.value)}
                className="bg-transparent text-white font-bold cursor-pointer focus:outline-none pr-1"
              >
                <option value="cyberpunk" className="bg-slate-900 text-white">Cyberpunk Dark</option>
                <option value="electric" className="bg-slate-900 text-white">Electric Blue</option>
                <option value="contrast" className="bg-slate-900 text-white">High Contrast</option>
              </select>
            </div>

            {/* Auth Action Buttons */}
            <button
              onClick={() => onOpenAuth("STUDENT", "login")}
              className="px-4 py-2 text-xs font-bold text-slate-200 bg-white/5 border border-white/10 hover:border-white/30 rounded-xl transition-all flex items-center gap-1.5 hover:bg-white/10"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>

            <button
              onClick={() => onOpenAuth("STUDENT", "register")}
              className="px-5 py-2.5 text-xs font-extrabold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-1.5 hover:scale-105"
            >
              <span>Register</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070b14]/95 border-b border-white/10 px-4 pt-3 pb-6 space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Select Language:</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { onLanguageChange("en"); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border ${language === "en" ? "bg-cyan-500/20 border-cyan-400 text-cyan-300" : "bg-white/5 border-white/10 text-slate-300"}`}
              >
                ENGLISH
              </button>
              <button
                onClick={() => { onLanguageChange("hinglish"); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border ${language === "hinglish" ? "bg-cyan-500/20 border-cyan-400 text-cyan-300" : "bg-white/5 border-white/10 text-slate-300"}`}
              >
                HINGLISH
              </button>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAuth("STUDENT", "login"); }}
              className="w-full py-3 text-xs font-bold text-white bg-slate-900/90 border border-white/15 rounded-xl text-center flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-cyan-400" />
              <span>Login to Portal</span>
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAuth("STUDENT", "register"); }}
              className="w-full py-3 text-xs font-extrabold text-black bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl text-center flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/25"
            >
              <span>Create New Account (Register)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
