import { useState, useEffect } from 'react';
import { Cpu, Zap, Sparkles, Clock, Brain } from 'lucide-react';

const AdvancedAILoader = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing');

  const statuses = [
    'Analyzing Topic Depth',
    'Generating Conceptual Framework',
    'Crafting Intelligent Questions',
    'Cross-Referencing Knowledge Bases',
    'Semantic Validation',
    'Refining Question Complexity',
    'Ensuring Cognitive Diversity',
    'Finalizing Intelligent Set'
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => prev >= 100 ? 100 : prev + 1);
    }, 300);

    const statusInterval = setInterval(() => {
      setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center 
                    bg-gradient-to-br from-white to-blue-50 
                    overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 
                        animate-pulse opacity-50 grid grid-cols-20 grid-rows-20 gap-1">
          {[...Array(400)].map((_, i) => (
            <div 
              key={i} 
              className="bg-blue-500/5 border border-blue-500/10 
                         transform transition-all duration-500 
                         hover:bg-blue-500/20 rounded-sm"
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center bg-white p-12 rounded-2xl shadow-xl">
        {/* Animated Brain Icon */}
        <div className="relative mb-8">
          <Brain 
            className="text-blue-600 animate-pulse" 
            size={120} 
            strokeWidth={1.5} 
          />
          <Sparkles 
            className="absolute top-0 right-0 text-blue-400 animate-spin" 
            size={40} 
          />
        </div>

        {/* Progress Bar */}
        <div className="w-96 bg-blue-100 rounded-full h-4 mb-6 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Display */}
        <div className="flex items-center space-x-3 mb-4">
          <Cpu className="text-blue-500 animate-pulse" size={20} />
          <h2 className="text-xl font-semibold text-gray-800">
            {status}
          </h2>
          <Clock className="text-blue-500 animate-pulse" size={20} />
        </div>

        {/* Version Tag */}
        <div className="text-sm text-gray-600 flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
          <Zap className="text-blue-500" size={16} />
          <span>AI Question Generator v2.0</span>
          <Zap className="text-blue-500" size={16} />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-pulse">
          <Zap className="text-blue-400/30" size={40} />
        </div>
        <div className="absolute bottom-1/4 right-1/3 animate-pulse delay-100">
          <Brain className="text-blue-400/30" size={40} />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-pulse delay-200">
          <Sparkles className="text-blue-400/30" size={40} />
        </div>
      </div>
    </div>
  );
};

export default AdvancedAILoader;