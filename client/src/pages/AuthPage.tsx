import React, { useState } from 'react';
import { Lock, Mail, User, BookOpen, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const payload = isLogin 
        ? { email, password }
        : { username, email, password };
  
      const response = await fetch(`http://localhost:5000${endpoint}`, {
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
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="text-blue-600 mr-3" size={40} />
              <h1 className="text-4xl font-bold text-gray-800">
                Smart Test Pro
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              {isLogin 
                ? "Welcome back! Continue your learning journey." 
                : "Join our platform and transform your education."}
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left Side - Form */}
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">
                  {isLogin ? "Login to Your Account" : "Create Your Account"}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && (
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={!isLogin}
                      />
                    </div>
                  )}
                  
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition flex items-center justify-center"
                  >
                    <Zap className="mr-2" />
                    {isLogin ? "Login" : "Sign Up"}
                  </button>
                </form>

                {isLogin && (
                  <div className="text-center mt-6">
                    <a href="#" className="text-blue-600 hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                )}
              </div>

              {/* Right Side - Features */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6">
                  {isLogin ? "New Here?" : "Already Have an Account?"}
                </h3>
                <p className="text-lg mb-8 text-blue-100">
                  {isLogin 
                    ? "Join our community of students and start your learning journey today." 
                    : "Login to your account to continue your learning progress."}
                </p>
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition"
                >
                  {isLogin ? "Create Account" : "Login Instead"}
                </button>
                
                <div className="mt-12">
                  <h4 className="font-semibold mb-4">What you'll get:</h4>
                  <ul className="space-y-3">
                    {[
                      "Access to 20+ subjects",
                      "Personalized learning paths",
                      "Real-time performance tracking",
                      "AI-powered practice tests"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center text-blue-100">
                        <div className="w-1.5 h-1.5 bg-blue-300 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
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