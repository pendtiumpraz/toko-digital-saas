const express = require('express');
const router = express.Router();
const { protect, checkSubscriptionFeature } = require('../middleware/auth');

router.post('/generate-landing-page', protect, checkSubscriptionFeature('aiLandingPage'), async (req, res) => {
  res.json({
    success: true,
    data: {
      html: '<h1>AI Generated Landing Page</h1>',
      css: 'body { font-family: Arial; }'
    }
  });
});

module.exports = router;