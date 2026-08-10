"use client";

import React from "react";
import { Check, RefreshCw, AlertCircle } from "lucide-react";

interface AutosaveIndicatorProps {
  status: "SAVED" | "SAVING" | "ERROR";
  lastSavedAt?: Date | null;
}

export default function AutosaveIndicator({ status, lastSavedAt }: AutosaveIndicatorProps) {
  if (status === "SAVING") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold animate-pulse">
        <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" />
        <span>Saving changes...</span>
      </span>
    );
  }

  if (status === "ERROR") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-bold">
        <AlertCircle className="w-3 h-3 text-red-400" />
        <span>Autosave failed</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
      <Check className="w-3 h-3 text-emerald-400" />
      <span>Draft saved {lastSavedAt ? `at ${lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : "✓"}</span>
    </span>
  );
}
