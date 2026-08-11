"use client";

import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-slate-900/90 border border-red-500/30 shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>

        <h2 className="text-xl font-black text-white">Something went wrong</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          An unexpected error occurred. This has been logged and our team will investigate.
        </p>

        {error?.message && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 font-mono break-all">
            {error.message}
          </div>
        )}

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 hover:scale-102 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <a
            href="/"
            className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-white/20 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </a>
        </div>
      </div>
    </div>
  );
}
