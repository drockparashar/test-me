import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import QuestionDisplay from './QuestionDisplay';
import QuestionGrid from './QuestionGrid';
import Navigation from './Navigation';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

interface TestEnvironmentProps {
  questions: Question[];
  totalQuestions: number;
  duration: number;
}

const TestEnvironment: React.FC<TestEnvironmentProps> = ({ 
  questions = [], 
  totalQuestions, 
  duration 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [grid, setGrid] = useState<{ id: number; status: 'unattempted' | 'attempted' | 'review' }[]>([]);

  useEffect(() => {
    if (questions.length > 0) {
      setGrid(
        questions.map((q) => ({ id: q.id, status: 'unattempted' as 'unattempted' }))
      );
    }
  }, [questions]);

  if (!questions || questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        No questions available. Please regenerate the test.
      </div>
    );
  }

  const handleAnswer = (id: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [id]: answer }));
    setGrid((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, status: 'attempted' as 'attempted' } : q
      )
    );
  };

  const handleQuestionSelect = (id: number) => {
    const index = questions.findIndex((q) => q.id === id);
    if (index !== -1) {
      setCurrentQuestion(index);
    }
  };

  const handleSubmit = () => {
    const score = questions.reduce((total, question) => {
      return answers[question.id] === question.correctAnswer 
        ? total + 1 
        : total;
    }, 0);

    alert(`Test Submitted. Score: ${score}/${questions.length}`);
    console.log('Answers:', answers);
    console.log('Score:', score);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col md:flex-row items-start justify-center gap-6 mt-12">
        <div className="flex-grow max-w-full md:max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <Timer duration={duration * 60} onTimeUp={handleSubmit} />
          <QuestionDisplay
            question={questions[currentQuestion]}
            selectedAnswer={answers[questions[currentQuestion].id] || ''}
            onAnswer={(answer) => handleAnswer(questions[currentQuestion].id, answer)}
          />
        </div>

        <div className="w-full md:w-72 bg-white shadow-lg rounded-lg p-6 mt-6 md:mt-0">
          <p className="mb-4 font-medium text-gray-700">Select a question:</p>
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
        className="fixed bottom-4 right-4 sm:right-10 sm:bottom-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors w-full sm:w-auto"
      >
        Submit
      </button>
    </div>
  );
};

export default TestEnvironment;