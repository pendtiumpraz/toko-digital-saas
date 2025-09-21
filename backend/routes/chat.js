const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Chat = require('../models/Chat');

router.get('/store/:storeId', protect, async (req, res) => {
  try {
    const chats = await Chat.find({ store: req.params.storeId })
      .sort('-updatedAt');

    res.json({
      success: true,
      data: chats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;