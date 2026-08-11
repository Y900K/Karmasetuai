import { NextResponse } from "next/server";
import { callNvidiaAI } from "@/lib/ai/nvidia";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, trade, language, thinkDeeper } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const targetLang = language || "hinglish";

    const systemPrompt = thinkDeeper
      ? `You are Buddy AI in 'Think Deeper' reasoning mode. Provide a structured, multi-step analytical explanation for ITI & MSME engineering trainees in India. Include step 1, step 2, step 3 breakdown.
Language: ${targetLang === "hi" ? "Hindi (हिंदी)" : targetLang === "en" ? "English" : "Hinglish (Devanagari Hindi words + English technical terms)"}.
Length: 100 to 180 words.`
      : `You are Buddy AI, an encouraging AI career buddy for ITI, Polytechnic, and MSME manufacturing trainees in India.
Answer in 50-100 words. Language: ${targetLang === "hi" ? "Hindi (हिंदी)" : targetLang === "en" ? "English" : "Hinglish (Devanagari Hindi words + English technical terms)"}.`;

    const userQuery = `Trainee Trade: ${trade || "CNC Machinist"}. Trainee Question: "${prompt}". Provide a helpful answer.`;

    const rawResult = await callNvidiaAI(userQuery, systemPrompt, {
      jsonMode: false,
      temperature: 0.4,
      maxTokens: thinkDeeper ? 450 : 250,
    });

    let textResponse = "";
    if (typeof rawResult === "string" && rawResult.length > 20) {
      textResponse = rawResult;
    } else {
      textResponse = getDiverseFallbackResponse(prompt, trade, targetLang);
    }

    // Generate 3 dynamic follow-up suggestions based on the question topic
    const suggestions = getDynamicSuggestions(prompt, trade, targetLang);

    return NextResponse.json({
      success: true,
      response: textResponse,
      suggestions,
    });
  } catch (error: any) {
    console.error("Buddy AI Mentor Error:", error);
    return NextResponse.json({
      success: true,
      response: getDiverseFallbackResponse(req ? "" : "", "CNC Machinist", "hinglish"),
      suggestions: [
        "How can I increase my Fanuc G-Code score to 95%?",
        "What are top MSME hiring locations in Noida & Pune?",
        "How to prepare for shopfloor practical interview?"
      ]
    });
  }
}

function getDiverseFallbackResponse(prompt: string, trade: string, lang: string): string {
  const p = prompt.toLowerCase();

  // HR / Recruiter / Hiring questions
  if (p.includes("hr") || p.includes("recruiter") || p.includes("hire") || p.includes("interview")) {
    if (lang === "hi") {
      return `HR रिक्रूटर का मुख्य कार्य औद्योगिक संयत्रों और MSME प्लांट्स के लिए योग्य ITI/पॉलीटेक्निक उम्मीदवारों की स्क्रीनिंग करना, इंटरव्यू शेड्यूल करना और प्रैक्टिकल वर्कशॉप वेरिफिकेशन के बाद डायरेक्ट ऑफर लेटर जारी करना होता है।`;
    }
    if (lang === "en") {
      return `An HR Recruiter in manufacturing enterprise is responsible for screening ITI/Polytechnic candidates, scheduling practical shopfloor interviews, evaluating JobReady Index scores, and issuing official direct offer letters.`;
    }
    return `HR Recruiter का मुख्य काम MSME manufacturing plants के लिए verified ITI candidates को screen करना, shopfloor interview schedule करना और JobReady Index 80+ उम्मीदवारों को direct offer letter issue करना होता है!`;
  }

  // Salary / Earnings
  if (p.includes("salary") || p.includes("earning") || p.includes("pay") || p.includes("stipend")) {
    if (lang === "hi") {
      return `नोएडा, पुणे और हरिद्वार के एमएसएमई प्लांट्स में ${trade || "सीएनसी मशीनिंग"} पासआउट छात्रों के लिए शुरुआती सैलरी ₹22,000 से ₹32,000 प्रति माह है। यदि आप फानुक जी-कोड और प्रेसिजन माइक्रोमीटर में स्किल पासपोर्ट 85+ स्कोर हासिल कर लेते हैं, तो टाटा मोटर्स और एलएंडटी सप्लायर्स में 30% अधिक पैकेज मिलता है।`;
    }
    if (lang === "en") {
      return `Starting MSME shopfloor salaries for ${trade || "CNC Machinist"} passouts in industrial hubs like Noida, Pune, and Haridwar range from ₹22,000 to ₹32,000 per month. Achieving a JobReady Index score above 85% with Fanuc G-Code and micrometer calibration certificates unlocks premium tier offers with up to 35% higher stipends.`;
    }
    return `Noida, Pune और Haridwar के MSME manufacturing plants में ${trade || "CNC Machinist"} passouts की starting salary ₹22,000 से ₹32,000/month होती है। अगर आपका Skill Passport JobReady Index 85+ score है, तो 30% higher package मिलता है!`;
  }

  // Courses / LMS
  if (p.includes("course") || p.includes("match") || p.includes("short-term") || p.includes("lms")) {
    if (lang === "hi") {
      return `सबसे ज्यादा जॉब मैच देने वाला कोर्स है 'फानुक सीएनसी लेथ जी-कोड प्रोग्रामिंग और पीएलसी सेंसर कैलिब्रेशन'। इस 15-घंटे के ब्रिज कोर्स को पूरा करने से एमएसएमई रिक्रूटर्स के लिए आपका जॉबरेडी इंडेक्स तुरंत 62 से बढ़कर 94 हो जाता है और 10-दिन की direct hiring एक्टिव हो जाती है।`;
    }
    if (lang === "en") {
      return `The highest MSME job match course is 'Fanuc CNC Lathe G-Code & PLC Sensor Diagnostics'. Completing this 15-hour bridge module boosts your JobReady Index score from 62 to 94, unlocking immediate 10-day direct hiring matches with top tier-1 manufacturing suppliers across India.`;
    }
    return `Highest MSME job match देने वाला course है 'Fanuc CNC Lathe G-Code Programming & PLC Sensor Diagnostics'। इस 15-hour bridge course को complete करने पर आपका JobReady Index score 62 से बढ़कर 94 हो जाता है!`;
  }

  // Score / Index / Boost
  if (p.includes("score") || p.includes("index") || p.includes("improve") || p.includes("boost")) {
    if (lang === "hi") {
      return `अपना जॉबरेडी इंडेक्स बढ़ाने के लिए 3 कदम उठाएं: 1) फानुक जी-कोड सिमुलेशन प्रैक्टिकल मॉड्यूल पूरा करें, 2) वर्कशॉप में माइक्रोमीटर कैलिब्रेशन परीक्षण दें, और 3) इंडस्ट्रियल सेफ्टी 5S क्विज़ सबमिट करें। इससे आपका स्कोर 90+ हो जाएगा और एमएसएमई ऑफर लेटर जल्दी मिलेगा।`;
    }
    if (lang === "en") {
      return `To boost your JobReady Index score to 90+, follow these 3 practical steps: First, complete the Fanuc G-Code simulation module. Second, pass the precision micrometer tolerance test down to ±0.01mm. Third, achieve 100% on the 5S Workplace Safety AI exam to verify your shopfloor readiness.`;
    }
    return `अपना JobReady Index score 90+ boost करने के लिए 3 steps follow करें: 1) Fanuc G-Code simulation module complete करें, 2) Precision micrometer ±0.01mm tolerance test clear करें, और 3) 5S Safety exam submit करें!`;
  }

  // Greetings / Hi / Hello
  if (p === "hi" || p === "hello" || p.includes("namaste") || p.includes("kaise ho")) {
    if (lang === "hi") {
      return `नमस्ते प्रशिक्षार्थी साथी! मैं आपका Buddy AI हूँ। ${trade || "तकनीकी ट्रेड"} के करियर, MSME सैलरी पैकेज या 10-दिन डायरेक्ट हायरिंग pipeline के बारे में कोई भी प्रश्न पूछें!`;
    }
    if (lang === "en") {
      return `Hello Trainee! I am your Buddy AI guide. Ask me about MSME salaries in Noida/Pune, how to boost your JobReady Index score, or technical interview tips for ${trade || "manufacturing"}!`;
    }
    return `नमस्ते Trainee Buddy! मैं आपका 24/7 Buddy AI guide हूँ। ${trade || "CNC Machinist"} में career growth, MSME salary packages या JobReady Index 90+ boost करने के बारे में कोई भी सवाल पूछें!`;
  }

  // Default response
  if (lang === "hi") {
    return `नमस्ते दोस्त! ${trade || "तकनीकी ट्रेड"} में करियर आगे बढ़ाने के लिए कर्मसेतु प्लेटफॉर्म के 4-स्टेप लर्निंग पाथ (वीडियो ➔ रीडिंग ➔ 10-प्रश्न AI परीक्षा ➔ डिजिटल स्किल पासपोर्ट) को पूरा करें। इससे आपकी प्रैक्टिकल क्षमता प्रमाणित होगी।`;
  }
  if (lang === "en") {
    return `Hello Buddy! To advance your technical career in ${trade || "manufacturing"}, complete KarmaSetu's 4-step learning flow: Watch Video ➔ Read Technical Standard ➔ Pass 10-Question AI Exam ➔ Earn Verified Skill Passport Certificate.`;
  }
  return `नमस्ते Trainee Buddy! ${trade || "Technical Trade"} में best career growth के लिए KarmaSetu के 4-Step learning flow (Video ➔ Technical Guide ➔ 10-Q AI Exam ➔ Verified Skill Passport) को complete करें। इससे आपका practical score verify होगा और top MSMEs direct offer देंगी!`;
}

function getDynamicSuggestions(prompt: string, trade: string, lang: string): string[] {
  const p = prompt.toLowerCase();

  if (p.includes("salary") || p.includes("earning") || p.includes("pay")) {
    return [
      "Which MSME hubs offer highest salaries for CNC Machinists?",
      "How does Skill Passport score impact starting stipends?",
      "What is the salary growth after 2 years on shopfloor?"
    ];
  }

  if (p.includes("course") || p.includes("match") || p.includes("lms")) {
    return [
      "How to enroll in Fanuc G-Code & PLC Sensor masterclass?",
      "How many hours required to finish CNC bridge module?",
      "Will I get a downloadable verified certificate after quiz?"
    ];
  }

  if (p.includes("score") || p.includes("index") || p.includes("improve")) {
    return [
      "What is the passing score for 10-Question AI exam?",
      "How does CapStone video verification boost my index?",
      "Which top 3 skills carry highest points in JobReady Index?"
    ];
  }

  return [
    "What is the starting salary for CNC Machinist in Noida?",
    "Which short-term course gives highest MSME job match?",
    "How do I improve my practical precision calibration score?"
  ];
}
