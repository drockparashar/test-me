
import { 
  BookOpen, 
  Brain, 
  Target, 
  Trophy, 
  CheckCircle, 
  Layout, 
  Zap 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: <BookOpen className="text-blue-500" size={40} />,
      title: "Comprehensive Subject Coverage",
      description: "Practice tests for all major subjects up to Class 10th"
    },
    {
      icon: <Brain className="text-green-500" size={40} />,
      title: "AI-Powered Question Generation",
      description: "Intelligent, adaptive questions tailored to student learning"
    },
    {
      icon: <Target className="text-purple-500" size={40} />,
      title: "Personalized Learning Paths",
      description: "Customized test recommendations based on performance"
    },
    {
      icon: <Trophy className="text-yellow-500" size={40} />,
      title: "Performance Tracking",
      description: "Detailed analytics and progress monitoring"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Master Your Studies with Smart Practice Tests
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            AI-powered learning platform designed for students up to Class 10th
          </p>
          
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full 
                               hover:bg-blue-700 transition flex items-center">
              <Zap className="mr-2" /> Start Learning
            </button>
            <button className="bg-white border border-blue-600 text-blue-600 
                               px-8 py-3 rounded-full hover:bg-blue-50 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Why Choose Our Platform?
          </h2>
          <p className="text-gray-600 mt-4">
            Revolutionizing education with intelligent, adaptive learning
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg 
                                        hover:shadow-xl transition text-center">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Features */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Comprehensive Learning Experience
              </h2>
              <ul className="space-y-4">
                {[
                  "20+ Subjects Covered",
                  "Adaptive Question Difficulty",
                  "Real-time Performance Insights",
                  "Mobile and Web Compatibility"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="mr-3 text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <Layout size={300} className="text-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Ready to Transform Your Learning?
        </h2>
        <p className="text-xl text-gray-600 mb-10">
          Join thousands of students achieving their academic goals
        </p>
        <button className="bg-blue-600 text-white px-10 py-4 rounded-full 
                           hover:bg-blue-700 transition text-lg"
                           onClick={() => navigate('/auth')}>
          Create Free Account
        </button>
      </div>
    </div>
  );
};

export default LandingPage;