
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function extractMainQuote(fullText: string): Promise<string> {
    const prompt = `
        From the following Bengali text, extract the most powerful and concise key message or quote suitable for a social media graphic. 
        The quote should be inspiring and easy to read. Keep it short, ideally between 10 to 20 words.
        Do not add any extra text, formatting, or quotation marks. Just return the extracted quote.

        Text: "${fullText}"

        Extracted Quote:
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error generating content from Gemini:", error);
        throw new Error("Failed to extract quote from Gemini.");
    }
}
