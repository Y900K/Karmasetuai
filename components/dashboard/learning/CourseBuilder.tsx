"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Trash2, Video, FileText, HelpCircle, Sparkles, Folder, Check, Save, ArrowLeft, RefreshCw } from "lucide-react";
import AutosaveIndicator from "../shared/AutosaveIndicator";

export default function CourseBuilder() {
  const searchParams = useSearchParams();
  const editTitle = searchParams?.get("title");
  const editTrade = searchParams?.get("trade");

  const [courseTitle, setCourseTitle] = useState(editTitle || "");
  const [trade, setTrade] = useState(editTrade || "CNC Machinist & Programmer");
  const [description, setDescription] = useState(
    editTitle
      ? `Comprehensive NCVT accredited training syllabus for ${editTitle}. Includes interactive video lectures, Google Drive technical documentation, and mandatory 10-Question AI exam.`
      : ""
  );

  const [modules, setModules] = useState<
    { id: string; title: string; youtubeUrl: string; gdriveUrl: string; autoQuizGenerated: boolean; quizCount: number }[]
  >([
    {
      id: "mod-1",
      title: editTitle ? `${editTitle} — Hands-on Core Module` : "Fanuc Controller G-Code & M-Code Programming",
      youtubeUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
      gdriveUrl: "https://drive.google.com/file/d/123",
      autoQuizGenerated: true,
      quizCount: 10
    },
  ]);

  const [savingStatus, setSavingStatus] = useState<"SAVED" | "SAVING" | "ERROR">("SAVED");
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
  const [generatingAi, setGeneratingAi] = useState<Record<string, boolean>>({});

  const handleAddModule = () => {
    const newMod = {
      id: "mod-" + Date.now(),
      title: "",
      youtubeUrl: "",
      gdriveUrl: "",
      autoQuizGenerated: false,
      quizCount: 0,
    };
    setModules([...modules, newMod]);
    triggerAutosave();
  };

  const handleModuleChange = (id: string, field: string, value: any) => {
    setModules(modules.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
    triggerAutosave();
  };

  const handleDeleteModule = (id: string) => {
    setModules(modules.filter((m) => m.id !== id));
    triggerAutosave();
  };

  const triggerAutosave = () => {
    setSavingStatus("SAVING");
    setTimeout(() => {
      setSavingStatus("SAVED");
      setLastSaved(new Date());
    }, 800);
  };

  const handleGenerateAiQuiz = async (modId: string, topicTitle: string) => {
    if (!topicTitle) {
      alert("Please enter Topic Title first before generating mandatory AI Quiz.");
      return;
    }

    setGeneratingAi((prev) => ({ ...prev, [modId]: true }));
    try {
      const res = await fetch("/api/ai/quiz-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topicTitle, trade }),
      });
      const data = await res.json();
      if (data.success && data.data?.questions) {
        setModules(modules.map((m) => (m.id === modId ? { ...m, autoQuizGenerated: true, quizCount: 10 } : m)));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingAi((prev) => ({ ...prev, [modId]: false }));
      triggerAutosave();
    }
  };

  const handleSummarizeDesc = async () => {
    if (!courseTitle) {
      alert("Please enter Course Title first.");
      return;
    }
    setSavingStatus("SAVING");
    try {
      const res = await fetch("/api/ai/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `Generate a 2-sentence non-mandatory summary description for course titled "${courseTitle}" for trade "${trade}".` }),
      });
      const data = await res.json();
      if (data.success && data.response) {
        setDescription(data.response);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingStatus("SAVED");
      setLastSaved(new Date());
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header */}
      <div className="glass-card p-6 rounded-3xl border border-blue-500/30 flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">LMS Course Builder</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold uppercase">
              Institute Portal
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Create NCVT & Industry 4.0 trade courses with YouTube embedding, Google Drive docs & Mandatory 10-Question AI Quizzes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AutosaveIndicator status={savingStatus} lastSavedAt={lastSaved} />
          <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-500/20 flex items-center gap-1.5 transition-all">
            <Save className="w-4 h-4" />
            <span>Publish Course</span>
          </button>
        </div>
      </div>

      {/* Course Info Form */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">1. Course General Settings</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
              Course Title <span className="text-amber-400">* Mandatory</span>
            </label>
            <input
              type="text"
              required
              value={courseTitle}
              onChange={(e) => {
                setCourseTitle(e.target.value);
                triggerAutosave();
              }}
              placeholder="e.g. Advanced CNC Machinist & Fanuc Controller Masterclass"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Trade Specialization</label>
            <select
              value={trade}
              onChange={(e) => {
                setTrade(e.target.value);
                triggerAutosave();
              }}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400"
            >
              <option value="CNC Machinist & Programmer">CNC Machinist & Programmer</option>
              <option value="Industrial Electrician & PLC">Industrial Electrician & PLC</option>
              <option value="Fitter & Quality Inspection">Fitter & Quality Inspection</option>
              <option value="Welder & Metal Fabrication">Welder & Metal Fabrication</option>
            </select>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-300 uppercase">
              Course Overview Description <span className="text-slate-500 font-normal">(Non-Mandatory)</span>
            </label>
            <button
              type="button"
              onClick={handleSummarizeDesc}
              className="text-xs text-amber-400 hover:underline font-bold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> AI Auto-Summarize Description
            </button>
          </div>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              triggerAutosave();
            }}
            placeholder="Brief overview of shopfloor competencies and equipment covered in this module..."
            className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>

      {/* Course Topics & Lessons Builder */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">2. Course Topics & Mandatory AI Quizzes</h3>
            <p className="text-xs text-slate-400">Each topic requires a mandatory 10-Question Quiz (7 MCQs + 3 Written answers)</p>
          </div>

          <button
            onClick={handleAddModule}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-500/30 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Topic Module
          </button>
        </div>

        {/* Topic Modules List */}
        <div className="space-y-4">
          {modules.map((m, idx) => (
            <div key={m.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                  Topic #{idx + 1} <span className="text-amber-400">* Mandatory</span>
                </span>
                <button
                  onClick={() => handleDeleteModule(m.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <input
                  type="text"
                  required
                  value={m.title}
                  onChange={(e) => handleModuleChange(m.id, "title", e.target.value)}
                  placeholder="e.g. Fanuc G-Code Lathe Operation & Precision Tolerances"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 font-bold"
                />
              </div>

              {/* YouTube & Drive Link Embeds */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Video className="w-4 h-4 text-red-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={m.youtubeUrl}
                    onChange={(e) => handleModuleChange(m.id, "youtubeUrl", e.target.value)}
                    placeholder="YouTube Video Embed URL (e.g. https://youtube.com/watch?v=...)"
                    className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-red-400"
                  />
                </div>

                <div className="relative">
                  <Folder className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={m.gdriveUrl}
                    onChange={(e) => handleModuleChange(m.id, "gdriveUrl", e.target.value)}
                    placeholder="Google Drive Shareable Link (Reading PDF / Docs)"
                    className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Mandatory AI 10-Question Quiz Panel */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-xs font-bold text-amber-300">Mandatory 10-Question AI Examination</div>
                    <div className="text-[10px] text-slate-400">7 Multiple Choice Questions + 3 Written Short Answers</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleGenerateAiQuiz(m.id, m.title)}
                  disabled={generatingAi[m.id]}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-cyan-400 text-black font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all"
                >
                  {generatingAi[m.id] ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
                      <span>Generating 10-Q Quiz...</span>
                    </>
                  ) : m.autoQuizGenerated ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-black" />
                      <span>Regenerate 10-Q Quiz</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-black" />
                      <span>Auto-Generate 10-Q Quiz</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
