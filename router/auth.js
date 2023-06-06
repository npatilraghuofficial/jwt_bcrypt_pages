const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const Order = require('../models/orderSchema');


const router = express.Router();

router.get('/', (req, res) => {
  console.log("server router");
  res.send('Hello from server router/auth');
});


router.post('/add-user', async (req, res) => {
  try {
    console.log("server routed to add-user");
    const { name, phoneNumber, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, phoneNumber, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//login ap
router.post('/login-user', async (req, res) => {
  console.log("login user");
    try {
      const { phoneNumber, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ phoneNumber });
      if (!user) {
        console.log("user not found");
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.log("password not match");
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      console.log("password match");
      const token = jwt.sign({ userId: user._id },"RAGHU");
     
      console.log(token);
      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});
  
router.post('/add-order', async (req, res) => {
  console.log(" routed to add order");
  try {
    const { userId, subTotal, phoneNumber }= req.body;
   

    // Verify the JWT token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userId: decodedUserId } = decodedToken;

    // Check if the decoded user ID matches the provided user ID
    if (userId !== decodedUserId) {
      console.log("user id not matched");
      console.log(userId);
      console.log(decodedUserId);
      return res.status(403).json({ message: 'Forbidden' });
    }

    const orderId = generateOrderId();
    const orderDate = new Date();

    // Create a new order
    const order = new Order({ userId, orderId, orderDate, subTotal, phoneNumber });
    await order.save();

    return res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

function generateOrderId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let orderId = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    orderId += chars.charAt(randomIndex);
  }
  return orderId;
}


//get order api

router.get('/get-order', async (req, res) => {
  try {
    const { userId } = req.query;
    console.log("redirected to get order");

    // Verify the JWT token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
    const { userId: decodedUserId } = decodedToken;

    if (userId !== decodedUserId) {
      return res.status(403).json({ message: 'Forbidden,To view orders please order atleast once' });
    }

    const orders = await Order.find({ userId });

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
