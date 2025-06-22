const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  donorName: {
    type: String,
    required: true
  },
  foodType: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  pickupAddress: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'In Transit', 'Delivered'],
    default: 'Pending'
  },
  assignedVolunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  volunteerName: {
    type: String
  },
  deliveredAt: {
    type: Date
  },
  feedback: {
    rating: String,
    notes: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', donationSchema);
