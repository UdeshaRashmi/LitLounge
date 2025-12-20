import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    const registered = localStorage.getItem('registered') === 'true';
    const storedEmail = localStorage.getItem('userEmail') || '';

    if (!registered) {
      setError('No account found. Please register first.');
      return;
    }

    if (storedEmail !== email) {
      setError('Email not recognized. Please register or use the registered email.');
      return;
    }

    // Demo auth: on success, call login from context and navigate to profile
    login();
    navigate('/profile');
  };

  return (
    <div className="max-w-lg mx-auto bg-white/90 p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-600">{error}</div>}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-xl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-xl"
          />
        </div>

        <button type="submit" className="w-full py-2 bg-amber-600 text-white rounded-xl font-semibold">
          Log In
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4">
        Don't have an account? <Link to="/register" className="text-amber-600 font-semibold">Sign up</Link>
      </p>
    </div>
  );
}
