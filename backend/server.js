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

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
const PORT = process.env.PORT || 5000;

// app.use(cors());
app.use(express.json());
app.use("/api/questionnaire", questionnaireRoutes);
app.use("/api/reference", referenceRoutes);
app.use("/api/answers", answerRoutes);



app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//    res.send("API running");
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});