import ReferenceDoc from "../models/ReferenceDoc.js";

export const generateAnswer = async (question, userId) => {

  const docs = await ReferenceDoc.find({ userId });

  const keywords = question
    .toLowerCase()
    .replace(/[0-9.]/g, "")
    .split(" ")
    .filter(w => w.length > 4);

  let bestSentence = "";
  let bestCitation = "";
  let bestScore = 0;

  for (const doc of docs) {

    const sentences = doc.content.split(/[.?!]\s+/);

    for (const sentence of sentences) {

      let score = 0;
      const text = sentence.toLowerCase();

      for (const word of keywords) {
        if (text.includes(word)) score++;
      }

      if (score > bestScore) {
        bestScore = score;
        bestSentence = sentence.trim();
        bestCitation = doc.filename;
      }

    }

  }

  if (bestSentence) {
    return {
      answer: bestSentence + ".",
      citation: bestCitation
    };
  }

  return {
    answer: "Not found in references.",
    citation: "N/A"
  };
};