"use client";

import React, { useEffect, useState, Suspense } from "react";
import {
  Briefcase, Building, MapPin, Sparkles, CheckCircle2, Clock, ShieldCheck,
  DollarSign, Zap, HelpCircle, X, Send, Award
} from "lucide-react";
import FilterBar from "@/components/shared/FilterBar";
import { useFilterSort } from "@/lib/hooks/useFilterSort";
import { useEcosystemStore } from "@/lib/store/EcosystemStore";

interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  required_trade: string;
  salary_range: string;
  min_job_ready_score?: number;
  shift_type?: string;
  hiring_urgency?: string;
  perks?: string[];
  screening_questions?: string[];
  ai_generated_description?: string;
}

function StudentJobsContent() {
  const { filters, updateFilters, clearFilters } = useFilterSort("title");
  const { students } = useEcosystemStore();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  // Application Modal state
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  const [screeningAnswers, setScreeningAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());

  const loadJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/jobs");
      const json = await res.json();
      if (res.ok && json.data) {
        setJobs(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const filtered = jobs.filter((j) => {
    const matchSearch =
      !filters.search ||
      j.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      j.company_name.toLowerCase().includes(filters.search.toLowerCase()) ||
      j.required_trade.toLowerCase().includes(filters.search.toLowerCase()) ||
      j.location.toLowerCase().includes(filters.search.toLowerCase());
    return matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginatedJobs = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleOpenApplyModal = (job: Job) => {
    setSelectedJobForApply(job);
    const initialAnswers: Record<string, string> = {};
    if (job.screening_questions) {
      job.screening_questions.forEach((q) => {
        initialAnswers[q] = "";
      });
    }
    setScreeningAnswers(initialAnswers);
  };

  const handleAnswerChange = (question: string, val: string) => {
    setScreeningAnswers((prev) => ({ ...prev, [question]: val }));
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForApply) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: selectedJobForApply.id,
          screeningAnswers,
          matchScore: students[0]?.jobReadyIndex || 88.5
        })
      });

      if (res.ok) {
        setAppliedJobIds((prev) => new Set(prev).add(selectedJobForApply.id));
        setStatusMessage(`Successfully applied to ${selectedJobForApply.title}!`);
        setTimeout(() => setStatusMessage(""), 4000);
        setSelectedJobForApply(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in printable-area">
      
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-3xl border border-cyan-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-cyan-400" />
              <span>Live MSME Job Matches & AI Skill Alignment</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold uppercase">
              1-Click Skill Passport Apply
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Browse verified industrial technician & apprentice hiring vacancies across Tier-1 & Tier-2 manufacturing clusters.
          </p>
        </div>

        {statusMessage && (
          <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold flex items-center gap-2 animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}
      </div>

      {/* FilterBar */}
      <FilterBar
        filters={filters}
        onUpdate={updateFilters}
        onClear={clearFilters}
        placeholder="Filter jobs by title, company, trade, or location..."
      />

      {/* Jobs Grid */}
      {loading ? (
        <div className="p-8 text-center text-slate-400 animate-pulse text-xs">Loading live job matches...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedJobs.map((job) => {
            const hasApplied = appliedJobIds.has(job.id);
            const userScore = students[0]?.jobReadyIndex || 88.5;
            const isEligible = userScore >= (job.min_job_ready_score || 75);

            return (
              <div
                key={job.id}
                className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-base font-bold text-white leading-snug">{job.title}</h2>
                      <p className="text-xs text-cyan-300 flex items-center gap-1 mt-1 font-semibold">
                        <Building className="w-3.5 h-3.5 text-cyan-400" />
                        {job.company_name}
                      </p>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex-shrink-0">
                      {job.hiring_urgency || "Urgent Hiring"}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" /> {job.location}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> <span className="font-mono text-emerald-300 font-bold">{job.salary_range}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-purple-400" /> {job.shift_type || "Day Shift"}
                    </p>
                  </div>

                  {/* Perks Badges */}
                  {job.perks && job.perks.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.perks.map((p, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-slate-300 font-semibold">
                          ✨ {p}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* JobReady Score Match Box */}
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Req. JobReady Index™</span>
                      <span className="font-extrabold text-amber-300 text-sm">{job.min_job_ready_score || 75}.0</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Your Skill Match</span>
                      <span className="font-extrabold text-emerald-400 text-sm">{userScore.toFixed(1)} (92% Match)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  {hasApplied ? (
                    <button
                      disabled
                      className="w-full py-3 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black flex items-center justify-center gap-2 cursor-default"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Application Submitted ✓</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenApplyModal(job)}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
                    >
                      <Zap className="w-4 h-4 fill-black" />
                      <span>1-Click AI Quick Apply</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-white/10 text-xs no-print">
          <span className="text-slate-400 font-semibold">
            Showing <strong className="text-white">{((currentPage - 1) * 9) + 1}</strong> - <strong className="text-white">{Math.min(currentPage * 9, filtered.length)}</strong> of <strong className="text-cyan-400">{filtered.length}</strong> Jobs
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            <span className="font-extrabold text-amber-300 px-2">Page {currentPage} of {totalPages}</span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* SCREENING QUESTIONNAIRE MODAL */}
      {selectedJobForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-slate-900/95 max-w-lg w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedJobForApply(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-extrabold uppercase">
                NAUKRI-STYLE CANDIDATE SCREENING
              </span>
              <h2 className="text-xl font-black text-white">{selectedJobForApply.title}</h2>
              <p className="text-xs text-cyan-300 font-semibold">{selectedJobForApply.company_name} • {selectedJobForApply.location}</p>
            </div>

            <form onSubmit={handleSubmitApplication} className="space-y-5">
              {/* Screening Questions List */}
              {selectedJobForApply.screening_questions && selectedJobForApply.screening_questions.length > 0 ? (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                    Employer Screening Questions ({selectedJobForApply.screening_questions.length})
                  </span>

                  {selectedJobForApply.screening_questions.map((q, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                      <label className="font-bold text-white block">
                        Q{idx + 1}. {q}
                      </label>
                      <input
                        type="text"
                        required
                        value={screeningAnswers[q] || ""}
                        onChange={(e) => handleAnswerChange(q, e.target.value)}
                        placeholder="Type your answer here..."
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300">
                  No custom screening questions required for this application. Your Skill Passport will be submitted directly.
                </div>
              )}

              {/* Verified Credentials Notice */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Attached Credentials:
                </span>
                <p className="text-slate-300 text-[11px]">
                  JobReady Index™ Score: <strong>88.5</strong> • Verified NCVT Certificate Digest: <code className="text-amber-300 font-mono">CRT-8A92F1</code>
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 text-black font-extrabold text-xs shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
                >
                  {submitting ? <Clock className="w-4 h-4 animate-spin text-black" /> : <Send className="w-4 h-4 fill-black" />}
                  <span>Submit Application to Employer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedJobForApply(null)}
                  className="px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function StudentJobsPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading Live MSME Jobs...</div>}>
      <StudentJobsContent />
    </Suspense>
  );
}
