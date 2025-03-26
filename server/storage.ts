import { users, type User, type InsertUser, type Summary, type InsertSummary, summaries } from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Summary operations
  createSummary(summary: InsertSummary): Promise<Summary>;
  getSummariesByUserId(userId: number): Promise<Summary[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private summaries: Map<number, Summary>;
  private userIdCounter: number;
  private summaryIdCounter: number;

  constructor() {
    this.users = new Map();
    this.summaries = new Map();
    this.userIdCounter = 1;
    this.summaryIdCounter = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Summary operations
  async createSummary(insertSummary: InsertSummary): Promise<Summary> {
    const id = this.summaryIdCounter++;
    const now = new Date();
    
    const summary: Summary = {
      ...insertSummary,
      id,
      createdAt: now
    };
    
    this.summaries.set(id, summary);
    return summary;
  }

  async getSummariesByUserId(userId: number): Promise<Summary[]> {
    return Array.from(this.summaries.values()).filter(
      (summary) => summary.userId === userId
    );
  }
}

// Export a singleton instance
export const storage = new MemStorage();
