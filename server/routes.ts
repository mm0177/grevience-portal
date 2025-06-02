import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEntrySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all entries
  app.get("/api/entries", async (req, res) => {
    try {
      const entries = await storage.getAllEntries();
      res.json(entries);
    } catch (error) {
      console.error("Error fetching entries:", error);
      res.status(500).json({ message: "Failed to fetch entries" });
    }
  });

  // Create new entry
  app.post("/api/entries", async (req, res) => {
    try {
      const validatedData = insertEntrySchema.parse(req.body);
      const entry = await storage.createEntry(validatedData);
      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid entry data", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating entry:", error);
        res.status(500).json({ message: "Failed to create entry" });
      }
    }
  });

  // Delete entry
  app.delete("/api/entries/:id", async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ message: "Invalid entry ID" });
      }

      const deleted = await storage.deleteEntry(id);
      if (deleted) {
        res.json({ message: "Entry deleted successfully" });
      } else {
        res.status(404).json({ message: "Entry not found" });
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
      res.status(500).json({ message: "Failed to delete entry" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
