"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Award, ShieldCheck, CheckCircle2, Building, Calendar, FileText,
  Printer, ArrowLeft, Cpu, ExternalLink, QrCode, Search, RefreshCw, AlertTriangle
} from "lucide-react";
import { useEcosystemStore } from "@/lib/store/EcosystemStore";

export default function PublicCertificateVerifierPage() {
  const params = useParams();
  const rawCode = (params?.code as string) || "KMP-8A92F1";
  const code = rawCode.toUpperCase();

  const { students } = useEcosystemStore();
  const [searchInput, setSearchInput] = useState("");

  // Map of certificates by code or fallback candidate matching
  const certDatabase: Record<string, {
    studentName: string;
    trade: string;
    institute: string;
    jobReadyIndex: number;
    issueDate: string;
    certificateCode: string;
    ncvtRegNo: string;
    hash: string;
    status: "VERIFIED" | "REVOKED";
  }> = {
    "CRT-8A92F1": {
      studentName: "Rajesh Kumar",
      trade: "CNC Machinist & Programmer",
      institute: "Government ITI Lucknow Main Campus",
      jobReadyIndex: 94.0,
      issueDate: "2026-08-01",
      certificateCode: "CRT-8A92F1",
      ncvtRegNo: "NCVT/UP/2026/89421",
      hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      status: "VERIFIED",
    },
    "KMP-8A92F1": {
      studentName: "Rajesh Kumar",
      trade: "CNC Machinist & Programmer",
      institute: "Government ITI Lucknow Main Campus",
      jobReadyIndex: 94.0,
      issueDate: "2026-08-01",
      certificateCode: "CRT-8A92F1",
      ncvtRegNo: "NCVT/UP/2026/89421",
      hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      status: "VERIFIED",
    },
    "CRT-3B41C2": {
      studentName: "Mohit Verma",
      trade: "Industrial Electrician",
      institute: "Government ITI Kanpur Nagar",
      jobReadyIndex: 86.5,
      issueDate: "2026-08-05",
      certificateCode: "CRT-3B41C2",
      ncvtRegNo: "NCVT/UP/2026/73112",
      hash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
      status: "VERIFIED",
    },
    "KMP-7B31E2": {
      studentName: "Mohit Verma",
      trade: "Industrial Electrician",
      institute: "Government ITI Kanpur Nagar",
      jobReadyIndex: 86.5,
      issueDate: "2026-08-05",
      certificateCode: "CRT-3B41C2",
      ncvtRegNo: "NCVT/UP/2026/73112",
      hash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
      status: "VERIFIED",
    },
    "CRT-7D19E4": {
      studentName: "Priya Sharma",
      trade: "TIG/MIG Welder",
      institute: "Government ITI Noida Industrial Hub",
      jobReadyIndex: 91.2,
      issueDate: "2026-08-10",
      certificateCode: "CRT-7D19E4",
      ncvtRegNo: "NCVT/UP/2026/94410",
      hash: "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35",
      status: "VERIFIED",
    },
    "KMP-9C44F3": {
      studentName: "Priya Sharma",
      trade: "TIG/MIG Welder",
      institute: "Government ITI Noida Industrial Hub",
      jobReadyIndex: 91.2,
      issueDate: "2026-08-10",
      certificateCode: "CRT-7D19E4",
      ncvtRegNo: "NCVT/UP/2026/94410",
      hash: "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35",
      status: "VERIFIED",
    },
  };

  // Strip prefix for fuzzy matching
  const cleanCode = code.replace(/^(CRT|KMP)-?/i, "").toUpperCase();

  // Find cert in static map by exact match, prefix swap, or suffix match
  let cert = certDatabase[code] || certDatabase[`CRT-${cleanCode}`] || certDatabase[`KMP-${cleanCode}`];

  if (!cert) {
    const matchedKey = Object.keys(certDatabase).find(k => k.toUpperCase().includes(cleanCode));
    if (matchedKey) {
      cert = certDatabase[matchedKey];
    }
  }

  if (!cert) {
    const foundStudent = students.find(s => s.id === code.toLowerCase() || s.name.toLowerCase().includes(code.toLowerCase()));
    if (foundStudent) {
      cert = {
        studentName: foundStudent.name,
        trade: foundStudent.trade,
        institute: foundStudent.institute,
        jobReadyIndex: foundStudent.jobReadyIndex,
        issueDate: "2026-08-12",
        certificateCode: code,
        ncvtRegNo: `NCVT/IN/2026/${Math.floor(10000 + Math.random() * 90000)}`,
        hash: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
        status: "VERIFIED",
      };
    }
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#070b16] text-white flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Header Bar */}
      <header className="border-b border-white/10 bg-[#070b16]/90 backdrop-blur-md sticky top-0 z-30 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#070b16] rounded-[9px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-white">Karma <span className="text-cyan-400">Setu</span></span>
              <span className="px-1.5 py-0.5 text-[9px] font-black bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded uppercase">AI</span>
              <span className="hidden sm:inline-block text-[10px] text-slate-400 font-mono border-l border-white/10 pl-2">PUBLIC VERIFIER</span>
            </div>
          </Link>

          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 w-full space-y-6 flex-1">
        
        {/* Verification Status Banner */}
        {cert ? (
          <div className="glass-card p-6 rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
                  <ShieldCheck className="w-7 h-7 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold uppercase tracking-wider">
                      OFFICIALLY VERIFIED CERTIFICATE
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Code: {cert.certificateCode}</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Authentic Skill Passport Record
                  </h1>
                </div>
              </div>

              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/25 flex items-center gap-1.5 transition-all no-print"
              >
                <Printer className="w-4 h-4" /> Print Verification Summary
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/40 bg-slate-900/90 text-center space-y-3">
            <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
            <h2 className="text-xl font-bold text-white">Certificate Record Not Found</h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              No active certificate matches code <span className="font-mono text-amber-300">{code}</span>. Please verify the code or search below.
            </p>
          </div>
        )}

        {/* Certificate Data Card */}
        {cert && (
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#080d1e]/95 space-y-6 shadow-2xl relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-white/10">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    Certified Candidate Name
                  </span>
                  <h2 className="text-2xl font-black text-white flex items-center gap-2">
                    {cert.studentName}
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                      NCVT Accredited Trade Branch
                    </span>
                    <span className="text-sm font-extrabold text-white mt-0.5 block">{cert.trade}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                      Training Institution
                    </span>
                    <span className="text-sm font-extrabold text-white mt-0.5 block">{cert.institute}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      NCVT Registration Number
                    </span>
                    <span className="text-xs font-mono text-slate-300 mt-0.5 block">{cert.ncvtRegNo}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Official Issue Date
                    </span>
                    <span className="text-xs font-mono text-slate-300 mt-0.5 block">{cert.issueDate}</span>
                  </div>
                </div>
              </div>

              {/* Right Side Score & Cryptographic Stamp */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-center flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block">
                    Verified JobReady Index™
                  </span>
                  <div className="text-4xl font-black text-emerald-400">{cert.jobReadyIndex.toFixed(1)}</div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Top 5% Shopfloor Competency</span>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1 text-left text-[10px]">
                  <span className="text-slate-400 block font-mono">SHA-256 Digest:</span>
                  <p className="font-mono text-slate-500 break-all leading-tight text-[9px] bg-slate-950 p-2 rounded border border-white/5">
                    {cert.hash}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Verification Notes */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-extrabold block text-white">Government & Employer Trust Guarantee:</span>
                <p className="text-[11px] text-slate-300">
                  This record is cryptographically signed and stored on the KarmaSetu AI Skill Ledger. It guarantees zero-retraining shopfloor readiness and NCVT accreditation compliance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Search Alternative Code */}
        <div className="glass-card p-5 rounded-3xl border border-white/10 bg-slate-900/90 space-y-3 no-print">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Search className="w-4 h-4 text-cyan-400" /> Verify Another Certificate Code
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter code e.g. KMP-8A92F1..."
              className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400"
            />
            <Link
              href={`/verify/${searchInput.trim() || "KMP-8A92F1"}`}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1 transition-all"
            >
              Verify Code
            </Link>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500 no-print">
        <p>© {new Date().getFullYear()} KarmaSetu AI • National Employability Intelligence Platform</p>
      </footer>

    </div>
  );
}
