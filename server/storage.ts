import { users, entries, type User, type InsertUser, type Entry, type InsertEntry } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllEntries(): Promise<Entry[]>;
  createEntry(entry: InsertEntry): Promise<Entry>;
  deleteEntry(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private entries: Map<number, Entry>;
  private currentUserId: number;
  private currentEntryId: number;

  constructor() {
    this.users = new Map();
    this.entries = new Map();
    this.currentUserId = 1;
    this.currentEntryId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllEntries(): Promise<Entry[]> {
    return Array.from(this.entries.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createEntry(insertEntry: InsertEntry): Promise<Entry> {
    const id = this.currentEntryId++;
    const entry: Entry = {
      ...insertEntry,
      id,
      createdAt: new Date(),
    };
    this.entries.set(id, entry);
    return entry;
  }

  async deleteEntry(id: number): Promise<boolean> {
    return this.entries.delete(id);
  }
}

export const storage = new MemStorage();
