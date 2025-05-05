import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onPrevious, onNext }) => {
  return (
    <div className="flex justify-between items-center gap-4 mt-6">
      <button 
        onClick={onPrevious}
        className="px-6 py-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 
                   transition-colors border border-blue-200 flex items-center space-x-2"
      >
        <ArrowLeft size={18} />
        <span>Previous</span>
      </button>
      <button 
        onClick={onNext}
        className="px-6 py-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 
                   transition-colors border border-blue-200 flex items-center space-x-2"
      >
        <span>Next</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default Navigation;