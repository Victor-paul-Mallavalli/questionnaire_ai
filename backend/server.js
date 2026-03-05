import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import answerRoutes from "./routes/answer.routes.js";
import referenceRoutes from "./routes/reference.routes.js";
import questionnaireRoutes from "./routes/questionnaire.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://unrivaled-haupia-fd6d95.netlify.app"
];

// CORS middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Body parser
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
  res.send("Questionnaire AI backend running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/questionnaire", questionnaireRoutes);
app.use("/api/reference", referenceRoutes);
app.use("/api/answers", answerRoutes);

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});
