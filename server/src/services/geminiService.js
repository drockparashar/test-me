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

  async generateQuestions(class_name, subject, difficulty, questionCount) {
    try {
      const parseQuestions = (rawContent) => {
        console.log('Raw API Response:', rawContent);
        try {
          const jsonMatch = rawContent.match(/\{[\s\S]*"questions"[\s\S]*\}/);
          if (jsonMatch) {
            const cleanedJson = jsonMatch[0].replace(/\/\/.*$/gm, ''); // Remove comments
            return JSON.parse(cleanedJson).questions;
          }
        } catch (error) {
          console.error('Error parsing questions:', error);
        }
        return [];
      };

      const prompt = `Generate ${questionCount} ${difficulty} multiple-choice questions for ${class_name} class ${subject}. Each question should be from a relevant topic within ${subject}. For example, if the subject is Physics, questions could be from topics like Kinematics, Thermodynamics, etc. Follow EXACTLY this JSON format without any deviations:

      {"questions":[
        {
          "id": 1,
          "text": "Question text here?",
          "options": ["Option A","Option B","Option C","Option D"],
          "correctAnswer": "Option B",
          "topic": "Specific topic within ${subject} that this question covers"
        }
        // ${questionCount - 1} more questions follow identical structure
      ]}

      Ensure each question has a specific, relevant topic from the ${subject} curriculum for ${class_name} class.`;

      const response = await this.axiosInstance.post('', {
        contents: [{
          parts: [{
            text: prompt,
          }],
        }],
        ...geminiConfig.DEFAULT_CONFIG,
      }, {
        params: { key: geminiConfig.API_KEY },
      });

      const rawContent = response.data.candidates[0].content.parts[0].text;
      const questions = parseQuestions(rawContent);

      // Map and return questions with fallback values
      return questions.map((q, index) => ({
        id: q.id || index + 1,
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer || q.options[0],
        topic: q.topic || 'General' // Fallback to 'General' if topic is not specified
      }));

    } catch (error) {
      console.error('Gemini Service Error:', error);
      throw error;
    }
  }
}

export default new GeminiService();