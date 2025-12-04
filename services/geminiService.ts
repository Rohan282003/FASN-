import { GoogleGenAI, Type, Schema } from "@google/genai";
import { QuizQuestion } from "../types";

// Note: In a real production app, never expose keys on the client.
// This is for MVP demonstration purposes only.
const API_KEY = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateTutorResponse = async (
  history: { role: 'user' | 'model'; text: string }[],
  currentMessage: string,
  context: string
): Promise<string> => {
  try {
    const model = "gemini-2.5-flash";
    const systemInstruction = `
      You are FASN, an advanced AI Tutor for MBA students at Christ University in a Cyberpunk future.
      Your tone is helpful but slightly technical/robotic (cyberpunk style).
      You act as a mentor. Keep answers concise (under 150 words) unless asked for elaboration.
      Context provided: ${context}.
      Only answer questions related to the course material. If asked about something else, politely decline in character.
    `;

    // Construct chat history for context
    // We utilize a fresh chat session for simplicity in this stateless service, 
    // priming it with the history + current message.
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: currentMessage });
    return result.text || "Error: Data stream interrupted.";
  } catch (error) {
    console.error("Gemini Tutor Error:", error);
    return "Connection instability detected. Unable to process query.";
  }
};

export const generateAdaptiveQuiz = async (topic: string, difficulty: string): Promise<QuizQuestion[]> => {
  try {
    const model = "gemini-2.5-flash";
    
    const quizSchema: Schema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: { 
            type: Type.ARRAY,
            items: { type: Type.STRING } 
          },
          correctAnswer: { type: Type.STRING }
        },
        required: ["question", "options", "correctAnswer"],
        propertyOrdering: ["question", "options", "correctAnswer"]
      }
    };

    const prompt = `
      Generate a set of 3 multiple-choice questions for the MBA topic: "${topic}".
      Difficulty Level: ${difficulty}.
      Ensure the questions test conceptual understanding.
      Provide 4 options per question.
    `;

    const result = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: quizSchema,
      }
    });

    if (result.text) {
      return JSON.parse(result.text) as QuizQuestion[];
    }
    return [];
  } catch (error) {
    console.error("Gemini Quiz Error:", error);
    return [];
  }
};
