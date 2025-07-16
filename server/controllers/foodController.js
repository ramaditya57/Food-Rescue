const Food = require('../models/Food');

// @desc    Create a new food donation
// @route   POST /api/food/create
// @access  Private
const createFood = async (req, res) => {
  try {
    const { title, description, quantity, pickupAddress, expiryTime, contactNumber } = req.body;

    const newFood = new Food({
      user: req.user.id,
      title,
      description,
      quantity,
      pickupAddress,
      expiryTime,
      contactNumber,
      status: 'pending',
    });

    const savedFood = await newFood.save();

    res.status(201).json({
      message: 'Food donation submitted successfully',
      donation: savedFood,
    });
  } catch (error) {
    console.error('Error creating food donation:', error.message);
    res.status(500).json({ message: 'Server error while creating donation' });
  }
};

// @desc    Get recent food donations
// @route   GET /api/food/recent
// @access  Private
const getRecentDonations = async (req, res) => {
  try {
    const donations = await Food.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name');

    res.status(200).json(donations);
  } catch (err) {
    console.error('Error fetching recent donations:', err.message);
    res.status(500).json({ message: 'Failed to fetch recent donations' });
  }
};

// @desc    Get donations by the logged-in user
// @route   GET /api/food/my-donations
// @access  Private
const getUserDonations = async (req, res) => {
  try {
    const donations = await Food.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (err) {
    console.error('Error fetching user donations:', err.message);
    res.status(500).json({ message: 'Failed to fetch user donations' });
  }
};

// @desc    Get donations with 'Pending' status (Unclaimed)
// @route   GET /api/food/pending
// @access  Private
const getPendingDonations = async (req, res) => {
  try {
    const pending = await Food.find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .populate('user', 'name');
    res.status(200).json(pending);
  } catch (error) {
    console.error('Error fetching pending donations:', error.message);
    res.status(500).json({ message: 'Error fetching pending donations' });
  }
};

// @desc    Volunteer claims a donation
// @route   PATCH /api/food/:id/claim
// @access  Private
const claimDonation = async (req, res) => {
  try {
    const donation = await Food.findById(req.params.id);

    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    if (donation.status !== 'pending') return res.status(400).json({ message: 'Already claimed' });

    donation.status = 'claimed';
    donation.volunteer = req.user.id;
    donation.claimedAt = new Date(); 
    const updated = await donation.save();

    res.status(200).json(updated);
  } catch (error) {
    console.error('Error claiming donation:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get donations claimed or in-transit by volunteer
// @route   GET /api/food/volunteer-pickups
// @access  Private
const getVolunteerPickups = async (req, res) => {
  try {
    const donations = await Food.find({
      volunteer: req.user.id,
      status: { $in: ['claimed', 'in_transit'] }, // ✅ Removed 'delivered'
    }).sort({ createdAt: -1 });

    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching pickups:', error.message);
    res.status(500).json({ message: 'Failed to fetch pickups' });
  }
};

// @desc    Mark donation as 'In Transit'
// @route   PATCH /api/food/:id/in-transit
// @access  Private
const markInTransit = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) return res.status(404).json({ message: 'Donation not found' });
    if (!food.volunteer || food.volunteer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    food.status = 'in_transit';
    await food.save();

    res.status(200).json({ message: 'Marked as in transit', food });
  } catch (error) {
    console.error('Error updating to in transit:', error.message);
    res.status(500).json({ message: 'Failed to update status' });
  }
};

// @desc    Mark donation as 'Delivered'
// @route   PATCH /api/food/:id/delivered
// @access  Private
const markDelivered = async (req, res) => {
  try {
    const donation = await Food.findById(req.params.id);

    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    donation.status = 'delivered';
    donation.deliveredAt = new Date();

    // ✅ Save the volunteer who marked it delivered
    donation.volunteer = req.user._id;

    await donation.save();

    res.json({ message: 'Donation marked as delivered' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get donations with 'Delivered' status for shelters
// @route   GET /api/food/incoming
// @access  Private
// @desc    Get donations with 'Delivered' status (case-insensitive) and not yet acknowledged
// @route   GET /api/food/incoming
// @access  Private
const getIncomingDonations = async (req, res) => {
  try {
    const donations = await Food.find({ status: 'delivered', isAcknowledged: { $ne: true } })
      .populate('user', 'name')         // ✅ Donor name
      .populate('volunteer', 'name')    // ✅ Volunteer name
      .sort({ deliveredAt: -1 });

    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Shelter acknowledges the delivery
// @route   PATCH /api/food/:id/acknowledge
// @access  Private
const acknowledgeDelivery = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Donation not found' });

    food.status = 'delivered';
    food.isAcknowledged = true;
    food.acknowledgedBy = req.user.id;
    await food.save();

    res.status(200).json({ message: 'Delivery acknowledged', food });
  } catch (error) {
    console.error('Error acknowledging delivery:', error.message);
    res.status(500).json({ message: 'Failed to acknowledge delivery' });
  }
};


// @desc    Shelter submits feedback
// @route   POST /api/food/feedback/:id
// @access  Private
const submitFeedback = async (req, res) => {
  try {
    console.log('Feedback submission request:', { body: req.body, params: req.params });
    const { rating, notes } = req.body;

    if (!rating) {
      return res.status(400).json({ message: 'Rating is required' });
    }

    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    food.feedback = {
      rating: rating,
      notes: notes || ''
    };

    const savedFood = await food.save();
    console.log('Feedback saved successfully:', savedFood.feedback);

    res.status(200).json({ message: 'Feedback submitted successfully', food: savedFood });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      message: 'Failed to submit feedback',
      error: error.message
    });
  }
};

// @desc    Get claimed donations for volunteer dashboard
// @route   GET /api/food/claimed
// @access  Private
const getClaimedDonations = async (req, res) => {
  try {
    const donations = await Food.find({
      volunteer: req.user.id,
      status: { $in: ['Claimed', 'In Transit'] },
    }).sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (err) {
    console.error('Error fetching claimed donations:', err.message);
    res.status(500).json({ message: 'Error fetching claimed donations' });
  }
};

// Optional: Get claimed donation by ID (if needed for a detail view)
const getClaimedDonationById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Donation not found' });

    if (food.volunteer.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.status(200).json(food);
  } catch (error) {
    console.error('Error fetching donation by ID:', error.message);
    res.status(500).json({ message: 'Failed to fetch donation' });
  }
};

// Optional: Placeholder if you implement a shelter's own pickups later
const getShelterPickups = async (req, res) => {
  try {
    const donations = await Food.find({
      status: 'delivered',
      isAcknowledged: false,
    })
      .sort({ deliveredAt: -1 })
      .populate('user', 'name')
      .populate('volunteer', 'name');
    res.status(200).json(donations);
  } catch (err) {
    console.error('Error fetching shelter pickups:', err.message);
    res.status(500).json({ message: 'Error fetching shelter pickups' });
  }
};

module.exports = {
  createFood,
  getRecentDonations,
  getUserDonations,
  getPendingDonations,
  getAvailableDonations: getPendingDonations,
  claimDonation,
  markInTransit,
  markDelivered,
  getVolunteerPickups,
  getClaimedDonations,
  getClaimedDonationById,
  getIncomingDonations,  //done by sarthak 
  acknowledgeDelivery,
  submitFeedback,
  getShelterPickups,    // done by sarthak 11.1
};