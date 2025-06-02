import { z } from "zod";

// Zod schemas for validation
export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const insertEntrySchema = z.object({
  text: z.string(),
  mood: z.string(),
});

// Types for MongoDB documents
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = {
  _id: string;
  username: string;
  password: string;
};

export type InsertEntry = z.infer<typeof insertEntrySchema>;
export type Entry = {
  _id: string;
  text: string;
  mood: string;
  createdAt: Date;
};
