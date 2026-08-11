"use client";

import React from "react";
import { Search, Filter, ArrowUpDown, X, RotateCcw } from "lucide-react";
import { FilterState } from "@/lib/hooks/useFilterSort";

interface FilterBarProps {
  filters: FilterState;
  onUpdate: (newFilters: Partial<FilterState>) => void;
  onClear: () => void;
  options?: {
    states?: string[];
    districts?: string[];
    trades?: string[];
    statuses?: string[];
    sortOptions?: { id: string; label: string }[];
  };
  placeholder?: string;
}

export default function FilterBar({
  filters,
  onUpdate,
  onClear,
  options = {},
  placeholder = "Search by keyword, trade, district...",
}: FilterBarProps) {
  const defaultSortOptions = [
    { id: "name", label: "Name" },
    { id: "score", label: "JobReady Score / Placement %" },
    { id: "date", label: "Date / Recent" },
  ];

  const sortList = options.sortOptions || defaultSortOptions;

  const hasActiveFilters = Boolean(
    filters.search || filters.state || filters.district || filters.trade || filters.status
  );

  return (
    <div className="glass-card p-4 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90 shadow-lg no-print">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onUpdate({ search: e.target.value })}
            placeholder={placeholder}
            className="w-full bg-slate-950 border border-white/10 rounded-2xl pl-10 pr-8 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          {filters.search && (
            <button
              onClick={() => onUpdate({ search: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* State Select */}
        {options.states && options.states.length > 0 && (
          <select
            value={filters.state}
            onChange={(e) => onUpdate({ state: e.target.value })}
            className="bg-slate-950 border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="">All States</option>
            {options.states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        )}

        {/* District Select */}
        {options.districts && options.districts.length > 0 && (
          <select
            value={filters.district}
            onChange={(e) => onUpdate({ district: e.target.value })}
            className="bg-slate-950 border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="">All Districts</option>
            {options.districts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        )}

        {/* Trade Select */}
        {options.trades && options.trades.length > 0 && (
          <select
            value={filters.trade}
            onChange={(e) => onUpdate({ trade: e.target.value })}
            className="bg-slate-950 border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="">All Trades</option>
            {options.trades.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        )}

        {/* Status Select */}
        {options.statuses && options.statuses.length > 0 && (
          <select
            value={filters.status}
            onChange={(e) => onUpdate({ status: e.target.value })}
            className="bg-slate-950 border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="">All Statuses</option>
            {options.statuses.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        )}

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-1.5 bg-slate-950 border border-white/10 rounded-2xl px-3 py-1">
          <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
          <select
            value={filters.sortBy}
            onChange={(e) => onUpdate({ sortBy: e.target.value })}
            className="bg-transparent text-xs text-white focus:outline-none py-1.5"
          >
            {sortList.map((so) => (
              <option key={so.id} value={so.id} className="bg-slate-900">{so.label}</option>
            ))}
          </select>

          <button
            onClick={() => onUpdate({ sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" })}
            className="text-[10px] font-black px-2 py-1 rounded bg-white/10 text-amber-300 hover:bg-white/20 uppercase"
            title="Toggle Sort Order"
          >
            {filters.sortOrder}
          </button>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="px-3 py-2 rounded-2xl bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-bold flex items-center gap-1 hover:bg-red-500/30 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>
    </div>
  );
}
