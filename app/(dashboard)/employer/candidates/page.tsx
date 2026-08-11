"use client";

import React, { useState } from "react";
import { Users, Sparkles, Award, CheckCircle2, Search, Filter, Calendar, Video, FileText, Send, Eye, X } from "lucide-react";

export default function EmployerCandidatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrade, setSelectedTrade] = useState("ALL");
  const [minScoreFilter, setMinScoreFilter] = useState(70);
  const [selectedCandidateModal, setSelectedCandidateModal] = useState<any | null>(null);

  const [candidateStates, setCandidateStates] = useState<Record<string, { status: string; statusBadge: string }>>({});

  const candidates = [
    {
      id: "cand-1",
      name: "Rajesh Kumar",
      trade: "CNC Machinist & Programmer",
      institute: "Govt ITI Lucknow",
      passportId: "KMP-8A92F1",
      score: 94,
      experienceYears: 1,
      education: "Diploma in CNC Machining (NCVT 2026)",
      matchReason: "Ranked #1: Fanuc Lathe G-Code (96%), Micrometer Calibration ±0.01mm (92%), 5S Safety (94%). All zero-retraining requirements met.",
      skills: ["Fanuc G-Code", "Precision Calibration ±0.01mm", "5S Safety"],
    },
    {
      id: "cand-2",
      name: "Anit Sharma",
      trade: "Industrial Electrician",
      institute: "Govt ITI Kanpur",
      passportId: "KMP-3B41C2",
      score: 91,
      experienceYears: 2,
      education: "ITI Electrical Trade (NCVT 2025)",
      matchReason: "Ranked #2: 3-Phase Control Wiring (94%), Motor Diagnostics (90%), Safety Certified.",
      skills: ["Control Wiring", "Motor Testing", "PLC Basics"],
    },
    {
      id: "cand-3",
      name: "Suman Patel",
      trade: "CNC Machinist & Programmer",
      institute: "Polytechnic Lucknow",
      passportId: "KMP-9C44E1",
      score: 92,
      experienceYears: 0,
      education: "Diploma Mechanical Engineering (2026)",
      matchReason: "Ranked #3: CAD DXF Import (90%), Quality Tolerance Inspection (94%).",
      skills: ["CAD Import", "G-Code", "Tolerance Testing"],
    },
    {
      id: "cand-4",
      name: "Pooja Verma",
      trade: "QA/QC Quality Inspector",
      institute: "VJTI Skill Center Mumbai",
      passportId: "KMP-7D12A4",
      score: 88,
      experienceYears: 1.5,
      education: "Quality Control Technician (NCVT 2025)",
      matchReason: "Ranked #4: Vernier Micrometer ±0.005mm, CMM Machine basics, ISO 9001 Auditing.",
      skills: ["Vernier Micrometer", "CMM Basics", "ISO 9001"],
    }
  ];

  const updateCandidateStatus = (id: string, newStatus: string, label: string) => {
    setCandidateStates((prev) => ({
      ...prev,
      [id]: { status: newStatus, statusBadge: label }
    }));
  };

  const filtered = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.trade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.passportId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrade = selectedTrade === "ALL" || c.trade.includes(selectedTrade);
    const matchesScore = c.score >= minScoreFilter;
    return matchesSearch && matchesTrade && matchesScore;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header & Filter Toolbar */}
      <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-slate-900/90 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-emerald-400" />
              <span>Candidate Pipeline & Evaluation Hub</span>
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Filter top-scoring candidates and select suitable hiring actions (Interview, CapStone Video Request, Offer).
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate name or ID..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <select
              value={selectedTrade}
              onChange={(e) => setSelectedTrade(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="ALL">All Trade Specializations</option>
              <option value="CNC Machinist">CNC Machinist & Programmer</option>
              <option value="Industrial Electrician">Industrial Electrician</option>
              <option value="Quality Inspector">QA/QC Quality Inspector</option>
            </select>
          </div>

          <div>
            <select
              value={minScoreFilter}
              onChange={(e) => setMinScoreFilter(Number(e.target.value))}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-bold text-emerald-400"
            >
              <option value={70}>Min Score: 70+ (JobReady)</option>
              <option value={85}>Min Score: 85+ (High Competency)</option>
              <option value={90}>Min Score: 90+ (Top 5% Talent)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Candidate Cards */}
      <div className="space-y-4">
        {filtered.map((c) => {
          const currentStage = candidateStates[c.id];

          return (
            <div key={c.id} className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90 hover:border-emerald-500/40 transition-all">
              
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{c.name}</h3>
                    <span className="font-mono text-xs text-cyan-300 font-bold">{c.passportId}</span>
                    {currentStage && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold uppercase">
                        {currentStage.statusBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{c.trade} • {c.institute} • {c.experienceYears} Yrs Exp</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedCandidateModal(c)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" /> View Passport & Resume
                  </button>
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black text-sm">
                    {c.score} / 100 Index
                  </span>
                </div>
              </div>

              {/* AI Match Explainer Box */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" /> AI MATCH EXPLAINER
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">{c.matchReason}</p>
              </div>

              {/* Multi-Option Hiring Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {c.skills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-slate-300 text-[10px] font-bold border border-white/10">
                      ✓ {s}
                    </span>
                  ))}
                </div>

                {/* Candidate Options (Not direct offer letter) */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => updateCandidateStatus(c.id, "INTERVIEW", "Interview Scheduled")}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5 text-purple-400" /> Schedule Interview
                  </button>

                  <button
                    onClick={() => updateCandidateStatus(c.id, "VIDEO", "Video Demo Requested")}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    <Video className="w-3.5 h-3.5 text-cyan-400" /> Request Workshop Video
                  </button>

                  <button
                    onClick={() => updateCandidateStatus(c.id, "OFFER", "Offer Letter Sent")}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black text-xs font-extrabold flex items-center gap-1 transition-all shadow-md"
                  >
                    <Send className="w-3.5 h-3.5 text-black" /> Issue Official Offer Letter
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Candidate Resume & Skill Passport Modal */}
      {selectedCandidateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-slate-900 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-white">{selectedCandidateModal.name}</h3>
                <p className="text-xs text-cyan-300 font-mono font-bold">{selectedCandidateModal.passportId} • {selectedCandidateModal.trade}</p>
              </div>
              <button
                onClick={() => setSelectedCandidateModal(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="font-bold text-white block mb-1">Education & Credentials:</span>
                <p>{selectedCandidateModal.education} • {selectedCandidateModal.institute}</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="font-bold text-white block mb-1">Verified Practical Score:</span>
                <span className="text-emerald-400 font-extrabold text-sm">{selectedCandidateModal.score} / 100 JobReady Index™</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-bold text-white block">Top Verified Shopfloor Competencies:</span>
                {selectedCandidateModal.skills.map((sk: string, i: number) => (
                  <p key={i}>• {sk}</p>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedCandidateModal(null)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs"
            >
              Close Profile Inspector
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
