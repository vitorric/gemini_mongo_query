
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION_ANSWER, SYSTEM_INSTRUCTION_QUERY } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateAnswer({ question, query, resultDB }: any): Promise<{ answer: string, query: string }> {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: [{
        role: "user",
        parts: [{ text: question }],
      }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_ANSWER(question, resultDB),
        temperature: 0,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Failed to communicate with Gemini API.");
    }

    return { answer: text, query };

  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw new Error("Failed to communicate with Gemini API.");
  }
};
