"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import {
  FileText, Plus, QrCode, Copy, ExternalLink, Download, Trash2, CheckCircle2,
  Sparkles, RefreshCw, Eye, Star, Layers, BarChart3, ChevronRight, X, ArrowUp, ArrowDown
} from "lucide-react";
import { useFormStore, FormSchema, QuestionItem, QuestionType } from "@/lib/store/FormStore";
import { exportToCSV, exportToJSON, exportToTSV, exportToFormattedText } from "@/lib/utils/export";

function HrFormsContent() {
  const { forms, createForm, deleteForm } = useFormStore();

  const [activeTab, setActiveTab] = useState<"forms" | "create" | "responses">("forms");
  const [selectedFormForResponses, setSelectedFormForResponses] = useState<FormSchema | null>(null);

  // QR Modal state
  const [qrModalForm, setQrModalForm] = useState<FormSchema | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form Builder state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<FormSchema["category"]>("Survey");
  const [questions, setQuestions] = useState<QuestionItem[]>([
    { id: "q1", label: "Full Name & Roll Number", type: "SHORT_TEXT", required: true },
    { id: "q2", label: "Rate Overall Experience (1-5)", type: "RATING_1_5", required: true },
  ]);

  const handleAddQuestion = () => {
    const newId = `q_${Date.now()}`;
    setQuestions([
      ...questions,
      { id: newId, label: "New Question Label", type: "SHORT_TEXT", required: false },
    ]);
  };

  const handleUpdateQuestion = (idx: number, updated: Partial<QuestionItem>) => {
    const next = [...questions];
    next[idx] = { ...next[idx], ...updated };
    setQuestions(next);
  };

  const handleRemoveQuestion = (idx: number) => {
    if (questions.length <= 1) return;
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleAddOption = (qIdx: number) => {
    const next = [...questions];
    const opts = next[qIdx].options || [];
    next[qIdx].options = [...opts, `Option ${opts.length + 1}`];
    setQuestions(next);
  };

  const handleUpdateOption = (qIdx: number, oIdx: number, val: string) => {
    const next = [...questions];
    const opts = [...(next[qIdx].options || [])];
    opts[oIdx] = val;
    next[qIdx].options = opts;
    setQuestions(next);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const created = createForm({
      title,
      description,
      category,
      createdBy: "HR & System Admin",
      questions,
    });

    // Reset and switch tab
    setTitle("");
    setDescription("");
    setQuestions([
      { id: "q1", label: "Full Name & Roll Number", type: "SHORT_TEXT", required: true },
      { id: "q2", label: "Rate Overall Experience (1-5)", type: "RATING_1_5", required: true },
    ]);
    setActiveTab("forms");
    setQrModalForm(created);
  };

  const getPublicUrl = (formId: string) => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/forms/${formId}`;
    }
    return `https://karmasetuai.vercel.app/forms/${formId}`;
  };

  const handleCopyLink = (formId: string) => {
    const url = getPublicUrl(formId);
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in printable-area">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-amber-400" />
              <span>AI Form Generator & Real-Time QR Code Suite</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase">
              Google-Form Style Builder
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Build custom surveys, campus safety audits, and hiring feedback forms with real-time QR code shareable links.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap no-print">
          <button
            onClick={() => setActiveTab("create")}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-cyan-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all hover:scale-102"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Create New Form</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 w-fit no-print">
        <button
          onClick={() => setActiveTab("forms")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "forms"
              ? "bg-amber-600 text-white shadow-md shadow-amber-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Active Forms ({forms.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "create"
              ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Build New Form</span>
        </button>

        <button
          onClick={() => setActiveTab("responses")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "responses"
              ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Submissions & Responses</span>
        </button>
      </div>

      {/* TAB 1: ACTIVE FORMS LIST */}
      {activeTab === "forms" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {forms.map((f) => (
            <div
              key={f.id}
              className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90 hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                    {f.category} Form
                  </span>
                  <span className="font-mono text-xs text-slate-400 font-bold">{f.id}</span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{f.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{f.description}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Questions: <strong className="text-white">{f.questions.length}</strong></span>
                  <span>Responses: <strong className="text-emerald-400 font-extrabold">{f.responses.length}</strong></span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setQrModalForm(f)}
                    className="flex-1 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-102"
                  >
                    <QrCode className="w-4 h-4 fill-black" />
                    <span>Share & QR Code</span>
                  </button>

                  <button
                    onClick={() => handleCopyLink(f.id)}
                    className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-all flex items-center gap-1"
                    title="Copy Link"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    href={`/forms/${f.id}`}
                    target="_blank"
                    className="px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-bold transition-all flex items-center gap-1"
                    title="Open Public Form"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => {
                      setSelectedFormForResponses(f);
                      setActiveTab("responses");
                    }}
                    className="px-3 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Responses</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: AI FORM BUILDER */}
      {activeTab === "create" && (
        <form onSubmit={handleSaveForm} className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Form Metadata & Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Form Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. NCVT Industrial Apprentice Feedback Survey 2026"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FormSchema["category"])}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Survey">Survey</option>
                  <option value="Placement">Placement</option>
                  <option value="Audit">Audit</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Safety">Safety</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Description / Instructions</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the purpose of this form for participants..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Question Builder List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" /> Form Questions ({questions.length})
              </h3>

              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-black" /> Add Question
              </button>
            </div>

            {questions.map((q, idx) => (
              <div key={q.id} className="glass-card p-5 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-bold text-amber-300 font-mono">Question #{idx + 1}</span>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={q.required}
                        onChange={(e) => handleUpdateQuestion(idx, { required: e.target.checked })}
                        className="accent-amber-400 rounded"
                      />
                      <span>Required Field</span>
                    </label>

                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(idx)}
                        className="p-1 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                        title="Delete Question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Question Text</label>
                    <input
                      type="text"
                      required
                      value={q.label}
                      onChange={(e) => handleUpdateQuestion(idx, { label: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Answer Type</label>
                    <select
                      value={q.type}
                      onChange={(e) => handleUpdateQuestion(idx, { type: e.target.value as QuestionType })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="SHORT_TEXT">Short Text Input</option>
                      <option value="PARAGRAPH">Paragraph Textarea</option>
                      <option value="MULTIPLE_CHOICE">Multiple Choice (Radio)</option>
                      <option value="CHECKBOXES">Checkboxes (Multi-Select)</option>
                      <option value="RATING_1_5">Star Rating (1 to 5)</option>
                    </select>
                  </div>
                </div>

                {/* Options Editor for Choice Types */}
                {(q.type === "MULTIPLE_CHOICE" || q.type === "CHECKBOXES") && (
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-300 uppercase">Answer Choice Options</span>
                      <button
                        type="button"
                        onClick={() => handleAddOption(idx)}
                        className="text-cyan-400 font-bold hover:underline"
                      >
                        + Add Option
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {(q.options || ["Option 1", "Option 2"]).map((opt, oIdx) => (
                        <div key={oIdx} className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 font-mono">{oIdx + 1}.</span>
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => handleUpdateOption(idx, oIdx, e.target.value)}
                            className="flex-1 bg-slate-950 border border-white/10 rounded-lg px-3 py-1 text-xs text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-cyan-400 text-black font-extrabold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-101"
          >
            <CheckCircle2 className="w-5 h-5 fill-black" />
            <span>Publish Form & Generate Shareable QR Code</span>
          </button>
        </form>
      )}

      {/* TAB 3: RESPONSES */}
      {activeTab === "responses" && (
        <div className="space-y-4">
          {/* Form Selector */}
          <div className="glass-card p-4 rounded-2xl border border-white/10 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Select Form:</span>
              <select
                value={selectedFormForResponses?.id || forms[0]?.id}
                onChange={(e) => {
                  const target = forms.find((f) => f.id === e.target.value);
                  if (target) setSelectedFormForResponses(target);
                }}
                className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-purple-400"
              >
                {forms.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.title} ({f.responses.length} Submissions)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => {
                  const target = selectedFormForResponses || forms[0];
                  if (target && target.responses.length > 0) {
                    exportToCSV(`${target.id}_responses`, target.responses);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-extrabold text-[11px] flex items-center gap-1 transition-all shadow-md shadow-purple-500/20"
              >
                <Download className="w-3.5 h-3.5" /> CSV
              </button>

              <button
                onClick={() => {
                  const target = selectedFormForResponses || forms[0];
                  if (target && target.responses.length > 0) {
                    exportToJSON(`${target.id}_responses`, target.responses);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-[11px] flex items-center gap-1 transition-all shadow-md shadow-cyan-500/20"
              >
                <Download className="w-3.5 h-3.5" /> JSON
              </button>

              <button
                onClick={() => {
                  const target = selectedFormForResponses || forms[0];
                  if (target && target.responses.length > 0) {
                    exportToTSV(`${target.id}_responses`, target.responses);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-[11px] flex items-center gap-1 transition-all shadow-md shadow-emerald-500/20"
              >
                <Download className="w-3.5 h-3.5" /> Excel (TSV)
              </button>

              <button
                onClick={() => {
                  const target = selectedFormForResponses || forms[0];
                  if (target && target.responses.length > 0) {
                    exportToFormattedText(`${target.id}_summary`, target.title, target.responses);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-[11px] flex items-center gap-1 transition-all shadow-md shadow-amber-500/20"
              >
                <Download className="w-3.5 h-3.5" /> Text Summary
              </button>
            </div>
          </div>

          {/* Submissions List */}
          {(() => {
            const targetForm = selectedFormForResponses || forms[0];
            if (!targetForm || targetForm.responses.length === 0) {
              return (
                <div className="glass-card p-8 rounded-3xl border border-white/10 text-center text-xs text-slate-400 space-y-2 bg-slate-900/90">
                  <BarChart3 className="w-8 h-8 text-slate-500 mx-auto" />
                  <p>No responses submitted for this form yet.</p>
                  <p className="text-[11px] text-amber-300 font-bold">Share the QR Code or Link to start collecting data!</p>
                </div>
              );
            }

            return (
              <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-400" /> Responses for {targetForm.title} ({targetForm.responses.length})
                </h3>

                <div className="space-y-3">
                  {targetForm.responses.map((resp) => (
                    <div key={resp.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{resp.respondentName || "Anonymous"}</span>
                          <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300 text-[10px]">{resp.respondentRole}</span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400">{resp.submittedAt}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                        {Object.entries(resp.answers).map(([qKey, val]) => {
                          const questionObj = targetForm.questions.find((q) => q.id === qKey);
                          const displayAnswer = Array.isArray(val) ? val.join(", ") : String(val);

                          return (
                            <div key={qKey} className="p-2 rounded-xl bg-slate-950/80 border border-white/5">
                              <span className="text-[10px] font-bold text-slate-400 block">{questionObj?.label || qKey}:</span>
                              <span className="text-cyan-300 font-bold">{displayAnswer}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* REAL-TIME QR CODE & LINK SHARING MODAL */}
      {qrModalForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/40 bg-slate-900/95 max-w-md w-full space-y-6 shadow-2xl relative">
            <button
              onClick={() => setQrModalForm(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-extrabold uppercase">
                REAL-TIME QR CODE & SHARE
              </span>
              <h2 className="text-xl font-black text-white">{qrModalForm.title}</h2>
              <p className="text-xs text-slate-400">Scan QR Code with mobile camera to fill out this form</p>
            </div>

            {/* QR Code Container */}
            <div className="p-6 rounded-2xl bg-white flex flex-col items-center justify-center space-y-3 shadow-inner mx-auto max-w-[260px]">
              {/* Real-time QR Code Image generated via QR Server API */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(getPublicUrl(qrModalForm.id))}`}
                alt="Form QR Code"
                className="w-48 h-48 object-contain"
              />
              <span className="text-[11px] font-bold text-slate-900 font-mono">CODE: {qrModalForm.id}</span>
            </div>

            {/* Shareable Link Input */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Public Form URL</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={getPublicUrl(qrModalForm.id)}
                  className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-cyan-300 font-mono focus:outline-none"
                />
                <button
                  onClick={() => handleCopyLink(qrModalForm.id)}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1 transition-all"
                >
                  {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-black" />}
                  <span>{copiedLink ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <Link
                href={`/forms/${qrModalForm.id}`}
                target="_blank"
                className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Public Form 🌐</span>
              </Link>

              <button
                onClick={() => setQrModalForm(null)}
                className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HrFormsPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading Form Builder & QR Code Suite...</div>}>
      <HrFormsContent />
    </Suspense>
  );
}
