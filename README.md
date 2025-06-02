# Grievance Portal - Our Hearts

A personal portal where feelings can be expressed through text and emojis, with entries saved to MongoDB.

## Features

- Beautiful heart-themed design with soft colors
- Mood selector with 8 different emotions/emojis
- Text area for writing feelings
- Timeline showing all past entries with timestamps
- Delete functionality for entries
- MongoDB database integration

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5000`

## Deployment on Vercel

1. Push this code to a GitHub repository
2. Sign up at vercel.com with your GitHub account
3. Import your repository
4. Add `MONGODB_URI` as an environment variable in Vercel
5. Deploy automatically

## Technology Stack

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Express.js, Node.js
- Database: MongoDB with Mongoose
- Deployment: Vercel-ready configuration