const express = require('express');
const router = express.Router();
const razorpay = require('../config/razorpay');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-order', protect, async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert to paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error('Razorpay Order Creation Error:', err);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

module.exports = router;