import { useState, useEffect } from 'react';
import { BookOpen, Brain, Target, Trophy, CheckCircle, BarChart3, ArrowRight, BookOpenCheck } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JwtPayload, jwtDecode } from 'jwt-decode';

export default function Dashboard() {
  const navigate = useNavigate();

  interface UserData {
    username: string;
    testHistory: {
      testId: string;
      testDate: string;
      score: number;
      total: number;
      totalTime: number;
      detailedResults: {
        correctAnswer: string;
        isCorrect: boolean;
        timeTaken: number;
        _id: string;
      }[];
      selectedClass: string;
      selectedSubject: string;
      difficulty: string;
      _id: string;
    }[];
    averageScore: number;
    totalTestsTaken: number;
  }

  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const decoded = jwtDecode<JwtPayload & { userId: string }>(token);
      const response = await axios.get(`https://test-me-wv1b.onrender.com/user/getUserData/${decoded.userId}`);
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData || !userData.testHistory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="animate-pulse text-blue-600 text-lg font-medium">Loading your dashboard...</div>
      </div>
    );
  }

  const performanceData = userData.testHistory?.map(test => ({
    name: test.testDate,
    score: test.score
  })) || [];

  const quickActions = [
    {
      icon: <BookOpen className="text-blue-600" size={24} />,
      title: "Start New Test",
      description: "Begin your learning journey",
      action: () => navigate('/start')
    },
    {
      icon: <Brain className="text-blue-600" size={24} />,
      title: "Practice Sets",
      description: "AI-generated questions",
      action: () => navigate('/practice')
    },
    {
      icon: <Target className="text-blue-600" size={24} />,
      title: "Set Goals",
      description: "Track your progress",
      action: () => navigate('/goals')
    },
    {
      icon: <Trophy className="text-blue-600" size={24} />,
      title: "Achievements",
      description: "View your milestones",
      action: () => navigate('/achievements')
    }
  ];

  const avgTimeInMinutes = ((userData.testHistory.reduce((total, test) => total + test.totalTime, 0) / userData.testHistory.length) / 60000).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-white to-transparent">
        <div className="container mx-auto px-8 sm:px-12 pt-12 pb-8">
          <div className="relative max-w-7xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
              <div className="mb-6 sm:mb-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-3 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-base font-medium">
                    <BookOpenCheck size={24} />
                    <span>Student Dashboard</span>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                  <div className="text-gray-600 text-base font-medium">
                    {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  Welcome back, <span className="text-blue-600">{userData?.username}</span>
                </h1>
                <div className="space-y-6">
                  <p className="text-xl text-gray-600 max-w-3xl">
                    Ready to continue your learning journey? Your personalized dashboard awaits.
                  </p>
                  <button 
                    onClick={() => navigate('/Start')}
                    className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition group text-xl font-medium"
                  >
                    Start New Test
                    <ArrowRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
              {[
                { label: 'Current Average', value: `${userData?.averageScore.toFixed(1)}%`, icon: <BarChart3 className="text-blue-600" size={32} /> },
                { label: 'Tests Taken', value: userData?.totalTestsTaken, icon: <CheckCircle className="text-green-600" size={32} /> },
                { label: 'Learning Streak', value: '12 Days', icon: <Trophy className="text-yellow-600" size={32} /> },
                { label: 'Next Goal', value: '85%', icon: <Target className="text-purple-600" size={32} /> }
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-base text-gray-600 font-medium mb-1">{stat.label}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 sm:px-12 py-12">
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="relative group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 text-left w-full"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-100/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {action.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {action.description}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
            </button>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 sm:p-10 relative group hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div className="mb-6 sm:mb-0">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Performance Trend</h2>
                <p className="text-base text-gray-600">Your learning progress over time</p>
              </div>
              <div className="flex gap-3">
                {['1W', '1M', '3M'].map((period) => (
                  <button
                    key={period}
                    className="px-6 py-3 rounded-xl text-base font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <XAxis dataKey="name" stroke="#6B7280" fontSize={14} tickMargin={12} />
                  <YAxis stroke="#6B7280" fontSize={14} tickMargin={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '12px',
                      fontSize: '14px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#2563EB" 
                    fill="url(#colorScore)" 
                    strokeWidth={3}
                    fillOpacity={0.2} 
                  />
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-6">
            {[
              { icon: <BarChart3 size={32} />, title: 'Average Score', value: `${userData.averageScore.toFixed(2)}%`, color: 'text-blue-600' },
              { icon: <CheckCircle size={32} />, title: 'Tests Completed', value: userData.totalTestsTaken.toString(), color: 'text-green-600' },
              { icon: <Trophy size={32} />, title: 'Learning Streak', value: '12 Days', color: 'text-yellow-600' },
              { icon: <Brain size={32} />, title: 'Avg. Time per Test', value: `${avgTimeInMinutes} min`, color: 'text-purple-600' }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group relative"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl bg-opacity-20 flex items-center justify-center ${stat.color.replace('text', 'bg')}/10`}>
                    <div className={`${stat.color}`}>{stat.icon}</div>
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-600 mb-2">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Previous Tests Table */}
      <div className="container mx-auto px-8 sm:px-12 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 mt-8 relative group hover:shadow-xl transition-all duration-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Previous Tests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-4 px-6 text-left">Date</th>
                  <th className="py-4 px-6 text-left">Score</th>
                  <th className="py-4 px-6 text-left">Total Time</th>
                  <th className="py-4 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.testHistory.map((test, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition">
                    <td className="py-4 px-6">{new Date(test.testDate).toLocaleDateString()}</td>
                    <td className="py-4 px-6">{test.score}%</td>
                    <td className="py-4 px-6">{(test.totalTime / 60000).toFixed(2)} min</td>
                    <td className="py-4 px-6">
                      <button 
                        onClick={() => navigate(`/analysis/${test._id}`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}