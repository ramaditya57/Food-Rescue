// seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust the path to your User model file

// --- Configuration ---
// IMPORTANT: Replace this with your actual MongoDB connection string.
const MONGO_URI = process.env.MONGO_URI;

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The plain text password.
 * @returns {Promise<string>} - The hashed password.
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * The main function to seed the database with an admin user.
 */
const seedAdmin = async () => {
  try {
    // 1. Connect to the database
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully for seeding.');

    // 2. Define admin user details
    const adminEmail = 'admin@foodrescue.com';
    const adminPassword = 'admin@123';

    // 3. Check if the admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin user already exists. No action taken.');
      return; // Exit if admin is already there
    }

    // 4. Hash the password
    const hashedPassword = await hashPassword(adminPassword);
    console.log('Password hashed.');

    // 5. Create the new admin user object
    const adminUser = new User({
      name: 'Administrator',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      isApproved: true, // Admins should be approved by default
    });

    // 6. Save the new admin user to the database
    await adminUser.save();
    console.log('Admin user created successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword} (Remember to use this for login)`);

  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    // 7. Disconnect from the database
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

// --- Execute the Seeding Function ---
seedAdmin();