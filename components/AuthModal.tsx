"use client";

import React, { useState } from "react";
import { X, GraduationCap, Building2, Landmark, Cpu, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: string;
}

export default function AuthModal({ isOpen, onClose, defaultRole = "STUDENT" }: AuthModalProps) {
  const [role, setRole] = useState(defaultRole);
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage({ type: "success", text: "Signed in successfully! Redirecting..." });
        setTimeout(() => onClose(), 1200);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: role,
            },
          },
        });
        if (error) throw error;
        setMessage({
          type: "success",
          text: "Registration initiated! Please check your email to confirm your account.",
        });
      }
    } catch (err: any) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Authentication failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-card w-full max-w-md p-6 sm:p-8 rounded-3xl border border-white/10 relative shadow-2xl animate-fade-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-3">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {isLogin ? "Welcome Back to KarmaSetu AI" : "Join KarmaSetu AI Ecosystem"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isLogin ? "Sign in to access your dashboard" : "Select your role to register your profile"}
          </p>
        </div>

        {/* Role Selector Tabs (Only on Signup) */}
        {!isLogin && (
          <div className="grid grid-cols-3 gap-2 mb-6">
            <button
              type="button"
              onClick={() => setRole("STUDENT")}
              className={`p-2.5 rounded-xl border text-[11px] font-semibold flex flex-col items-center gap-1 transition-all ${
                role === "STUDENT"
                  ? "bg-blue-600 border-blue-400 text-white"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("EMPLOYER_MSME")}
              className={`p-2.5 rounded-xl border text-[11px] font-semibold flex flex-col items-center gap-1 transition-all ${
                role === "EMPLOYER_MSME"
                  ? "bg-blue-600 border-blue-400 text-white"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>MSME</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("INSTITUTE_ADMIN")}
              className={`p-2.5 rounded-xl border text-[11px] font-semibold flex flex-col items-center gap-1 transition-all ${
                role === "INSTITUTE_ADMIN"
                  ? "bg-blue-600 border-blue-400 text-white"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>Institute</span>
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Manish Sharma"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-xl text-xs ${
                message.type === "success"
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                  : "bg-red-500/10 border border-red-500/30 text-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white btn-primary-glow mt-2"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : `Create ${role.replace("_", " ")} Profile`}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div className="mt-6 text-center text-xs text-slate-400">
          {isLogin ? (
            <span>
              Don&apos;t have an account?{" "}
              <button onClick={() => setIsLogin(false)} className="text-blue-400 font-bold hover:underline">
                Register Now
              </button>
            </span>
          ) : (
            <span>
              Already registered?{" "}
              <button onClick={() => setIsLogin(true)} className="text-blue-400 font-bold hover:underline">
                Sign In
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
