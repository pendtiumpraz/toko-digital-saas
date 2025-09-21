const express = require('express');
const router = express.Router();
const { protect, checkStoreOwnership } = require('../middleware/auth');
const Order = require('../models/Order');

router.get('/store/:storeId', protect, checkStoreOwnership, async (req, res) => {
  try {
    const orders = await Order.find({ store: req.params.storeId })
      .populate('items.product')
      .sort('-createdAt');

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;