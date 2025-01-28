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

  async generateQuestions(class_name, topic, difficulty, questionCount) {
    try {
      let responseArray = [];
      const parseQuestions = (rawContent) => {
        console.log('Raw API Response:', rawContent);
        try {
          const jsonMatch = rawContent.match(/\{[\s\S]*"questions"[\s\S]*\}/);
          if (jsonMatch) {
            const cleanedJson = jsonMatch[0].replace(/\/\/.*$/gm, '');
            return JSON.parse(cleanedJson).questions;
          }
        } catch (error) {
          console.error('Error parsing questions:', error);
        }
        return [];
      };
  
      const apiCount = Math.ceil(questionCount / 10);
      for (let i = 0; i < apiCount; i++) {
        try {
          const response = await this.axiosInstance.post('', {
            contents: [{
              parts: [{
                text: `Produce EXACTLY this JSON format for 10 ${difficulty} multiple-choice questions about ${topic} for a student of ${class_name} class:
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
            params: { key: geminiConfig.API_KEY }
          });
          const questions = parseQuestions(response.data.candidates[0].content.parts[0].text);
          responseArray.push(...questions);
        } catch (error) {
          console.error(`Error in batch ${i + 1}:`, error);
        }
      }
  
      return responseArray.flat().map((q, index) => ({
        id: q.id || index + 1,
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer || q.options[0],
      }));
    } catch (error) {
      console.error('Gemini Service Error:', error);
      throw error;
    }
  }
  async generateQuestions(class_name,topic, difficulty,questionCount) {
    try {
     let responseArray=[];

     const parseQuestions = (rawContent) => {
      const jsonMatch = rawContent.match(/\{[\s\S]*"questions"[\s\S]*\}/);
      if (jsonMatch) {
        const cleanedJson = jsonMatch[0].replace(/\/\/.*$/gm, '');
        const parsedData = JSON.parse(cleanedJson);
        return parsedData.questions;
      }
      return [];
    };
      // First API call for first 10 questions
      console.log(`Produce EXACTLY this JSON format for ${questionCount} ${difficulty} multiple-choice questions about ${topic} for a student of ${class_name} class `);
      const api_conut=questionCount/10;

      for(let i=0;i<api_conut;i++){
      const response = await this.axiosInstance.post('', {
        contents: [{
          parts: [{
            text: `Produce EXACTLY this JSON format for ${questionCount} ${difficulty} multiple-choice questions about ${topic} for a student of ${class_name} class and keep the response's format consistent throughout the response without any changes that could cause the response to show an error while parsing:

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

      console.log(response.data.candidates[0].content.parts[0].text);

      responseArray.push(parseQuestions(response.data.candidates[0].content.parts[0].text));
    }
      // Second API call for next 10 questions
//       const response2 = await this.axiosInstance.post('', {
//         contents: [{
//           parts: [{
//             text: `Produce EXACTLY this JSON format for ${questionCount} ${difficulty} multiple-choice questions about ${topic} for a student of ${class_name} class:

// {"questions":[
//   {
//     "id":11,
//     "text":"Next question text here?",
//     "options":["Option A","Option B","Option C","Option D"],
//     "correctAnswer":"Option C"
//   }
//   // 9 more questions follow identical structure
// ]}`
//           }]
//         }],
//         ...geminiConfig.DEFAULT_CONFIG
//       }, {
//         params: {
//           key: geminiConfig.API_KEY
//         }
//       });


      // const questions1 = parseQuestions(response1.data.candidates[0].content.parts[0].text);
      // const questions2 = parseQuestions(response2.data.candidates[0].content.parts[0].text);

      return responseArray.flat().map((q, index) => ({
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