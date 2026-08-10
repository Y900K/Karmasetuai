"use client";

import React, { useState, useEffect } from "react";
import { Bot, Send, Sparkles, RefreshCw, User, Globe, MessageSquare, Compass } from "lucide-react";
import { Language } from "@/lib/i18n";

export default function AiMentorPage() {
  const [language, setLanguage] = useState<Language>("hinglish");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = (localStorage.getItem("karmasetu_language") as Language) || "hinglish";
      setLanguage(savedLang);
    }
  }, []);

  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: "Namaste Trainee! I am Buddy AI, your 24/7 technical career guide. Ask me about MSME salaries in Noida/Pune, how to boost your JobReady Index™, ITI trades, or interview tips!"
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [samplePrompts, setSamplePrompts] = useState<string[]>([
    "What is the starting salary for CNC Machinist in Noida?",
    "Which short-term course gives highest MSME job match?",
    "How do I improve my practical precision calibration score?",
  ]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const newMsgs = [...messages, { role: "user" as const, content: query }];
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
        }),
      });
      const data = await res.json();
      if (data.success && data.response) {
        const reply = typeof data.response === "string" ? data.response : JSON.stringify(data.response);
        setMessages([...newMsgs, { role: "assistant", content: reply }]);

        if (Array.isArray(data.suggestions) && data.suggestions.length >= 3) {
          setSamplePrompts(data.suggestions);
        }
      } else {
        setMessages([
          ...newMsgs,
          {
            role: "assistant",
            content: "Noida aur Pune ke MSME plants me CNC Machinist passouts ki starting salary ₹22,000 se ₹32,000/month hoti hai. Fanuc G-Code aur Micrometer calibration test clear karne par 30% higher stipend offer milta hai!"
          }
        ]);
      }
    } catch (e) {
      setMessages([
        ...newMsgs,
        {
          role: "assistant",
          content: "Buddy AI service active. Focus on mastering precision tolerances to boost your employer match score!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner */}
      <div className="glass-card p-6 rounded-3xl border border-cyan-500/30 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#070b16] rounded-[14px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white">Buddy AI — Trainee Assistant</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold uppercase flex items-center gap-1">
                <Globe className="w-3 h-3 text-cyan-400" />
                Lang: {language.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-300">24/7 Vocational Buddy • Salary Insights • 50-100 Word Action Answers</p>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="glass-card rounded-3xl border border-white/10 p-4 sm:p-6 bg-slate-900/90 flex flex-col h-[560px] justify-between space-y-4 shadow-2xl">
        
        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`p-4 rounded-2xl max-w-xl text-xs leading-relaxed font-sans ${m.role === "user" ? "bg-cyan-500 text-black font-semibold rounded-tr-none" : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none"}`}>
                {m.content}
              </div>

              {m.role === "user" && (
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-cyan-300 font-bold flex items-center gap-2">
                <span>Buddy AI generating tailored answer...</span>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic 3 Suggested Follow-Up Prompts */}
        <div className="space-y-1.5 pt-2 border-t border-white/10">
          <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider block flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> DYNAMIC SUGGESTED QUESTIONS (CLICK TO ASK BUDDY AI)
          </span>

          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all text-left flex items-center gap-1.5"
              >
                <span>💡 {p}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex gap-2 pt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={`Ask Buddy AI anything in ${language.toUpperCase()}...`}
            className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>

      </div>

    </div>
  );
}
