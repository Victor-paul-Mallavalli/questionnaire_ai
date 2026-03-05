import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
{
  questionnaireId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questionnaire"
  },

  question: String,

  answer: String,

  citation: String
},
{ timestamps: true }
);

export default mongoose.model("Answer", answerSchema);