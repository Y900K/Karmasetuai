"use client";

import React from "react";
import { Award, CheckCircle2, Download, Printer, Shield, Sparkles, X, Cpu } from "lucide-react";
import { Certificate } from "@/lib/courses/types";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate | null;
}

export default function CertificateModal({ isOpen, onClose, certificate }: CertificateModalProps) {
  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040711]/90 backdrop-blur-xl overflow-y-auto certificate-print-mode">
      <div className="glass-card w-full max-w-2xl p-6 sm:p-8 rounded-3xl border border-amber-500/40 relative shadow-2xl bg-[#070b16] my-auto animate-fade-in">
        
        {/* Header Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 no-print">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            <span className="text-sm font-extrabold text-white uppercase tracking-wider">Skill Passport Verified Certificate</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Card Printable Canvas */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0b1329] to-slate-950 border-2 border-amber-500/50 space-y-6 text-center relative overflow-hidden shadow-inner certificate-print-area">
          
          {/* Background Branding Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Cpu className="w-72 h-72 text-amber-400" />
          </div>

          {/* Top Emblem */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-cyan-400 to-emerald-400 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-[#070b16] rounded-[14px] flex items-center justify-center">
                <Award className="w-8 h-8 text-amber-400" />
              </div>
            </div>
          </div>

          {/* Institution Header */}
          <div>
            <div className="text-2xl font-black tracking-tight text-white uppercase">
              Karma<span className="text-cyan-400">Setu</span> AI
            </div>
            <div className="text-[11px] font-bold text-amber-300 uppercase tracking-widest mt-0.5">
              National AI Workforce Intelligence Platform • India
            </div>
          </div>

          {/* Main Award Statement */}
          <div className="space-y-2">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">This Verified Certificate of Practical Mastery is Awarded to</p>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-wide underline underline-offset-8 decoration-amber-500/30">
              {certificate.studentName || "Rajesh Kumar"}
            </h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto pt-2">
              For successfully completing all Video Lectures, Reading Modules, and passing the mandatory 10-Question Comprehensive Examination for:
            </p>
            <div className="text-base sm:text-lg font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 py-2 px-4 rounded-xl inline-block mt-2">
              {certificate.courseTitle || "CNC Lathe Fanuc G-Code Programming"}
            </div>
          </div>

          {/* Score & Verification Footer */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-xs">
            <div className="p-2 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Final Exam Score</div>
              <div className="text-base font-black text-emerald-400">{certificate.quizScore}%</div>
            </div>

            <div className="p-2 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Certificate ID</div>
              <div className="text-xs font-mono font-bold text-amber-300 truncate">{certificate.certificateCode}</div>
            </div>

            <div className="p-2 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Issued Date</div>
              <div className="text-xs font-bold text-slate-200">
                {new Date(certificate.issuedAt || Date.now()).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Bottom Security Seals */}
          <div className="flex items-center justify-between pt-2 text-[10px] text-slate-400 border-t border-white/5">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> NCVT / Industry 4.0 Verified
            </span>
            <span className="flex items-center gap-1 font-mono text-cyan-300">
              <Shield className="w-3.5 h-3.5" /> Tamper-Proof Digital Credential
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
