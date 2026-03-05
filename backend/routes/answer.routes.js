import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { generateAnswers } from "../controllers/answer.controller.js";

const router = express.Router();

router.post("/generate", protect, generateAnswers);

export default router;