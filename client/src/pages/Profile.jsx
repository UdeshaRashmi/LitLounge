 import React, { useState, useEffect } from 'react';
import { useAuth, useRequireAuth } from '../context/AuthContext';
import { capitalizeWords, isFutureDate, isValidEmail, isValidPhone } from '../utils/validation';
import { 
  User, Mail, Phone, Globe, Calendar, 
  Settings, Bell, LogOut, Camera, Save,
  Shield, Eye, EyeOff, Upload, X, CheckCircle2, AlertCircle
} from 'lucide-react';

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: Math.random() * 8 + 12,
    color: `rgba(59, 130, 246, ${Math.random() * 0.2 + 0.1})` // Blue particles
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
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
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10%, 90% { opacity: 0.3; }
          50% { transform: translateY(-20vh) translateX(${Math.random() * 100 - 50}px); }
        }
      `}</style>
    </div>
  );
}

export default function Profile() {
  useRequireAuth();
  const { user, logout, updateProfile, updatePreferences, loading: authLoading } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [errors, setErrors] = useState({});
  const [preferences, setPreferences] = useState(user.preferences);
  const [photoPreview, setPhotoPreview] = useState(user.photo);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setFormData({ ...user });
    setPreferences(user.preferences);
    setPhotoPreview(user.photo);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNameBlur = () => {
    setFormData(prev => ({ ...prev, name: capitalizeWords(prev.name || '') }));
  };

  const validateProfile = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.birthDate && isFutureDate(formData.birthDate)) {
      newErrors.birthDate = 'Birth date cannot be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
  };

  const handleSaveProfile = async () => {
    setIsUpdating(true);
    // validate before sending
    if (!validateProfile()) {
      setIsUpdating(false);
      return;
    }

    const payload = {
      ...formData,
      name: capitalizeWords(formData.name || ''),
      photo: photoPreview
    };

    const result = await updateProfile(payload);

    if (result.success) {
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
      setErrors({});
    }
    setIsUpdating(false);
  };

  const handleSavePreferences = async () => {
    setIsUpdating(true);
    const result = await updatePreferences(preferences);
    
    if (result.success) {
      setSuccessMessage('Preferences updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
    setIsUpdating(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLogout = () => {
    logout();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 relative overflow-hidden">
      <FloatingParticles />
      
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto p-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Profile Settings</h1>
            <p className="text-gray-300 mt-2">Manage your account and preferences</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl hover:bg-red-500/30 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
                  {errors.email && (
                    <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email}</span>
                    </div>
                  )}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Information */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Personal Information
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-semibold"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({ ...user });
                        setPhotoPreview(user.photo);
                      }}
                      className="px-4 py-2 border-2 border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={isUpdating}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-semibold disabled:opacity-50 flex items-center gap-2"
                    >
                      {isUpdating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Profile Photo */}
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full border-4 border-blue-500/30 overflow-hidden">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                          <User className="w-16 h-16 text-white/80" />
                        </div>
                      )}
                    </div>
                    
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-blue-500 p-3 rounded-full cursor-pointer hover:bg-blue-600 transition-colors shadow-lg">
                        <Camera className="w-5 h-5 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                      </label>
                    )}
                    
                    {isEditing && photoPreview && (
                      <button
                        onClick={removePhoto}
                        className="absolute top-0 right-0 bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    )}
                  </div>
                  
                  {isEditing && (
                    <p className="text-sm text-gray-400 mt-2">Click camera icon to change photo</p>
                  )}
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleNameBlur}
                        disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all bg-white/5 backdrop-blur-sm disabled:opacity-60 disabled:cursor-not-allowed text-white placeholder-gray-400 border-white/10 focus:border-blue-500 focus:ring-blue-500/30"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all bg-white/5 backdrop-blur-sm disabled:opacity-60 disabled:cursor-not-allowed text-white placeholder-gray-400 border-white/10 focus:border-blue-500 focus:ring-blue-500/30"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all bg-white/5 backdrop-blur-sm disabled:opacity-60 disabled:cursor-not-allowed text-white placeholder-gray-400 border-white/10 focus:border-blue-500 focus:ring-blue-500/30"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Country
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="country"
                        value={formData.country || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all bg-white/5 backdrop-blur-sm disabled:opacity-60 disabled:cursor-not-allowed text-white placeholder-gray-400 border-white/10 focus:border-blue-500 focus:ring-blue-500/30"
                        placeholder="United States"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Birth Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all bg-white/5 backdrop-blur-sm disabled:opacity-60 disabled:cursor-not-allowed text-white placeholder-gray-400 border-white/10 focus:border-blue-500 focus:ring-blue-500/30"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Info (Read-only) */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                <Shield className="w-6 h-6" />
                Account Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Account Created</p>
                    <p className="text-white font-semibold">{formatDate(user.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">User ID</p>
                    <p className="text-white font-semibold font-mono text-sm">{user.id}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Last Login</p>
                    <p className="text-white font-semibold">{formatDate(user.lastLogin)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <p className="text-green-400 font-semibold flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Active
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Sidebar */}
          <div className="space-y-8">
            {/* Preferences */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                <Settings className="w-6 h-6" />
                Preferences
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Newsletter</p>
                    <p className="text-sm text-gray-400">Receive updates and offers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.newsletter}
                      onChange={(e) => handlePreferenceChange('newsletter', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Notifications</p>
                    <p className="text-sm text-gray-400">Receive push notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.notifications}
                      onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <p className="text-white font-medium mb-2">Theme</p>
                  <div className="flex gap-2">
                    {['light', 'dark', 'auto'].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => handlePreferenceChange('theme', theme)}
                        aria-pressed={preferences.theme === theme}
                        className={`px-4 py-2 rounded-lg capitalize transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                          preferences.theme === theme
                            ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSavePreferences}
                  disabled={isUpdating}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isUpdating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Preferences'
                  )}
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                <Bell className="w-6 h-6" />
                Quick Actions
              </h2>
              
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white">
                  Change Password
                </button>
                <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white">
                  Privacy Settings
                </button>
                <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white">
                  Connected Accounts
                </button>
                <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white">
                  Download Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}