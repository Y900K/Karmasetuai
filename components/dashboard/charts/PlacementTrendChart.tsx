"use client";

import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface PlacementTrendProps {
  data?: { month: string; placements: number; target: number }[];
}

const defaultData = [
  { month: "Jan", placements: 45, target: 40 },
  { month: "Feb", placements: 52, target: 45 },
  { month: "Mar", placements: 68, target: 50 },
  { month: "Apr", placements: 74, target: 60 },
  { month: "May", placements: 89, target: 70 },
  { month: "Jun", placements: 112, target: 80 },
];

export default function PlacementTrendChart({ data = defaultData }: PlacementTrendProps) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPlacements" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#090e1e", borderColor: "#ffffff20", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
          />
          <Area type="monotone" dataKey="placements" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPlacements)" name="Actual Placements" />
          <Area type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorTarget)" name="Target" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
