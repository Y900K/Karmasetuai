"use client";

import React, { useState } from "react";
import { Settings, Shield, Save } from "lucide-react";
import AutosaveIndicator from "@/components/dashboard/shared/AutosaveIndicator";

export default function AdminSettingsPage() {
  const [governanceBody, setGovernanceBody] = useState("Ministry of Skill Development & Entrepreneurship (MSDE)");
  const [platformName, setPlatformName] = useState("KarmaSetu AI National Public Infrastructure");
  const [status, setStatus] = useState<"SAVED" | "SAVING" | "ERROR">("SAVED");

  const triggerAutosave = () => {
    setStatus("SAVING");
    setTimeout(() => setStatus("SAVED"), 600);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-amber-400" />
            <span>National Platform Governance Settings</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Configure system-wide MSDE compliance parameters, postgREST exposure, and AI model defaults.
          </p>
        </div>

        <AutosaveIndicator status={status} />
      </div>

      {/* Form */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">System Settings</h3>

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
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Platform Identity</label>
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

    </div>
  );
}
