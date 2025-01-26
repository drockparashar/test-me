import React, { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom'; 
import axios from 'axios'; 
import TestEnvironment from '../components/TestEnvironment';

interface QuestionType {   
  id: number;   
  text: string;   
  options: string[];   
  correctAnswer: string; 
}

const Test: React.FC = () => {
  const location = useLocation();
  const {      
    selectedClass,      
    selectedSubject,      
    difficulty,      
    duration,      
    questionCount    
  } = location.state || {};

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async () => {
    if (!selectedClass || !selectedSubject) {
      setError('No class or subject selected');
      setIsLoading(false);
      return;
    }

    console.log('Fetching questions:', { selectedClass, selectedSubject, difficulty, questionCount });

    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5000/questions/generate-questions', {
        class_name: selectedClass,
        topic: selectedSubject,
        difficulty,
        questionCount
      });

      console.log('Response:', response.data);
      const processedQuestions = response.data.questions.map((q: any) => ({
        ...q,
        correctAnswer: q.options[0],
        id: q.id || Math.floor(Math.random() * 1000)
      }));

      console.log('Questions:', processedQuestions);

      setQuestions(processedQuestions);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch questions');
      setIsLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <TestEnvironment 
      questions={questions} 
      totalQuestions={questions.length} 
      duration={duration || 30} 
    />
  );
};

export default Test;