const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');

const router = express.Router();

router.get('/get-order', async (req, res) => {
  try {
    const { userId } = req.query;

    // Verify the JWT token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RAGHU');
    const { userId: decodedUserId } = decodedToken;

    // Check if the decoded user ID matches the provided user ID
    if (userId !== decodedUserId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Get the order details
    const orders = await Order.find({ userId });

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
