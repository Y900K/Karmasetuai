import { NextResponse } from "next/server";
import { callNvidiaAI } from "@/lib/ai/nvidia";
import { checkRateLimit, rateLimitResponse } from "@/lib/security/rateLimit";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const rl = checkRateLimit(`candidate-rank-${ip}`, 15, 60000);
    if (!rl.success) {
      return rateLimitResponse(rl.reset);
    }

    const body = await req.json();
    const { jobTitle, requiredSkills, candidates } = body;

    const systemPrompt = `You are an AI Candidate Ranking Engine for MSME Manufacturing recruitment.
Analyze and rank candidates based on skill match, verified scores, and zero-retraining readiness.

Return strictly JSON matching this structure:
{
  "rankedCandidates": [
    {
      "candidateId": string,
      "candidateName": string,
      "matchScorePercentage": number,
      "rankReasoning": string,
      "keyMatchingSkills": string[],
      "recommendedAction": "ISSUE_OFFER" | "INTERVIEW" | "HOLD"
    }
  ]
}`;

    const userPrompt = `Job Title: "${jobTitle}". Required Skills: ${JSON.stringify(requiredSkills)}. Candidates Pool: ${JSON.stringify(candidates || [])}.`;

    const result = await callNvidiaAI(userPrompt, systemPrompt, {
      jsonMode: true,
      temperature: 0.2,
      maxTokens: 1000,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Candidate Ranker Error:", error);
    return NextResponse.json({ error: "Candidate ranking failed" }, { status: 500 });
  }
}
