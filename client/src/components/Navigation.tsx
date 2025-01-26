import React from 'react';

interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onPrevious, onNext }) => {
  return (
    <div className="flex justify-between items-center gap-4 mt-6">
      <button 
        onClick={onPrevious}
        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          Previous
      </button>
      <button 
        onClick={onNext}
        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
        Next
      </button>
    
    </div>
  );
};

export default Navigation;
