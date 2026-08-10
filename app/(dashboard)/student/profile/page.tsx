"use client";

import React, { useState } from "react";
import { User, Upload, Sparkles, Save, RefreshCw, CheckCircle2, FileText, AlertCircle, Eye, GraduationCap, Briefcase, Award, Globe, X } from "lucide-react";
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

  // Expanded Candidate Profile Fields
  const [educationLevel, setEducationLevel] = useState("ITI National Trade Certificate (NTC)");
  const [educationBoard, setEducationBoard] = useState("NCVT / DGT India");
  const [marksPercentage, setMarksPercentage] = useState("88.5%");
  const [experienceCompany, setExperienceCompany] = useState("Tata Motors Ancillary Workshop (Noida)");
  const [experienceRole, setExperienceRole] = useState("Trainee Machinist & G-Code Operator");
  const [experienceMonths, setExperienceMonths] = useState("12 Months");
  const [certifications, setCertifications] = useState("NCVT NTC Certificate, Fanuc Lathe Level-2, 5S Safety License");
  const [languages, setLanguages] = useState("Hindi (Fluent), English (Working)");

  const [resumeText, setResumeText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [parsing, setParsing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"SAVED" | "SAVING" | "ERROR">("SAVED");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

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
            Update personal info, education, shopfloor experience, and upload resume (PDF / Word up to 3MB).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AutosaveIndicator status={saveStatus} />
          <button
            onClick={() => setPreviewModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
          >
            <Eye className="w-4 h-4 text-black" />
            <span>Preview Candidate Card</span>
          </button>
        </div>
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

      {/* Basic Profile Form */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" /> Basic Contact Information
        </h3>

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
        </div>
      </div>

      {/* Education & Academic Qualifications */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-purple-400" /> Education & Academic Credentials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Highest Qualification / Degree</label>
            <input
              type="text"
              value={educationLevel}
              onChange={(e) => {
                setEducationLevel(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Board / University / Council</label>
            <input
              type="text"
              value={educationBoard}
              onChange={(e) => {
                setEducationBoard(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
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
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Passing Year & Score %</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={passingYear}
                onChange={(e) => {
                  setPassingYear(Number(e.target.value));
                  triggerAutosave();
                }}
                className="w-1/2 bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
              />
              <input
                type="text"
                value={marksPercentage}
                onChange={(e) => {
                  setMarksPercentage(e.target.value);
                  triggerAutosave();
                }}
                placeholder="e.g. 88.5%"
                className="w-1/2 bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Apprenticeship & Work Experience */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-emerald-400" /> Apprenticeship & Practical Experience
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Company / Workshop Name</label>
            <input
              type="text"
              value={experienceCompany}
              onChange={(e) => {
                setExperienceCompany(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Role / Trade Position</label>
            <input
              type="text"
              value={experienceRole}
              onChange={(e) => {
                setExperienceRole(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Duration</label>
            <input
              type="text"
              value={experienceMonths}
              onChange={(e) => {
                setExperienceMonths(e.target.value);
                triggerAutosave();
              }}
              placeholder="e.g. 12 Months"
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Certifications & Licenses</label>
            <input
              type="text"
              value={certifications}
              onChange={(e) => {
                setCertifications(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
      </div>

      {/* Candidate Resume Preview Modal */}
      {previewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-slate-900 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-black text-white">{fullName}</h3>
                <p className="text-xs text-cyan-300 font-mono font-bold">{trade} • {institute}</p>
              </div>
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-bold text-white block">Academic Education:</span>
                <p>{educationLevel} ({educationBoard}) — {marksPercentage} ({passingYear})</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-bold text-white block">Apprenticeship & Experience:</span>
                <p>{experienceRole} at {experienceCompany} ({experienceMonths})</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-bold text-white block">Certifications & Licenses:</span>
                <p>{certifications}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold flex justify-between items-center">
                <span>KarmaSetu Skill Passport Credential ID:</span>
                <span className="font-mono text-sm">CRT-8A92F1 (Score: 94%)</span>
              </div>
            </div>

            <button
              onClick={() => setPreviewModalOpen(false)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs"
            >
              Close Candidate Resume Inspector
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
