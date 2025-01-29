import { useState, useEffect } from 'react';
import { BookOpen, Brain, Target, Trophy, CheckCircle, BarChart3, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JwtPayload, jwtDecode } from 'jwt-decode';

export default function Dashboard() {
  const navigate = useNavigate();

  // Define the type for user data
  interface UserData {
    username: string;
    testHistory: { testDate: string; score: number; totalTime: number }[];
    averageScore: number;
    totalTestsTaken: number;
  }

  // State to store user data
  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const decoded = jwtDecode<JwtPayload & { userId: string }>(token);
      const userId = decoded.userId;
      const response = await axios.get(`http://localhost:5000/user/getUserData/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch data on component mount
  }, []);

  // Add a loading state for userData
  if (!userData || !userData.testHistory) {
    return <div>Loading...</div>; // Or a more elaborate loading state
  }

  // Prepare data for performance chart
  const performanceData = userData.testHistory?.map(test => ({
    name: test.testDate,
    score: test.score
  })) || [];

  // Define quick actions
  const quickActions = [
    { icon: <BookOpen className="text-blue-500" size={30} />, title: "Start Test", description: "Choose a subject and test" },
    { icon: <Brain className="text-green-500" size={30} />, title: "Adaptive Learning", description: "Personalized question sets" },
    { icon: <Target className="text-purple-500" size={30} />, title: "Weekly Goals", description: "Track your progress" },
    { icon: <Trophy className="text-yellow-500" size={30} />, title: "Achievements", description: "View your milestones" }
  ];

  // Calculate additional metrics
  const averageTimePerTest = userData.testHistory.reduce((total, test) => total + test.totalTime, 0) / userData.testHistory.length || 0;
  const totalTests = userData.totalTestsTaken || 0;

  // Convert average time per test from seconds to minutes
  const avgTimeInMinutes = (averageTimePerTest / 60000).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
            <p className="text-gray-600">Welcome, {userData.username}! Let's track your learning progress.</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition flex items-center" onClick={() => navigate('/start')}>
            <Zap className="mr-2" size={20} /> Start New Test
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {quickActions.map((action, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition text-center">
              <div className="flex justify-center mb-4">
                {action.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </div>
          ))}
        </div>

        {/* Performance Analytics */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Performance Trend</h2>
                <p className="text-gray-600">Your test scores over the past weeks</p>
              </div>
              <div className="flex space-x-2">
                {['1W', '1M', '3M'].map((period) => (
                  <button key={period} className="px-3 py-1 text-sm rounded-full hover:bg-blue-50">
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="space-y-6">
            {[{ icon: <BarChart3 className="text-blue-500" />, title: 'Average Score', value: `${userData.averageScore.toFixed(2)}%` },
              { icon: <CheckCircle className="text-green-500" />, title: 'Tests Completed', value: `${totalTests}` },
              { icon: <Trophy className="text-yellow-500" />, title: 'Learning Streak', value: '12 Days' },
              { icon: <BarChart3 className="text-orange-500" />, title: 'Average Time per Test', value: `${avgTimeInMinutes} minutes` }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 flex items-center">
                <div className="mr-4">{stat.icon}</div>
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
