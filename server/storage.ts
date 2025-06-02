import { users, entries, type User, type InsertUser, type Entry, type InsertEntry } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllEntries(): Promise<Entry[]>;
  createEntry(entry: InsertEntry): Promise<Entry>;
  deleteEntry(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllEntries(): Promise<Entry[]> {
    const result = await db
      .select()
      .from(entries)
      .orderBy(desc(entries.createdAt));
    return result;
  }

  async createEntry(insertEntry: InsertEntry): Promise<Entry> {
    const [entry] = await db
      .insert(entries)
      .values(insertEntry)
      .returning();
    return entry;
  }

  async deleteEntry(id: number): Promise<boolean> {
    const result = await db
      .delete(entries)
      .where(eq(entries.id, id));
    return result.rowCount > 0;
  }
}

export const storage = new DatabaseStorage();
