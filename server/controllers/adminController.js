const User = require('../models/User');
require('../models/Food'); 



// ✅ Get All Users (excluding password)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// ✅ Get All Food Donations
const getAllDonations = async (req, res) => {
  try {
    const donations = await Food.find()
      .populate('user', 'name email')
      .populate('volunteer', 'name email');
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch donations' });
  }
};

// ✅ Get Pending Users (who need approval)
const getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ isApproved: false }).select('-password');
    res.json(pendingUsers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pending users' });
  }
};

// ✅ Approve a User
const approveUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updated = await User.findByIdAndUpdate(
      userId,
      { isApproved: true },
      { new: true }
    ).select('-password');

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User approved successfully', user: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve user' });
  }
};

// ✅ (Optional) Reject/Delete User
const rejectUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User rejected and deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reject user' });
  }
};

module.exports = {
  getAllUsers,
  getAllDonations,
  getPendingUsers,
  approveUser,
  rejectUser,
};