import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { extractYoutubeTranscript } from "./services/youtube";
import { generateSummary } from "./services/openai";
import { summaryRequestSchema, SummaryLengthEnum, LanguageEnum } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for generating summaries
  app.post("/api/summarize", async (req: Request, res: Response) => {
    try {
      console.log("Received summarize request:", JSON.stringify(req.body, null, 2));
      
      // Validate the request body
      const result = summaryRequestSchema.safeParse(req.body);
      
      if (!result.success) {
        console.error("Validation error:", fromZodError(result.error).message);
        return res.status(400).json({ 
          message: "Invalid request data", 
          errors: fromZodError(result.error).message 
        });
      }
      
      const { inputType, youtubeUrl, textContent, summaryLength, language } = result.data;
      console.log("Processing request with:", { inputType, summaryLength, language });
      
      // Get content based on input type
      let contentToSummarize: string;
      
      if (inputType === "youtube") {
        if (!youtubeUrl) {
          console.error("Missing YouTube URL for YouTube input type");
          return res.status(400).json({ message: "YouTube URL is required for YouTube input type" });
        }
        
        console.log("YouTube URL provided:", youtubeUrl);
        
        try {
          console.log("Extracting transcript from YouTube video...");
          contentToSummarize = await extractYoutubeTranscript(youtubeUrl);
          console.log("Transcript extracted successfully. Length:", contentToSummarize.length);
        } catch (error) {
          console.error("Failed to extract transcript:", error);
          return res.status(400).json({ 
            message: "Failed to extract transcript from YouTube video", 
            error: error instanceof Error ? error.message : String(error)
          });
        }
      } else if (inputType === "text") {
        if (!textContent) {
          console.error("Missing text content for text input type");
          return res.status(400).json({ message: "Text content is required for text input type" });
        }
        
        console.log("Text input provided, length:", textContent.length);
        contentToSummarize = textContent;
      } else {
        console.error("Invalid input type:", inputType);
        return res.status(400).json({ message: "Invalid input type" });
      }
      
      // Generate summary using OpenAI
      try {
        console.log("Generating summary...");
        const summaryResult = await generateSummary(contentToSummarize, summaryLength, language);
        console.log("Summary generated successfully:", {
          summaryLength: summaryResult.summary.length,
          keyPointsCount: summaryResult.keyPoints.length
        });
        
        // Store summary in history (if needed)
        // For now, we'll skip storing in database unless authentication is implemented
        
        return res.status(200).json(summaryResult);
      } catch (error) {
        console.error("Failed to generate summary:", error);
        return res.status(500).json({ 
          message: "Failed to generate summary", 
          error: error instanceof Error ? error.message : String(error)
        });
      }
    } catch (error) {
      return res.status(500).json({ 
        message: "Server error", 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // API endpoint for validating YouTube URL
  app.post("/api/validate-youtube", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const schema = z.object({
        youtubeUrl: z.string().url()
      });
      
      const result = schema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid YouTube URL", 
          errors: fromZodError(result.error).message 
        });
      }
      
      const { youtubeUrl } = result.data;
      
      try {
        // Try to get video info to validate the URL
        await extractYoutubeTranscript(youtubeUrl, true);
        return res.status(200).json({ valid: true });
      } catch (error) {
        return res.status(400).json({ 
          valid: false, 
          message: "Invalid YouTube URL or video doesn't have available transcripts",
          error: error instanceof Error ? error.message : String(error)
        });
      }
    } catch (error) {
      return res.status(500).json({ 
        message: "Server error", 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
