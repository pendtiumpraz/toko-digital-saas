const express = require('express');
const router = express.Router();
const { protect, checkStoreOwnership } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const Store = require('../models/Store');
    const stores = req.user.role === 'admin'
      ? await Store.find()
      : await Store.find({ owner: req.user._id });

    res.json({
      success: true,
      data: stores
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get('/:storeId', protect, checkStoreOwnership, async (req, res) => {
  res.json({
    success: true,
    data: req.store
  });
});

router.put('/:storeId', protect, checkStoreOwnership, async (req, res) => {
  try {
    const Store = require('../models/Store');
    const store = await Store.findByIdAndUpdate(
      req.params.storeId,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: store
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;