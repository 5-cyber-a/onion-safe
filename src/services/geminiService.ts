import { GoogleGenAI } from "@google/genai";

// Initialize AI
const getApiKey = () => {
  // Vite의 define으로 주입된 값을 확인
  const key = process.env.GEMINI_API_KEY;
  
  if (!key || key === "undefined" || key === "null" || key.trim() === "") {
    console.warn("GEMINI_API_KEY가 설정되지 않았습니다. AI 기능이 제한됩니다.");
    return null;
  }
  return key;
};

const apiKey = getApiKey();
// apiKey가 확실히 있을 때만 인스턴스 생성
export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function analyzeSafety(checklistData: any, telemetryData: any) {
  if (!ai) return "AI API 키가 설정되지 않았습니다. 관리자에게 문의하세요.";

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

export async function generateSafetyQuote(siteInfo: { location: string, scale: string, type: string }) {
  if (!ai) return "AI API 키가 설정되지 않았습니다. 관리자에게 문의하세요.";

  const prompt = `
    당신의 역할은 건설 안전 견적 전문가입니다.
    사용자의 현장 정보를 바탕으로 안전 장비 패키지를 아주 심플하고 직관적으로 제안하세요.
    
    [현장 정보]
    - 위치: ${siteInfo.location} | 규모: ${siteInfo.scale} | 유형: ${siteInfo.type}
    
    [출력 지침]
    1. 복잡한 설명 대신 이모지와 핵심 키워드 위주로 작성하세요.
    2. 아래 3가지 등급으로 나누어 각 등급별 핵심 구성품과 예상 총 견적가를 포함하세요.
       - 🥉 Standard: 법적 필수 장비 위주
       - 🥈 Pro: 스마트 센서 및 실시간 모니터링 포함
       - 🥇 Premium: AI 사고 예측 및 보험료 할인 풀패키지
    3. 전체 내용을 깔끔한 불렛 포인트와 이모지로 구성하여 한눈에 보이게 하세요.
    4. 출력은 Markdown 형식을 유지하되, 텍스트 양을 최소화하세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Quote Generation Error:", error);
    return "💡 견적 산출 중 오류가 발생했습니다. 다시 시도해 주세요.";
  }
}
