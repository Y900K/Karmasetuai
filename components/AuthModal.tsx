"use client";

import React, { useState, useEffect } from "react";
import {
  X, Cpu, GraduationCap, Landmark, UserCheck, Briefcase, Shield, Flag,
  Mail, Lock, Phone, Building, Award, ChevronRight, Sparkles, CheckCircle2
} from "lucide-react";
import { SELF_REGISTERABLE_ROLES } from "@/lib/constants";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: string;
  defaultMode?: "login" | "register";
  onLoginSuccess?: (user: { id: string; email: string; full_name: string }, role: string, session?: { access_token: string; refresh_token: string } | null) => void;
}

const ROLES = [
  {
    id: "STUDENT",
    title: "Student & Trainee",
    subtitle: "Skill Passport & JobReady Index™",
    icon: GraduationCap,
    btnText: "STUDENT",
  },
  {
    id: "INSTITUTE",
    title: "Institute & Expert",
    subtitle: "Curriculum, Masterclasses & Placements",
    icon: Landmark,
    btnText: "INSTITUTE & EXPERT",
  },
  {
    id: "EMPLOYER",
    title: "Employer & MSME",
    subtitle: "AI Candidate Ranking & 10-day Hiring",
    icon: Briefcase,
    btnText: "EMPLOYER / MSME",
  },
  {
    id: "HR",
    title: "HR & System Admin",
    subtitle: "Workforce Analytics & System Governance",
    icon: Shield,
    btnText: "HR & SYSTEM ADMIN",
  },
];

const DEMO_CREDENTIALS = [
  { role: "Student / Trainee", roleId: "STUDENT", email: "student@karmasetu.ai", icon: GraduationCap, color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10 hover:border-cyan-400" },
  { role: "Institute & Expert", roleId: "INSTITUTE", email: "institute@karmasetu.ai", icon: Landmark, color: "text-blue-400 border-blue-500/30 bg-blue-500/10 hover:border-blue-400" },
  { role: "Employer & MSME", roleId: "EMPLOYER", email: "employer@karmasetu.ai", icon: Briefcase, color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 hover:border-emerald-400" },
  { role: "HR & System Admin", roleId: "HR", email: "hr@karmasetu.ai", icon: Shield, color: "text-amber-400 border-amber-500/30 bg-amber-500/10 hover:border-amber-400" },
];

export default function AuthModal({
  isOpen,
  onClose,
  defaultRole = "STUDENT",
  defaultMode = "register",
  onLoginSuccess,
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(defaultMode === "login");
  const [selectedRole, setSelectedRole] = useState("STUDENT");

  // Common Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");

  // Role-Specific Fields
  const [instituteName, setInstituteName] = useState("");
  const [trade, setTrade] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [codeNcvt, setCodeNcvt] = useState("");
  const [instituteCategory, setInstituteCategory] = useState("Government ITI");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [experience, setExperience] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  useEffect(() => {
    if (defaultRole) {
      if (defaultRole.includes("INSTITUTE")) setSelectedRole("INSTITUTE");
      else if (defaultRole.includes("EMPLOYER")) setSelectedRole("EMPLOYER");
      else if (defaultRole.includes("INDUSTRY")) setSelectedRole("INDUSTRY");
      else if (defaultRole.includes("HR")) setSelectedRole("HR");
      else if (defaultRole.includes("NATIONAL") || defaultRole.includes("SUPER_ADMIN")) setSelectedRole("NATIONAL");
      else setSelectedRole("STUDENT");
    }
    setIsLogin(defaultMode === "login");
  }, [defaultRole, defaultMode, isOpen]);

  // P2-10: Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDemoLogin = async (demoRole: string, demoEmail: string, demoRoleId?: string) => {
    setEmail(demoEmail);
    setPassword("KarmaSetuDemo!2026");
    setIsLogin(true);
    setLoading(true);
    setMessage({
      type: "info",
      text: `Signing in as ${demoRole}...`,
    });

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: demoEmail, password: "KarmaSetuDemo!2026" }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Demo login failed.");
      }

      const userObj = data.user || { email: demoEmail, full_name: demoEmail.split("@")[0] };
      const roleReturned = demoRoleId || (data.role !== "STUDENT" ? data.role : (selectedRole !== "STUDENT" ? selectedRole : demoRoleId || "STUDENT"));

      setMessage({
        type: "success",
        text: data.message || `Welcome to KarmaSetu AI ${roleReturned} Portal!`,
      });

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(userObj, roleReturned, data.session);
        } else {
          onClose();
        }
      }, 500);
    } catch (err: any) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Authentication failed." });
    } finally {
      setLoading(false);
    }
  };

  const currentRoleObj = ROLES.find((r) => r.id === selectedRole) || ROLES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isLogin) {
        // Call server-side Login API Route
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Login failed.");
        }

        const userObj = data.user || { email, full_name: email.split("@")[0] };
        const roleReturned = data.role || selectedRole;

        setMessage({
          type: "success",
          text: data.message || `Welcome to KarmaSetu AI ${roleReturned} Portal!`,
        });

        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess(userObj, roleReturned, data.session);
          } else {
            onClose();
          }
        }, 800);
      } else {
        // Call server-side Register API Route
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            fullName,
            phone,
            role: selectedRole,
            instituteName,
            trade,
            rollNo,
            codeNcvt,
            companyName,
            designation,
            experience,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Registration failed.");
        }

        setMessage({
          type: "success",
          text: data.message || `Registration for ${currentRoleObj.btnText} completed! Directing to portal...`,
        });

        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess({ id: "", email, full_name: fullName }, selectedRole);
          } else {
            onClose();
          }
        }, 1000);
      }
    } catch (err: any) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Authentication failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#040711]/85 backdrop-blur-xl overflow-y-auto" role="dialog" aria-modal="true" aria-label="Authentication">
      <div className="glass-card w-full max-w-2xl p-5 sm:p-7 rounded-3xl border border-cyan-500/30 relative shadow-2xl my-auto animate-fade-in bg-[#070b16]/95">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#070b16] rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">Karma <span className="text-cyan-400">Setu</span></span>
                <span className="px-1.5 py-0.5 text-[9px] font-black bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded uppercase">AI</span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 rounded-full">Secure Portal Authentication</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close authentication dialog"
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-slate-400 hover:text-white flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Mode Toggle Tabs */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-900/90 border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`py-3 rounded-xl text-xs font-extrabold transition-all ${
              isLogin
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-lg shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In to Account
          </button>

          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`py-3 rounded-xl text-xs font-extrabold transition-all ${
              !isLogin
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-lg shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            New Registration
          </button>
        </div>

        {/* Form Body */}
        {isLogin ? (
          /* SIGN IN MODE */
          <div className="space-y-6">
            {/* P0-4: Only show demo credentials in demo mode */}
            {process.env.NEXT_PUBLIC_DEMO_MODE === "true" && (
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs font-extrabold text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    QUICK DEMO CREDENTIALS (1-CLICK LOGIN)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DEMO_CREDENTIALS.map((cred, idx) => {
                    const CredIcon = cred.icon;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleDemoLogin(cred.role, cred.email, cred.roleId)}
                        className={`p-2.5 rounded-xl border text-left transition-all hover:scale-102 focus-visible:ring-2 focus-visible:ring-cyan-400 ${cred.color}`}
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold truncate">
                          <CredIcon className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{cred.role}</span>
                        </div>
                        <div className="text-[10px] opacity-75 truncate mt-0.5">{cred.email}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="relative text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
              <span className="relative px-3 bg-[#070b16] text-[10px] font-bold text-slate-500 uppercase">
                OR ENTER CUSTOM CREDENTIALS
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-xs font-bold text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. student@karmasetu.ai"
                  className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="login-password" className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" /> Password
                  </label>
                  <a href="#" className="text-xs text-amber-400 hover:underline">Forgot Password?</a>
                </div>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400"
                />
              </div>

              {message && (
                <div className={`p-3 rounded-xl text-xs ${message.type === "success" ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300" : message.type === "info" ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300" : "bg-red-500/10 border border-red-500/30 text-red-300"}`}>
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-extrabold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
              >
                <span>{loading ? "Signing in..." : "Sign In to KarmaSetu"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

          </div>
        ) : (
          /* REGISTRATION MODE */
          <div className="space-y-5">
            
            {/* Account Type Selector (6 Role Tiles) */}
            <div>
              <label className="block text-xs font-extrabold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> SELECT ACCOUNT TYPE
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ROLES.filter(r => SELF_REGISTERABLE_ROLES.has(r.id)).map((r) => {
                  const RoleIcon = r.icon;
                  const isSelected = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRole(r.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20"
                          : "bg-slate-900/60 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-0.5">
                        <RoleIcon className="w-4 h-4 text-cyan-400" />
                        <span>{r.title}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">{r.subtitle}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Role Banner */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-300 flex items-center gap-2">
              <Award className="w-4 h-4 flex-shrink-0 text-amber-400" />
              <span>Registering as <strong className="text-white uppercase">{currentRoleObj.title}</strong>. Fields below are customized for your role.</span>
            </div>

            {/* Dynamic Customized Form per Selected Role */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                    {selectedRole === "INSTITUTE" ? "Director / Contact Name" : selectedRole === "INDUSTRY" ? "Expert Full Name" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" /> Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" /> Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* CUSTOM FIELDS FOR STUDENT */}
              {selectedRole === "STUDENT" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-cyan-400" /> ITI / College Name
                    </label>
                    <input
                      type="text"
                      required
                      value={instituteName}
                      onChange={(e) => setInstituteName(e.target.value)}
                      placeholder="e.g. Government ITI Pune / VJTI Mumbai"
                      className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Trade / Specialization</label>
                      <input
                        type="text"
                        required
                        value={trade}
                        onChange={(e) => setTrade(e.target.value)}
                        placeholder="e.g. Fitter, Electrician, Machinist, CS"
                        className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Roll / Registration No. (Optional)</label>
                      <input
                        type="text"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                        placeholder="e.g. ITI2024-8849"
                        className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* CUSTOM FIELDS FOR INSTITUTE */}
              {selectedRole === "INSTITUTE" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-cyan-400" /> Official Institute Name
                    </label>
                    <input
                      type="text"
                      required
                      value={instituteName}
                      onChange={(e) => setInstituteName(e.target.value)}
                      placeholder="e.g. Government ITI Pune Campus"
                      className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">NCVT / SCVT / AISHE Code</label>
                      <input
                        type="text"
                        required
                        value={codeNcvt}
                        onChange={(e) => setCodeNcvt(e.target.value)}
                        placeholder="e.g. ITI-MH-20419"
                        className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Institute Category</label>
                      <select
                        value={instituteCategory}
                        onChange={(e) => setInstituteCategory(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Government ITI">Government ITI</option>
                        <option value="Polytechnic College">Polytechnic College</option>
                        <option value="Engineering Degree College">Engineering Degree College</option>
                        <option value="Private Vocational ITI">Private Vocational ITI</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* CUSTOM FIELDS FOR INDUSTRY EXPERT */}
              {selectedRole === "INDUSTRY" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-cyan-400" /> Company / Plant Name
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Larsen & Toubro Heavy Engineering"
                      className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Designation / Specialty</label>
                      <input
                        type="text"
                        required
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="e.g. Chief Tooling Engineer / Quality Master"
                        className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Industrial Experience</label>
                      <input
                        type="text"
                        required
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="e.g. 10+ Years Shopfloor Operations"
                        className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* CUSTOM FIELDS FOR EMPLOYER / HR */}
              {(selectedRole === "EMPLOYER" || selectedRole === "HR" || selectedRole === "NATIONAL") && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-cyan-400" /> Organization / Factory Name
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Tata Motors Industrial Plant Noida"
                      className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </>
              )}

              {message && (
                <div className={`p-3 rounded-xl text-xs ${message.type === "success" ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300" : message.type === "info" ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300" : "bg-red-500/10 border border-red-500/30 text-red-300"}`}>
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-extrabold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
              >
                <span>{loading ? "Creating Account..." : `Complete ${currentRoleObj.btnText} Registration`}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}
