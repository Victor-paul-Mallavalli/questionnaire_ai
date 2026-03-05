import express from "express";
import { upload } from "../middleware/upload.middleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadReference } from "../controllers/reference.controller.js";

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadReference);

export default router;