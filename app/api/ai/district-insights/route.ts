import { NextResponse } from "next/server";
import { callNvidiaAI } from "@/lib/ai/nvidia";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { district, state } = body;

    const systemPrompt = `You are the National Skill Governance AI Engine for Skill India & Digital India analytics.
Provide district-level workforce intelligence, placement heatmaps analysis, and policy recommendations.

Return strictly JSON matching this structure:
{
  "district": string,
  "state": string,
  "placementRatePercentage": number,
  "totalStudentsPlaced": number,
  "topDemandTrades": string[],
  "supplyDeficitTrades": string[],
  "keyIndustrialClusters": string[],
  "aiPolicyRecommendations": string[]
}`;

    const userPrompt = `District: "${district || "Noida / Gautam Buddha Nagar"}", State: "${state || "Uttar Pradesh"}". Analyze regional workforce demand and placement heatmap.`;

    const result = await callNvidiaAI(userPrompt, systemPrompt, {
      jsonMode: true,
      temperature: 0.3,
      maxTokens: 800,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("District Insights Error:", error);
    return NextResponse.json({ error: "District insights failed" }, { status: 500 });
  }
}
