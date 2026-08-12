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
    if (typeof rawResult === "string" && rawResult.length > 5) {
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

  // Data Management, Computer, IT & Software
  if (
    p.includes("data management") ||
    p.includes("data") ||
    p.includes("computer") ||
    p.includes("database") ||
    p.includes("software") ||
    p.includes("coding") ||
    p.includes("it trade") ||
    p.includes("copa")
  ) {
    if (lang === "hi") {
      return `डेटा मैनेजमेंट (Data Management) का अर्थ है डिजिटल जानकारी को सुरक्षित रूप से स्टोर, व्यवस्थित और प्रोसेस करना। ITI COPA और कंप्यूटर ट्रेड में SQL डेटाबेस प्रबंधन, Excel ऑटोमेशन और ERP शॉपफ्लोर एंट्री की मांग बढ़ रही है। TCS और Wipro BPO में ₹22,000 से ₹28,000 की शुरुआती सैलरी मिलती है।`;
    }
    if (lang === "en") {
      return `Data Management involves organizing, storing, retrieving, and securing digital information efficiently. In ITI COPA and Computer Operations, mastering SQL relational databases, Excel macros, and MSME ERP data entry unlocks computer operator and data analyst roles starting from ₹22,000 to ₹30,000/month.`;
    }
    return `Data Management का मतलब है डिजिटल जानकारी को तरीके से Organize, Store और Process करना। ITI COPA & Computer Ops में SQL Database, Excel Macros और Shopfloor ERP entry सबसे ज़रूरी skills हैं। TCS, Infosys BPO और MSME IT hubs में ₹22,000-₹30,000/month stipend मिलता है!`;
  }

  // CAD/CAM & Technical Drafting
  if (
    p.includes("cad") ||
    p.includes("cam") ||
    p.includes("autocad") ||
    p.includes("solidworks") ||
    p.includes("design") ||
    p.includes("drafting") ||
    p.includes("dxf") ||
    p.includes("step")
  ) {
    if (lang === "hi") {
      return `CAD (Computer-Aided Design) जैसे AutoCAD और SolidWorks 2D/3D मॉडल बनाने के लिए उपयोग किए जाते हैं, जबकि CAM (Computer-Aided Manufacturing) उन CAD डिजाइनों को सीएनसी टूलपाथ (G-Code) में बदलता है। CAD/CAM ड्राफ्ट्समैन को औद्योगिक डिजाइन सेंटरों में ₹25,000 से ₹35,000/माह का शुरुआती पैकेज मिलता है।`;
    }
    if (lang === "en") {
      return `CAD (AutoCAD, SolidWorks) creates precise 2D engineering drawings and 3D solid models, while CAM software generates CNC G-Code toolpaths directly from CAD geometry. Mastering CAD/CAM DXF/STEP file conversion qualifies you for Design Draftsman roles in Tier-1 MSME plants.`;
    }
    return `CAD (AutoCAD, SolidWorks) 2D/3D component design के लिए और CAM सॉफ्टवेयर DXF files से automatic CNC G-Code toolpaths बनाने के लिए use होता है। CAD/CAM Draftsman role के लिए MSME R&D units में ₹25,000 से ₹35,000/month starting salary मिलती है!`;
  }

  // Quality Control & Inspection
  if (
    p.includes("quality control") ||
    p.includes("qc") ||
    p.includes("inspection") ||
    p.includes("cmm") ||
    p.includes("qa") ||
    p.includes("six sigma") ||
    p.includes("lean")
  ) {
    if (lang === "hi") {
      return `क्वालिटी कंट्रोल (QC) का मुख्य काम उत्पादन लाइन पर घटकों के आयाम, टॉलरेंस और फिनिश की जांच करना है। CMM मशीन संचालन, वर्नियर कैलिपर कैलिब्रेशन और 7 QC टूल्स में महारत हासिल करने से Bosch और Tata Motors सप्लायर प्लांट्स में QC इंस्पेक्टर पद मिलता है।`;
    }
    if (lang === "en") {
      return `Quality Control (QC) ensures products meet precise engineering specs and dimensional tolerances. Proficiency in Vernier calibration, CMM (Coordinate Measuring Machine) inspection, and 7 QC Tools qualifies you for QA Inspector positions with zero-rejection mandates.`;
    }
    return `Quality Control (QC) का काम shopfloor components की dimensional accuracy और ±0.01mm tolerance चेक करना है। Vernier Micrometer, CMM machine operation और ISO 9001 audit सीखकर Tier-1 MSME plants में QC Inspector role हासिल करें!`;
  }

  // Cutting Tools & Tooling
  if (
    p.includes("cutting tool") ||
    p.includes("insert") ||
    p.includes("carbide") ||
    p.includes("drill") ||
    p.includes("tap") ||
    p.includes("tool life") ||
    p.includes("spindle speed")
  ) {
    if (lang === "hi") {
      return `कटिंग टूल्स (जैसे कार्बाइड इंसर्ट्स, HSS ड्रिल और टैप) धातु को सटीक आकार में काटते हैं। टूल लाइफ बढ़ाने और वर्कपीस फिनिश बेहतर करने के लिए कटिंग स्पीड (Vc), फीड रेट (f) और कट की गहराई (ap) का सही संतुलन जरूरी है।`;
    }
    if (lang === "en") {
      return `Cutting tools (Carbide inserts, HSS drills, end mills) shape metal under high temperature. Optimizing Cutting Speed (Vc), Feed Rate (f), and Depth of Cut (ap) extends tool life and achieves high surface finish Ra < 0.8 µm.`;
    }
    return `Cutting Tools (Tungsten Carbide Inserts, End Mills) CNC machining में metal removal के लिए use होते हैं। Correct Cutting Speed (Vc), Feed Rate और Coolant flow से tool life 40% बढ़ती है और Surface Finish Ra < 0.8µm मिलती है!`;
  }

  // PPE (Personal Protective Equipment)
  if (p.includes("ppe") || p.includes("protective equipment") || p.includes("safety gear")) {
    if (lang === "hi") {
      return `PPE (Personal Protective Equipment) का मतलब व्यक्तिगत सुरक्षा उपकरण है। इंडस्ट्रियल शॉपफ्लोर पर 5 मुख्य PPE अनिवार्य हैं: 1) सेफ्टी हेलमेट, 2) ISI-marked सेफ्टी शूज़ (Steel Toe), 3) यूवी सेफ्टी गॉगल्स, 4) कट-रेसिस्टेंट ग्लव्स, और 5) इयर प्लग्स।`;
    }
    if (lang === "en") {
      return `PPE stands for Personal Protective Equipment mandatory on manufacturing shopfloors. It includes: 1) Steel-toe safety shoes, 2) UV protective eye goggles, 3) High-grade industrial helmet, 4) Heat/Cut resistant gloves, and 5) Noise attenuation ear defenders for operator protection.`;
    }
    return `PPE (Personal Protective Equipment) का मतलब औद्योगिक सुरक्षा उपकरण है। MSME वर्कशॉप में 5 PPE ज़रूरी हैं: Steel-Toe Safety Shoes, Safety Glasses/Goggles, Industrial Helmet, Cut-Resistant Gloves और Ear Defenders!`;
  }

  // Welding & Fabrication
  if (p.includes("weld") || p.includes("welder") || p.includes("tig") || p.includes("mig") || p.includes("arc")) {
    if (lang === "hi") {
      return `वेल्डिंग में करियर के लिए TIG (Argon Gas Shielded) और MIG (CO2) वेल्डिंग सीखें। L&T और भेल जैसी कंपनियों में NDT Radiography टेस्टिंग पास करने वाले प्रेशर वेसल वेल्डर्स को ₹35,000+ प्रतिमाह पैकेज और खाड़ी देशों में डायरेक्ट जॉब अपॉर्चुनिटी मिलती है।`;
    }
    if (lang === "en") {
      return `For welding trade, mastering TIG (Argon) and MIG (CO2) processes with ISO 3834 certification unlocks premium packages in defense, aerospace, and heavy fabrication starting from ₹28,000 to ₹42,000 per month.`;
    }
    return `Welding trade में TIG & MIG gas welding सबसे इन-डिमांड है। NDT X-Ray Radiography passed welders को L&T, BHEL और MSME export plants में 35% higher salary पैकेज मिलता है!`;
  }

  // Electrical, PLC & Automation
  if (p.includes("electrician") || p.includes("plc") || p.includes("motor") || p.includes("wiring") || p.includes("vfd")) {
    if (lang === "hi") {
      return `इंडस्ट्रियल इलेक्ट्रिशियन के लिए 3-फेज मोटर स्टार्टर (DOL & Star-Delta), VFD ड्राइव प्रोग्रामिंग और PLC I/O कार्ड वायरिंग सबसे महत्वपूर्ण स्किल है। कर्मसेतु 15-घंटे PLC डायग्नोस्टिक्स मॉड्यूल पूरा करने पर Havells और Schneider में डायरेक्ट प्रेफरेंस मिलती है।`;
    }
    if (lang === "en") {
      return `Industrial Electricians must master 3-Phase Star-Delta starters, VFD frequency control, and PLC sensor wiring. Completing KarmaSetu's 15-hour PLC diagnostic bridge module boosts your hiring rank with Havells & Dixon Technologies.`;
    }
    return `Industrial Electrician के लिए 3-Phase Star-Delta Motor Control, VFD Speed Control और PLC Sensor wiring सबसे high-salary skills हैं। KarmaSetu का 15-hour PLC module complete करके 90+ Score पाएँ!`;
  }

  // G-Code, Lathe & CNC Machine
  if (p.includes("lathe") || p.includes("g-code") || p.includes("gcode") || p.includes("cnc") || p.includes("fanuc") || p.includes("m-code")) {
    if (lang === "hi") {
      return `सीएनसी लेथ मशीन में G00 (Rapid Transit), G01 (Linear Cut), G02/G03 (Arc Interpolation) और M03 (Spindle Clockwise) बेसिक प्रोग्रामिंग कमांड्स हैं। फानुक कंट्रोलर पर वर्कशॉप सिमुलेशन पूरा करके आपका जॉबरेडी इंडेक्स तुरंत 94 हो जाता है।`;
    }
    if (lang === "en") {
      return `Core CNC Lathe commands include G00 (Rapid Positioning), G01 (Linear Interpolation), G02/G03 (Circular Arcs), and M30 (Program End). Completing Fanuc controller G-Code verification unlocks direct tier-1 MSME hiring.`;
    }
    return `CNC Lathe में G00 (Rapid Feed), G01 (Cut), G02/G03 (Circular Arcs) और Fanuc Offsets मुख्य हैं। Fanuc Lathe G-Code module complete करने से JobReady Index 94+ हो जाता है!`;
  }

  // Precision Instruments & Micrometer
  if (p.includes("micrometer") || p.includes("vernier") || p.includes("caliper") || p.includes("tolerance") || p.includes("gauge")) {
    if (lang === "hi") {
      return `प्रेसिजन माइक्रोमीटर का लीस्ट काउंट 0.01mm (10 माइक्रोन) होता है। वर्कशॉप क्वालिटी इंस्पेक्शन में वर्नियर कैलिपर, माइक्रोमीटर कैलिब्रेशन और बोर गेज रीडिंग्स में 100% सटीकता हासिल करने पर Bosch और Tata Motors में ₹26,000+ जॉब ऑफर मिलता है।`;
    }
    if (lang === "en") {
      return `Precision Micrometers measure component tolerances down to 0.01mm accuracy. Demonstrating verified micrometer calibration and CMM inspection skills qualifies you for Quality Inspector roles at Bosch and L&T.`;
    }
    return `Precision Micrometer का least count 0.01mm (10 microns) होता है। ±0.01mm tolerance test pass करने पर Bosch और Tier-1 MSME plants में Quality Inspector role के लिए direct matching मिलती है!`;
  }

  // Safety & 5S
  if (p.includes("safety") || p.includes("5s") || p.includes("hazard") || p.includes("iso")) {
    if (lang === "hi") {
      return `5S का अर्थ है: Seiri (छांटना), Seiton (सुव्यवस्थित करना), Seiso (सफाई), Seiketsu (मानकीकरण) और Shitsuke (अनुशासन)। इसे अपनाने से विनिर्माण संयंत्रों में दुर्घटनाएं शून्य हो जाती हैं और उत्पादकता 25% बढ़ती है।`;
    }
    if (lang === "en") {
      return `5S Methodology comprises: Sort, Set in Order, Shine, Standardize, and Sustain. Practicing ISO 45001 shopfloor safety protocols reduces manufacturing downtime and establishes zero-accident work habits.`;
    }
    return `5S Methodology (Sort, Set in Order, Shine, Standardize, Sustain) और ISO 45001 Safety Protocol फॉलो करने से MSME plants में Zero Accident environment बनता है और Recruiters priority hiring देते हैं!`;
  }

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

  // Default response (Trade-sensitive)
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

  if (p.includes("data") || p.includes("computer") || p.includes("software")) {
    return [
      "What are top computer trade jobs in MSME IT hubs?",
      "How does SQL database management boost my JobReady Index?",
      "What is starting salary for ITI COPA computer operator?"
    ];
  }

  if (p.includes("cad") || p.includes("cam") || p.includes("autocad") || p.includes("design")) {
    return [
      "How to convert 2D AutoCAD drawings into CNC G-Code?",
      "What is starting stipend for SolidWorks draftsman?",
      "Which short-term CAD/CAM course is accredited by NCVT?"
    ];
  }

  if (p.includes("quality") || p.includes("qc") || p.includes("inspection")) {
    return [
      "How to pass CMM machine inspection tolerance test?",
      "What are 7 QC tools used in manufacturing shopfloors?",
      "Which companies hire Quality Inspectors at ₹30,000/month?"
    ];
  }

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
