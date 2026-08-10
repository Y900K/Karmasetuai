"use client";

import React, { useState } from "react";
import { User, Award, Save, CheckCircle2, Shield } from "lucide-react";
import AutosaveIndicator from "@/components/dashboard/shared/AutosaveIndicator";
import { useAuth } from "@/lib/auth/context";

export default function ExpertProfilePage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || "Vikram Malhotra");
  const [email, setEmail] = useState(user?.email || "expert@karmasetu.ai");
  const [company, setCompany] = useState("Larsen & Toubro (L&T) Manufacturing Division");
  const [designation, setDesignation] = useState("Chief Shopfloor Engineer & Mentor");
  const [yearsExperience, setYearsExperience] = useState(18);
  const [specializations, setSpecializations] = useState("CNC Machining, Industrial Safety, 5S Workplace Auditing, Fanuc PLC");
  const [saveStatus, setSaveStatus] = useState<"SAVED" | "SAVING" | "ERROR">("SAVED");

  const triggerAutosave = () => {
    setSaveStatus("SAVING");
    setTimeout(() => setSaveStatus("SAVED"), 600);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-purple-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <User className="w-6 h-6 text-purple-400" />
            <span>Master Mentor Profile</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Manage your credentials, industry experience, and CapStone signing authority credentials.
          </p>
        </div>

        <AutosaveIndicator status={saveStatus} />
      </div>

      {/* Profile Form */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Expert Details</h3>

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
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
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
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Current Enterprise / Plant</label>
            <input
              type="text"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Designation</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => {
                setDesignation(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Years of Shopfloor Experience</label>
            <input
              type="number"
              value={yearsExperience}
              onChange={(e) => {
                setYearsExperience(Number(e.target.value));
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Specialization Areas</label>
            <input
              type="text"
              value={specializations}
              onChange={(e) => {
                setSpecializations(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
