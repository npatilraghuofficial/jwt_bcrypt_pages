const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  subTotal: { type: Number, required: true },
  phoneNumber: { type: String, required: true }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
