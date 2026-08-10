"use client";

import React, { useState } from "react";
import { User, Upload, Sparkles, Save, RefreshCw, CheckCircle2 } from "lucide-react";
import AutosaveIndicator from "@/components/dashboard/shared/AutosaveIndicator";
import { useAuth } from "@/lib/auth/context";

export default function StudentProfilePage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || "Rajesh Kumar");
  const [email, setEmail] = useState(user?.email || "student@karmasetu.ai");
  const [phone, setPhone] = useState("9876543210");
  const [trade, setTrade] = useState("CNC Machinist & Programmer");
  const [institute, setInstitute] = useState("Government ITI Lucknow");
  const [passingYear, setPassingYear] = useState(2026);
  const [resumeText, setResumeText] = useState("");
  const [parsing, setParsing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"SAVED" | "SAVING" | "ERROR">("SAVED");

  const handleParseResume = async () => {
    if (!resumeText) {
      alert("Please paste resume text first to run AI Resume Parser.");
      return;
    }
    setParsing(true);
    try {
      const res = await fetch("/api/ai/resume-parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        if (data.data.fullName) setFullName(data.data.fullName);
        if (data.data.email) setEmail(data.data.email);
        if (data.data.phone) setPhone(data.data.phone);
        if (data.data.trade) setTrade(data.data.trade);
        if (data.data.instituteName) setInstitute(data.data.instituteName);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setParsing(false);
      triggerAutosave();
    }
  };

  const triggerAutosave = () => {
    setSaveStatus("SAVING");
    setTimeout(() => setSaveStatus("SAVED"), 600);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-cyan-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <User className="w-6 h-6 text-cyan-400" />
            <span>My Profile & AI Resume Parser</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Update personal info or upload resume text to auto-populate your Skill Passport profile.
          </p>
        </div>

        <AutosaveIndicator status={saveStatus} />
      </div>

      {/* AI Resume Parser Zone */}
      <div className="glass-card p-6 rounded-3xl border border-amber-500/30 space-y-3 bg-slate-900/90">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" /> 1-CLICK AI RESUME PARSER (NVIDIA NIM)
          </span>
          <span className="text-[10px] text-slate-400 font-mono">PDF / Raw Text Parser</span>
        </div>

        <textarea
          rows={3}
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume text here (skills, education, certifications, contact info)..."
          className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
        />

        <button
          onClick={handleParseResume}
          disabled={parsing}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-cyan-400 text-black font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
        >
          {parsing ? <RefreshCw className="w-4 h-4 animate-spin text-black" /> : <Upload className="w-4 h-4 text-black" />}
          <span>{parsing ? "Parsing Resume..." : "Run AI Resume Auto-Extraction"}</span>
        </button>
      </div>

      {/* Profile Form */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Profile Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Mobile Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Trade Specialization</label>
            <input
              type="text"
              value={trade}
              onChange={(e) => {
                setTrade(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Institute Name</label>
            <input
              type="text"
              value={institute}
              onChange={(e) => {
                setInstitute(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Passing Year</label>
            <input
              type="number"
              value={passingYear}
              onChange={(e) => {
                setPassingYear(Number(e.target.value));
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
