// src/routes/questionRoutes.js
import express from 'express';
import * as questionController from '../controllers/questionController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Gemini Question Generation API');
});

router.post('/generate-questions', questionController.generateQuestions);

export default router;