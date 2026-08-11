"use client";

import React, { useState } from "react";
import { CreditCard, Download, Shield, Award, CheckCircle2, QrCode, Printer, Cpu } from "lucide-react";
import CertificateModal from "@/components/dashboard/learning/CertificateModal";

export default function StudentPassportPage() {
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const sampleCertificates = [
    {
      id: "cert-1",
      certificateCode: "CRT-8A92F1",
      courseTitle: "CNC Lathe Fanuc G-Code Programming",
      quizScore: 96,
      issuedAt: "2026-08-01",
    },
    {
      id: "cert-2",
      certificateCode: "CRT-3B41C2",
      courseTitle: "Precision Micrometer & Vernier Calibration",
      quizScore: 92,
      issuedAt: "2026-07-20",
    },
    {
      id: "cert-3",
      certificateCode: "CRT-7D19E4",
      courseTitle: "5S Industrial Safety & Shopfloor Compliance",
      quizScore: 94,
      issuedAt: "2026-07-10",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in printable-area">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-cyan-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-cyan-400" />
            <span>Digital Skill Passport & Verified Badges</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Tamper-proof digital credentials verified on Skill India NCVT Standards.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20 no-print"
        >
          <Printer className="w-4 h-4 text-black" /> Print / PDF Skill Passport
        </button>
      </div>

      {/* Main Passport Visual Card */}
      <div className="max-w-xl mx-auto glass-card p-6 sm:p-8 rounded-3xl border-2 border-cyan-500/50 bg-gradient-to-br from-slate-900 via-[#070e20] to-slate-950 shadow-2xl relative overflow-hidden space-y-6">
        
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#070b16] rounded-[14px] flex items-center justify-center">
                <Cpu className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="text-lg font-black text-white">Karma<span className="text-cyan-400">Setu</span> AI</div>
              <div className="text-[10px] font-extrabold text-cyan-300 uppercase tracking-widest">Digital Skill Passport</div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono font-bold text-amber-300">KMP-8A92F1</span>
            <div className="text-[9px] text-emerald-400 font-bold flex items-center justify-end gap-1">
              <CheckCircle2 className="w-3 h-3" /> VERIFIED
            </div>
          </div>
        </div>

        {/* Student Info & Photo Box */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 text-black font-black text-xl flex items-center justify-center flex-shrink-0 shadow-md">
            RK
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Rajesh Kumar</h2>
            <p className="text-xs text-slate-300">CNC Machinist & Programmer</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Govt ITI Lucknow • Passing Year 2026</p>
          </div>
        </div>

        {/* Scores Breakdown */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="text-[10px] text-slate-400 font-bold uppercase">JobReady Index™</div>
            <div className="text-xl font-black text-emerald-400">94.0</div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Technical</div>
            <div className="text-xl font-black text-cyan-300">96.0</div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Practical</div>
            <div className="text-xl font-black text-amber-400">92.0</div>
          </div>
        </div>

      </div>

      {/* Earned Certificates List */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Earned Verified Skill Certificates ({sampleCertificates.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleCertificates.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-amber-300 font-bold">{c.certificateCode}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{c.quizScore}% Exam Score</span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1.5">{c.courseTitle}</h4>
              </div>

              <button
                onClick={() => setSelectedCert(c)}
                className="w-full py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-extrabold text-xs transition-all"
              >
                View / Print Certificate 📜
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        certificate={selectedCert}
      />

    </div>
  );
}
