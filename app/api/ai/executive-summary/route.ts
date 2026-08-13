import { NextResponse } from "next/server";
import { callNvidiaAI } from "@/lib/ai/nvidia";
import { checkRateLimit, rateLimitResponse } from "@/lib/security/rateLimit";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const rl = checkRateLimit(`exec-summary-${ip}`, 10, 60000);
    if (!rl.success) {
      return rateLimitResponse(rl.reset);
    }

    const body = await req.json().catch(() => ({}));
    const { prompt } = body;

    const systemPrompt = `You are the National Governance & Compliance AI Narrative Engine for Skill India and KarmaSetu AI.
Generate a concise, authoritative 1-paragraph Executive Narrative Summary for government officials, MSME directors, and ITI principals summarizing quarterly workforce compliance, placement velocity, and regional skill development outcomes.

Respond strictly in valid JSON format matching this schema:
{
  "summary": string (1-2 paragraphs of professional executive analysis)
}`;

    const userPrompt = prompt || "Generate a 1-page executive narrative summary for Skill India Q2 2026 workforce compliance: 127 ITIs, 84.2% placement rate, top district Noida (92%).";

    const result = await callNvidiaAI(userPrompt, systemPrompt, {
      jsonMode: true,
      temperature: 0.3,
      maxTokens: 500,
    });

    const responseText = typeof result === "string" ? result : result.summary || JSON.stringify(result);

    return NextResponse.json({
      success: true,
      response: responseText,
    });
  } catch (error: any) {
    console.error("Executive Summary API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate executive summary" },
      { status: 500 }
    );
  }
}
