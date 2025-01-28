// src/config/geminiConfig.js
import dotenv from 'dotenv';
dotenv.config();

export default {
  API_BASE_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
  API_KEY: process.env.GEMINI_API_KEY,
  TIMEOUT: 60000,
  DEFAULT_CONFIG: {
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192
    }
  }
};