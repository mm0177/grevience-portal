import { type User, type InsertUser, type Entry, type InsertEntry } from "@shared/schema";
import { connectMongoDB, User as UserModel, Entry as EntryModel } from "./mongodb";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllEntries(): Promise<Entry[]>;
  createEntry(entry: InsertEntry): Promise<Entry>;
  deleteEntry(id: string): Promise<boolean>;
}

export class MongoStorage implements IStorage {
  constructor() {
    connectMongoDB();
  }

  async getUser(id: string): Promise<User | undefined> {
    await connectMongoDB();
    const user = await UserModel.findById(id);
    if (!user) return undefined;
    
    return {
      _id: user._id.toString(),
      username: user.username,
      password: user.password,
    };
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    await connectMongoDB();
    const user = await UserModel.findOne({ username });
    if (!user) return undefined;
    
    return {
      _id: user._id.toString(),
      username: user.username,
      password: user.password,
    };
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    await connectMongoDB();
    const user = await UserModel.create(insertUser);
    
    return {
      _id: user._id.toString(),
      username: user.username,
      password: user.password,
    };
  }

  async getAllEntries(): Promise<Entry[]> {
    await connectMongoDB();
    const entries = await EntryModel.find({}).sort({ createdAt: -1 });
    
    return entries.map(entry => ({
      _id: entry._id.toString(),
      text: entry.text,
      mood: entry.mood,
      createdAt: entry.createdAt,
    }));
  }

  async createEntry(insertEntry: InsertEntry): Promise<Entry> {
    await connectMongoDB();
    const entry = await EntryModel.create(insertEntry);
    
    return {
      _id: entry._id.toString(),
      text: entry.text,
      mood: entry.mood,
      createdAt: entry.createdAt,
    };
  }

  async deleteEntry(id: string): Promise<boolean> {
    await connectMongoDB();
    const result = await EntryModel.findByIdAndDelete(id);
    return result !== null;
  }
}

export const storage = new MongoStorage();
