import { 
  BookOpen, 
  Brain, 
  Target, 
  Trophy, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: <BookOpen className="text-blue-600" size={32} />,
      title: "Comprehensive Subject Coverage",
      description: "Practice with AI-generated questions across Mathematics, Science, English, and more, ensuring well-rounded learning.",
      stats: "20+ Subjects"
    },
    {
      icon: <Brain className="text-blue-600" size={32} />,
      title: "AI-Powered Question Generation",
      description: "Our intelligent AI creates dynamic questions that adapt to your learning progress, making practice effective and engaging.",
      stats: "Adaptive Learning"
    },
    {
      icon: <Target className="text-blue-600" size={32} />,
      title: "Personalized Learning Paths",
      description: "Get customized test recommendations based on your strengths and weaknesses to focus on areas needing improvement.",
      stats: "Tailored Practice"
    },
    {
      icon: <Trophy className="text-blue-600" size={32} />,
      title: "Performance Tracking & Analytics",
      description: "Track progress with in-depth analytics, real-time reports, and personalized insights to enhance your learning journey.",
      stats: "Real-time Stats"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-20 sm:pb-32 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 sm:mb-6 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
            For Students up to Class 10
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-8">
            Master Your Subjects with
            <span className="text-blue-600"> AI-Powered</span> Learning
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            Experience personalized practice tests that adapt to your learning style and help you achieve academic excellence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 sm:mb-12 px-4">
            <button
              onClick={() => navigate('/auth')} 
              className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-blue-700 transition flex items-center justify-center text-base sm:text-lg font-medium group">
              Start Free Practice
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={20} />
            </button>
            <button className="bg-white border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-blue-50 transition text-base sm:text-lg font-medium">
              View Demo
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-gray-600 text-sm sm:text-base px-4">
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={20} /> Free Practice Tests
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={20} /> No Credit Card Required
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/50 to-white" />
        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Excel
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Our platform combines AI technology with proven learning methods to help you achieve your academic goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="relative group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-blue-600 mb-2">
                      {feature.stats}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>




      {/* CTA Section */}
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="max-w-3xl mx-auto bg-blue-600 text-white rounded-3xl p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
            Join today and get access to personalized practice tests, detailed analytics, and AI-powered recommendations.
          </p>
          <button
            onClick={() => navigate('/auth')} 
            className="bg-white text-blue-600 px-8 sm:px-10 py-3 sm:py-4 rounded-xl hover:bg-blue-50 transition text-base sm:text-lg font-medium">
            Get Started Free
          </button>
          <div className="mt-4 sm:mt-6 text-sm opacity-80">
            No credit card required • Free practice tests available
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;