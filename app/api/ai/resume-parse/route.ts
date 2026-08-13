import { NextResponse } from "next/server";
import { callNvidiaAI } from "@/lib/ai/nvidia";
import { checkRateLimit, rateLimitResponse } from "@/lib/security/rateLimit";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const rl = checkRateLimit(`resume-parse-${ip}`, 10, 60000);
    if (!rl.success) {
      return rateLimitResponse(rl.reset);
    }

    const body = await req.json();
    const { resumeText } = body;

    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 });
    }

    const systemPrompt = `You are an AI Resume Parser for Indian technical and ITI/polytechnic graduates.
Extract structured profile details from the resume text into valid JSON matching this schema:
{
  "fullName": string,
  "email": string,
  "phone": string,
  "trade": string,
  "instituteName": string,
  "passingYear": number,
  "skills": string[],
  "certifications": string[],
  "experienceYears": string,
  "summary": string
}`;

    const result = await callNvidiaAI(`Parse the following resume content:\n${resumeText}`, systemPrompt, {
      jsonMode: true,
      temperature: 0.2,
      maxTokens: 800,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Resume Parser Error:", error);
    return NextResponse.json({ error: "Resume parsing failed" }, { status: 500 });
  }
}
