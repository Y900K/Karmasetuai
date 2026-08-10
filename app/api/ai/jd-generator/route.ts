import { NextResponse } from "next/server";
import { callNvidiaAI } from "@/lib/ai/nvidia";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { roleSummary, trade, location } = body;

    const systemPrompt = `You are an AI Job Description Generator for Indian Manufacturing MSMEs.
Generate a structured, professional MSME job posting for ITI/Polytechnic graduates.

Return strictly JSON matching this structure:
{
  "title": string,
  "requiredTrade": string,
  "location": string,
  "salaryRange": string,
  "minJobReadyScore": number,
  "summary": string,
  "responsibilities": string[],
  "requiredSkills": string[],
  "qualifications": string[]
}`;

    const userPrompt = `Generate JD for Role: "${roleSummary || "CNC Lathe Operator"}", Trade: "${trade || "CNC Machinist"}", Location: "${location || "Noida Industrial Area"}".`;

    const result = await callNvidiaAI(userPrompt, systemPrompt, {
      jsonMode: true,
      temperature: 0.3,
      maxTokens: 800,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("JD Generator Error:", error);
    return NextResponse.json({ error: "JD Generation failed" }, { status: 500 });
  }
}
