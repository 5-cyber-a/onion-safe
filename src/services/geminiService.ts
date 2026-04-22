import { GoogleGenAI } from "@google/genai";

// Initialize AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeSafety(checklistData: any, telemetryData: any) {
  const prompt = `
    당신의 역할은 건설 현장 안전 분석 AI 전문가입니다.
    다음은 현장 체크리스트와 장비 텔레메트리 데이터입니다.
    
    [체크리스트]: ${JSON.stringify(checklistData)}
    [텔레메트리]: ${JSON.stringify(telemetryData)}
    
    분석할 내용:
    1. 현재 위험 요소 및 심각도 분석 (Low, Medium, High)
    2. 공사 전/후 안전 점수 산출 (0-100점)
    3. 보험사 및 원청사에 제출할 전문적인 리포트 요약.
    
    출력 형식을 Markdown으로 작성하고, 반드시 'Safety Score: [점수]' 형식을 포함하세요.
    언어는 한국어로 작성하세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "AI 분석 중 오류가 발생했습니다.";
  }
}
