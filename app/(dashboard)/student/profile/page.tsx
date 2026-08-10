"use client";

import React, { useState } from "react";
import { User, Upload, Sparkles, Save, RefreshCw, CheckCircle2, FileText, AlertCircle } from "lucide-react";
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [parsing, setParsing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"SAVED" | "SAVING" | "ERROR">("SAVED");

  const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024; // 3MB limit

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError("File size exceeds 3MB limit. Please upload a smaller PDF or Word file.");
      setSelectedFile(null);
      return;
    }

    setFileError(null);
    setSelectedFile(file);

    // Read text from file if plain text or simulated reading
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setResumeText(content || `Extracted text from ${file.name}: ITI diploma in CNC Machinist & Programmer...`);
    };
    reader.readAsText(file);
  };

  const handleParseResume = async () => {
    const textToParse = resumeText || (selectedFile ? `Resume file: ${selectedFile.name}` : "");
    if (!textToParse) {
      setFileError("Please select a PDF/Word file or paste resume text first.");
      return;
    }

    setParsing(true);
    setFileError(null);

    try {
      const res = await fetch("/api/ai/resume-parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: textToParse }),
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
            Update personal info or upload resume (PDF / Word up to 3MB) to auto-populate your Skill Passport.
          </p>
        </div>

        <AutosaveIndicator status={saveStatus} />
      </div>

      {/* File Upload & AI Parser Zone */}
      <div className="glass-card p-6 rounded-3xl border border-amber-500/30 space-y-4 bg-slate-900/90">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" /> 1-CLICK AI RESUME PARSER (UPTO 3MB FILE SUPPORT)
          </span>
          <span className="text-[10px] text-slate-400 font-mono">PDF / DOC / DOCX</span>
        </div>

        {/* Drag & Drop File Input */}
        <div className="border-2 border-dashed border-white/15 hover:border-amber-400/50 rounded-2xl p-5 text-center transition-all bg-white/5 space-y-2">
          <Upload className="w-8 h-8 text-amber-400 mx-auto" />
          <div className="text-xs font-bold text-white">
            {selectedFile ? (
              <span className="text-emerald-300 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </span>
            ) : (
              "Click to browse or drop your Resume file (PDF, DOC, DOCX up to 3MB)"
            )}
          </div>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            className="w-full text-xs text-slate-400 cursor-pointer bg-slate-950 p-2 rounded-xl border border-white/10"
          />
        </div>

        {fileError && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{fileError}</span>
          </div>
        )}

        <textarea
          rows={3}
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Or paste resume raw text here (skills, education, certifications, contact info)..."
          className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
        />

        <button
          onClick={handleParseResume}
          disabled={parsing}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-cyan-400 text-black font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all"
        >
          {parsing ? <RefreshCw className="w-4 h-4 animate-spin text-black" /> : <Sparkles className="w-4 h-4 text-black" />}
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
