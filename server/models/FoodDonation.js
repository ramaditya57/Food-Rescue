const mongoose = require("mongoose");

const foodDonationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  pickupAddress: {
    type: String,
    required: true,
  },
  expiryTime: {
    type: Date,
    required: true,
  },
  contactNumber: {
    type: String,
  },
  claimed: {
    type: Boolean,
    default: false,
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model("FoodDonation", foodDonationSchema);
