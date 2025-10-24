// src/controllers/questionController.js
import geminiService from "../services/geminiService.js";

export const generateQuestions = async (req, res) => {
  const { class_name, topic, difficulty, questionCount } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  try {
    const questions = await geminiService.generateQuestions(
      class_name,
      topic,
      difficulty,
      questionCount
    );
    res.json({
      success: true,
      questions: questions,
    });
  } catch (error) {
    console.error("Question Controller Error:", error.message);

    // Log the full error for debugging but don't expose sensitive details to client
    console.log("Full error details:", error);

    res.status(500).json({
      error: "Error generating questions",
      message:
        error.message ||
        "Failed to generate questions. Please try again later.",
    });
  }
};

export const listModels = async (req, res) => {
  try {
    const models = await geminiService.listModels();
    res.json({ success: true, models });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching models",
      message: error.message,
    });
  }
};
