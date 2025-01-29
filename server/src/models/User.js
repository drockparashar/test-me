import mongoose from 'mongoose';
import testResultSchema from './testResultSchema.js';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  createdAt: { type: Date, default: Date.now },
  testHistory: [testResultSchema], // Store past test results
  totalTestsTaken: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  highestScore: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);
export default User;
