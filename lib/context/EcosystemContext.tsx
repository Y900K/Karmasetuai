"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, t as translateHelper } from "@/lib/i18n";

interface EcosystemContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: string;
  setTheme: (theme: string) => void;
  t: (key: string, fallback?: string) => string;
}

const EcosystemContext = createContext<EcosystemContextType | undefined>(undefined);

export function EcosystemProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("hinglish");
  const [theme, setThemeState] = useState<string>("cyberpunk");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("karmasetu_language") as Language;
      if (savedLang && (savedLang === "en" || savedLang === "hinglish")) {
        setLanguageState(savedLang);
      }
      const savedTheme = localStorage.getItem("karmasetu_theme");
      if (savedTheme) {
        setThemeState(savedTheme);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("karmasetu_language", lang);
    }
  };

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("karmasetu_theme", newTheme);
      const root = document.getElementById("dashboard-root");
      if (root) {
        // Remove old theme- classes
        Array.from(root.classList).forEach((cls) => {
          if (cls.startsWith("theme-")) root.classList.remove(cls);
        });
        root.classList.add(`theme-${newTheme}`);
      }
    }
  };

  const t = (key: string, fallback: string = "") => {
    return translateHelper(language, key, fallback);
  };

  return (
    <EcosystemContext.Provider value={{ language, setLanguage, theme, setTheme, t }}>
      {children}
    </EcosystemContext.Provider>
  );
}

export function useEcosystem() {
  const context = useContext(EcosystemContext);
  if (!context) {
    throw new Error("useEcosystem must be used within an EcosystemProvider");
  }
  return context;
}
