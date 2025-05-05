import React from 'react';

interface QuestionDisplayProps {
  question: { id: number; text: string; options: string[] };
  selectedAnswer: string;
  onAnswer: (answer: string) => void;
  onReviewToggle: () => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  selectedAnswer,
  onAnswer,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Question {question.id}
        <div className="mt-2 text-gray-700">{question.text}</div>
      </h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <div key={index} className="relative">
            <label className={`flex items-center space-x-3 w-full p-4 rounded-xl 
                             hover:bg-blue-50 cursor-pointer border-2 transition-all
                             ${selectedAnswer === option ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={selectedAnswer === option}
                onChange={() => onAnswer(option)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;