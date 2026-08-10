import { NextResponse } from "next/server";
import { callNvidiaAI } from "@/lib/ai/nvidia";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { roleSummary, trade, location } = body;

    const queryRole = roleSummary || trade || "CNC Operator";

    const systemPrompt = `You are an expert AI Job Description Generator for Indian Industrial Enterprises & MSMEs.
Generate a comprehensive, highly relevant job posting for the specified job title/role.

Return strictly JSON matching this structure:
{
  "title": string,
  "requiredTrade": string,
  "location": string,
  "suggestedSalary": string,
  "minJobReadyScore": number,
  "summary": string,
  "responsibilities": string[],
  "requiredSkills": string[],
  "qualifications": string[]
}`;

    const userPrompt = `Generate complete job description details for Role/Title: "${queryRole}", Preferred Location: "${location || "Noida Industrial Hub"}".`;

    const result = await callNvidiaAI(userPrompt, systemPrompt, {
      jsonMode: true,
      temperature: 0.3,
      maxTokens: 512,
    });

    // Format full Jd text nicely if needed
    const responsibilitiesText = Array.isArray(result?.responsibilities)
      ? result.responsibilities.map((r: string) => `• ${r}`).join("\n")
      : "• Core operational responsibilities as assigned.";

    const skillsText = Array.isArray(result?.requiredSkills)
      ? result.requiredSkills.map((s: string) => `• ${s}`).join("\n")
      : "• Technical competency in designated domain.";

    const fullText = `${result?.summary || "Full role overview and shopfloor responsibilities."}\n\nKey Responsibilities:\n${responsibilitiesText}\n\nRequired Competencies & Skills:\n${skillsText}`;

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        fullJdText: fullText
      }
    });
  } catch (error: any) {
    console.error("JD Generator Error:", error);
    return NextResponse.json({
      success: true,
      data: {
        title: "Role Posting",
        requiredTrade: "Technical Specialist",
        location: "Noida Industrial Area",
        suggestedSalary: "₹25,000 - ₹35,000 / month",
        minJobReadyScore: 75,
        summary: "Execution of specialized operations under industry standards.",
        responsibilities: ["Execute assigned daily tasks", "Maintain quality & safety standards"],
        requiredSkills: ["Domain technical knowledge", "Safety compliance"],
        fullJdText: "Full job responsibilities and technical competencies required."
      }
    });
  }
}
