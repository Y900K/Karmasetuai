"use client";

import React, { useState } from "react";
import { Upload, Video, Folder, FileText, Plus, Check } from "lucide-react";
import AutosaveIndicator from "@/components/dashboard/shared/AutosaveIndicator";

export default function ExpertContentPage() {
  const [title, setTitle] = useState("");
  const [trade, setTrade] = useState("CNC Machinist & Programmer");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [gdriveUrl, setGdriveUrl] = useState("");
  const [status, setStatus] = useState<"SAVED" | "SAVING" | "ERROR">("SAVED");

  const handleUpload = () => {
    if (!title) {
      alert("Please enter Content Title.");
      return;
    }
    setStatus("SAVING");
    setTimeout(() => {
      setStatus("SAVED");
      alert("Industry learning content successfully uploaded and linked to Institute LMS courses!");
      setTitle("");
      setYoutubeUrl("");
      setGdriveUrl("");
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-purple-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Upload className="w-6 h-6 text-purple-400" />
            <span>Upload Industry Learning Media (YouTube & Drive)</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Share shopfloor demonstration videos and technical manuals directly with ITI students across India.
          </p>
        </div>

        <AutosaveIndicator status={status} />
      </div>

      {/* Upload Form */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Content Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Content Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Live Shopfloor Fanuc Lathe Setup & G-Code Walkthrough"
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Target Trade</label>
            <select
              value={trade}
              onChange={(e) => setTrade(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            >
              <option value="CNC Machinist & Programmer">CNC Machinist & Programmer</option>
              <option value="Industrial Electrician & PLC">Industrial Electrician & PLC</option>
              <option value="Fitter & Quality Inspection">Fitter & Quality Inspection</option>
              <option value="Welder & Metal Fabrication">Welder & Metal Fabrication</option>
            </select>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="relative">
            <Video className="w-4 h-4 text-red-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="YouTube Video Embed URL (e.g. https://youtube.com/watch?v=...)"
              className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-400"
            />
          </div>

          <div className="relative">
            <Folder className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={gdriveUrl}
              onChange={(e) => setGdriveUrl(e.target.value)}
              placeholder="Google Drive Shareable Link (Reading PDF / Blueprint)"
              className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <button
          onClick={handleUpload}
          className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Upload & Publish to LMS Courses</span>
        </button>

      </div>

    </div>
  );
}
