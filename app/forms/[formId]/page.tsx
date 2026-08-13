"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FileText, CheckCircle2, QrCode, Sparkles, Star, Send, ArrowLeft,
  AlertCircle, ShieldCheck, Cpu, Building
} from "lucide-react";
import { useFormStore, QuestionItem } from "@/lib/store/FormStore";

export default function PublicFormSubmissionPage() {
  const params = useParams();
  const rawFormId = (params?.formId as string) || "FRM-8910";

  const { getFormById, submitResponse } = useFormStore();
  const form = getFormById(rawFormId);

  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [respondentName, setRespondentName] = useState("");
  const [respondentRole, setRespondentRole] = useState("Trainee / Student");
  const [submitted, setSubmitted] = useState(false);
  const [receiptId, setReceiptId] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!form) {
    return (
      <div className="min-h-screen bg-[#070b16] text-white flex items-center justify-center p-4">
        <div className="glass-card p-8 rounded-3xl border border-red-500/30 max-w-md text-center space-y-4 bg-slate-900/90">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto animate-bounce" />
          <h2 className="text-xl font-black">Form Not Found</h2>
          <p className="text-xs text-slate-300">
            No active form matches code <code className="text-amber-400 font-mono font-bold">{rawFormId}</code>. Please check the QR code or link.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-extrabold text-xs hover:bg-cyan-400 transition-all"
          >
            Back to KarmaSetu AI Home
          </Link>
        </div>
      </div>
    );
  }

  const handleTextChange = (qId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
    setErrorMsg(null);
  };

  const handleCheckboxChange = (qId: string, option: string) => {
    const current = (answers[qId] as string[]) || [];
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    setAnswers((prev) => ({ ...prev, [qId]: updated }));
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validate required questions
    for (const q of form.questions) {
      if (q.required) {
        const val = answers[q.id];
        if (!val || (Array.isArray(val) && val.length === 0)) {
          setErrorMsg(`Please answer required question: "${q.label}"`);
          return;
        }
      }
    }

    // Submit response to FormStore
    submitResponse(form.id, {
      answers,
      respondentName: respondentName.trim() || "Anonymous Participant",
      respondentRole,
    });

    const newReceipt = `RSP-${Math.floor(10000 + Math.random() * 90000)}`;
    setReceiptId(newReceipt);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#070b16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Header Bar */}
      <header className="border-b border-white/10 bg-[#070b16]/90 backdrop-blur-md sticky top-0 z-30 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-emerald-400 p-0.5 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-[#070b16] rounded-[9px] flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <span className="text-sm font-black text-white">
              Karma<span className="text-cyan-400">Setu</span>
              <span className="ml-1 text-[9px] font-black bg-amber-500/20 text-amber-300 px-1 py-0.5 rounded border border-amber-500/30">PUBLIC FORM</span>
            </span>
          </Link>

          <Link
            href="/"
            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {submitted ? (
          /* Submission Confirmation Card */
          <div className="glass-card p-8 rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-slate-900 to-slate-950 text-center space-y-6 animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold uppercase">
                Response Received ✓
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">Form Submitted Successfully!</h1>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you for participating. Your response has been recorded in the KarmaSetu AI Workforce Intelligence Database.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-sm mx-auto space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Receipt Number:</span>
                <span className="font-mono text-cyan-300 font-bold">{receiptId}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Form Code:</span>
                <span className="font-mono text-amber-300 font-bold">{form.id}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Submission Time:</span>
                <span className="font-mono text-slate-200">Just Now</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setAnswers({});
                }}
                className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-all"
              >
                Submit Another Response
              </button>

              <Link
                href="/"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-extrabold text-xs hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          /* Form Questions View */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Header Card */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-[#191306] to-slate-950 shadow-2xl space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-amber-400" /> {form.category} Form
                </span>
                <span className="text-xs text-slate-400 font-mono">Code: {form.id}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white">{form.title}</h1>
              <p className="text-xs text-slate-300 leading-relaxed">{form.description}</p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>Created by <strong className="text-amber-300">{form.createdBy}</strong></span>
                <span>KarmaSetu AI Verified Public Form</span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 font-bold flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Respondent Identity Optional Section */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Participant Details (Optional)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Your Name / ID</label>
                  <input
                    type="text"
                    value={respondentName}
                    onChange={(e) => setRespondentName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar (Optional)"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Role / Designation</label>
                  <select
                    value={respondentRole}
                    onChange={(e) => setRespondentRole(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Trainee / Student">Trainee / Student</option>
                    <option value="ITI Instructor / Faculty">ITI Instructor / Faculty</option>
                    <option value="MSME Employer / Recruiter">MSME Employer / Recruiter</option>
                    <option value="Auditor / Official">Auditor / Official</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {form.questions.map((q, idx) => {
                const currentVal = answers[q.id];

                return (
                  <div key={q.id} className="glass-card p-6 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90 hover:border-white/20 transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <label className="text-xs font-bold text-white leading-snug">
                        {idx + 1}. {q.label} {q.required && <span className="text-red-400 font-black">*</span>}
                      </label>
                      {q.required && (
                        <span className="text-[9px] font-extrabold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30 flex-shrink-0">
                          REQUIRED
                        </span>
                      )}
                    </div>

                    {/* SHORT_TEXT */}
                    {q.type === "SHORT_TEXT" && (
                      <input
                        type="text"
                        value={(currentVal as string) || ""}
                        onChange={(e) => handleTextChange(q.id, e.target.value)}
                        placeholder="Type your answer here..."
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    )}

                    {/* PARAGRAPH */}
                    {q.type === "PARAGRAPH" && (
                      <textarea
                        rows={3}
                        value={(currentVal as string) || ""}
                        onChange={(e) => handleTextChange(q.id, e.target.value)}
                        placeholder="Type your detailed response..."
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                      />
                    )}

                    {/* MULTIPLE_CHOICE */}
                    {q.type === "MULTIPLE_CHOICE" && (
                      <div className="space-y-2">
                        {q.options?.map((opt, oIdx) => (
                          <label
                            key={oIdx}
                            onClick={() => handleTextChange(q.id, opt)}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                              currentVal === opt
                                ? "bg-amber-500/20 border-amber-400 text-white font-bold"
                                : "bg-slate-950/60 border-white/10 text-slate-300 hover:border-white/20"
                            }`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              checked={currentVal === opt}
                              onChange={() => handleTextChange(q.id, opt)}
                              className="accent-amber-400"
                            />
                            <span className="text-xs">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {/* CHECKBOXES */}
                    {q.type === "CHECKBOXES" && (
                      <div className="space-y-2">
                        {q.options?.map((opt, oIdx) => {
                          const selectedList = (currentVal as string[]) || [];
                          const isChecked = selectedList.includes(opt);

                          return (
                            <label
                              key={oIdx}
                              onClick={() => handleCheckboxChange(q.id, opt)}
                              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                isChecked
                                  ? "bg-cyan-500/20 border-cyan-400 text-white font-bold"
                                  : "bg-slate-950/60 border-white/10 text-slate-300 hover:border-white/20"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleCheckboxChange(q.id, opt)}
                                className="accent-cyan-400 rounded"
                              />
                              <span className="text-xs">{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {/* RATING_1_5 */}
                    {q.type === "RATING_1_5" && (
                      <div className="flex items-center gap-2 pt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleTextChange(q.id, String(star))}
                            className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1 ${
                              Number(currentVal) >= star
                                ? "bg-amber-500/20 border-amber-400 text-amber-300 scale-105"
                                : "bg-slate-950 border-white/10 text-slate-500 hover:border-white/20"
                            }`}
                          >
                            <Star className={`w-5 h-5 ${Number(currentVal) >= star ? "fill-amber-400 text-amber-400" : ""}`} />
                            <span className="text-[10px] font-bold">{star}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-cyan-400 text-black font-extrabold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
              >
                <Send className="w-4 h-4 fill-black" />
                <span>Submit Response</span>
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
