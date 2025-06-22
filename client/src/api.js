// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5002/api',
});

// ✅ Automatically attach token to every request (including Razorpay or others)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;