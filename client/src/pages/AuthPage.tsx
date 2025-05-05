import  { useState } from 'react';
import { Lock, Mail, User, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setName] = useState('');
  const navigate = useNavigate();

  const features = [
    "Unlimited AI-generated practice questions",
    "Personalized learning paths with AI insights",
    "Real-time performance tracking and reports",
    "Adaptive test difficulty for better preparation"
  ];

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const payload = isLogin 
        ? { email, password }
        : { username, email, password };
  
      const response = await fetch(`https://test-me-wv1b.onrender.com${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
              {isLogin ? "Welcome Back" : "Start Your AI-Powered Learning"}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {isLogin ? "Continue Your Learning Journey" : "Join the Future of Test Preparation"}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isLogin 
                ? "Sign in to access AI-powered practice and performance tracking." 
                : "Create your account and explore AI-generated practice questions tailored for you."}
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-2">
              {/* Left Side - Form */}
              <div className="p-8 lg:p-12">
                <div className="max-w-md mx-auto">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    {isLogin ? "Login to Your Account" : "Create Your Free Account"}
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={username}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          required={!isLogin}
                        />
                      </div>
                    )}
                    
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center group"
                    >
                      {isLogin ? "Sign In" : "Sign Up"}
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Side - Features */}
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 lg:p-12 overflow-hidden">
                <div className="relative">
                  <h3 className="text-2xl font-bold mb-4">
                    {isLogin ? "New to Smart Test Pro?" : "Already have an account?"}
                  </h3>
                  <p className="text-blue-100 mb-8">
                    {isLogin 
                      ? "Sign up now and experience AI-powered test preparation with personalized learning paths." 
                      : "Welcome back! Sign in to continue your AI-enhanced practice journey."}
                  </p>
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="bg-white text-blue-600 px-8 py-3 rounded-xl hover:bg-blue-50 transition flex items-center group mb-12"
                  >
                    {isLogin ? "Create Account" : "Sign In"}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-6">Why Join Us?</h4>
                    <div className="space-y-4">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center text-blue-100">
                          <CheckCircle className="mr-3 flex-shrink-0 text-blue-300" size={20} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
