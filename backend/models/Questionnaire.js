import mongoose from "mongoose";

const questionnaireSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fileName: String,
    questions: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Questionnaire", questionnaireSchema);