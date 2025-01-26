import axios from 'axios';
import geminiConfig from '../config/geminiConfig.js';

class GeminiService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: geminiConfig.API_BASE_URL,
      timeout: geminiConfig.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async generateQuestions(topic, difficulty = 'medium') {
    try {
      // First API call for first 10 questions
      const response1 = await this.axiosInstance.post('', {
        contents: [{
          parts: [{
            text: `Produce EXACTLY this JSON format for 10 ${difficulty} multiple-choice questions about ${topic}:

{"questions":[
  {
    "id":1,
    "text":"Question text here?",
    "options":["Option A","Option B","Option C","Option D"],
    "correctAnswer":"Option B"
  }
  // 9 more questions follow identical structure
]}`
          }]
        }],
        ...geminiConfig.DEFAULT_CONFIG
      }, {
        params: {
          key: geminiConfig.API_KEY
        }
      });

      // Second API call for next 10 questions
      const response2 = await this.axiosInstance.post('', {
        contents: [{
          parts: [{
            text: `Produce EXACTLY this JSON format for 10 more ${difficulty} multiple-choice questions about ${topic}:

{"questions":[
  {
    "id":11,
    "text":"Next question text here?",
    "options":["Option A","Option B","Option C","Option D"],
    "correctAnswer":"Option C"
  }
  // 9 more questions follow identical structure
]}`
          }]
        }],
        ...geminiConfig.DEFAULT_CONFIG
      }, {
        params: {
          key: geminiConfig.API_KEY
        }
      });

      const parseQuestions = (rawContent) => {
        const jsonMatch = rawContent.match(/\{[\s\S]*"questions"[\s\S]*\}/);
        if (jsonMatch) {
          const cleanedJson = jsonMatch[0].replace(/\/\/.*$/gm, '');
          const parsedData = JSON.parse(cleanedJson);
          return parsedData.questions;
        }
        return [];
      };

      const questions1 = parseQuestions(response1.data.candidates[0].content.parts[0].text);
      const questions2 = parseQuestions(response2.data.candidates[0].content.parts[0].text);

      return [...questions1, ...questions2].map((q, index) => ({
        id: q.id || index + 1,
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer || q.options[0]
      }));

    } catch (error) {
      console.error('Gemini Service Error:', error);
      throw error;
    }
  }
}

export default new GeminiService();