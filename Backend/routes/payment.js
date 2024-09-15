// server/routes/payment.js
const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

// Initialize Razorpay with test mode credentials
const razorpay = new Razorpay({
  key_id: 'rzp_test_XujaIUo4PBMSYv', // Your test Key ID
});

// Route to create an order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body; // Amount from the request body
    const options = {
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: 'receipt#1',
    };
    const order = await razorpay.orders.create(options);
    res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
