import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TestEnvironment from '../components/TestEnvironment';
import AdvancedAILoader from '../components/AdvancedAILoader';
import { v4 as uuidv4 } from 'uuid';
import { jwtDecode, JwtPayload } from 'jwt-decode';

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
        const response = await axios.post('https://test-me-wv1b.onrender.com/questions/generate-questions', {
          class_name: selectedClass,
          topic: selectedSubject,
          difficulty,
          questionCount,
        });

        const testId = uuidv4(); // Generate a unique test ID
        localStorage.setItem('currentTestId', testId); // Store it temporarily
        console.log(`Test ID: ${testId}`);



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

  const handleTestComplete = async (results: TestResults) => {
    if (!results || typeof results.score !== 'number' || !Array.isArray(results.detailedResults)) {
      setError('Invalid test results');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    const decoded = jwtDecode<JwtPayload & { userId: string }>(token);

    const testId = localStorage.getItem('currentTestId'); // Retrieve testId
    const userId = decoded.userId; // Get logged-in user's ID

    const detailedResultsWithText = results.detailedResults.map((result, index) => ({
      ...result,
      questionText: questions[index]?.text || '', // Ensure the question text is included
    }));

    const testPayload = {
      testId,
      userId,
      score: results.score,
      total: results.total,
      totalTime: results.totalTime,
      detailedResults: detailedResultsWithText, // Updated with question text
      selectedClass,
      selectedSubject,
      difficulty,
    };

    try {
      const response = await fetch('https://test-me-wv1b.onrender.com/test/submit-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testPayload),
      });

      if (response.ok) {
        console.log('Test submitted successfully',response);
        localStorage.removeItem('currentTestId');
        const responseData = await response.json();
        console.log("response data=",responseData.test);
        navigate(`/analysis/${responseData.test}`); // Navigate to analysis page with _id
      } else {
        console.error('Error submitting test');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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