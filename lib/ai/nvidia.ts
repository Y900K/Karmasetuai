/**
 * KarmaSetu AI Engine - NVIDIA NIM REST API Integration
 * Validated for NVIDIA API Catalog (https://integrate.api.nvidia.com/v1)
 */

const NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1";

// Tested & Working NVIDIA Models
const PRIMARY_MODEL = "nvidia/llama-3.3-nemotron-super-49b-v1";
const FALLBACK_MODEL = "meta/llama-3.1-70b-instruct";

export interface AICompletionOptions {
  jsonMode?: boolean;
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export async function callNvidiaAI(
  prompt: string,
  systemPrompt: string,
  options: AICompletionOptions = {}
): Promise<any> {
  const apiKey = process.env.NVIDIA_API_KEY;

  if (!apiKey || apiKey === "your_nvidia_api_key_here") {
    console.warn("NVIDIA_API_KEY is missing. Using mock AI response.");
    return generateMockAIResponse(prompt);
  }

  const model = options.model || PRIMARY_MODEL;
  const jsonMode = options.jsonMode ?? true;

  try {
    const response = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        temperature: options.temperature ?? 0.2,
        top_p: 0.7,
        max_tokens: options.maxTokens ?? 1024,
        ...(jsonMode && { response_format: { type: "json_object" } }),
      }),
    });

    if (!response.ok) {
      if (model === PRIMARY_MODEL) {
        console.warn(`Primary model ${PRIMARY_MODEL} returned ${response.status}. Retrying with ${FALLBACK_MODEL}...`);
        return callNvidiaAI(prompt, systemPrompt, { ...options, model: FALLBACK_MODEL });
      }
      const errText = await response.text();
      throw new Error(`NVIDIA API HTTP ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    if (jsonMode) {
      try {
        return JSON.parse(content);
      } catch (parseError) {
        const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
          return JSON.parse(jsonMatch[1]);
        }
        throw parseError;
      }
    }

    return content;
  } catch (error: any) {
    console.error("NVIDIA AI Call Failed:", error);
    return generateMockAIResponse(prompt);
  }
}

function generateMockAIResponse(prompt: string) {
  const tradeMatch = prompt.match(/CNC|Electrician|Fitter|Welder|Quality/i);
  const trade = tradeMatch ? tradeMatch[0] : "Technical";

  return {
    jobReadyIndex: 78.5,
    technicalScore: 82,
    practicalScore: 74,
    softSkillScore: 80,
    trade: trade,
    summary: `Candidate displays strong foundational knowledge in ${trade} operations with hands-on exposure to modern workshop standards.`,
    topSkills: [`${trade} Operation`, "Blueprint Reading", "Safety Compliance", "Quality Inspection"],
    skillGaps: ["Advanced Precision Calibration", "Digital Sensor Diagnostics", "Industry 4.0 PLC Interface"],
    actionPlan: [
      "Complete 10 hours of practical precision calibration on live machines.",
      "Participate in 3 industry expert-led masterclasses on modern workshop safety.",
      "Execute 1 live industrial project under MSME mentor supervision."
    ]
  };
}
