import mongoose from "mongoose";

const detailedResultSchema = new mongoose.Schema({
  questionId: String,
  questionText: String,
  correctAnswer: String,
  userAnswer: String,
  isCorrect: Boolean,
  timeTaken: Number,
  topic: String, // Add topic field
});

const testResultSchema = new mongoose.Schema({
  testId: { type: String, required: true },
  testDate: { type: Date, required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true }, // Total questions
  totalTime: { type: Number, required: true }, // Time taken for the test
  detailedResults: [detailedResultSchema], // Store per-question details
  selectedClass: { type: String, required: true },
  selectedSubject: { type: String, required: true },
  difficulty: { type: String, required: true },
  testDocumentId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" }, // Link to Test document
});

export default testResultSchema;
