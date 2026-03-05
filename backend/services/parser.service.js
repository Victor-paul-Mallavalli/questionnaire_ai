import fs from "fs";

export const parseQuestionnaire = async (filePath) => {

  const text = fs.readFileSync(filePath, "utf-8");

  const lines = text.split("\n");

  const questions = lines
    .map(line => line.trim())
    .filter(line => line.length > 0);

  return questions;

};