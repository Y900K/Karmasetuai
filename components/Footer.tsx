import React from "react";
import { Cpu, Heart } from "lucide-react";
import { Language, translations } from "@/lib/i18n";

interface FooterProps {
  language?: Language;
}

export default function Footer({ language = "hinglish" }: FooterProps) {
  const t = translations[language] || translations.hinglish;

  return (
    <footer className="border-t border-white/10 bg-[#070a12] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white">
                KarmaSetu <span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="pt-2 text-[11px] text-slate-500">
              {t.footerTag} · Presented for MSME Idea Hackathon 6.0 · Founder: Manish Kumar Bhardwaj
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#demo" className="hover:text-blue-400 transition-colors">AI JobReady Index™</a></li>
              <li><a href="#problem" className="hover:text-blue-400 transition-colors">Problem & Solution</a></li>
              <li><a href="#workflow" className="hover:text-blue-400 transition-colors">Learner Journey</a></li>
              <li><a href="#stakeholders" className="hover:text-blue-400 transition-colors">Stakeholders</a></li>
            </ul>
          </div>

          {/* Col 3: Missions */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">National Missions</h4>
            <ul className="space-y-2">
              <li><a href="https://www.skillindia.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Skill India Mission</a></li>
              <li><a href="https://www.makeinindia.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Make in India Initiative</a></li>
              <li><a href="https://www.digitalindia.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Digital India Skilling</a></li>
              <li><a href="https://msme.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">MSME Competency Push</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p>© {new Date().getFullYear()} KarmaSetu AI. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for India&apos;s Skilled Workforce
          </p>
        </div>

      </div>
    </footer>
  );
}
