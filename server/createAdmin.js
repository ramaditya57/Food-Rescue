// server/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ email: 'admin@foodrescue.com' });
    if (existing) {
      console.log('⚠️ Admin already exists');
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await User.create({
      name: 'Admin',
      email: 'admin@foodrescue.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('✅ Admin user created successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    process.exit(1);
  }
};

createAdmin();