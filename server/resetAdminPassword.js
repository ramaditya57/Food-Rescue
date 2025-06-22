// server/resetAdminPassword.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const user = await User.findOne({ email: 'admin@foodrescue.com' });

    if (!user) {
      console.log('❌ Admin user not found');
      return process.exit(1);
    }

    const newPassword = 'admin123';
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    console.log('✅ Admin password has been reset to:', newPassword);
    process.exit();
  } catch (err) {
    console.error('❌ Error resetting password:', err.message);
    process.exit(1);
  }
};

resetPassword();