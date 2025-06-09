// routes/chatbotRoutes.js

import express from "express";
import { chatWithBot } from "../controllers/ChatBotController.js";

const router = express.Router();

// POST /api/chatbot
router.post("/", chatWithBot);

export default router;
