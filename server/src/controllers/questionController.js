// src/controllers/questionController.js
import geminiService from '../services/geminiService.js';

export const generateQuestions = async (req, res) => {
  const { class_name,topic, difficulty,questionCount } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    const questions = await geminiService.generateQuestions(class_name,topic, difficulty,questionCount);
    res.json({ 
      success: true,
      questions: questions
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error generating questions',
      message: error.message
    });
  }
};