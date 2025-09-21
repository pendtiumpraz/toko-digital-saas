const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.get('/check/:domain', async (req, res) => {
  res.json({
    success: true,
    available: true
  });
});

module.exports = router;