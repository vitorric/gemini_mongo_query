
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION_QUERY } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateMongoQuery(question: string): Promise<{ question: string, query: string }> {
  let bypass = false;

  if (bypass) {
    return {
      query: '[{"$match": {"clientDocument" : "470.596.813-10"}}]',
      question
    }
  }

  try {
    // Modelo
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: question,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_QUERY(new Date()),
        temperature: 0, // Lower temperature for more deterministic, code-like output
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Failed to communicate with Gemini API.");
    }

    // Basic cleanup to remove potential markdown fences, just in case.
    let jsonStr = text.replace('```json', '').replace('```', '').trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    return { query: jsonStr, question };

  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw new Error("Failed to communicate with Gemini API.");
  }
};
