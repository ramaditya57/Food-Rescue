const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  getAllDonations,
  getPendingUsers,
  approveUser,
  rejectUser,
} = require('../controllers/adminController');

// ✅ Existing routes
router.get('/users', protect, adminOnly, getAllUsers);
router.get('/donations', protect, adminOnly, getAllDonations);

// ✅ New routes for user approval system
router.get('/pending-users', protect, adminOnly, getPendingUsers);
router.patch('/approve-user/:id', protect, adminOnly, approveUser);
router.delete('/reject-user/:id', protect, adminOnly, rejectUser);

module.exports = router;

