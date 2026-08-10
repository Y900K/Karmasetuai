"use client";

import React, { useState } from "react";
import { Settings, Landmark, Save, Check } from "lucide-react";
import AutosaveIndicator from "@/components/dashboard/shared/AutosaveIndicator";

export default function InstituteSettingsPage() {
  const [officialName, setOfficialName] = useState("Government ITI Lucknow Main Campus");
  const [ncvtCode, setNcvtCode] = useState("ITI-UP-20419");
  const [category, setCategory] = useState("Government ITI");
  const [state, setState] = useState("Uttar Pradesh");
  const [district, setDistrict] = useState("Lucknow");
  const [directorName, setDirectorName] = useState("Dr. R. K. Srivastava");
  const [status, setStatus] = useState<"SAVED" | "SAVING" | "ERROR">("SAVED");

  const triggerAutosave = () => {
    setStatus("SAVING");
    setTimeout(() => setStatus("SAVED"), 600);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-blue-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-400" />
            <span>Institute Profile & NCVT Accreditation Settings</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Update institutional credentials, director contact details, and NCVT/SCVT accreditation codes.
          </p>
        </div>

        <AutosaveIndicator status={status} />
      </div>

      {/* Form */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Institutional Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Official Institute Name</label>
            <input
              type="text"
              value={officialName}
              onChange={(e) => {
                setOfficialName(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">NCVT / SCVT Accreditation Code</label>
            <input
              type="text"
              value={ncvtCode}
              onChange={(e) => {
                setNcvtCode(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400 font-mono text-blue-300 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Director / Principal Name</label>
            <input
              type="text"
              value={directorName}
              onChange={(e) => {
                setDirectorName(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
            >
              <option value="Government ITI">Government ITI</option>
              <option value="Private ITI">Private ITI</option>
              <option value="Polytechnic College">Polytechnic College</option>
              <option value="Industry Skill Center">Industry Skill Center</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">District</label>
            <input
              type="text"
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
