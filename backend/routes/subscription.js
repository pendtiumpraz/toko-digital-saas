const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Subscription = require('../models/Subscription');

router.get('/plans', (req, res) => {
  const plans = {
    free: Subscription.getPlanDetails('free'),
    starter: Subscription.getPlanDetails('starter'),
    professional: Subscription.getPlanDetails('professional'),
    enterprise: Subscription.getPlanDetails('enterprise')
  };

  res.json({
    success: true,
    data: plans
  });
});

router.get('/my-subscription', protect, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user._id });

    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;