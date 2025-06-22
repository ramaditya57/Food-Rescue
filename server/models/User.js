const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  role: {
    type: String,
    enum: ['donor', 'volunteer', 'shelter', 'admin'],
    default: 'donor',
  },

  isApproved: {
    type: Boolean,
    default: false, // New users are pending approval
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);