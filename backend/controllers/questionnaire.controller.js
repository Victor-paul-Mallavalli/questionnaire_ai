import Questionnaire from "../models/Questionnaire.js";
import { parseQuestionnaire } from "../services/parser.service.js";

export const uploadQuestionnaire = async (req, res) => {
  try {
    const filePath = req.file.path;

    const questions = await parseQuestionnaire(filePath);

    const questionnaire = await Questionnaire.create({
      userId: req.user.id,
      fileName: req.file.originalname,
      questions,
    });

    res.json({
      message: "Questionnaire uploaded",
      questions,
      questionnaire,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};