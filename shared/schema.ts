import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define summary length enum
export const SummaryLengthEnum = z.enum(["short", "medium", "long"]);
export type SummaryLength = z.infer<typeof SummaryLengthEnum>;

// Define language enum
export const LanguageEnum = z.enum(["en", "es", "fr", "de", "zh"]);
export type Language = z.infer<typeof LanguageEnum>;

// Define input schema for summary request
export const summaryRequestSchema = z.object({
  inputType: z.enum(["youtube", "text"]),
  youtubeUrl: z.string().url().optional(),
  textContent: z.string().optional(),
  summaryLength: SummaryLengthEnum,
  language: LanguageEnum,
});

export type SummaryRequest = z.infer<typeof summaryRequestSchema>;

// Define response schema for summary results
export const summaryResponseSchema = z.object({
  source: z.string(),
  summary: z.string(),
  keyPoints: z.array(z.string()),
  generatedAt: z.date(),
});

export type SummaryResponse = z.infer<typeof summaryResponseSchema>;

// Define users table (keeping this from the template)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Define summary history table
export const summaries = pgTable("summaries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  inputType: text("input_type").notNull(),
  source: text("source").notNull(),
  content: text("content").notNull(),
  keyPoints: text("key_points").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSummarySchema = createInsertSchema(summaries).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSummary = z.infer<typeof insertSummarySchema>;
export type Summary = typeof summaries.$inferSelect;
