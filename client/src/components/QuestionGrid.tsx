import React from 'react';

interface QuestionGridProps {
  questions: { id: number; status: 'unattempted' | 'attempted' | 'review' }[];
  onSelectQuestion: (id: number) => void;
}

const QuestionGrid: React.FC<QuestionGridProps> = ({ questions, onSelectQuestion }) => {
    const getStatusColor = (status:any) => {
        switch (status) {
          case 'attempted':
            return 'bg-green-100 text-green-700 hover:bg-green-200';
          case 'review':
            return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
          default:
            return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
        }
      };
  return (
        <div className="grid grid-cols-5 gap-2 my-6 overflow-y-scroll h-56">
          {questions.map((q) => (
            <button
              key={q.id}
              className={`p-3 rounded-lg font-medium transition-colors ${getStatusColor(q.status)}`}
              onClick={() => onSelectQuestion(q.id)}
            >
              {q.id}
            </button>
          ))}
        </div>

  );
};

export default QuestionGrid;
