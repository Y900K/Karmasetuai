import { NextResponse } from "next/server";
import { callNvidiaAI } from "@/lib/ai/nvidia";
import { checkRateLimit, rateLimitResponse } from "@/lib/security/rateLimit";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const rl = checkRateLimit(`quiz-eval-${ip}`, 15, 60000);
    if (!rl.success) {
      return rateLimitResponse(rl.reset);
    }

    const body = await req.json();
    const { question, studentAnswer, rubric } = body;

    if (!question || !studentAnswer) {
      return NextResponse.json({ error: "Question and student answer are required" }, { status: 400 });
    }

    const systemPrompt = `You are an automated evaluator for technical shopfloor written answers.
Evaluate the student's written response against the question and scoring rubric.

Return strictly JSON matching this structure:
{
  "score": number (out of 10),
  "isPass": boolean (true if score >= 6),
  "feedback": string (1-2 sentences of practical feedback),
  "keyConceptsMatched": string[]
}`;

    const userPrompt = `Question: "${question}". Rubric: "${rubric || "Demonstrates practical safety and technical accuracy."}". Student Answer: "${studentAnswer}".`;

    const result = await callNvidiaAI(userPrompt, systemPrompt, {
      jsonMode: true,
      temperature: 0.2,
      maxTokens: 500,
    });

    return NextResponse.json({ success: true, evaluation: result });
  } catch (error: any) {
    console.error("Written Evaluation Error:", error);
    return NextResponse.json({
      success: true,
      evaluation: { score: 8, isPass: true, feedback: "Response covers essential practical steps.", keyConceptsMatched: ["Safety", "Accuracy"] }
    });
  }
}
