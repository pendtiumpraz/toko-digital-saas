const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    },
    whatsapp: {
      type: String
    }
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    notes: String
  },
  billingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    price: {
      type: Number,
      required: true
    },
    cost: Number,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    variant: {
      name: String,
      option: String
    },
    subtotal: {
      type: Number,
      required: true
    },
    profit: Number
  }],
  pricing: {
    subtotal: {
      type: Number,
      required: true
    },
    shipping: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    },
    totalCost: {
      type: Number,
      default: 0
    },
    totalProfit: {
      type: Number,
      default: 0
    }
  },
  payment: {
    method: {
      type: String,
      enum: ['whatsapp', 'bank_transfer', 'cod', 'stripe', 'paypal', 'midtrans'],
      default: 'whatsapp'
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date,
    proofOfPayment: String,
    bankDetails: {
      bankName: String,
      accountName: String,
      accountNumber: String
    }
  },
  shipping: {
    method: String,
    courier: String,
    trackingNumber: String,
    estimatedDelivery: Date,
    shippedAt: Date,
    deliveredAt: Date
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'completed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  statusHistory: [{
    status: String,
    note: String,
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    changedAt: {
      type: Date,
      default: Date.now
    }
  }],
  notes: {
    customer: String,
    internal: String
  },
  source: {
    type: String,
    enum: ['website', 'whatsapp', 'instagram', 'facebook', 'manual'],
    default: 'website'
  },
  utm: {
    source: String,
    medium: String,
    campaign: String,
    term: String,
    content: String
  },
  couponCode: String,
  tags: [String],
  isArchived: {
    type: Boolean,
    default: false
  },
  cancelledAt: Date,
  cancelReason: String,
  refundedAt: Date,
  refundAmount: Number,
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

orderSchema.index({ store: 1, status: 1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ 'customer.phone': 1 });
orderSchema.index({ createdAt: -1 });

orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderNumber = `ORD-${timestamp}-${random}`;
  }

  let totalCost = 0;
  this.items.forEach(item => {
    item.profit = (item.price - (item.cost || 0)) * item.quantity;
    totalCost += (item.cost || 0) * item.quantity;
  });

  this.pricing.totalCost = totalCost;
  this.pricing.totalProfit = this.pricing.total - totalCost - this.pricing.shipping;

  next();
});

orderSchema.methods.calculateTotal = function() {
  const subtotal = this.items.reduce((sum, item) => sum + item.subtotal, 0);
  const total = subtotal + this.pricing.shipping + this.pricing.tax - this.pricing.discount;

  this.pricing.subtotal = subtotal;
  this.pricing.total = total;

  return total;
};

orderSchema.methods.addStatusHistory = function(status, note, userId) {
  this.statusHistory.push({
    status,
    note,
    changedBy: userId,
    changedAt: new Date()
  });
  this.status = status;
};

module.exports = mongoose.model('Order', orderSchema);