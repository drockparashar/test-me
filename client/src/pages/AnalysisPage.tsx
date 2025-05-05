import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { 
  Clock, 
  Brain, 
  Target, 
  CheckCircle, 
  XCircle,
  Award,
  BookOpen,
  ArrowUpCircle,
  HomeIcon
} from 'lucide-react';

interface QuestionAttempt {
  id: number;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeTaken: number;
  topic: string;
}

interface TestResult {
  score: number;
  total: number;
  totalTime: number;
  detailedResults: QuestionAttempt[];
}

const AnalysisPage = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [results, setResults] = useState<TestResult | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [difficulty, setDifficulty] = useState<string>('N/A');

  const fetchTestResult = async () => {
    try {
      const response = await axios.get(`https://test-me-wv1b.onrender.com/test/getTestResult/${testId}`);
      setResults(response.data.results);
      setQuestions(response.data.questions);
      setDifficulty(response.data.difficulty);
    } catch (error) {
      console.error('Error fetching test result:', error);
    }
  };

  useEffect(() => {
    if (testId) {
      fetchTestResult();
    }
  }, [testId]);

  if (!results || !results.detailedResults || !Array.isArray(questions) || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-50">
        <BookOpen className="text-blue-500 mb-4" size={48} />
        <p className="text-xl font-medium text-gray-800 mb-6">
          No results to display. Please take a test first.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition flex items-center"
        >
          <HomeIcon className="mr-2" /> Go to Home
        </button>
      </div>
    );
  }

  const averageTimePerQuestion = useMemo(() => {
    if (!results.totalTime || !questions.length) return '0.0';
    return (results.totalTime / (questions.length * 1000)).toFixed(1);
  }, [results.totalTime, questions.length]);

  const topicAnalysis = useMemo(() => {
    const analysis: { [key: string]: { correct: number; total: number } } = {};
    
    results.detailedResults.forEach((result: QuestionAttempt, index: number) => {
      const question = questions[index];
      if (!question?.topic) return;
      
      analysis[question.topic] = analysis[question.topic] || { correct: 0, total: 0 };
      analysis[question.topic].total += 1;
      if (result.isCorrect) analysis[question.topic].correct += 1;
    });

    return Object.entries(analysis).map(([topic, data]) => ({
      topic,
      percentage: ((data.correct / data.total) * 100).toFixed(1)
    }));
  }, [results.detailedResults, questions]);

  const strengthsAndWeaknesses = useMemo(() => {
    const topics = [...topicAnalysis].sort((a, b) => 
      parseFloat(b.percentage) - parseFloat(a.percentage)
    );
    
    return {
      strengths: topics.slice(0, 3),
      weaknesses: topics.slice(-3).reverse()
    };
  }, [topicAnalysis]);

  const accuracy = ((results.score / results.total) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Your Performance Analysis
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Detailed insights to help you improve your learning journey
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Score Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: <Target className="text-blue-500" size={32} />,
              label: "Score",
              value: `${results.score}/${results.total}`,
              subtext: `${accuracy}% Accuracy`
            },
            {
              icon: <Brain className="text-purple-500" size={32} />,
              label: "Difficulty",
              value: difficulty,
              subtext: "Current Level"
            },
            {
              icon: <Clock className="text-green-500" size={32} />,
              label: "Avg Time",
              value: `${averageTimePerQuestion}s`,
              subtext: "Per Question"
            },
            {
              icon: <Award className="text-yellow-500" size={32} />,
              label: "Performance",
              value: accuracy >= "75" ? "Excellent" : accuracy >= "60" ? "Good" : "Needs Work",
              subtext: "Overall Rating"
            }
          ].map((card, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                {card.icon}
                <span className="ml-2 text-gray-600">{card.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{card.value}</div>
              <div className="text-sm text-gray-600 mt-1">{card.subtext}</div>
            </div>
          ))}
        </div>

        {/* Topic Performance Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Topic Performance</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicAnalysis}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                <XAxis dataKey="topic" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strengths and Areas for Improvement */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <ArrowUpCircle className="text-green-500 mr-2" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Strengths</h2>
            </div>
            <div className="space-y-4">
              {strengthsAndWeaknesses.strengths.map((topic: any) => (
                <div key={topic.topic} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">{topic.topic}</span>
                  <span className="text-green-600 font-bold">{topic.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Target className="text-blue-500 mr-2" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Focus Areas</h2>
            </div>
            <div className="space-y-4">
              {strengthsAndWeaknesses.weaknesses.map((topic: any) => (
                <div key={topic.topic} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">{topic.topic}</span>
                  <span className="text-blue-600 font-bold">{topic.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Review</h2>
          <div className="space-y-4">
            {results.detailedResults.map((result: QuestionAttempt, index: number) => (
              <div 
                key={result.id}
                className={`p-4 rounded-xl transition-all ${
                  result.isCorrect ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
                }`}
              >
                <div className="flex items-start space-x-4">
                  {result.isCorrect ? (
                    <CheckCircle className="text-green-500 mt-1" size={20} />
                  ) : (
                    <XCircle className="text-red-500 mt-1" size={20} />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">Question {index + 1}</h3>
                      <span className="text-sm text-gray-600">
                        Time: {(result.timeTaken / 1000).toFixed(1)}s
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{questions[index]?.text}</p>
                    <div className="space-y-1 text-sm">
                      <p className={result.isCorrect ? 'text-green-600' : 'text-red-600'}>
                        Your Answer: {result.selectedAnswer || 'Not answered'}
                      </p>
                      {!result.isCorrect && (
                        <p className="text-green-600">
                          Correct Answer: {result.correctAnswer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pb-12">
          <button 
            onClick={() => 
              {
                localStorage.removeItem('currentTestId');
                navigate('/dashboard')
              }
              }
            className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition flex items-center mx-auto"
          >
            <HomeIcon className="mr-2" /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;