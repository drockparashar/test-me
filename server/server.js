// src/app.js
import express from 'express';
import mongoose from 'mongoose';
import questionRoutes from './src/routes/questionRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import testROutes from './src/routes/testRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/questions', questionRoutes);
app.use('/auth', authRoutes);
app.use('/test', testROutes);
app.use('/user', userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//mongoDb connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});



// Unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});