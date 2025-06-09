// controllers/ChatBotController.js

import asyncHandler from "../middlewares/asynHandler.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const chatWithBot = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an expert on Ben 10. Only answer questions related to Ben 10. If the question is not about Ben 10, politely redirect the user to ask about Ben 10 topics. User asked: ${message}`,
    });

    const reply = response.text;

    res.json({ reply });
  } catch (error) {
    console.error("ChatBot error:", error.message);
    res.status(500).json({ error: "Failed to generate response" });
  }
});
