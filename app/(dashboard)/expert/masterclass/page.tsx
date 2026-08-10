"use client";

import React, { useState } from "react";
import { Video, Calendar, Users, Plus, Sparkles, CheckCircle2, Clock } from "lucide-react";
import AutosaveIndicator from "@/components/dashboard/shared/AutosaveIndicator";

export default function ExpertMasterclassPage() {
  const [sessions, setSessions] = useState([
    { id: "m1", title: "Fanuc CNC G-Code Optimization & Cycle Time Reduction", trade: "CNC Machinist", date: "2026-08-15", time: "11:00 AM IST", attendees: 48, status: "UPCOMING" },
    { id: "m2", title: "3-Phase Motor Diagnostics & VFD Control Circuits", trade: "Industrial Electrician", date: "2026-08-12", time: "02:00 PM IST", attendees: 62, status: "UPCOMING" },
    { id: "m3", title: "Precision Micrometer Calibration & ISO Shopfloor Tolerances", trade: "Quality Inspector", date: "2026-08-08", time: "04:00 PM IST", attendees: 85, status: "COMPLETED" },
  ]);

  const [title, setTitle] = useState("");
  const [trade, setTrade] = useState("CNC Machinist");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [link, setLink] = useState("");
  const [saveStatus, setSaveStatus] = useState<"SAVED" | "SAVING" | "ERROR">("SAVED");

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
    };

    setSessions([newSession, ...sessions]);
    setTitle("");
    setDate("");
    setTime("");
    setLink("");
    setSaveStatus("SAVING");
    setTimeout(() => setSaveStatus("SAVED"), 500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-purple-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Video className="w-6 h-6 text-purple-400" />
            <span>Industry 4.0 Masterclass Manager</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Schedule live practical workshop demonstrations for ITI trainees across India.
          </p>
        </div>

        <AutosaveIndicator status={saveStatus} />
      </div>

      {/* Schedule Masterclass Form */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-400" /> Schedule Live Masterclass Session
        </h3>

        <form onSubmit={handleCreateSession} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Session Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Advanced TIG Welding & Argon Shielding Technique"
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
                <option value="CNC Machinist">CNC Machinist & Programmer</option>
                <option value="Industrial Electrician">Industrial Electrician</option>
                <option value="Mechanical Fitter">Mechanical Fitter & Assembly</option>
                <option value="TIG/MIG Welder">TIG/MIG Welder</option>
                <option value="Quality Inspector">QA/QC Quality Inspector</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Time & Duration</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 11:00 AM IST (60 Minutes)"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20 flex items-center gap-1.5 transition-all hover:scale-102"
          >
            <Plus className="w-4 h-4 text-white" /> Schedule Masterclass
          </button>
        </form>
      </div>

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

              <button className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-extrabold text-xs transition-all shadow-md">
                Launch Live Stream ➔
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
