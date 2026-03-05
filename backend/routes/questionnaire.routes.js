import express from "express";
import { upload } from "../middleware/upload.middleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadQuestionnaire } from "../controllers/questionnaire.controller.js";

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadQuestionnaire);

export default router;