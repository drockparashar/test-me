import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Brain, Target, TrendingUp, AlertCircle } from 'lucide-react';

interface QuestionAttempt {
  id: number;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeTaken: number;
  topic: string;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  topic: string;
}

interface TestResults {
  score: number;
  total: number;
  totalTime: number;
  detailedResults: QuestionAttempt[];
}

interface LocationState {
  results: TestResults;
  questions: Question[];
  selectedClass: string;
  selectedSubject: string;
  difficulty: string;
}

interface TopicAnalysis {
  topic: string;
  percentage: string;
}

const Analysis: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const {
    results,
    questions = [],
    selectedClass = 'N/A',
    selectedSubject = 'N/A',
    difficulty = 'N/A'
  } = (location.state as LocationState) || {};

  // Early return if no results
  if (!results?.detailedResults || !Array.isArray(questions) || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-800 mb-4">
          No results to display. Please take a test first.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Home
        </button>
      </div>
    );
  }

  // Calculate time-based metrics
  const averageTimePerQuestion = useMemo(() => {
    if (!results.totalTime || !questions.length) return '0.0';
    return (results.totalTime / (questions.length * 1000)).toFixed(1); // Convert ms to seconds
  }, [results.totalTime, questions.length]);

  // Calculate topic-wise performance
  const topicAnalysis = useMemo(() => {
    const analysis: { [key: string]: { correct: number; total: number } } = {};
    
    results.detailedResults.forEach((result, index) => {
      const question = questions[index];
      if (!question?.topic) return;
      
      analysis[question.topic] = analysis[question.topic] || { correct: 0, total: 0 };
      analysis[question.topic].total += 1;
      if (result.isCorrect) analysis[question.topic].correct += 1;
    });

    return Object.entries(analysis).map(([topic, data]) => ({
      topic,
      percentage: ((data.correct / data.total) * 100).toFixed(1)
    }));
  }, [results.detailedResults, questions]);

  // Identify strengths and weaknesses
  const strengthsAndWeaknesses = useMemo(() => {
    const topics = [...topicAnalysis].sort((a, b) => 
      parseFloat(b.percentage) - parseFloat(a.percentage)
    );
    
    return {
      strengths: topics.slice(0, 3),
      weaknesses: topics.slice(-3).reverse()
    };
  }, [topicAnalysis]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-semibold mb-4">Performance Analysis</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <Target className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Score</p>
                <p className="text-xl font-bold">{results.score}/{results.total}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Brain className="text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Difficulty</p>
                <p className="text-xl font-bold">{difficulty}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Avg Time/Question</p>
                <p className="text-xl font-bold">{averageTimePerQuestion}s</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <TrendingUp className="text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Accuracy</p>
                <p className="text-xl font-bold">
                  {((results.score / results.total) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Topic Performance Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Topic-wise Performance</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strengths and Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-600">Strengths</h2>
            <div className="space-y-4">
              {strengthsAndWeaknesses.strengths.map((topic: TopicAnalysis) => (
                <div key={topic.topic} className="flex justify-between items-center">
                  <span>{topic.topic}</span>
                  <span className="font-semibold text-green-600">{topic.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Areas for Improvement</h2>
            <div className="space-y-4">
              {strengthsAndWeaknesses.weaknesses.map((topic: TopicAnalysis) => (
                <div key={topic.topic} className="flex justify-between items-center">
                  <span>{topic.topic}</span>
                  <span className="font-semibold text-red-600">{topic.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Detailed Question Review</h2>
          <div className="space-y-4">
            {results.detailedResults.map((result, index) => (
              <div 
                key={result.id}
                className={`p-4 rounded-lg ${result.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}
              >
                <div className="flex items-start space-x-2">
                  <AlertCircle className={result.isCorrect ? 'text-green-500' : 'text-red-500'} />
                  <div>
                    <p className="font-medium">Question {index + 1}</p>
                    <p className="text-gray-700 mt-1">{questions[index]?.text}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        Your Answer: <span className={result.isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {result.selectedAnswer || 'Not answered'}
                        </span>
                      </p>
                      {!result.isCorrect && (
                        <p className="text-sm">
                          Correct Answer: <span className="text-green-600">{result.correctAnswer}</span>
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mt-2">
                        Time Taken: {(result.timeTaken / 1000).toFixed(1)}s
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;