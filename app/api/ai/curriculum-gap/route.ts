import { NextResponse } from "next/server";
import { callNvidiaAI } from "@/lib/ai/nvidia";
import { checkRateLimit, rateLimitResponse } from "@/lib/security/rateLimit";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const rl = checkRateLimit(`curriculum-${ip}`, 10, 60000);
    if (!rl.success) {
      return rateLimitResponse(rl.reset);
    }

    const body = await req.json();
    const { syllabus, trade, targetCompanies } = body;

    const systemPrompt = `You are the NCVT Curriculum Analysis Engine of KarmaSetu AI.
Compare an institute's current trade syllabus against live Industry 4.0 shopfloor requirements in major Indian industrial hubs (Tata Motors, L&T, Havells, Godrej).

Return strictly JSON matching this structure:
{
  "industryCoveragePercent": number (e.g. 74.0),
  "trade": string,
  "coveredTopics": string[],
  "missingIndustry40Skills": string[],
  "identifiedGaps": string[],
  "recommendedSyllabusAdditions": [
    {
      "topic": string,
      "urgency": "CRITICAL" | "HIGH" | "MODERATE",
      "practicalLabHours": number,
      "targetIndustryStandard": string
    }
  ]
}`;


    const userPrompt = `Trade: "${trade || "Electrician"}". Target Employers: "${(targetCompanies || ["Tata Motors", "Havells"]).join(", ")}". Current Syllabus Overview: "${syllabus || "Standard 2-Year NCVT Electrical Trade Syllabus"}".`;

    const result = await callNvidiaAI(userPrompt, systemPrompt, {
      jsonMode: true,
      temperature: 0.3,
      maxTokens: 900,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Curriculum Gap Error:", error);
    return NextResponse.json({ error: "Curriculum gap analysis failed" }, { status: 500 });
  }
}
