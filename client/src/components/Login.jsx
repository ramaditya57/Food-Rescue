import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      const user = res.data.user;

      // ✅ Block login if not approved
      if (
        ['donor', 'volunteer', 'shelter'].includes(user.role) &&
        !user.isApproved
      ) {
        setError(
          '⛔ Your account is awaiting admin approval. Please try again later.'
        );
        return;
      }

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', user.role);
      login(user);

      if (user.role === 'donor') navigate('/dashboard/donor');
      else if (user.role === 'volunteer') navigate('/dashboard/volunteer');
      else if (user.role === 'shelter') navigate('/dashboard/shelter');
      else if (user.role === 'admin') navigate('/dashboard/admin');
      else navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-green-50">
      {/* Left: Login Form */}
      <div className="flex items-center justify-center bg-white">
        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-xl p-8 w-full max-w-md mx-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
            Login to FoodRescue
          </h2>

          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-md font-semibold hover:bg-green-800 transition duration-200"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Right: Image Quote Section */}
      <div
        className="relative hidden md:block bg-cover bg-center"
        style={{ backgroundImage: "url('/login2.webp')" }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-10">
          <p className="text-white text-2xl italic font-medium leading-relaxed text-center drop-shadow-lg font-[cursive]">
            “Raat ke khaali pet se pehle, <br />
            kisi aur ke khaali thali ko bharna seekh jaayein.” <br />
            <span className="text-green-200 font-semibold">– FoodRescue</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;