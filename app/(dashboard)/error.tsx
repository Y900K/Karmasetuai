"use client";

import React from "react";
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center py-20 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl glass-card border border-red-500/30">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-red-400" />
        </div>

        <h2 className="text-lg font-black text-white">Dashboard Error</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Something went wrong loading this page. Try refreshing or navigate back.
        </p>

        {error?.message && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 font-mono break-all text-left">
            {error.message}
          </div>
        )}

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 hover:scale-102 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </button>

          <a
            href="/"
            className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-white/20 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </a>
        </div>
      </div>
    </div>
  );
}
