import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

interface Transcript {
  text: string;
  duration: number;
  offset: number;
}

/**
 * Extract transcript from a YouTube video
 */
export async function extractYoutubeTranscript(youtubeUrl: string, validateOnly: boolean = false): Promise<string> {
  try {
    // Validate YouTube URL format
    const youtubeUrlSchema = z.string().url().refine(
      (url) => {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.*$/;
        return regex.test(url);
      },
      { message: "Invalid YouTube URL format" }
    );
    
    const validationResult = youtubeUrlSchema.safeParse(youtubeUrl);
    if (!validationResult.success) {
      throw new Error(fromZodError(validationResult.error).message);
    }
    
    // Extract video ID from YouTube URL
    let videoId: string | null = null;
    
    if (youtubeUrl.includes('youtube.com/watch')) {
      const url = new URL(youtubeUrl);
      videoId = url.searchParams.get('v');
    } else if (youtubeUrl.includes('youtu.be/')) {
      videoId = youtubeUrl.split('youtu.be/')[1]?.split('?')[0];
    }
    
    if (!videoId) {
      throw new Error("Could not extract video ID from URL");
    }
    
    // If we're just validating, return early
    if (validateOnly) {
      return "VALID";
    }
    
    // Use YouTube transcript API to fetch transcript
    // Note: In a real implementation, you would use a proper YouTube transcript API
    // For this example, we're simulating a fetch to a third-party service
    const transcriptUrl = `https://youtube-transcript-api.example.com/api/transcript/${videoId}`;
    
    try {
      // Simulating an API call to get transcript
      // In a real application, you would use youtube-transcript-api npm package
      // or another service to extract the transcript
      console.log(`Fetching transcript for video ID: ${videoId}`);
      
      // For this demonstration, we'll return a simulated transcript
      // In a real application, you would parse the API response
      const simulatedTranscript = `
        Hello and welcome to this video about artificial intelligence.
        Today we're going to discuss the recent advancements in natural language processing.
        These technologies have revolutionized how we interact with computers and machines.
        Large language models like GPT-4 can understand and generate human-like text.
        They can be used for summarization, translation, and creative writing.
        However, these models also face challenges related to bias and accuracy.
        Researchers are working to address these limitations through various techniques.
        In conclusion, NLP continues to advance rapidly, offering new possibilities for how we use AI.
        Thank you for watching this video. Please subscribe for more tech content.
      `;
      
      return simulatedTranscript.trim();
    } catch (error) {
      console.error(`Error fetching transcript: ${error}`);
      throw new Error("Failed to fetch video transcript. The video might not have captions available.");
    }
  } catch (error) {
    console.error(`YouTube transcript extraction error: ${error}`);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
