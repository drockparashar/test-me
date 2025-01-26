import { 
  BookOpen, 
  Brain, 
  Target, 
  Trophy, 
  CheckCircle, 
  BarChart3, 
  Zap 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const performanceData = [
  { name: 'Week 1', score: 65, tests: 4 },
  { name: 'Week 2', score: 72, tests: 5 },
  { name: 'Week 3', score: 78, tests: 6 },
  { name: 'Week 4', score: 85, tests: 7 },
  { name: 'Week 5', score: 88, tests: 8 },
];

const quickActions = [
  { 
    icon: <BookOpen className="text-blue-500" size={30} />, 
    title: "Start Test", 
    description: "Choose a subject and test" 
  },
  { 
    icon: <Brain className="text-green-500" size={30} />, 
    title: "Adaptive Learning", 
    description: "Personalized question sets" 
  },
  { 
    icon: <Target className="text-purple-500" size={30} />, 
    title: "Weekly Goals", 
    description: "Track your progress" 
  },
  { 
    icon: <Trophy className="text-yellow-500" size={30} />, 
    title: "Achievements", 
    description: "View your milestones" 
  }
];

export default function Dashboard() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
            <p className="text-gray-600">Welcome, Student! Let's track your learning progress.</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full 
                             hover:bg-blue-700 transition flex items-center"
                             onClick={() => navigate('/start')}>
            <Zap className="mr-2" size={20} /> Start New Test
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {quickActions.map((action, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg 
                                        hover:shadow-xl transition text-center">
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
                  <button 
                    key={period} 
                    className="px-3 py-1 text-sm rounded-full hover:bg-blue-50"
                  >
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
            {[
              { icon: <BarChart3 className="text-blue-500" />, title: 'Average Score', value: '82%' },
              { icon: <CheckCircle className="text-green-500" />, title: 'Tests Completed', value: '24' },
              { icon: <Trophy className="text-yellow-500" />, title: 'Learning Streak', value: '12 Days' }
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