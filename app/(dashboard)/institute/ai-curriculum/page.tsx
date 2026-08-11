"use client";

import React, { useState } from "react";
import { Brain, Sparkles, RefreshCw, CheckCircle2, AlertTriangle, Building, GitFork, Layers, Target } from "lucide-react";
import { useEcosystemStore } from "@/lib/store/EcosystemStore";

interface BrainmapNode {
  name: string;
  sub: string;
  desc: string;
  hours: number;
  prereq: string;
  colorClass: string;
}

const TRADE_BRAINMAP_CONFIGS: Record<string, { rootSub: string; nodes: BrainmapNode[] }> = {
  "CNC Machinist": {
    rootSub: "Machinist Base",
    nodes: [
      { name: "G-Code / PLC Control", sub: "Control Logic", desc: "Fanuc lathe programming, axis interpolation, and M-Code spindle control.", hours: 40, prereq: "NCVT Core", colorClass: "bg-cyan-500/30 border-cyan-400 text-white shadow-cyan-500/30" },
      { name: "Precision Calibration", sub: "±0.01mm Tolerance", desc: "Micrometer & Vernier caliper calibration down to ±0.01mm tolerance.", hours: 25, prereq: "NCVT Core", colorClass: "bg-amber-500/30 border-amber-400 text-white shadow-amber-500/30" },
      { name: "Fanuc DXF Import", sub: "CAD/CAM Sync", desc: "Direct CAD/CAM DXF file import to Fanuc controller for automatic toolpathing.", hours: 15, prereq: "G-Code / PLC", colorClass: "bg-purple-500/30 border-purple-400 text-white shadow-purple-500/30" },
      { name: "5S Shopfloor Safety", sub: "Safety Protocol", desc: "Workplace organisation, hazard identification, and ISO 45001 safety compliance.", hours: 20, prereq: "Precision Calib", colorClass: "bg-emerald-500/30 border-emerald-400 text-white shadow-emerald-500/30" },
    ],
  },
  "Industrial Electrician": {
    rootSub: "Electrical Base",
    nodes: [
      { name: "3-Phase Motor Wiring", sub: "Star-Delta Controls", desc: "Industrial 3-phase motor wiring, Star-Delta starter assembly, and relay control.", hours: 35, prereq: "NCVT Core", colorClass: "bg-cyan-500/30 border-cyan-400 text-white shadow-cyan-500/30" },
      { name: "PLC Sensor Interfacing", sub: "Siemens S7-1200", desc: "Proximity sensor, thermocouple, and solenoid valve ladder logic programming.", hours: 45, prereq: "NCVT Core", colorClass: "bg-amber-500/30 border-amber-400 text-white shadow-amber-500/30" },
      { name: "VFD Speed Control", sub: "AC Drives", desc: "Variable Frequency Drive parameter tuning and Modbus RS485 network setup.", hours: 20, prereq: "3-Phase Motor Wiring", colorClass: "bg-purple-500/30 border-purple-400 text-white shadow-purple-500/30" },
      { name: "IE Rules Safety", sub: "Lockout / Tagout", desc: "Indian Electricity Rules, high voltage LOTO safety procedures, and earthing audits.", hours: 15, prereq: "PLC Sensor Interfacing", colorClass: "bg-emerald-500/30 border-emerald-400 text-white shadow-emerald-500/30" },
    ],
  },
  "Fitter": {
    rootSub: "Mechanical Base",
    nodes: [
      { name: "Bench Work & Limits", sub: "H7/g6 Fits", desc: "Precision filing, drilling, tapping, and ISO limit/fit shaft clearance calculations.", hours: 40, prereq: "NCVT Core", colorClass: "bg-cyan-500/30 border-cyan-400 text-white shadow-cyan-500/30" },
      { name: "Hydraulic Pneumatics", sub: "Fluid Power", desc: "Directional control valve circuits, pneumatic cylinder piping, and pressure relief.", hours: 30, prereq: "NCVT Core", colorClass: "bg-amber-500/30 border-amber-400 text-white shadow-amber-500/30" },
      { name: "CMM Metrology", sub: "Quality Inspection", desc: "Coordinate Measuring Machine probe calibration and GD&T geometric tolerance checks.", hours: 25, prereq: "Bench Work & Limits", colorClass: "bg-purple-500/30 border-purple-400 text-white shadow-purple-500/30" },
      { name: "Preventive Maintenance", sub: "TPM Practices", desc: "Total Productive Maintenance, bearing replacement, and spindle lubrication protocols.", hours: 20, prereq: "Hydraulic Pneumatics", colorClass: "bg-emerald-500/30 border-emerald-400 text-white shadow-emerald-500/30" },
    ],
  },
  "Welder": {
    rootSub: "Fabrication Base",
    nodes: [
      { name: "SMAW & GMAW / MIG", sub: "Multi-Pass Joints", desc: "Shielded Metal Arc & Gas Metal Arc Welding in 1G, 2G, and 3F position joints.", hours: 50, prereq: "NCVT Core", colorClass: "bg-cyan-500/30 border-cyan-400 text-white shadow-cyan-500/30" },
      { name: "GTAW / TIG Stainless", sub: "Argon Purging", desc: "TIG welding of SS304 pipes and aluminum plates with high frequency arc stabilization.", hours: 35, prereq: "NCVT Core", colorClass: "bg-amber-500/30 border-amber-400 text-white shadow-amber-500/30" },
      { name: "NDT Weld Inspection", sub: "Dye Penetrant / UT", desc: "Non-destructive testing liquid penetrant inspection and ultrasonic flaw detection.", hours: 20, prereq: "SMAW & GMAW / MIG", colorClass: "bg-purple-500/30 border-purple-400 text-white shadow-purple-500/30" },
      { name: "ISO 3834 Quality", sub: "WPS Compliance", desc: "Welding Procedure Specification (WPS) adherence and shopfloor fume safety.", hours: 15, prereq: "GTAW / TIG Stainless", colorClass: "bg-emerald-500/30 border-emerald-400 text-white shadow-emerald-500/30" },
    ],
  },
  "OTHER": {
    rootSub: "Custom Trade Base",
    nodes: [
      { name: "Core Technical Competencies", sub: "Trade Foundation", desc: "Essential trade fundamentals, tool safety, and shopfloor operations.", hours: 40, prereq: "NCVT Core", colorClass: "bg-cyan-500/30 border-cyan-400 text-white shadow-cyan-500/30" },
      { name: "Specialized Equipment", sub: "Hands-on Operations", desc: "Hands-on calibration and operation of trade-specific machinery.", hours: 30, prereq: "NCVT Core", colorClass: "bg-amber-500/30 border-amber-400 text-white shadow-amber-500/30" },
      { name: "Industry 4.0 Digitalization", sub: "Smart Integration", desc: "Digital data logging, sensor monitoring, and automated process controls.", hours: 25, prereq: "Core Technical Competencies", colorClass: "bg-purple-500/30 border-purple-400 text-white shadow-purple-500/30" },
      { name: "EHS & Quality Control", sub: "Safety & Compliance", desc: "Environmental Health & Safety protocols, ISO quality standards, and lean manufacturing.", hours: 20, prereq: "Specialized Equipment", colorClass: "bg-emerald-500/30 border-emerald-400 text-white shadow-emerald-500/30" },
    ],
  },
};

export default function AiCurriculumPage() {
  const { districts } = useEcosystemStore();
  const [tradeSelect, setTradeSelect] = useState("CNC Machinist");
  const [customTrade, setCustomTrade] = useState("");
  const trade = tradeSelect === "OTHER" ? (customTrade || "Custom Trade") : tradeSelect;

  const [syllabus, setSyllabus] = useState("NCVT 2-Year CNC Machinist Syllabus: Lathe Operations, Milling, Safety, Basic G-Code.");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const activeBrainmapConfig = TRADE_BRAINMAP_CONFIGS[tradeSelect] || TRADE_BRAINMAP_CONFIGS["OTHER"];

  const [selectedNode, setSelectedNode] = useState<{ name: string; desc: string; hours: number; prereq: string }>({
    name: "Fanuc DXF Import",
    desc: "Direct CAD/CAM DXF file import to Fanuc controller for automatic toolpath generation.",
    hours: 15,
    prereq: "G-Code / PLC Control Logic"
  });

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/curriculum-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ syllabus, trade, targetCompanies: ["Tata Motors", "Havells", "L&T"] })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in printable-area">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-blue-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-400" />
            <span>AI NCVT Curriculum Gap Analyzer & Skill Brainmap</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Generate visual skill dependency node-graphs & compare your ITI syllabus against live shopfloor demand.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-900/90">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Select Trade Specialization</label>
            <select
              value={tradeSelect}
              onChange={(e) => setTradeSelect(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
            >
              <option value="CNC Machinist">CNC Machinist & Programmer</option>
              <option value="Industrial Electrician">Industrial Electrician & PLC</option>
              <option value="Fitter">Fitter & Quality Inspection</option>
              <option value="Welder">Welder & Fabrication</option>
              <option value="OTHER">OTHER (Specify Custom Trade)</option>
            </select>

            {tradeSelect === "OTHER" && (
              <input
                type="text"
                required
                value={customTrade}
                onChange={(e) => setCustomTrade(e.target.value)}
                placeholder="Specify custom trade (e.g. Mechatronics, Tool & Die)..."
                className="w-full mt-2 bg-slate-950 border border-cyan-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Current Syllabus Summary / Topics Input</label>
          <textarea
            rows={3}
            value={syllabus}
            onChange={(e) => setSyllabus(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-400"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-102 no-print"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin text-black" /> : <Sparkles className="w-4 h-4 text-black" />}
          <span>Run AI Curriculum & Brainmap Analysis</span>
        </button>
      </div>

      {loading && (
        <div className="glass-card p-6 rounded-3xl border border-blue-500/30 text-center py-8 text-xs text-blue-300 font-bold flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
          <span>Synthesizing Skill Dependency Brainmap & Comparing Live Industry Data...</span>
        </div>
      )}

      {/* Visual Skill Dependency Brainmap / Mindmap Node Graph */}
      <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-4 bg-slate-900/90">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-extrabold text-purple-300 uppercase flex items-center gap-2">
            <GitFork className="w-4 h-4 text-purple-400" /> INTERACTIVE SKILL DEPENDENCY BRAINMAP ({trade})
          </span>
          <span className="text-xs text-slate-400 font-mono">Click Nodes to Inspect Skill Dependencies</span>
        </div>

        <div className="relative w-full h-64 bg-[#060a17] rounded-2xl border border-purple-500/20 p-4 flex items-center justify-between overflow-hidden">
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-purple-500/40" strokeWidth="2" strokeDasharray="4">
            <line x1="15%" y1="50%" x2="40%" y2="25%" />
            <line x1="15%" y1="50%" x2="40%" y2="75%" />
            <line x1="40%" y1="25%" x2="70%" y2="25%" />
            <line x1="40%" y1="75%" x2="70%" y2="75%" />
            <line x1="70%" y1="25%" x2="90%" y2="50%" />
            <line x1="70%" y1="75%" x2="90%" y2="50%" />
          </svg>

          {/* Node 1: Root Syllabus */}
          <div
            onClick={() => setSelectedNode({ name: "NCVT Core Syllabus", desc: `Base accredited NCVT 2-year ${trade} curriculum.`, hours: 200, prereq: "Secondary Education" })}
            className={`z-10 p-3 rounded-2xl border cursor-pointer transition-all hover:scale-105 text-center text-xs ${selectedNode.name.includes("NCVT") ? "bg-blue-500/30 border-blue-400 text-white shadow-lg shadow-blue-500/30" : "bg-blue-500/10 border-blue-500/30 text-blue-300"}`}
          >
            <div className="font-extrabold">NCVT Core</div>
            <div className="text-[10px] text-slate-400">{activeBrainmapConfig.rootSub}</div>
          </div>

          {/* Node 2 & 3: Intermediate Skills */}
          <div className="z-10 flex flex-col gap-12">
            <div
              onClick={() => setSelectedNode({ name: activeBrainmapConfig.nodes[0].name, desc: activeBrainmapConfig.nodes[0].desc, hours: activeBrainmapConfig.nodes[0].hours, prereq: activeBrainmapConfig.nodes[0].prereq })}
              className={`p-3 rounded-2xl border cursor-pointer transition-all hover:scale-105 text-center text-xs ${selectedNode.name === activeBrainmapConfig.nodes[0].name ? "bg-cyan-500/30 border-cyan-400 text-white shadow-lg shadow-cyan-500/30" : activeBrainmapConfig.nodes[0].colorClass}`}
            >
              <div className="font-extrabold">{activeBrainmapConfig.nodes[0].name}</div>
              <div className="text-[10px] text-slate-400">{activeBrainmapConfig.nodes[0].sub}</div>
            </div>

            <div
              onClick={() => setSelectedNode({ name: activeBrainmapConfig.nodes[1].name, desc: activeBrainmapConfig.nodes[1].desc, hours: activeBrainmapConfig.nodes[1].hours, prereq: activeBrainmapConfig.nodes[1].prereq })}
              className={`p-3 rounded-2xl border cursor-pointer transition-all hover:scale-105 text-center text-xs ${selectedNode.name === activeBrainmapConfig.nodes[1].name ? "bg-amber-500/30 border-amber-400 text-white shadow-lg shadow-amber-500/30" : activeBrainmapConfig.nodes[1].colorClass}`}
            >
              <div className="font-extrabold">{activeBrainmapConfig.nodes[1].name}</div>
              <div className="text-[10px] text-slate-400">{activeBrainmapConfig.nodes[1].sub}</div>
            </div>
          </div>

          {/* Node 4 & 5: Advanced Industry 4.0 Additions */}
          <div className="z-10 flex flex-col gap-12">
            <div
              onClick={() => setSelectedNode({ name: activeBrainmapConfig.nodes[2].name, desc: activeBrainmapConfig.nodes[2].desc, hours: activeBrainmapConfig.nodes[2].hours, prereq: activeBrainmapConfig.nodes[2].prereq })}
              className={`p-3 rounded-2xl border cursor-pointer transition-all hover:scale-105 text-center text-xs ${selectedNode.name === activeBrainmapConfig.nodes[2].name ? "bg-purple-500/30 border-purple-400 text-white shadow-lg shadow-purple-500/30" : activeBrainmapConfig.nodes[2].colorClass}`}
            >
              <div className="font-extrabold">{activeBrainmapConfig.nodes[2].name}</div>
              <div className="text-[10px] text-slate-400">{activeBrainmapConfig.nodes[2].sub}</div>
            </div>

            <div
              onClick={() => setSelectedNode({ name: activeBrainmapConfig.nodes[3].name, desc: activeBrainmapConfig.nodes[3].desc, hours: activeBrainmapConfig.nodes[3].hours, prereq: activeBrainmapConfig.nodes[3].prereq })}
              className={`p-3 rounded-2xl border cursor-pointer transition-all hover:scale-105 text-center text-xs ${selectedNode.name === activeBrainmapConfig.nodes[3].name ? "bg-emerald-500/30 border-emerald-400 text-white shadow-lg shadow-emerald-500/30" : activeBrainmapConfig.nodes[3].colorClass}`}
            >
              <div className="font-extrabold">{activeBrainmapConfig.nodes[3].name}</div>
              <div className="text-[10px] text-slate-400">{activeBrainmapConfig.nodes[3].sub}</div>
            </div>
          </div>

          {/* Node 6: End Goal JobReady Index */}
          <div
            onClick={() => setSelectedNode({ name: "JobReady 94+ Index", desc: "Verified Skill Passport threshold unlocking immediate 10-day direct hiring matches.", hours: 300, prereq: "All Modules Verified" })}
            className="z-10 p-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black text-center text-xs font-black shadow-lg shadow-emerald-500/30 cursor-pointer hover:scale-105 transition-all"
          >
            <div>JOBREADY 94+</div>
            <div className="text-[10px] text-black font-extrabold">Direct MSME Hire</div>
          </div>
        </div>

        {/* Selected Skill Node Inspector Card */}
        {selectedNode && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-white text-sm">Node Details: {selectedNode.name}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-bold">
                {selectedNode.hours} Lab Hours Required
              </span>
            </div>
            <p className="text-slate-300">{selectedNode.desc}</p>
            <div className="text-[11px] text-slate-400">Prerequisite: <strong className="text-cyan-300">{selectedNode.prereq}</strong></div>
          </div>
        )}
      </div>

      {/* Real-Time Gap Report Results */}
      {result && !loading && (
        <div className="glass-card p-6 rounded-3xl border border-blue-500/40 space-y-6 bg-slate-900/90 animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-extrabold text-blue-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI CURRICULUM GAP REPORT ({trade})
            </span>
            <span className="text-sm font-black text-emerald-400">{result.industryCoveragePercent}% Industry Coverage</span>
          </div>

          {result.identifiedGaps && result.identifiedGaps.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-300 uppercase flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Identified Curriculum Gaps
              </h4>
              <div className="space-y-1.5">
                {result.identifiedGaps.map((gap: string, i: number) => (
                  <div key={i} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-200">
                    ⚠️ {gap}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase">Recommended Syllabus Additions & Lab Modules (Ranked by MSME Market Demand)</h4>
            {result.recommendedSyllabusAdditions?.map((add: any, idx: number) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-white">{add.topic}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Target Standard: {add.targetIndustryStandard}</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 font-extrabold flex-shrink-0 ml-3">
                  {add.practicalLabHours} Hours Lab
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
