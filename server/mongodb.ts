import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI must be set');
}

let isConnected = false;

export async function connectMongoDB() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Entry Schema  
const entrySchema = new mongoose.Schema({
  text: { type: String, required: true },
  mood: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
export const Entry = mongoose.model('Entry', entrySchema);