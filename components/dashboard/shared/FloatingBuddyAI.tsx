"use client";

import React, { useState, useEffect } from "react";
import { Bot, Send, Sparkles, X, Minimize2, Maximize2, Brain, RefreshCw, Zap } from "lucide-react";
import { useEcosystem } from "@/lib/context/EcosystemContext";

export default function FloatingBuddyAI() {
  const { language } = useEcosystem();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [thinkDeeper, setThinkDeeper] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string; mode?: string }[]>([
    {
      role: "assistant",
      content: "Namaste! I am your Floating Buddy AI. Ask me any shopfloor question, MSME salary benchmark, or enable 'Think Deeper' for multi-step reasoning!"
    }
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMin = localStorage.getItem("ks_buddy_minimized");
      if (savedMin) setMinimized(savedMin === "true");
    }
  }, []);

  const toggleMinimize = () => {
    const next = !minimized;
    setMinimized(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("ks_buddy_minimized", String(next));
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const query = input;
    const currentMode = thinkDeeper ? "THINK DEEPER" : "FAST";

    const newMsgs = [...messages, { role: "user" as const, content: query, mode: currentMode }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: query,
          trade: "CNC Machinist",
          language: language,
          thinkDeeper: thinkDeeper,
        }),
      });
      const data = await res.json();
      if (data.success && data.response) {
        setMessages([...newMsgs, { role: "assistant", content: data.response, mode: currentMode }]);
      } else {
        setMessages([...newMsgs, { role: "assistant", content: data.response || "Buddy AI is processing — please retry your question! 🤝", mode: currentMode }]);
      }
    } catch (e) {
      setMessages([...newMsgs, { role: "assistant", content: "Connection issue — please try again. Buddy AI is here to help! 🔄", mode: currentMode }]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 hover:scale-105 text-black font-extrabold text-xs shadow-2xl shadow-purple-500/40 flex items-center gap-2 transition-all no-print"
      >
        <Bot className="w-5 h-5 text-black animate-bounce" />
        <span className="hidden sm:inline">Buddy AI Assistant</span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 no-print ${minimized ? "w-72 h-14" : "w-[calc(100vw-48px)] sm:w-96 h-[460px] max-h-[calc(100vh-100px)]"} glass-card rounded-3xl border border-purple-500/40 bg-[#080d1e]/95 shadow-2xl flex flex-col justify-between overflow-hidden`}>
      {/* Widget Header */}
      <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-slate-900/90">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-400 text-purple-300 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-black text-white block leading-none">Buddy AI</span>
            <span className="text-[9px] text-purple-300 font-bold uppercase">{language.toUpperCase()} • {thinkDeeper ? "Deep Think Mode" : "Quick Mode"}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Think Deeper Toggle */}
          <button
            onClick={() => setThinkDeeper(!thinkDeeper)}
            className={`px-2 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1 transition-all ${
              thinkDeeper
                ? "bg-purple-500 text-white shadow-md shadow-purple-500/30"
                : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
            }`}
            title="Toggle Think Deeper multi-step reasoning AI mode"
          >
            <Brain className={`w-3 h-3 ${thinkDeeper ? "animate-pulse text-amber-300" : ""}`} />
            <span>Think Deeper</span>
          </button>

          <button
            onClick={toggleMinimize}
            className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
          >
            {minimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Widget Body (if not minimized) */}
      {!minimized && (
        <>
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs font-sans">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                {m.mode === "THINK DEEPER" && (
                  <span className="text-[8px] font-mono text-purple-400 font-bold mb-0.5 flex items-center gap-0.5">
                    <Brain className="w-2.5 h-2.5 text-amber-400" /> Multi-Step Reasoning
                  </span>
                )}
                <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${m.role === "user" ? "bg-purple-600 text-white font-medium rounded-tr-none" : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none"}`}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-bold">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />
                <span>{thinkDeeper ? "Synthesizing multi-step reasoning..." : "Buddy AI thinking..."}</span>
              </div>
            )}
          </div>

          {/* Widget Input */}
          <div className="p-3 border-t border-white/10 bg-slate-950/80 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={thinkDeeper ? "Ask deep technical/career question..." : "Ask Buddy AI..."}
              className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-purple-500/20"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
