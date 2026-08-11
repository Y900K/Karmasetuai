"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Trash2, Video, FileText, HelpCircle, Sparkles, Folder, Check, Save, ArrowLeft, RefreshCw, Link2, Award, ExternalLink } from "lucide-react";
import AutosaveIndicator from "../shared/AutosaveIndicator";

export default function CourseBuilder() {
  const searchParams = useSearchParams();
  const editTitle = searchParams?.get("title");
  const editTrade = searchParams?.get("trade");

  const [courseTitle, setCourseTitle] = useState(editTitle || "");
  const [trade, setTrade] = useState(editTrade || "CNC Machinist & Programmer");
  const [description, setDescription] = useState(
    editTitle
      ? `Comprehensive NCVT accredited training syllabus for ${editTitle}. Includes interactive video lectures, Google Drive technical documentation, and mandatory AI exam.`
      : ""
  );

  // Dynamic Resource Links List
  const [resources, setResources] = useState<{ id: string; title: string; url: string }[]>([
    { id: "r1", title: "NCVT Shopfloor Manual PDF", url: "https://drive.google.com/file/d/123" }
  ]);

  // Quiz Builder Questions List (defaults to 10)
  const [quizQuestions, setQuizQuestions] = useState<string[]>([
    "Explain Fanuc G-Code G01 linear interpolation syntax.",
    "What is the safety tolerance for G00 rapid traverse motion?",
    "Describe 3-phase motor Star-Delta starter wiring diagram.",
    "How to measure shaft diameter using Vernier Micrometer ±0.01mm?",
    "Explain 5S workplace organisation steps in CNC workshop.",
    "What is M03 and M05 spindle rotation command?",
    "How to clear emergency stop alarms on PLC controller?",
    "What PPE is mandatory for MIG welding operation?",
    "Write G-Code for facing operation on 50mm mild steel bar.",
    "How to verify surface roughness using profilometer?",
  ]);

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

  // Certificate Settings
  const [issueCert, setIssueCert] = useState(true);
  const [passThreshold, setPassThreshold] = useState(80);

  const handleAddModule = () => {
    const newMod = {
      id: "mod-" + Date.now(),
      title: "",
      youtubeUrl: "",
      gdriveUrl: "",
      autoQuizGenerated: false,
      quizCount: 10,
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

  const handleAddResource = () => {
    setResources([...resources, { id: "res-" + Date.now(), title: "", url: "" }]);
    triggerAutosave();
  };

  const handleRemoveResource = (id: string) => {
    setResources(resources.filter((r) => r.id !== id));
    triggerAutosave();
  };

  const handleAddQuestion = () => {
    setQuizQuestions([...quizQuestions, `Question #${quizQuestions.length + 1}: Specify practical shopfloor problem statement...`]);
    triggerAutosave();
  };

  const handleRemoveQuestion = (idx: number) => {
    setQuizQuestions(quizQuestions.filter((_, i) => i !== idx));
    triggerAutosave();
  };

  const triggerAutosave = () => {
    setSavingStatus("SAVING");
    setTimeout(() => {
      setSavingStatus("SAVED");
      setLastSaved(new Date());
    }, 800);
  };

  const isValidYoutubeUrl = (url: string) => {
    return !url || url.includes("youtube.com") || url.includes("youtu.be");
  };

  const isValidDriveUrl = (url: string) => {
    return !url || url.includes("drive.google.com") || url.includes("docs.google.com");
  };

  const handleGenerateAiQuiz = async (modId: string, topicTitle: string) => {
    if (!topicTitle) {
      alert("Please enter Topic Title first before generating AI Quiz.");
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
        setModules(modules.map((m) => (m.id === modId ? { ...m, autoQuizGenerated: true, quizCount: quizQuestions.length } : m)));
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
        body: JSON.stringify({ prompt: `Generate a 2-sentence summary description for course titled "${courseTitle}" for trade "${trade}".` }),
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
    <div className="space-y-6 animate-fade-in printable-area">
      
      {/* Top Header */}
      <div className="glass-card p-6 rounded-3xl border border-blue-500/30 flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">LMS Unified Course Builder</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold uppercase">
              Institute Portal
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Build accredited trade courses with YouTube embeds, Google Drive docs, dynamic resources, scalable 10+ question quiz builder & automated certificate issuing.
          </p>
        </div>

        <div className="flex items-center gap-3 no-print">
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
              Course Overview Description
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

      {/* Dynamic Resource Links Section */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Link2 className="w-4 h-4 text-cyan-400" /> Dynamic Supplementary Resource Links
          </h3>
          <button
            onClick={handleAddResource}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold text-xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Resource Link
          </button>
        </div>

        <div className="space-y-2">
          {resources.map((res, idx) => (
            <div key={res.id} className="flex items-center gap-2">
              <input
                type="text"
                value={res.title}
                onChange={(e) => {
                  const updated = [...resources];
                  updated[idx].title = e.target.value;
                  setResources(updated);
                  triggerAutosave();
                }}
                placeholder="Resource Title (e.g. NCVT Blueprint Manual)"
                className="w-1/3 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
              <input
                type="url"
                value={res.url}
                onChange={(e) => {
                  const updated = [...resources];
                  updated[idx].url = e.target.value;
                  setResources(updated);
                  triggerAutosave();
                }}
                placeholder="URL (e.g. https://drive.google.com/...)"
                className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
              <button
                onClick={() => handleRemoveResource(res.id)}
                className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Course Topics & Validated Embeds */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">2. Course Content & Video/Doc Embeds</h3>
            <p className="text-xs text-slate-400">Embed YouTube video lectures & Google Drive PDF reading materials</p>
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
                  Topic #{idx + 1}
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

              {/* YouTube & Drive Link Embeds with Validation Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="relative">
                    <Video className="w-4 h-4 text-red-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={m.youtubeUrl}
                      onChange={(e) => handleModuleChange(m.id, "youtubeUrl", e.target.value)}
                      placeholder="YouTube Video Embed URL (e.g. https://youtube.com/watch?v=...)"
                      className={`w-full bg-slate-900 border ${isValidYoutubeUrl(m.youtubeUrl) ? "border-white/10 focus:border-red-400" : "border-red-500"} rounded-xl pl-9 pr-3 py-2 text-xs text-white`}
                    />
                  </div>
                  {!isValidYoutubeUrl(m.youtubeUrl) && (
                    <span className="text-[10px] text-red-400 mt-1 block">⚠️ Please enter a valid YouTube URL (youtube.com or youtu.be)</span>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Folder className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={m.gdriveUrl}
                      onChange={(e) => handleModuleChange(m.id, "gdriveUrl", e.target.value)}
                      placeholder="Google Drive Shareable Link (Reading PDF / Docs)"
                      className={`w-full bg-slate-900 border ${isValidDriveUrl(m.gdriveUrl) ? "border-white/10 focus:border-cyan-400" : "border-red-500"} rounded-xl pl-9 pr-3 py-2 text-xs text-white`}
                    />
                  </div>
                  {!isValidDriveUrl(m.gdriveUrl) && (
                    <span className="text-[10px] text-red-400 mt-1 block">⚠️ Please enter a valid Google Drive or Docs shareable URL</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scalable Quiz Builder Section (Defaults to 10, expandable to N) */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" /> Scalable Assessment Quiz Builder ({quizQuestions.length} Questions)
            </h3>
            <p className="text-xs text-slate-400">Defaults to 10 questions. Use 'Add Question' to scale beyond 10 as needed.</p>
          </div>

          <button
            onClick={handleAddQuestion}
            className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Question #{quizQuestions.length + 1}
          </button>
        </div>

        <div className="space-y-2">
          {quizQuestions.map((q, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
              <span className="text-xs font-bold text-amber-400 w-8 text-center">#{idx + 1}</span>
              <input
                type="text"
                value={q}
                onChange={(e) => {
                  const updated = [...quizQuestions];
                  updated[idx] = e.target.value;
                  setQuizQuestions(updated);
                  triggerAutosave();
                }}
                className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={() => handleRemoveQuestion(idx)}
                className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* End-of-Course Institute Certification Generator Settings */}
      <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-slate-900/90 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">End-of-Course Institute Certification Generator</h3>
          </div>

          <label className="flex items-center gap-2 text-xs font-bold text-emerald-300 cursor-pointer">
            <input
              type="checkbox"
              checked={issueCert}
              onChange={(e) => setIssueCert(e.target.checked)}
              className="accent-emerald-400 w-4 h-4 rounded"
            />
            <span>Auto-Issue Certificate on Completion</span>
          </label>
        </div>

        {issueCert && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Passing Quiz Score Threshold (%)</label>
              <input
                type="number"
                value={passThreshold}
                onChange={(e) => setPassThreshold(Number(e.target.value))}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-emerald-400 font-extrabold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Authorized Digital Signatory</label>
              <input
                type="text"
                defaultValue="Principal & Master Mentor, Govt ITI Center"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
