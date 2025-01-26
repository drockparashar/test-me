// src/controllers/questionController.js
import geminiService from '../services/geminiService.js';

export const generateQuestions = async (req, res) => {
  const { topic, difficulty } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    const questions = await geminiService.generateQuestions(topic, difficulty);
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