import axios from "axios";
import geminiConfig from "../config/geminiConfig.js";

class GeminiService {
  constructor() {
    this.baseUrl = "https://generativelanguage.googleapis.com/v1beta/models";
    this.axiosInstance = axios.create({
      timeout: geminiConfig.TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async generateQuestions(class_name, subject, difficulty, questionCount) {
    try {
      const parseQuestions = (rawContent) => {
        console.log("Raw API Response:", rawContent);
        try {
          const jsonMatch = rawContent.match(/\{[\s\S]*"questions"[\s\S]*\}/);
          if (jsonMatch) {
            const cleanedJson = jsonMatch[0].replace(/\/\/.*$/gm, ""); // Remove comments
            return JSON.parse(cleanedJson).questions;
          }
        } catch (error) {
          console.error("Error parsing questions:", error);
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

      // ✅ Updated model name here
      const requestUrl = `${this.baseUrl}/gemini-1.5-flash:generateContent?key=${geminiConfig.API_KEY}`;
      console.log("Request URL:", requestUrl);

      const response = await this.axiosInstance.post(requestUrl, {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        ...geminiConfig.DEFAULT_CONFIG,
      });

      const rawContent = response.data.candidates[0].content.parts[0].text;
      const questions = parseQuestions(rawContent);

      return questions.map((q, index) => ({
        id: q.id || index + 1,
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer || q.options[0],
        topic: q.topic || "General",
      }));
    } catch (error) {
      console.error("Gemini Service Error:", error.message);
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
        console.error("Response Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No Response Received:", error.request);
      } else {
        console.error("Error Setting Up Request:", error.message);
      }
      throw new Error(
        "Failed to generate questions. Please check the API configuration and try again."
      );
    }
  }

  async listModels() {
    try {
      const requestUrl = `${this.baseUrl}?key=${geminiConfig.API_KEY}`;
      console.log("Fetching available models from:", requestUrl);

      const response = await this.axiosInstance.get(requestUrl);
      console.log("Available Models:", response.data.models);
      return response.data.models;
    } catch (error) {
      console.error("Error fetching models:", error.message);
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
      }
      throw new Error(
        "Failed to fetch available models. Please check the API configuration."
      );
    }
  }
}

export default new GeminiService();
