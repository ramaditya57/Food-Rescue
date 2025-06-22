const mongoose = require('mongoose');
const FoodSchema = new mongoose.Schema({
  title: String,
  description: String,
  quantity: Number,
  pickupAddress: String,
  expiryTime: Date,
  contactNumber: String,
  status: {
    type: String,
    enum: ['pending', 'claimed', 'in_transit', 'delivered'],
    default: 'pending',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deliveredAt: Date,
  isAcknowledged: Boolean,
  feedback: {
    rating: String,
    notes: String
  },
}, { timestamps: true });

module.exports = mongoose.model('Food', FoodSchema);
