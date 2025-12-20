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

  // Persist auth state to localStorage
  useEffect(() => {
    try {
      if (isAuthenticated) {
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(user));
      } else {
        localStorage.removeItem('authenticated');
        localStorage.removeItem('userData');
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const registered = localStorage.getItem('registered') === 'true';
      const storedEmail = localStorage.getItem('userEmail') || '';

      if (!registered) {
        throw new Error('No account found. Please register first.');
      }

      if (storedEmail !== email) {
        throw new Error('Email not recognized. Please use your registered email.');
      }

      // For demo, any password works
      // In real app, you'd verify password here
      
      setIsAuthenticated(true);
      
      // Update user with last login
      setUser(prev => ({
        ...prev,
        lastLogin: new Date().toISOString()
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store registration data
      localStorage.setItem('registered', 'true');
      localStorage.setItem('userEmail', userData.email);
      if (userData.name) localStorage.setItem('userName', userData.name);
      if (userData.photoPreview) localStorage.setItem('userPhoto', userData.photoPreview);

      // Set user data
      const newUser = {
        ...initialUserData,
        id: `user_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        photo: userData.photoPreview,
        country: userData.country,
        phone: userData.phone,
        birthDate: userData.birthDate,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        preferences: {
          ...initialUserData.preferences,
          newsletter: userData.newsletter || false
        }
      };

      setUser(newUser);

      // Auto login after registration
      setIsAuthenticated(true);
      
      return { success: true, user: newUser };
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