const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  plan: {
    type: String,
    enum: ['free', 'starter', 'professional', 'enterprise'],
    default: 'free'
  },
  features: {
    productLimit: {
      type: Number,
      default: 10
    },
    storageLimit: {
      type: Number,
      default: 100 * 1024 * 1024
    },
    customDomain: {
      type: Boolean,
      default: false
    },
    aiLandingPage: {
      type: Boolean,
      default: false
    },
    advancedAnalytics: {
      type: Boolean,
      default: false
    },
    prioritySupport: {
      type: Boolean,
      default: false
    },
    removeWatermark: {
      type: Boolean,
      default: false
    },
    multipleStores: {
      type: Number,
      default: 1
    },
    teamMembers: {
      type: Number,
      default: 1
    },
    apiAccess: {
      type: Boolean,
      default: false
    },
    exportData: {
      type: Boolean,
      default: true
    },
    chatSupport: {
      type: Boolean,
      default: true
    },
    whatsappIntegration: {
      type: Boolean,
      default: true
    },
    emailMarketing: {
      type: Boolean,
      default: false
    },
    abandonedCartRecovery: {
      type: Boolean,
      default: false
    }
  },
  pricing: {
    monthly: {
      type: Number,
      default: 0
    },
    yearly: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'IDR'
    }
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'yearly', 'lifetime'],
    default: 'monthly'
  },
  status: {
    type: String,
    enum: ['trial', 'active', 'inactive', 'cancelled', 'expired'],
    default: 'trial'
  },
  trialStartDate: {
    type: Date,
    default: Date.now
  },
  trialEndDate: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    }
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  nextBillingDate: {
    type: Date
  },
  lastPaymentDate: {
    type: Date
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'bank_transfer', 'paypal', 'stripe', 'midtrans']
  },
  paymentHistory: [{
    amount: Number,
    currency: String,
    date: Date,
    status: String,
    transactionId: String,
    invoiceNumber: String
  }],
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  autoRenew: {
    type: Boolean,
    default: true
  },
  cancellationDate: Date,
  cancellationReason: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

subscriptionSchema.statics.getPlanDetails = function(planName) {
  const plans = {
    free: {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      features: {
        productLimit: 10,
        storageLimit: 100 * 1024 * 1024,
        customDomain: false,
        aiLandingPage: false,
        advancedAnalytics: false,
        prioritySupport: false,
        removeWatermark: false,
        multipleStores: 1,
        teamMembers: 1,
        apiAccess: false,
        exportData: true,
        chatSupport: false,
        whatsappIntegration: true,
        emailMarketing: false,
        abandonedCartRecovery: false
      }
    },
    starter: {
      name: 'Starter',
      price: { monthly: 99000, yearly: 990000 },
      features: {
        productLimit: 100,
        storageLimit: 1024 * 1024 * 1024,
        customDomain: false,
        aiLandingPage: false,
        advancedAnalytics: true,
        prioritySupport: false,
        removeWatermark: true,
        multipleStores: 1,
        teamMembers: 3,
        apiAccess: false,
        exportData: true,
        chatSupport: true,
        whatsappIntegration: true,
        emailMarketing: true,
        abandonedCartRecovery: false
      }
    },
    professional: {
      name: 'Professional',
      price: { monthly: 299000, yearly: 2990000 },
      features: {
        productLimit: 1000,
        storageLimit: 5 * 1024 * 1024 * 1024,
        customDomain: true,
        aiLandingPage: false,
        advancedAnalytics: true,
        prioritySupport: true,
        removeWatermark: true,
        multipleStores: 3,
        teamMembers: 10,
        apiAccess: true,
        exportData: true,
        chatSupport: true,
        whatsappIntegration: true,
        emailMarketing: true,
        abandonedCartRecovery: true
      }
    },
    enterprise: {
      name: 'Enterprise',
      price: { monthly: 999000, yearly: 9990000 },
      features: {
        productLimit: -1,
        storageLimit: 50 * 1024 * 1024 * 1024,
        customDomain: true,
        aiLandingPage: true,
        advancedAnalytics: true,
        prioritySupport: true,
        removeWatermark: true,
        multipleStores: -1,
        teamMembers: -1,
        apiAccess: true,
        exportData: true,
        chatSupport: true,
        whatsappIntegration: true,
        emailMarketing: true,
        abandonedCartRecovery: true
      }
    }
  };

  return plans[planName] || plans.free;
};

subscriptionSchema.methods.isTrialExpired = function() {
  if (this.status !== 'trial') return false;
  return Date.now() > this.trialEndDate;
};

subscriptionSchema.methods.canAccessFeature = function(feature) {
  return this.features[feature] === true || this.features[feature] > 0;
};

module.exports = mongoose.model('Subscription', subscriptionSchema);