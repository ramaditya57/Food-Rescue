import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // ✅ Tailwind CSS styles
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // ✅ AuthContext provider
import reportWebVitals from './reportWebVitals'; // Optional

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Optional performance tracking
reportWebVitals();
