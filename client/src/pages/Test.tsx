import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TestEnvironment from '../components/TestEnvironment';
import AdvancedAILoader from '../components/AdvancedAILoader';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  topic: string;
}

interface QuestionAttempt {
  id: number;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeTaken: number;
  topic: string;
}

interface TestResults {
  score: number;
  total: number;
  totalTime: number;
  detailedResults: QuestionAttempt[];
}

const Test: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  interface LocationState {
    selectedClass: string;
    selectedSubject: string;
    difficulty: string;
    duration: number;
    questionCount: number;
  }

  const {
    selectedClass,
    selectedSubject,
    difficulty,
    duration,
    questionCount,
  } = (location.state as LocationState) || {};

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedClass || !selectedSubject || !questionCount || !difficulty) {
      setError('Missing required test parameters');
      setIsLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post('http://localhost:5000/questions/generate-questions', {
          class_name: selectedClass,
          topic: selectedSubject,
          difficulty,
          questionCount,
        });

        if (!response.data?.questions || !Array.isArray(response.data.questions)) {
          throw new Error('Invalid response format from server');
        }

        // Process questions and add topic information
        const processedQuestions = response.data.questions.map((q: any, index: number) => ({
          id: q.id || index + 1,
          text: q.text || '',
          options: Array.isArray(q.options) ? q.options : [],
          correctAnswer: q.correctAnswer || q.options[0],
          topic: q.topic || 'General' // Ensure each question has a topic
        }));

        if (processedQuestions.some((q: Question) => !q.text || q.options.length === 0)) {
          throw new Error('Invalid question format in response');
        }

        setQuestions(processedQuestions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch questions');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedClass, selectedSubject, difficulty, questionCount]);

  const handleTestComplete = (results: TestResults) => {
    if (!results || typeof results.score !== 'number' || !Array.isArray(results.detailedResults)) {
      setError('Invalid test results');
      return;
    }

    navigate('/analysis', {
      state: {
        results: {
          score: results.score,
          total: results.total,
          totalTime: results.totalTime,
          detailedResults: results.detailedResults
        },
        questions,
        selectedClass,
        selectedSubject,
        difficulty,
      },
    });
  };

  if (isLoading) {
    return <AdvancedAILoader />;
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        Error: {error}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="p-4 text-amber-600 bg-amber-50 rounded-lg">
        No questions found. Please try again later.
      </div>
    );
  }

  return (
    <TestEnvironment
      questions={questions}
      duration={duration || 30}
      onTestComplete={handleTestComplete}
    />
  );
};

export default Test;