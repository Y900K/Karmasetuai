import React from "react";

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header skeleton */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/90">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div className="h-4 w-32 rounded-lg bg-white/10 animate-pulse" />
            <div className="h-7 w-64 rounded-lg bg-white/10 animate-pulse" />
            <div className="h-3 w-48 rounded-lg bg-white/5 animate-pulse" />
          </div>
          <div className="h-10 w-36 rounded-2xl bg-white/10 animate-pulse" />
        </div>
      </div>

      {/* Metrics row skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-5 rounded-3xl border border-white/10 bg-slate-900/90 space-y-2 text-center">
            <div className="h-3 w-20 mx-auto rounded bg-white/10 animate-pulse" />
            <div className="h-9 w-16 mx-auto rounded-lg bg-white/10 animate-pulse" />
            <div className="h-2.5 w-24 mx-auto rounded bg-white/5 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Content area skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-white/10 bg-slate-900/90 space-y-4">
          <div className="h-5 w-48 rounded-lg bg-white/10 animate-pulse" />
          <div className="h-48 rounded-2xl bg-white/5 animate-pulse" />
        </div>
        <div className="glass-card p-6 rounded-3xl border border-white/10 bg-slate-900/90 space-y-4">
          <div className="h-5 w-36 rounded-lg bg-white/10 animate-pulse" />
          <div className="space-y-3">
            <div className="h-20 rounded-2xl bg-white/5 animate-pulse" />
            <div className="h-20 rounded-2xl bg-white/5 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
