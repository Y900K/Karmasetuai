"use client";

import React, { useState } from "react";
import { Video, Calendar, Clock, Users, Plus, Sparkles, Folder, Download } from "lucide-react";
import AutosaveIndicator from "@/components/dashboard/shared/AutosaveIndicator";

export default function ExpertMasterclassPage() {
  const [sessions, setSessions] = useState([
    { id: "m1", title: "Fanuc Lathe Machine G-Code Optimization & Live Machining", trade: "CNC Machinist", date: "2026-08-15", time: "11:00 AM IST", attendees: 142, status: "UPCOMING", youtubeLiveUrl: "https://www.youtube.com/embed/LXb3EKWsInQ", gdriveNotesUrl: "https://drive.google.com/file/d/123" },
    { id: "m2", title: "3-Phase Motor Diagnostics & VFD Control Circuits", trade: "Industrial Electrician", date: "2026-08-12", time: "02:00 PM IST", attendees: 62, status: "UPCOMING", youtubeLiveUrl: "https://www.youtube.com/embed/S_8nB4sT798", gdriveNotesUrl: "https://drive.google.com/file/d/456" },
    { id: "m3", title: "Precision Micrometer Calibration & ISO Shopfloor Tolerances", trade: "Quality Inspector", date: "2026-08-08", time: "04:00 PM IST", attendees: 85, status: "COMPLETED", youtubeLiveUrl: "https://www.youtube.com/embed/LXb3EKWsInQ", gdriveNotesUrl: "https://drive.google.com/file/d/789" },
  ]);

  const [title, setTitle] = useState("");
  const [trade, setTrade] = useState("CNC Machinist");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [youtubeLiveUrl, setYoutubeLiveUrl] = useState("");
  const [gdriveNotesUrl, setGdriveNotesUrl] = useState("");
  const [saveStatus, setSaveStatus] = useState<"SAVED" | "SAVING" | "ERROR">("SAVED");
  const [liveStreamModal, setLiveStreamModal] = useState<any>(null);

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    const newSession = {
      id: "m-" + Date.now(),
      title,
      trade,
      date,
      time: time || "11:00 AM IST",
      attendees: 0,
      status: "UPCOMING",
      youtubeLiveUrl: youtubeLiveUrl || "https://www.youtube.com/embed/LXb3EKWsInQ",
      gdriveNotesUrl: gdriveNotesUrl || "https://drive.google.com/file/d/123",
    };

    setSessions([newSession, ...sessions]);
    setTitle("");
    setDate("");
    setTime("");
    setYoutubeLiveUrl("");
    setGdriveNotesUrl("");
    setSaveStatus("SAVING");
    setTimeout(() => setSaveStatus("SAVED"), 500);
  };

  return (
    <div className="space-y-6 animate-fade-in printable-area">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-purple-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Video className="w-6 h-6 text-purple-400" />
            <span>Industry 4.0 Masterclass Manager</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Schedule live practical workshop demonstrations & attach Google Drive supplementary notes for ITI trainees across India.
          </p>
        </div>

        <AutosaveIndicator status={saveStatus} />
      </div>

      {/* Schedule Form */}
      <form onSubmit={handleCreateSession} className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90 no-print">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Schedule New Masterclass Session</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Session Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fanuc Lathe G-Code Optimization & Real-Time Machining"
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Target Trade Specialization</label>
            <select
              value={trade}
              onChange={(e) => setTrade(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            >
              <option value="CNC Machinist">CNC Machinist & Programmer</option>
              <option value="Industrial Electrician">Industrial Electrician & PLC</option>
              <option value="Fitter">Fitter & Assembly</option>
              <option value="Welder">Welder & Fabrication</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Scheduled Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Scheduled Time (IST)</label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 11:00 AM IST"
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">YouTube Live Broadcast URL</label>
            <input
              type="url"
              value={youtubeLiveUrl}
              onChange={(e) => setYoutubeLiveUrl(e.target.value)}
              placeholder="e.g. https://www.youtube.com/watch?v=LXb3EKWsInQ"
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Google Drive Supplementary Notes Link</label>
            <input
              type="url"
              value={gdriveNotesUrl}
              onChange={(e) => setGdriveNotesUrl(e.target.value)}
              placeholder="e.g. https://drive.google.com/file/d/123..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Masterclass Event</span>
          </button>
        </div>
      </form>

      {/* Scheduled Masterclasses List */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Scheduled Masterclass Sessions</h3>

        <div className="space-y-3">
          {sessions.map((s) => (
            <div key={s.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-3 hover:bg-white/10 transition-all">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-extrabold uppercase">
                    {s.trade}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${s.status === "UPCOMING" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "bg-slate-800 text-slate-400"}`}>
                    {s.status}
                  </span>
                </div>
                <h4 className="text-sm font-extrabold text-white">{s.title}</h4>
                <div className="flex items-center gap-4 text-xs text-slate-400 font-bold">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-purple-400" /> {s.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-purple-400" /> {s.time}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-emerald-400" /> {s.attendees} Registered</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {s.gdriveNotesUrl && (
                  <a
                    href={s.gdriveNotesUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Folder className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Download Notes</span>
                  </a>
                )}

                <button
                  onClick={() => setLiveStreamModal(s)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Launch Live Stream</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Stream Room Modal with Embed Player & Notes Button */}
      {liveStreamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card max-w-2xl w-full p-6 rounded-3xl border border-purple-500/40 bg-[#090d1a] space-y-4 shadow-2xl relative animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-extrabold text-purple-300 uppercase flex items-center gap-2">
                <Video className="w-4 h-4 text-purple-400" /> LIVE MASTERCLASS WORKSHOP STREAM
              </span>
              <button
                onClick={() => setLiveStreamModal(null)}
                className="text-xs text-slate-400 hover:text-white font-bold px-2.5 py-1 bg-white/5 rounded-lg border border-white/10"
              >
                ✕ Close
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl bg-black border border-purple-500/30 overflow-hidden relative">
              <iframe
                src={liveStreamModal.youtubeLiveUrl || "https://www.youtube.com/embed/LXb3EKWsInQ"}
                title={liveStreamModal.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <div>
                <h4 className="text-sm font-extrabold text-white">{liveStreamModal.title}</h4>
                <p className="text-xs text-slate-400">Scheduled for {liveStreamModal.date} at {liveStreamModal.time}</p>
              </div>

              {liveStreamModal.gdriveNotesUrl && (
                <a
                  href={liveStreamModal.gdriveNotesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-extrabold text-xs shadow-md flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-black" />
                  <span>Download Notes (Google Drive)</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
