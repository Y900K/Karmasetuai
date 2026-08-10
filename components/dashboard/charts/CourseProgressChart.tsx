"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface CourseProgressProps {
  data?: { courseTitle: string; avgCompletion: number; certsIssued: number }[];
}

const defaultData = [
  { courseTitle: "CNC Fanuc Programming", avgCompletion: 92, certsIssued: 48 },
  { courseTitle: "3-Phase Motor Diagnostics", avgCompletion: 84, certsIssued: 36 },
  { courseTitle: "5S Industrial Safety", avgCompletion: 96, certsIssued: 52 },
  { courseTitle: "Precision Calibration", avgCompletion: 78, certsIssued: 28 },
];

export default function CourseProgressChart({ data = defaultData }: CourseProgressProps) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis dataKey="courseTitle" stroke="#94a3b8" fontSize={10} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit="%" />
          <Tooltip
            contentStyle={{ backgroundColor: "#090e1e", borderColor: "#ffffff20", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
          />
          <Bar dataKey="avgCompletion" fill="#10b981" radius={[6, 6, 0, 0]} name="Avg Completion %" />
          <Bar dataKey="certsIssued" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Certificates Issued" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
