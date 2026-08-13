"use client";

import React, { useState } from "react";
import { Settings, ShieldCheck, Save, Cpu, Key, Lock, Sparkles, CheckCircle2, Server, Database } from "lucide-react";
import AutosaveIndicator from "@/components/dashboard/shared/AutosaveIndicator";

export default function AdminSettingsPage() {
  const [governanceBody, setGovernanceBody] = useState("Ministry of Skill Development & Entrepreneurship (MSDE)");
  const [platformName, setPlatformName] = useState("KarmaSetu AI National Public Infrastructure");
  const [rateLimitMax, setRateLimitMax] = useState("20");
  const [rateLimitWindow, setRateLimitWindow] = useState("60");
  const [aiModel, setAiModel] = useState("gemini-2.5-pro");
  const [aiTemperature, setAiTemperature] = useState("0.2");
  const [technicalWeight, setTechnicalWeight] = useState("40");
  const [practicalWeight, setPracticalWeight] = useState("40");
  const [softSkillsWeight, setSoftSkillsWeight] = useState("20");
  const [publicVerifierEnabled, setPublicVerifierEnabled] = useState(true);
  const [cryptoHashingEnabled, setCryptoHashingEnabled] = useState(true);
  const [status, setStatus] = useState<"SAVED" | "SAVING" | "ERROR">("SAVED");

  const triggerAutosave = () => {
    setStatus("SAVING");
    setTimeout(() => setStatus("SAVED"), 600);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner */}
      <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-amber-400" />
              <span>HR & System Admin Governance Settings</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase">
              System Admin Controls
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Configure system-wide MSDE compliance parameters, API rate limiting, AI model defaults, and public certificate verifiers.
          </p>
        </div>

        <AutosaveIndicator status={status} />
      </div>

      {/* 1. National Identity & Authority */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" /> Platform & Governing Authority Identity
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Governing Authority</label>
            <input
              type="text"
              value={governanceBody}
              onChange={(e) => {
                setGovernanceBody(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Platform Identity Title</label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => {
                setPlatformName(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {/* 2. Security & API Protection */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4 text-cyan-400" /> API Security & Rate-Limiting Controls
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Max Requests / Window</label>
            <input
              type="number"
              value={rateLimitMax}
              onChange={(e) => {
                setRateLimitMax(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Window Duration (Seconds)</label>
            <input
              type="number"
              value={rateLimitWindow}
              onChange={(e) => {
                setRateLimitWindow(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Public Verifier Route (/verify/[code])</label>
            <button
              onClick={() => {
                setPublicVerifierEnabled(!publicVerifierEnabled);
                triggerAutosave();
              }}
              className={`w-full py-2.5 rounded-xl border text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
                publicVerifierEnabled
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-red-500/20 text-red-300 border-red-500/40"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{publicVerifierEnabled ? "PUBLIC VERIFIER ACTIVE" : "DISABLED"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. AI & JobReady Index Calibration */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Cpu className="w-4 h-4 text-purple-400" /> AI Workforce Intelligence & JobReady Index™ Algorithm
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Primary LLM Model Engine</label>
            <select
              value={aiModel}
              onChange={(e) => {
                setAiModel(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            >
              <option value="gemini-2.5-pro">Google Gemini 2.5 Pro (Recommended)</option>
              <option value="nvidia-llama-3.3">NVIDIA Llama-3.3 70B Instruct</option>
              <option value="gemini-2.5-flash">Google Gemini 2.5 Flash (Fast)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">AI Audit Temperature (0.0 - 1.0)</label>
            <input
              type="text"
              value={aiTemperature}
              onChange={(e) => {
                setAiTemperature(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">SHA-256 Cryptographic Hashing</label>
            <button
              onClick={() => {
                setCryptoHashingEnabled(!cryptoHashingEnabled);
                triggerAutosave();
              }}
              className={`w-full py-2.5 rounded-xl border text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
                cryptoHashingEnabled
                  ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                  : "bg-slate-800 text-slate-400 border-white/10"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{cryptoHashingEnabled ? "SHA-256 DIGEST ENFORCED" : "STANDARD HASH"}</span>
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="text-xs font-bold text-slate-300 uppercase">JobReady Index™ Weighting Formula</div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] block uppercase">Technical Exam %</span>
              <input
                type="number"
                value={technicalWeight}
                onChange={(e) => { setTechnicalWeight(e.target.value); triggerAutosave(); }}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
              />
            </div>

            <div>
              <span className="text-slate-400 text-[10px] block uppercase">Practical Shopfloor %</span>
              <input
                type="number"
                value={practicalWeight}
                onChange={(e) => { setPracticalWeight(e.target.value); triggerAutosave(); }}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
              />
            </div>

            <div>
              <span className="text-slate-400 text-[10px] block uppercase">Soft Skills & Safety %</span>
              <input
                type="number"
                value={softSkillsWeight}
                onChange={(e) => { setSoftSkillsWeight(e.target.value); triggerAutosave(); }}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
