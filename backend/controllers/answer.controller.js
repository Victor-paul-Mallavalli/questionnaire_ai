import Questionnaire from "../models/Questionnaire.js";
import Answer from "../models/Answer.js";
import { generateAnswer } from "../services/ai.service.js";

export const generateAnswers = async (req, res) => {
  try {
    const { questionnaireId } = req.body;

    const questionnaire = await Questionnaire.findById(questionnaireId);

    if (!questionnaire) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }

    const results = [];

    for (const question of questionnaire.questions) {

      const result = await generateAnswer(question, req.user.id);

      const savedAnswer = await Answer.create({
        questionnaireId,
        question,
        answer: result.answer,
        citation: result.citation
      });

      results.push(savedAnswer);
    }

    res.json(results);

  } catch (error) {
    console.error("Answer generation error:", error);
    res.status(500).json({ message: "Failed to generate answers" });
  }
};