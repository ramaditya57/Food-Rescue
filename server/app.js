const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
//const paymentRoutes = require('./routes/paymentRoutes');



dotenv.config();
const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Setup CORS
app.use(cors({
  origin: 'http://localhost:3000', // Change in production
  credentials: true,              // Important for cookies/sessions
}));

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Basic health check route
app.get('/', (req, res) => {
  res.send('Welcome to FoodRescue API');
});

// ✅ API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/food', require('./routes/foodRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));


module.exports = app;
