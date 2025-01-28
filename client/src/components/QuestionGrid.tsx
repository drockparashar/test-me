import React from 'react';

interface QuestionGridProps {
  questions: { id: number; status: 'unattempted' | 'attempted' | 'review' }[];
  onSelectQuestion: (id: number) => void;
}

const QuestionGrid: React.FC<QuestionGridProps> = ({ questions, onSelectQuestion }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'attempted':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-300';
      case 'review':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2 my-6 h-64 overflow-y-auto p-2">
      {questions.map((q) => (
        <button
          key={q.id}
          className={`p-3 rounded-xl font-medium transition-all border ${getStatusStyles(q.status)}`}
          onClick={() => onSelectQuestion(q.id)}
        >
          {q.id}
        </button>
      ))}
    </div>
  );
};

export default QuestionGrid;