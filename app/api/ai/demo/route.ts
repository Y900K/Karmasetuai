import { NextResponse } from "next/server";
import { callNvidiaAI } from "@/lib/ai/nvidia";

export const maxDuration = 30; // Max 30s to stay well under Vercel Hobby 60s limit

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { trade, bioSkills } = body;

    if (!trade && !bioSkills) {
      return NextResponse.json(
        { error: "Please select a trade or provide skills/bio." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are the core AI evaluation engine of KarmaSetu AI, India's AI-Powered Employability Intelligence Platform.
Your task is to analyze candidate trade skills and calculate a JobReady Index™ score (0-100) along with detailed technical breakdown, top strengths, skill gaps, and an actionable 3-step improvement roadmap.

Respond strictly in valid JSON format matching this schema:
{
  "jobReadyIndex": number (between 45.0 and 95.0, rounded to 1 decimal),
  "technicalScore": number (0-100),
  "practicalScore": number (0-100),
  "softSkillScore": number (0-100),
  "trade": string,
  "summary": string (2 sentences describing candidate readiness),
  "topSkills": string[] (3 to 4 items),
  "skillGaps": string[] (2 to 3 items),
  "actionPlan": string[] (3 actionable bullet points for ITI/MSME training)
}`;

    const userPrompt = `Analyze candidate for trade: "${trade || "General Technical"}" with provided skills/bio: "${bioSkills || "Standard ITI/Polytechnic graduate syllabus"}". Provide instant JobReady Index evaluation.`;

    const result = await callNvidiaAI(userPrompt, systemPrompt, {
      jsonMode: true,
      temperature: 0.3,
      maxTokens: 800,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error in AI Demo API route:", error);
    return NextResponse.json(
      { error: "AI assessment service temporarily unavailable. Please try again." },
      { status: 500 }
    );
  }
}
