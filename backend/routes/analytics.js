const express = require('express');
const router = express.Router();
const { protect, checkStoreOwnership } = require('../middleware/auth');

router.get('/store/:storeId', protect, checkStoreOwnership, async (req, res) => {
  res.json({
    success: true,
    data: {
      revenue: 0,
      orders: 0,
      products: 0,
      customers: 0
    }
  });
});

module.exports = router;