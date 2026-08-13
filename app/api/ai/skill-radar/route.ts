import { NextResponse } from "next/server";
import { callNvidiaAI } from "@/lib/ai/nvidia";
import { checkRateLimit, rateLimitResponse } from "@/lib/security/rateLimit";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const rl = checkRateLimit(`skill-radar-${ip}`, 15, 60000);
    if (!rl.success) {
      return rateLimitResponse(rl.reset);
    }

    const body = await req.json();
    const { trade, studentSkills } = body;

    const systemPrompt = `You are the AI Skill Radar Engine for KarmaSetu AI.
Compare the candidate's current verified competencies against live Industry 4.0 shopfloor requirements for the given trade in India.

Return strictly JSON matching this structure:
{
  "coveragePercentage": number (e.g. 78.5),
  "verifiedCompetenciesCount": number,
  "industryRequiredCount": number,
  "topMatchingSkills": string[],
  "criticalGaps": [
    {
      "skill": string,
      "priority": "HIGH" | "MEDIUM" | "LOW",
      "recommendedModule": string,
      "estimatedHours": number,
      "scoreImpact": number
    }
  ]
}`;

    const userPrompt = `Trade: "${trade || "CNC Machinist"}". Candidate Verified Skills: ${JSON.stringify(studentSkills || ["Fanuc G-Code", "Micrometer Calibration", "5S Safety"])}.`;

    const result = await callNvidiaAI(userPrompt, systemPrompt, {
      jsonMode: true,
      temperature: 0.3,
      maxTokens: 800,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Skill Radar Error:", error);
    return NextResponse.json({ error: "Skill Radar analysis failed" }, { status: 500 });
  }
}
