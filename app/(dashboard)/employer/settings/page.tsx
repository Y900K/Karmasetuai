"use client";

import React, { useState } from "react";
import { Settings, Building, Save } from "lucide-react";
import AutosaveIndicator from "@/components/dashboard/shared/AutosaveIndicator";

export default function EmployerSettingsPage() {
  const [companyName, setCompanyName] = useState("Tata Motors Manufacturing Plant");
  const [sector, setSector] = useState("Automotive & Heavy Engineering");
  const [location, setLocation] = useState("Noida Sector 63, Uttar Pradesh");
  const [status, setStatus] = useState<"SAVED" | "SAVING" | "ERROR">("SAVED");

  const triggerAutosave = () => {
    setStatus("SAVING");
    setTimeout(() => setStatus("SAVED"), 600);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-emerald-400" />
            <span>Company Profile & Hiring Preferences</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Manage factory location, industrial sector, and HR contact information.
          </p>
        </div>

        <AutosaveIndicator status={status} />
      </div>

      {/* Form */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Company Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Company / Plant Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Industry Sector</label>
            <input
              type="text"
              value={sector}
              onChange={(e) => {
                setSector(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Factory Location & Address</label>
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
