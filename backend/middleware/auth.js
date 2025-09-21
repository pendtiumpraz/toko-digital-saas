const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Store = require('../models/Store');
const Subscription = require('../models/Subscription');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!req.user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated'
      });
    }

    const subscription = await Subscription.findOne({ user: req.user._id });

    if (subscription) {
      if (subscription.status === 'trial' && subscription.isTrialExpired()) {
        subscription.status = 'expired';
        await subscription.save();

        return res.status(403).json({
          success: false,
          message: 'Your free trial has expired. Please subscribe to continue.'
        });
      }

      if (subscription.status === 'expired' || subscription.status === 'cancelled') {
        return res.status(403).json({
          success: false,
          message: 'Your subscription has expired. Please renew to continue.'
        });
      }

      req.subscription = subscription;
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

exports.checkStoreOwnership = async (req, res, next) => {
  try {
    const storeId = req.params.storeId || req.body.storeId || req.query.storeId;

    if (!storeId) {
      return res.status(400).json({
        success: false,
        message: 'Store ID is required'
      });
    }

    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    if (req.user.role !== 'admin' && store.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to access this store'
      });
    }

    req.store = store;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.checkSubscriptionFeature = (feature) => {
  return async (req, res, next) => {
    if (!req.subscription) {
      return res.status(403).json({
        success: false,
        message: 'No active subscription found'
      });
    }

    if (!req.subscription.canAccessFeature(feature)) {
      return res.status(403).json({
        success: false,
        message: `This feature requires a higher subscription plan. Feature: ${feature}`
      });
    }

    next();
  };
};

exports.rateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();

  return (req, res, next) => {
    const key = req.user ? req.user._id.toString() : req.ip;
    const now = Date.now();

    if (!requests.has(key)) {
      requests.set(key, []);
    }

    const userRequests = requests.get(key).filter(timestamp => now - timestamp < windowMs);

    if (userRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests, please try again later'
      });
    }

    userRequests.push(now);
    requests.set(key, userRequests);

    next();
  };
};