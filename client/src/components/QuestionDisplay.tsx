import React from 'react';

interface QuestionDisplayProps {
  question: { id: number; text: string; options: string[] };
  selectedAnswer: string;
  onAnswer: (answer: string) => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  selectedAnswer,
  onAnswer,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{question.id}.{question.text}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center">
            <label className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
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
