import { SummaryLength, Language, SummaryResponse } from "@shared/schema";

/**
 * Generate a summary from text content using basic text summarization
 * This is a free local implementation that doesn't require any API key
 */
export async function generateSummary(
  content: string,
  summaryLength: SummaryLength,
  language: Language
): Promise<SummaryResponse> {
  try {
    // Determine if it's a YouTube URL or text
    const isYouTubeUrl = content.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/);
    
    // Get content to summarize (either YouTube transcript or direct text)
    let textToSummarize = content;
    
    // Add more logging to help debug
    console.log("Content type:", isYouTubeUrl ? "YouTube URL" : "Text input");
    console.log("Content length:", content.length, "characters");
    console.log("First 100 chars:", content.substring(0, 100));
    
    // Basic text summarization algorithm:
    // 1. Split the text into sentences - improved sentence splitting
    const sentences = textToSummarize
      .replace(/([.!?])\s*(?=[A-Z])/g, "$1|")
      .split("|")
      .filter(s => s.trim().length > 5);
    
    // 2. Calculate word frequency (a simple ranking metric)
    const wordFrequency = new Map<string, number>();
    // Expanded stop words list for better filtering
    const stopWords = [
      "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "with", "by", 
      "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", 
      "does", "did", "will", "would", "shall", "should", "may", "might", "must", "can", 
      "could", "of", "from", "about", "that", "this", "these", "those", "it", "its", "it's"
    ];
    
    // Log sentence count for debugging
    console.log("Number of sentences found:", sentences.length);
    
    sentences.forEach(sentence => {
      const words = sentence.toLowerCase().split(/\s+/);
      words.forEach(word => {
        // Clean the word and filter out stop words and short words
        const cleanWord = word.replace(/[^\w]/g, '');
        if (cleanWord.length > 2 && !stopWords.includes(cleanWord)) {
          wordFrequency.set(cleanWord, (wordFrequency.get(cleanWord) || 0) + 1);
        }
      });
    });
    
    // 3. Score each sentence based on word frequency
    const sentenceScores = sentences.map(sentence => {
      const words = sentence.toLowerCase().split(/\s+/);
      let score = 0;
      words.forEach(word => {
        const cleanWord = word.replace(/[^\w]/g, '');
        if (wordFrequency.has(cleanWord)) {
          score += wordFrequency.get(cleanWord)!;
        }
      });
      return { sentence, score };
    });
    
    // 4. Sort sentences by score and select top ones based on summaryLength
    sentenceScores.sort((a, b) => b.score - a.score);
    
    // Determine number of sentences based on summaryLength
    let sentenceCount: number;
    switch (summaryLength) {
      case 'short':
        sentenceCount = Math.min(2, sentences.length);
        break;
      case 'medium':
        sentenceCount = Math.min(4, sentences.length);
        break;
      case 'long':
        sentenceCount = Math.min(7, sentences.length);
        break;
      default:
        sentenceCount = Math.min(3, sentences.length);
    }
    
    // 5. Get top sentences and sort them by original order for readability
    const topSentences = sentenceScores
      .slice(0, sentenceCount)
      .sort((a, b) => sentences.indexOf(a.sentence) - sentences.indexOf(b.sentence));
    
    // 6. Generate the summary and key points
    const summary = topSentences.map(item => item.sentence).join('. ') + '.';
    
    // For key points, use the top sentences that weren't used in the summary
    const keyPointSentences = sentenceScores
      .slice(sentenceCount, sentenceCount + 3)
      .sort((a, b) => b.score - a.score);
      
    const keyPoints = keyPointSentences.map(item => {
      // Make the first letter capitalized
      const sentence = item.sentence.trim();
      return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    });
    
    // If we don't have enough key points, add some generic ones
    if (keyPoints.length < 3) {
      if (isYouTubeUrl) {
        keyPoints.push("This is a summary of a YouTube video");
      }
      if (keyPoints.length < 3) {
        keyPoints.push("The summary highlights the most important points from the original content");
      }
    }
    
    // Determine the source (either YouTube URL or "Text input")
    const source = isYouTubeUrl ? content : "Text input";
    
    // Return the formatted response
    return {
      source,
      summary,
      keyPoints,
      generatedAt: new Date()
    };
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error(`Failed to generate summary: ${error instanceof Error ? error.message : String(error)}`);
  }
}
