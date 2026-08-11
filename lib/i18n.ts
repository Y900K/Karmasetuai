export type Language = "hinglish" | "en";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    heroTag: "India's AI Workforce Intelligence Platform",
    heroTitle1: "From Learning to Earning —",
    heroTitle2: "Powered by AI",
    heroSub: "Bridging India's Industry Readiness Gap by connecting graduates, institutes, experts, and Industry 4.0 MSMEs into one unified ecosystem.",
    btnStart: "Start Your Career Journey",
    btnLogin: "Login to Portal",
    btnRegister: "Register",
    
    radarTitle: "AI Skill Radar",
    radarDesc: "Real-time NCVT curriculum matching against live Industry 4.0 shopfloor requirements.",
    passportTitle: "Digital Skill Passport",
    passportDesc: "Tamper-proof credentials with verified practical scores & CapStone videos.",
    mentorTitle: "Mentor Verification",
    mentorDesc: "Shop-floor CapStone projects evaluated and signed off by senior plant engineers.",
    hiringTitle: "Direct MSME Hiring",
    hiringDesc: "Connect candidates directly to verified manufacturing job roles in 10-day cycles.",
    
    mapTitle: "2D WORKFORCE TRANSFORMATION ECOSYSTEM MAP",
    mapSub: "Interactive visual flow connecting education, skills, bridge training, and employment.",
    
    passoutStudents: "Graduated Students",
    passoutSub: "ITI / Diploma / Degree Candidates",
    aiParsing: "AI Parsing Scanner",
    aiParsingSub: "AI extracts candidate trade credentials and marks.",
    skillScore: "Skill Score: 62 / 100",
    currentLevel: "Current Level",
    msmeNeed: "MSME Shop Floor Requirement: 94%",
    
    jobReadyIndex: "JOB READY INDEX",
    elevated: "ELEVATED",
    industryBadge: "✓ INDUSTRY READY BADGE",
    placedStatus: "PLACED",
    studentTransforms: "Student transforms into a verified shop floor professional.",
    
    selectRoleTitle: "Select Your Role to Access Portal",
    selectRoleSub: "Tailored dashboards for students, institutes, industry mentors, MSME employers, and administrators.",
    
    whyWorksTitle: "Why KarmaSetu AI Works",
    whyWorksSub: "A closed-loop intelligence model designed specifically for India's manufacturing and engineering ecosystem.",
    
    footerTag: "Empowering Atmanirbhar Bharat Workforce Infrastructure",
  },
  hinglish: {
    heroTag: "Bharat ka AI Workforce Intelligence Platform",
    heroTitle1: "Learning Se Earning Tak —",
    heroTitle2: "Powered by AI",
    heroSub: "India ke Industry Readiness Gap ko khatam karke graduates, ITI institutes, industry experts aur MSMEs ko ek unified AI ecosystem me jodne wala platform.",
    btnStart: "Apna Career Journey Start Karein",
    btnLogin: "Portal Me Login Karein",
    btnRegister: "Naya Register Karein",
    
    radarTitle: "AI Skill Radar",
    radarDesc: "Real-time NCVT syllabus aur live Industry 4.0 shopfloor demand ka smart AI matching.",
    passportTitle: "Digital Skill Passport",
    passportDesc: "Verified practical marks aur CapStone project video ke saath tamper-proof digital credential.",
    mentorTitle: "Master Mentor Verification",
    mentorDesc: "Senior plant engineers dwaara evaluate aur digitally verify kiye gaye shop-floor projects.",
    hiringTitle: "Direct MSME Hiring",
    hiringDesc: "Trainees ko 10-day hiring cycles me direct verified manufacturing job roles se connect karein.",
    
    mapTitle: "2D WORKFORCE TRANSFORMATION ECOSYSTEM MAP",
    mapSub: "Education, skills, bridge training aur direct placement ko jodne wala interactive visual flow.",
    
    passoutStudents: "Passout ITI Trainees",
    passoutSub: "ITI / Diploma / Polytechnic Candidates",
    aiParsing: "AI Resume & Trade Scanner",
    aiParsingSub: "AI candidate ke trade history aur practical marks ko instant extract karta hai.",
    skillScore: "Skill Score: 62 / 100",
    currentLevel: "Current Skill Level",
    msmeNeed: "MSME Shop Floor Demand: 94%",
    
    jobReadyIndex: "JOB READY INDEX™",
    elevated: "ELEVATED LEVEL",
    industryBadge: "✓ INDUSTRY READY BADGE",
    placedStatus: "DIRECTLY PLACED",
    studentTransforms: "Student transform hokar ek verified shopfloor professional banta hai.",
    
    selectRoleTitle: "Portal Access Karne Ke Liye Role Select Karein",
    selectRoleSub: "Students, institutes, industry mentors, MSME employers aur governance leads ke liye personalized dashboards.",
    
    whyWorksTitle: "KarmaSetu AI Kyun Work Karta Hai",
    whyWorksSub: "India ke manufacturing aur engineering ecosystem ke liye specifically designed closed-loop intelligence model.",
    
    footerTag: "Atmanirbhar Bharat Workforce Infrastructure Ko Empower Karte Hue",
  },
};

export function t(lang: Language, key: string, fallback: string = ""): string {
  return translations[lang]?.[key] || translations["en"]?.[key] || fallback || key;
}
