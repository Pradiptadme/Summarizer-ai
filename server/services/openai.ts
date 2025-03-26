import OpenAI from "openai";
import { SummaryLength, Language, SummaryResponse } from "@shared/schema";

// Create OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const MODEL = "gpt-4o";

/**
 * Generate a summary from text content using OpenAI
 */
export async function generateSummary(
  content: string,
  summaryLength: SummaryLength,
  language: Language
): Promise<SummaryResponse> {
  try {
    // Map summary length to number of sentences
    const lengthMap: Record<SummaryLength, string> = {
      short: "1-2 sentences",
      medium: "3-5 sentences",
      long: "6-8 sentences",
    };
    
    // Map language codes to language names
    const languageMap: Record<Language, string> = {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German",
      zh: "Chinese",
    };
    
    // Determine if it's a YouTube URL or text
    const isYouTubeUrl = content.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/);
    
    // Create the prompt
    const prompt = `
      Please summarize the following ${isYouTubeUrl ? 'YouTube video transcript' : 'text'} in ${languageMap[language]}.
      Generate a concise summary of ${lengthMap[summaryLength]} and extract 3-5 key points.
      
      Content to summarize:
      ${content}
      
      Response format should be JSON with the following structure:
      {
        "summary": "The comprehensive summary",
        "keyPoints": ["Key point 1", "Key point 2", "Key point 3", ...]
      }
    `;
    
    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: "You are an expert summarization assistant. Your task is to extract the most important information from content and present it in a clear, concise manner." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });
    
    // Extract the response content
    const result = JSON.parse(response.choices[0].message.content);
    
    // Determine the source (either YouTube URL or "Text input")
    const source = isYouTubeUrl ? content : "Text input";
    
    // Return the formatted response
    return {
      source,
      summary: result.summary,
      keyPoints: result.keyPoints,
      generatedAt: new Date()
    };
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error(`Failed to generate summary: ${error instanceof Error ? error.message : String(error)}`);
  }
}
