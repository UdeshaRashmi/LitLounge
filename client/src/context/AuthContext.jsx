import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// User data structure
const initialUserData = {
  id: null,
  name: '',
  email: '',
  photo: null,
  country: '',
  phone: '',
  birthDate: '',
  createdAt: null,
  lastLogin: null,
  preferences: {
    newsletter: true,
    theme: 'light',
    notifications: true
  }
};

// Create context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('authenticated') === 'true';
    } catch (e) {
      console.error('Error reading auth state from localStorage:', e);
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('userData');
      return savedUser ? JSON.parse(savedUser) : initialUserData;
    } catch (e) {
      console.error('Error reading user data from localStorage:', e);
      return initialUserData;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('token') || null;
    } catch (e) {
      return null;
    }
  });

  // Persist auth state to localStorage
  useEffect(() => {
    try {
      if (isAuthenticated) {
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(user));
        if (token) localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('authenticated');
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
      }
    } catch (e) {
      console.error('Error saving auth state to localStorage:', e);
      setError('Failed to save authentication data. Please try again.');
    }
  }, [isAuthenticated, user]);

  // Load user data from registration
  useEffect(() => {
    try {
      const registered = localStorage.getItem('registered') === 'true';
      if (registered && !user.email) {
        const savedEmail = localStorage.getItem('userEmail') || '';
        const savedName = localStorage.getItem('userName') || '';
        const savedPhoto = localStorage.getItem('userPhoto') || null;
        
        if (savedEmail) {
          setUser(prev => ({
            ...prev,
            email: savedEmail,
            name: savedName,
            photo: savedPhoto,
            createdAt: new Date().toISOString()
          }));
        }
      }
    } catch (e) {
      console.error('Error loading user data from registration:', e);
    }
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }
      // store token and user
      setToken(data.token || null);
      setIsAuthenticated(true);
      setUser(prev => ({
        ...prev,
        id: data._id,
        name: data.name,
        email: data.email,
        lastLogin: new Date().toISOString(),
      }));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userData.name, email: userData.email, password: userData.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      // persist token and user
      setToken(data.token || null);
      setIsAuthenticated(true);
      const newUser = {
        ...initialUserData,
        id: data._id,
        name: data.name,
        email: data.email,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      setUser(newUser);
      return { success: true, user: data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(initialUserData);
    setError(null);
    setToken(null);
    // Keep registration data but remove auth
    try {
      localStorage.removeItem('authenticated');
      localStorage.removeItem('userData');
    } catch (e) {
      console.error('Error clearing auth data:', e);
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (updatedData) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      setUser(prev => ({
        ...prev,
        ...updatedData,
        preferences: {
          ...prev.preferences,
          ...updatedData.preferences
        }
      }));

      // If email is updated, update localStorage
      if (updatedData.email) {
        localStorage.setItem('userEmail', updatedData.email);
      }

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update user preferences
  const updatePreferences = useCallback(async (newPreferences) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setUser(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          ...newPreferences
        }
      }));

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Check if user exists (for registration)
  const checkUserExists = useCallback((email) => {
    try {
      const registered = localStorage.getItem('registered') === 'true';
      const storedEmail = localStorage.getItem('userEmail') || '';
      return registered && storedEmail === email;
    } catch (e) {
      return false;
    }
  }, []);

  // Context value
  const contextValue = useMemo(() => ({
    isAuthenticated,
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    updatePreferences,
    clearError,
    checkUserExists
  }), [
    isAuthenticated,
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    updatePreferences,
    clearError,
    checkUserExists
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook to require authentication on a page — redirects to login if not authenticated
export function useRequireAuth(redirectPath = '/login') {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, redirectPath]);
}