import { NextResponse } from "next/server";
import { callNvidiaAI } from "@/lib/ai/nvidia";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, history, trade } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const systemPrompt = `You are KarmaSetu AI Career Mentor, an expert workforce guide for ITI, Polytechnic, and MSME manufacturing students in India.
Your goal is to provide encouraging, practical, and highly accurate career guidance, salary insights, skill improvement roadmaps, and job market trends for Indian industries (Noida, Haridwar, Pune, Chennai, etc.).
Keep responses concise, clear, and action-oriented. Support both English and Hindi text.`;

    const userQuery = `Student Trade: ${trade || "General Technical"}. Question: ${prompt}`;

    const response = await callNvidiaAI(userQuery, systemPrompt, {
      jsonMode: false,
      temperature: 0.5,
      maxTokens: 1024,
    });

    return NextResponse.json({ success: true, response });
  } catch (error: any) {
    console.error("AI Mentor Error:", error);
    return NextResponse.json({ error: "AI Mentor service error" }, { status: 500 });
  }
}
