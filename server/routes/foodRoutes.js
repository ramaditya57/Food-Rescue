const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
require('../models/food')
const foodController = require('../controllers/foodController');

const {
  createFood,
  getRecentDonations,
  getUserDonations,
  getPendingDonations,
  getAvailableDonations,
  getIncomingDonations,
  acknowledgeDelivery,
  submitFeedback,
  claimDonation,
  markInTransit,
  markDelivered,
  getVolunteerPickups,
  getShelterPickups,
  getClaimedDonations,
  getClaimedDonationById,
} = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');

// Create donation
router.post('/create', protect, createFood);

// Donor endpoints
router.get('/my-donations', protect, getUserDonations);
router.get('/recent', protect, getRecentDonations);

// Volunteer routes
router.get('/pending', protect, getPendingDonations);
router.get('/available', protect, getAvailableDonations); // alias to pending
router.patch('/claim/:id', protect, claimDonation);
router.get('/volunteer-pickups', protect, getVolunteerPickups);
router.get('/claimed', protect, getClaimedDonations);
router.get('/claimed/:id', protect, getClaimedDonationById); // (optional to implement)
router.patch('/in-transit/:id', protect, markInTransit);
router.patch('/:id/delivered', protect, markDelivered);

// Shelter routes
router.get('/incoming', protect, getIncomingDonations);
router.get('/shelter-pickups', protect, getShelterPickups); // if implemented
router.patch('/food/:id/acknowledge', protect, foodController.acknowledgeDelivery);
router.post('/feedback/:id', protect, foodController.submitFeedback);

module.exports = router;