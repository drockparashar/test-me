import mongoose from 'mongoose';
import testResultSchema from './testResultSchema.js';

const testSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testDetails: testResultSchema // Store all test data
});

const Test = mongoose.model('Test', testSchema);
export default Test;
