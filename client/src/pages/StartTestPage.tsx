import React, { useState } from 'react';
import { 
  BookOpen, 
  Target, 
  Zap 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const classSubjects = {
  9: ['Mathematics', 'Science', 'English', 'Social Science', 'Hindi'],
  10: ['Mathematics', 'Science', 'English', 'Social Science', 'Hindi', 'Computer Science'],
  11: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'Accountancy'],
  12: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'Business Studies']
};

const TestConfigurationPage: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<9 | 10 | 11 | 12 | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string>('medium');
  const [duration, setDuration] = useState<number>(60);
  const [questionCount, setQuestionCount] = useState<number>(30);
  const navigate = useNavigate();

  const handleStartTest = () => {
    console.log('Test Configuration:', { 
      class: selectedClass, 
      subject: selectedSubject, 
      difficulty, 
      duration, 
      questionCount 
    });
    navigate('/test', {
      state: {
        selectedClass,
        selectedSubject,
        difficulty,
        duration,
        questionCount
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Configure Your Practice Test
          </h1>
          <p className="text-xl text-gray-600 mb-10 text-center">
            Personalized learning starts here
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Selected Context Display */}
            <div className="flex justify-center space-x-4 mb-6">
              {selectedClass && (
                <div className="bg-blue-50 px-4 py-2 rounded-full flex items-center">
                  <BookOpen className="mr-2 text-blue-500" size={20} />
                  <span>Class {selectedClass}</span>
                </div>
              )}
              {selectedSubject && (
                <div className="bg-blue-50 px-4 py-2 rounded-full flex items-center">
                  <Target className="mr-2 text-green-500" size={20} />
                  <span>{selectedSubject}</span>
                </div>
              )}
            </div>

            {/* Class Selection */}
            {!selectedSubject && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  {!selectedClass ? 'Select Your Class' : 'Select Subject'}
                </h2>
                <div className="grid grid-cols-4 gap-4">
                  {!selectedClass ? 
                    [9, 10, 11, 12].map(classNumber => (
                      <button
                        key={classNumber}
                        onClick={() => setSelectedClass(classNumber as 9 | 10 | 11 | 12)}
                        className="p-4 bg-white rounded-xl border-2 hover:bg-blue-50 hover:border-blue-500 transition"
                      >
                        Class {classNumber}
                      </button>
                    )) : 
                    classSubjects[selectedClass].map(subject => (
                      <button
                        key={subject}
                        onClick={() => setSelectedSubject(subject)}
                        className="p-4 bg-white rounded-xl border-2 hover:bg-blue-50 hover:border-blue-500 transition"
                      >
                        {subject}
                      </button>
                    ))
                  }
                </div>
                {selectedClass && (
                  <div className="text-center mt-4">
                    <button 
                      onClick={() => setSelectedClass(null)}
                      className="text-blue-600 hover:underline"
                    >
                      Change Class
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Test Configuration */}
            {selectedSubject && (
              <div>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Difficulty */}
                  <div>
                    <label className="block mb-2 font-semibold">Difficulty</label>
                    <select 
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full p-3 rounded-xl border"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block mb-2 font-semibold">Duration (mins)</label>
                    <select 
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border"
                    >
                      {[30, 45, 60, 90].map(time => (
                        <option key={time} value={time}>{time} mins</option>
                      ))}
                    </select>
                  </div>

                  {/* Question Count */}
                  <div>
                    <label className="block mb-2 font-semibold">Questions</label>
                    <select 
                      value={questionCount}
                      onChange={(e) => setQuestionCount(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border"
                    >
                      {[10, 20, 30].map(count => (
                        <option key={count} value={count}>{count} Questions</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => setSelectedSubject(null)}
                    className="text-blue-600 hover:underline"
                  >
                    Change Subject
                  </button>
                  <button
                    onClick={handleStartTest}
                    className="bg-blue-600 text-white px-8 py-3 rounded-full 
                               hover:bg-blue-700 transition flex items-center"
                  >
                    <Zap className="mr-2" /> Start Test
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestConfigurationPage;