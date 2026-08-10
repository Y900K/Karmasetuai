"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface ScoreDistProps {
  data?: { range: string; count: number }[];
}

const defaultData = [
  { range: "90-100", count: 85 },
  { range: "80-89", count: 142 },
  { range: "70-79", count: 98 },
  { range: "60-69", count: 34 },
  { range: "<60", count: 12 },
];

export default function ScoreDistributionChart({ data = defaultData }: ScoreDistProps) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#090e1e", borderColor: "#ffffff20", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
          />
          <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Students" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
