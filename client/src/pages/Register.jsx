import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { capitalizeWords, isFutureDate } from '../utils/validation';
import { 
  Eye, EyeOff, Mail, Lock, CheckCircle2, AlertCircle, 
  User, Upload, X, Sparkles, UserPlus, Camera, Globe, 
  Phone, Calendar, Check, ChevronRight, Shield, KeyRound
} from 'lucide-react';

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
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
      {/* Large ambient light effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-400/5 to-orange-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-yellow-400/5 to-red-400/5 rounded-full blur-3xl" />
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(100vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30vh) translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 180}deg);
          }
        }
      `}</style>
    </div>
  );
}

export default function EnhancedRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    country: '',
    birthDate: '',
    photo: null,
    photoPreview: null,
    acceptTerms: false,
    newsletter: true
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const fileInputRef = useRef(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Countries list for dropdown
  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'SG', name: 'Singapore' },
    { code: 'IN', name: 'India' },
    { code: 'BR', name: 'Brazil' }
  ];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[\+]?[1-9][\d\s\-\(\)\.]{8,}$/;
    return re.test(phone);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[^a-zA-Z0-9]/.test(password)
    };
    
    setPasswordRequirements(requirements);
    
    strength = Object.values(requirements).filter(Boolean).length;
    return strength;
  };

  const updateFormProgress = () => {
    const requiredFields = ['name', 'email', 'password', 'confirmPassword', 'acceptTerms'];
    const filledFields = requiredFields.filter(field => {
      if (field === 'acceptTerms') return formData.acceptTerms;
      return formData[field] && formData[field].trim().length > 0;
    }).length;
    
    const progress = (filledFields / requiredFields.length) * 100;
    setFormProgress(progress);
  };

  useEffect(() => {
    updateFormProgress();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleNameBlur = () => {
    setFormData(prev => ({ ...prev, name: capitalizeWords(prev.name || '') }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, photo: 'File size must be less than 5MB' }));
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(f => ({
          ...f,
          photo: file,
          photoPreview: reader.result,
          photoName: file.name
        }));
        if (errors.photo) setErrors(prev => ({ ...prev, photo: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const removePhoto = () => {
    setFormData(f => ({
      ...f,
      photo: null,
      photoPreview: null,
      photoName: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.birthDate && isFutureDate(formData.birthDate)) {
      newErrors.birthDate = 'Birth date cannot be in the future';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
          setTimeout(() => {
            setIsSubmitting(false);
            setRegistrationSuccess(true);

            // Use AuthContext.register to set user and auth state
            (async () => {
              try {
                const result = await register({
                  name: capitalizeWords(formData.name || ''),
                  email: formData.email,
                  password: formData.password,
                  photoPreview: formData.photoPreview,
                  country: formData.country,
                  phone: formData.phone,
                  birthDate: formData.birthDate,
                  newsletter: formData.newsletter
                });

                if (result.success) {
                  // Navigate to profile so the user sees their updated profile
                  navigate('/profile');
                  return;
                }
              } catch (e) {
                // fall through to reset UI
              }

              // Fallback: reset form UI if register failed
              setTimeout(() => {
                setFormData({ 
                  name: '', 
                  email: '', 
                  password: '', 
                  confirmPassword: '',
                  phone: '',
                  country: '',
                  birthDate: '',
                  photo: null,
                  photoPreview: null,
                  acceptTerms: false,
                  newsletter: true
                });
                setRegistrationSuccess(false);
                setPasswordStrength(0);
                setCurrentStep(1);
              }, 3000);
            })();
          }, 500);
      }
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentStep < 3) {
      nextStep();
    } else if (e.key === 'Enter' && currentStep === 3) {
      handleSubmit();
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900/30 relative overflow-hidden flex items-center justify-center p-4">
        <FloatingParticles />
        <div className="relative z-10 max-w-md w-full animate-slide-up">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-green-500/30">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-3">Welcome Aboard! 🚀</h2>
            <p className="text-gray-300 mb-6 text-lg">Your account has been created successfully</p>
            
            {formData.photoPreview && (
              <div className="mb-6">
                <div className="relative w-32 h-32 mx-auto">
                  <img
                    src={formData.photoPreview}
                    alt="Profile"
                    className="w-full h-full rounded-full border-4 border-green-400 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-3 text-green-400">
                <Mail className="w-5 h-5" />
                <p className="font-medium">{formData.email}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm">Your profile is being configured...</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <p className="text-sm">Setting up your preferences...</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                <p className="text-sm">Redirecting to dashboard...</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-sm text-gray-400 animate-pulse">You will be redirected shortly...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900/30 relative overflow-hidden flex items-center justify-center p-4">
      <FloatingParticles />
      
      <div className="relative z-10 max-w-4xl w-full">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <UserPlus className="w-8 h-8 text-amber-400" />
              <h1 className="text-3xl font-bold text-white">Create Account</h1>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-1">Step {currentStep} of 3</div>
              <div className="flex items-center gap-2">
                <div className="w-48 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep - 1) * 33.33}%` }}
                  ></div>
                </div>
                <span className="text-white font-semibold">{currentStep}/3</span>
              </div>
            </div>
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between mb-8">
            {['Basic Info', 'Security', 'Complete'].map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  currentStep > index + 1 
                    ? 'bg-green-500 text-white' 
                    : currentStep === index + 1
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white ring-4 ring-amber-500/30'
                    : 'bg-gray-800 text-gray-400'
                }`}>
                  {currentStep > index + 1 ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span className="font-bold">{index + 1}</span>
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  currentStep >= index + 1 ? 'text-white' : 'text-gray-500'
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
          {currentStep === 1 && (
            <div className="space-y-6 animate-slide-in">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Personal Information</h2>
                <p className="text-gray-300">Tell us a bit about yourself</p>
              </div>

              {/* Profile Photo Upload */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Profile Photo <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                
                {!formData.photoPreview ? (
                  <div
                    className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                      dragActive 
                        ? 'border-amber-500 bg-amber-500/10' 
                        : 'border-white/20 hover:border-amber-400 hover:bg-white/5'
                    }`}
                    onClick={triggerFileInput}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur opacity-30"></div>
                      <User className="w-24 h-24 text-white relative z-10" />
                      <div className="absolute -bottom-2 -right-2 bg-amber-500 p-2 rounded-full">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-gray-300 mb-3">
                      <span className="font-semibold text-amber-300">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm text-gray-400">PNG, JPG, GIF up to 5MB</p>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300 group w-48 h-48 mx-auto">
                    <img
                      src={formData.photoPreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute top-3 right-3 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg backdrop-blur-sm"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={triggerFileInput}
                        className="px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors text-sm font-semibold"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                {errors.photo && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.photo}</span>
                  </div>
                )}
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleNameBlur}
                    onKeyPress={handleKeyPress}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 ${
                      errors.name 
                        ? 'border-red-500 focus:ring-red-500/30' 
                        : 'border-white/10 focus:border-amber-500 focus:ring-amber-500/30'
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Email Address *
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
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 ${
                      errors.phone 
                        ? 'border-red-500 focus:ring-red-500/30' 
                        : 'border-white/10 focus:border-amber-500 focus:ring-amber-500/30'
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                {errors.phone && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={nextStep}
                className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold hover:from-amber-700 hover:to-orange-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 group"
              >
                Continue to Security
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-slide-in">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Security Settings</h2>
                <p className="text-gray-300">Secure your account with a strong password</p>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Password *
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Strength */}
                {formData.password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Password Strength</span>
                      <span className={`text-sm font-semibold ${
                        passwordStrength <= 1 ? 'text-red-400' :
                        passwordStrength <= 3 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                            i < passwordStrength ? getPasswordStrengthColor() : 'bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Password Requirements */}
                {formData.password && (
                  <div className="mt-3 space-y-1.5">
                    <p className="text-sm text-gray-300 mb-2">Requirements:</p>
                    {Object.entries(passwordRequirements).map(([key, met]) => (
                      <div key={key} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${met ? 'bg-green-500' : 'bg-gray-600'}`} />
                        <span className={`text-xs ${met ? 'text-green-400' : 'text-gray-400'}`}>
                          {key === 'length' && 'At least 8 characters'}
                          {key === 'uppercase' && 'One uppercase letter'}
                          {key === 'lowercase' && 'One lowercase letter'}
                          {key === 'number' && 'One number'}
                          {key === 'special' && 'One special character'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                
                {errors.password && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 ${
                      errors.confirmPassword 
                        ? 'border-red-500 focus:ring-red-500/30' 
                        : 'border-white/10 focus:border-amber-500 focus:ring-amber-500/30'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={prevStep}
                  className="flex-1 py-3.5 border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white/30 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="flex-1 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold hover:from-amber-700 hover:to-orange-700 transform hover:scale-[1.02] transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 group"
                >
                  Continue to Final Step
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-slide-in">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Final Details</h2>
                <p className="text-gray-300">Complete your registration</p>
              </div>

              {/* Country and Birth Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Country <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-white/5 backdrop-blur-sm text-white appearance-none"
                    >
                      <option value="">Select a country</option>
                      {countries.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Birth Date <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-white/5 backdrop-blur-sm text-white"
                    />
                  </div>
                  {errors.birthDate && (
                    <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.birthDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Terms and Newsletter */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 focus:ring-amber-500 focus:ring-offset-0 focus:ring-offset-transparent"
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-gray-300 flex-1">
                    I agree to the{' '}
                    <button className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                      Privacy Policy
                    </button>
                    *
                  </label>
                </div>
                {errors.acceptTerms && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.acceptTerms}</span>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 focus:ring-amber-500 focus:ring-offset-0 focus:ring-offset-transparent"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-300 flex-1">
                    Subscribe to our newsletter for updates, tips, and exclusive content
                  </label>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="pt-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Profile Completion</span>
                  <span>{Math.round(formProgress)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${formProgress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={prevStep}
                  className="flex-1 py-3.5 border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white/30 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold hover:from-amber-700 hover:to-orange-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Complete Registration
                      <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors inline-flex items-center gap-1">
              Sign in here
              <ChevronRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
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
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.7s ease-out;
        }
      `}</style>
    </div>
  );
}