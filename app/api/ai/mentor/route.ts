import { NextResponse } from "next/server";
import { callNvidiaAI } from "@/lib/ai/nvidia";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, trade } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const systemPrompt = `You are KarmaSetu AI Career Mentor, an expert workforce guide for ITI, Polytechnic, and MSME manufacturing students in India.
Your goal is to provide encouraging, practical, and highly accurate career guidance, salary insights, skill improvement roadmaps, and job market trends for Indian industries (Noida, Haridwar, Pune, Chennai, etc.).
Keep responses concise, clear, and action-oriented (100-200 words max). Support both English and Hinglish/Hindi text.`;

    const userQuery = `Student Trade: ${trade || "General Technical"}. Question: ${prompt}`;

    const rawResult = await callNvidiaAI(userQuery, systemPrompt, {
      jsonMode: false,
      temperature: 0.4,
      maxTokens: 400,
    });

    let textResponse = "";
    if (typeof rawResult === "string") {
      textResponse = rawResult;
    } else if (rawResult && typeof rawResult === "object") {
      textResponse = rawResult.summary || rawResult.response || JSON.stringify(rawResult);
    } else {
      textResponse = "Focus on mastering precision tolerances and 5S shopfloor compliance to boost your JobReady Index score!";
    }

    return NextResponse.json({ success: true, response: textResponse });
  } catch (error: any) {
    console.error("AI Mentor Error:", error);
    return NextResponse.json({
      success: true,
      response: "KarmaSetu AI Mentor: Starting salaries for technical trades in NCR/Noida range from ₹22,000 to ₹32,000/month. Completing G-Code & PLC certifications boosts placement matches."
    });
  }
}
