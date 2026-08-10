"use client";

import React from "react";
import { AlertTriangle, CheckCircle, Clock, DollarSign, Users, Sparkles, ArrowRight } from "lucide-react";

export default function ProblemSolution() {
  return (
    <section id="problem" className="py-20 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Why India Needs <span className="gradient-text">KarmaSetu AI</span> Now
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            India trains millions of technical graduates every year, yet industrial MSMEs struggle to find job-ready talent. Here is how we bridge the divide.
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Box: The Problem */}
          <div className="glass-card p-8 rounded-3xl border border-red-500/20 bg-gradient-to-b from-red-950/20 to-slate-900/60 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400 border border-red-500/30">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest">The Industry Challenge</span>
                <h3 className="text-xl font-bold text-white">Traditional Employability Gap</h3>
              </div>
            </div>

            <div className="space-y-6">
              
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-red-400 font-bold text-lg mt-0.5">50%+</div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Graduates Rated &quot;Not Job-Ready&quot;</h4>
                  <p className="text-xs text-slate-400 mt-1">ITI & Polytechnic curricula lack real-time alignment with modern industrial shopfloors.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <Clock className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-white">60–90 Days Average Time-to-Hire</h4>
                  <p className="text-xs text-slate-400 mt-1">Entry-level industrial roles take months to fill due to unverified skill claims.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <DollarSign className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-white">₹ Lakhs Lost Per MSME Annually</h4>
                  <p className="text-xs text-slate-400 mt-1">Heavy financial losses from repeat hiring, mis-hires, and machine downtime.</p>
                </div>
              </div>

            </div>

            <blockquote className="mt-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs italic text-red-200">
              &ldquo;Students learn. Industry can&apos;t find them. Nobody wins.&rdquo;
            </blockquote>
          </div>

          {/* Right Box: The KarmaSetu AI Solution */}
          <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/20 to-slate-900/60 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Our Solution</span>
                <h3 className="text-xl font-bold text-white">Closed-Loop Employability Ecosystem</h3>
              </div>
            </div>

            <div className="space-y-6">
              
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Digital Skill Passport & Verification</h4>
                  <p className="text-xs text-slate-400 mt-1">Tamper-proof digital credentials recording real practical competencies and shopfloor projects.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Precision AI Employer Matching</h4>
                  <p className="text-xs text-slate-400 mt-1">Matches verified JobReady Index™ scores to live MSME job requirements in days, not months.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Industry Expert-Led Practical Modules</h4>
                  <p className="text-xs text-slate-400 mt-1">Live industrial experts bridge the gap between classroom theory and real manufacturing lines.</p>
                </div>
              </div>

            </div>

            <div className="mt-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-200 flex items-center justify-between">
              <span>One Platform. One Skill Graph. Real Jobs.</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
