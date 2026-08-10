"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface TradeDistributionProps {
  data?: { name: string; value: number; color: string }[];
}

const defaultData = [
  { name: "CNC Machinist", value: 35, color: "#06b6d4" },
  { name: "Electrician", value: 28, color: "#3b82f6" },
  { name: "Fitter & Assembly", value: 20, color: "#8b5cf6" },
  { name: "Welder & Fab", value: 17, color: "#10b981" },
];

export default function TradeDistributionChart({ data = defaultData }: TradeDistributionProps) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="#070b16" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#090e1e", borderColor: "#ffffff20", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
            formatter={(value: any) => [`${value}% Share`, "Trainee Cohort"]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value: string) => <span className="text-xs text-slate-300 font-bold ml-1">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
