import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import QuestionDisplay from './QuestionDisplay';
import QuestionGrid from './QuestionGrid';
import Navigation from './Navigation';
import { Send, AlertTriangle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  topic: string;  // Added topic field
}

interface QuestionAttempt {
  id: number;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeTaken: number;  // Added time tracking
  topic: string;      // Added topic tracking
}

interface TestEnvironmentProps {
  questions: Question[];
  duration: number;
  onTestComplete: (results: {
    score: number;
    total: number;
    totalTime: number;
    detailedResults: QuestionAttempt[];
  }) => void;
}

const TestEnvironment: React.FC<TestEnvironmentProps> = ({ 
  questions = [], 
  duration, 
  onTestComplete 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [questionTimes, setQuestionTimes] = useState<{ [key: number]: number }>({});
  const [startTimes, setStartTimes] = useState<{ [key: number]: number }>({});
  const [grid, setGrid] = useState<{ 
    id: number; 
    status: 'unattempted' | 'attempted' | 'review' 
  }[]>([]);

  useEffect(() => {
    if (questions.length > 0) {
      setGrid(questions.map((q) => ({ id: q.id, status: 'unattempted' })));
      // Initialize start time for first question
      setStartTimes({ [questions[0].id]: Date.now() });
    }
  }, [questions]);

  const handleAnswer = (id: number, answer: string) => {
    const now = Date.now();
    const timeTaken = now - (startTimes[id] || now);
    
    setAnswers((prev) => ({ ...prev, [id]: answer }));
    setQuestionTimes((prev) => ({ ...prev, [id]: timeTaken }));
    setGrid((prev) =>
      prev.map((q) => q.id === id ? { ...q, status: 'attempted' } : q)
    );
  };

  const handleQuestionSelect = (id: number) => {
    const index = questions.findIndex((q) => q.id === id);
    if (index !== -1) {
      // Save time spent on current question before switching
      const currentId = questions[currentQuestion].id;
      const now = Date.now();
      const timeTaken = now - (startTimes[currentId] || now);
      
      setQuestionTimes((prev) => ({ ...prev, [currentId]: timeTaken }));
      setStartTimes((prev) => ({ ...prev, [id]: now }));
      setCurrentQuestion(index);
    }
  };

  const handleReviewToggle = (id: number) => {
    setGrid((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, status: q.status === 'review' ? 'attempted' : 'review' } : q
      )
    );
  };

  const handleSubmit = () => {
    // Calculate final time for current question
    const currentId = questions[currentQuestion].id;
    const now = Date.now();
    const finalTimeTaken = now - (startTimes[currentId] || now);
    setQuestionTimes((prev) => ({ ...prev, [currentId]: finalTimeTaken }));

    const detailedResults = questions.map((question) => {
      const selectedAnswer = answers[question.id] || '';
      const isCorrect = selectedAnswer === question.correctAnswer;
      
      return {
        id: question.id,
        selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        timeTaken: questionTimes[question.id] || 0,
        topic: question.topic
      };
    });

    const score = detailedResults.filter((result) => result.isCorrect).length;
    const totalTime = Object.values(questionTimes).reduce((sum, time) => sum + time, 0);

    onTestComplete({ 
      score, 
      total: questions.length, 
      totalTime,
      detailedResults 
    });
  };

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-blue-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg flex items-center space-x-3 text-red-500">
          <AlertTriangle size={24} />
          <span>No questions available. Please regenerate the test.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
      <div className="flex flex-col md:flex-row items-start justify-center gap-6 mt-12 container mx-auto">
        <div className="flex-grow max-w-full md:max-w-4xl">
          <Timer duration={duration * 60} onTimeUp={handleSubmit} />
          <QuestionDisplay
            question={questions[currentQuestion]}
            selectedAnswer={answers[questions[currentQuestion].id] || ''}
            onAnswer={(answer) => handleAnswer(questions[currentQuestion].id, answer)}
            onReviewToggle={() => handleReviewToggle(questions[currentQuestion].id)}
          />
        </div>

        <div className="w-full md:w-80 bg-white shadow-lg rounded-2xl p-6 sticky top-6">
          <h3 className="font-semibold text-gray-800 mb-4">Question Navigator</h3>
          <QuestionGrid 
            questions={grid} 
            onSelectQuestion={handleQuestionSelect} 
          />
          <Navigation
            onPrevious={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
            onNext={() => setCurrentQuestion((prev) => Math.min(questions.length - 1, prev + 1))}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="fixed bottom-6 right-6 px-8 py-3 bg-blue-600 text-white rounded-full 
                   hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg 
                   flex items-center space-x-2"
      >
        <span>Submit Test</span>
        <Send size={18} />
      </button>
    </div>
  );
};

export default TestEnvironment;