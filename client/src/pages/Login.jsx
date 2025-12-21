import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Eye, EyeOff, Mail, Lock, AlertCircle, 
  Sparkles, LogIn, KeyRound, Loader2,
  CheckCircle2, XCircle, Shield
} from 'lucide-react';

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
    color: `rgba(${245 + Math.random() * 10 - 5}, ${158 + Math.random() * 20 - 10}, ${11 + Math.random() * 20 - 10}, 0.2)`
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            background: particle.color,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            filter: 'blur(1px)'
          }}
        />
      ))}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-400/5 to-orange-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-yellow-400/5 to-red-400/5 rounded-full blur-3xl" />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(100vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          50% { transform: translateY(-30vh) translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 180}deg); }
        }
      `}</style>
    </div>
  );
}

export default function EnhancedLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null); // 'success', 'error', null
  const [statusMessage, setStatusMessage] = useState('');
  
  const { login, loading, error: authError, clearError } = useAuth();
  const navigate = useNavigate();

  // Clear auth errors when component mounts
  useEffect(() => {
    clearError();
  }, []);

  // Load saved email if remember me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (authError || loginStatus === 'error') {
      setLoginStatus(null);
      setStatusMessage('');
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Save email if remember me is checked
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', formData.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    
    // Attempt login
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      setLoginStatus('success');
      setStatusMessage('Login successful! Redirecting...');
      
      // Success animation and redirect to Book List
      setTimeout(() => {
        navigate('/books');
      }, 800);
    } else {
      setLoginStatus('error');
      setStatusMessage(result.error || 'Login failed. Please try again.');
      
      // Auto-clear error after 5 seconds
      setTimeout(() => {
        setLoginStatus(null);
        setStatusMessage('');
      }, 5000);
    }
  };

  const handleDemoLogin = async () => {
    // Demo credentials (you can remove this in production)
    setFormData({
      email: 'demo@example.com',
      password: 'demo123'
    });
    
    setTimeout(() => {
      handleSubmit(new Event('submit'));
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900/30 relative overflow-hidden flex items-center justify-center p-4">
      <FloatingParticles />
      
      <div className="relative z-10 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">Sign in to your LitLounge account</p>
        </div>

        {/* Login Card */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
          {/* Status Messages */}
          {loginStatus === 'success' && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl animate-slide-up">
              <div className="flex items-center gap-3 text-green-400">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Success!</p>
                  <p className="text-sm text-green-300">{statusMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          {loginStatus === 'error' && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-xl animate-slide-up">
              <div className="flex items-center gap-3 text-red-400">
                <XCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Login Failed</p>
                  <p className="text-sm text-red-300">{statusMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Auth Context Error */}
          {authError && !loginStatus && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-xl">
              <div className="flex items-center gap-3 text-red-400">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Error</p>
                  <p className="text-sm text-red-300">{authError}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500/30' 
                      : 'border-white/10 focus:border-amber-500 focus:ring-amber-500/30'
                  }`}
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-white">
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 ${
                    errors.password 
                      ? 'border-red-500 focus:ring-red-500/30' 
                      : 'border-white/10 focus:border-amber-500 focus:ring-amber-500/30'
                  }`}
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Remember Me & Options */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 focus:ring-amber-500 focus:ring-offset-0 focus:ring-offset-transparent"
                  disabled={loading}
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                disabled={loading}
              >
                <KeyRound className="w-4 h-4" />
                Try demo account
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold hover:from-amber-700 hover:to-orange-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-br from-white/10 to-white/5 text-gray-400">
                  New to LitLounge?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <Link
              to="/register"
              className="w-full block py-3.5 border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white/30 transition-all text-center"
            >
              Create an account
            </Link>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-400 text-sm">
            By signing in, you agree to our{' '}
            <button className="text-amber-400 hover:text-amber-300 transition-colors">
              Terms of Service
            </button>
            {' '}and{' '}
            <button className="text-amber-400 hover:text-amber-300 transition-colors">
              Privacy Policy
            </button>
          </p>
          
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span>Secure connection • Encrypted login</span>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}