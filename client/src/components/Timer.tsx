import React, { useEffect, useState } from 'react';

interface TimerProps {
  duration: number; // Total time in seconds
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onTimeUp]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return(
    <div className="fixed top-4 right-4 bg-white shadow-md rounded-lg px-4 py-2 text-lg font-semibold text-gray-700">
    Time Left: {formatTime(timeLeft)}
  </div>
  )
};

export default Timer;
