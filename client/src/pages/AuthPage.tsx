import React, { useState } from 'react';
import { Lock, Mail, User, BookOpen } from 'lucide-react';
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
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        // Store user ID 
        localStorage.setItem('userId', data.userId);
        
        // Redirect or update app state
        navigate('/dashboard');
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl grid md:grid-cols-2">
        {/* Left Side - Branding */}
        <div className="bg-blue-600 text-white p-12 flex flex-col justify-center">
          <div className="flex items-center mb-6">
            <BookOpen size={40} className="mr-4" />
            <h1 className="text-3xl font-bold">Smart Test Pro</h1>
          </div>
          <p className="text-xl mb-6">
            {isLogin 
              ? "Welcome back! Continue your learning journey." 
              : "Join our platform and transform your education."}
          </p>
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition"
            >
              {isLogin ? "Create Account" : "Login Instead"}
            </button>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {isLogin ? "Login to Your Account" : "Create Your Account"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          {isLogin && (
            <div className="text-center mt-4">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;