import mongoose from 'mongoose';

const detailedResultSchema = new mongoose.Schema({
  questionId: String,
  questionText: String,
  correctAnswer: String,
  userAnswer: String,
  isCorrect: Boolean,
  timeTaken: Number
});

const testResultSchema = new mongoose.Schema({
  testId: { type: String, required: true, unique: true },
  testDate: { type: Date, required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true }, // Total questions
  totalTime: { type: Number, required: true }, // Time taken for the test
  detailedResults: [detailedResultSchema], // Store per-question details
  selectedClass: { type: String, required: true },
  selectedSubject: { type: String, required: true },
  difficulty: { type: String, required: true }
});

export default testResultSchema;
