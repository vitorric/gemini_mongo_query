
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION_ANSWER, SYSTEM_INSTRUCTION_QUERY } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateAnswer({ question, query, resultDB }: any): Promise<{ answer: string, query: string }> {
  let bypass = false;

  if (bypass) {
    return {
      query: '[{"$match": {"clientDocument" : "470.596.813-10"}}]',
      answer: 'Com base no resultado da agregação fornecido, foi encontrada uma transação que corresponde aos critérios (paga com PIX nos últimos 30 dias).\n' +
      '\n' +
      'O resultado mostra os detalhes de **uma única transação**, e não um total agrupado por status.\n' +
      '\n' +
      'Detalhes da transação encontrada:\n' +
      '*   **Status:** PAID\n' +
      '*   **Valor Pago:** 3268.53\n' +
      '*   **Método de Pagamento:** PIX\n' +
      '*   **Data de Pagamento:** 2025-05-26\n' +
      '\n' +
      " Portanto, o resultado indica que houve pelo menos um pagamento via PIX no valor de R$ 3268.53 com status 'PAID' dentro do período solicitado. Este resultado específico não fornece o total acumulado por status, mas sim os detalhes de um registro individual."
    }
  }
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
