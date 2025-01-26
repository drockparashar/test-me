import  { useState, useEffect } from 'react';
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
    }, 200);

    const statusInterval = setInterval(() => {
      setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center 
                    bg-gradient-to-br from-black via-gray-900 to-blue-900 
                    overflow-hidden">
      {/* Holographic Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
                        animate-pulse opacity-50 grid grid-cols-20 grid-rows-20 gap-1">
          {[...Array(400)].map((_, i) => (
            <div 
              key={i} 
              className="bg-white/5 border border-white/10 
                         transform transition-all duration-500 
                         hover:bg-cyan-500/20"
            />
          ))}
        </div>
      </div>

      {/* Main Loader Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Brain Icon */}
        <div className="relative mb-8">
          <Brain 
            className="text-cyan-300 animate-pulse" 
            size={150} 
            strokeWidth={1} 
          />
          <Sparkles 
            className="absolute top-0 right-0 text-yellow-300 animate-spin" 
            size={50} 
          />
        </div>

        {/* Progress Indicators */}
        <div className="w-96 bg-gray-800 rounded-full h-4 mb-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status and Details */}
        <div className="flex items-center space-x-2 mb-4">
          <Cpu className="text-cyan-400 animate-pulse" size={24} />
          <h2 className="text-2xl font-thin text-cyan-100">
            {status}
          </h2>
          <Clock className="text-cyan-400 animate-pulse" size={24} />
        </div>

        <div className="text-sm text-cyan-200 opacity-70 flex items-center space-x-2">
          <Zap className="text-yellow-300" size={16} />
          <span>AI Question Generator v2.0</span>
          <Zap className="text-yellow-300" size={16} />
        </div>
      </div>
    </div>
  );
};

export default AdvancedAILoader;