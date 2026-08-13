import { NextResponse } from "next/server";
import { callNvidiaAI } from "@/lib/ai/nvidia";
import { checkRateLimit, rateLimitResponse } from "@/lib/security/rateLimit";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const rl = checkRateLimit(`quiz-gen-${ip}`, 15, 60000);
    if (!rl.success) {
      return rateLimitResponse(rl.reset);
    }

    const body = await req.json();
    const { topic, trade, content } = body;

    if (!topic) {
      return NextResponse.json({ error: "Topic is mandatory for quiz generation" }, { status: 400 });
    }

    const systemPrompt = `You are the Quiz Generation Engine for KarmaSetu AI.
Your task is to generate a mandatory 10-question evaluation quiz for a vocational training topic.
The quiz MUST contain EXACTLY 10 questions:
- Questions 1 to 7 MUST be Multiple Choice Questions (MCQ) with 4 options ('options': ['A. ...', 'B. ...', 'C. ...', 'D. ...']) and 'correctAnswer' (e.g. 'A').
- Questions 8 to 10 MUST be Short Written Answer questions ('type': 'WRITTEN') testing practical shopfloor application, with 'writtenRubric' specifying what a good answer includes.

Return strictly JSON matching this structure:
{
  "topic": string,
  "trade": string,
  "questions": [
    {
      "id": "q1",
      "type": "MCQ",
      "question": string,
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctAnswer": "A",
      "points": 10
    },
    ...
    {
      "id": "q8",
      "type": "WRITTEN",
      "question": string,
      "writtenRubric": string,
      "points": 10
    }
  ]
}`;

    const userPrompt = `Generate a 10-question quiz (7 MCQs + 3 Written) for Topic: "${topic}", Trade: "${trade || "General Technical"}". Topic Lesson Content/Summary: "${content || topic}".`;

    const result = await callNvidiaAI(userPrompt, systemPrompt, {
      jsonMode: true,
      temperature: 0.3,
      maxTokens: 1500,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("AI Quiz Generator Error:", error);
    return NextResponse.json({ error: "Failed to generate AI quiz" }, { status: 500 });
  }
}
