
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getShoppingAdvice = async (history: { role: string; content: string }[]) => {
  const productContext = PRODUCTS.map(p => `${p.name} (价格: ¥${p.price}): ${p.description}`).join('\n');
  
  const contents = history
    .filter((msg, idx) => !(idx === 0 && msg.role === 'assistant'))
    .map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: `你是一位名为 "L'Amour 导购助理" 的专业购物顾问。
你为一家高端、优雅的私密康养精品店工作。
你的目标是提供得体、专业且富有共理心的购物建议。
你的语气应该是优雅、从容且令人安心的。

现有产品列表：
${productContext}

准则：
1. 始终保持专业和尊重的语气。
2. 侧重于康养、舒适感和奢华体验。
3. 在相关时推荐产品列表中的具体产品。
4. 回答要简练而有帮助。
5. 如果用户提出的问题超出业务范围或不当，请礼貌地将对话引导回亲密康养和奢华生活方式。
6. 请务必使用中文回答。`,
        temperature: 0.7,
        topP: 0.8,
        maxOutputTokens: 800,
      }
    });

    return response.text || "很抱歉，我目前无法提供建议。还有什么我可以帮您的吗？";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "连接出现了一点小问题。请随意浏览我们的精心策划的系列。";
  }
};
