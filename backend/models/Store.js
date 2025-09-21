const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please enter store name'],
    trim: true,
    maxlength: [50, 'Store name cannot exceed 50 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  logo: {
    type: String,
    default: null
  },
  banner: {
    type: String,
    default: null
  },
  subdomain: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    match: [/^[a-z0-9-]+$/, 'Subdomain can only contain lowercase letters, numbers, and hyphens']
  },
  customDomain: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true
  },
  whatsappNumber: {
    type: String,
    required: [true, 'Please enter WhatsApp number'],
    match: [/^[0-9]{10,15}$/, 'Please enter a valid WhatsApp number']
  },
  email: {
    type: String,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String
  },
  businessHours: {
    monday: { open: String, close: String, isOpen: Boolean },
    tuesday: { open: String, close: String, isOpen: Boolean },
    wednesday: { open: String, close: String, isOpen: Boolean },
    thursday: { open: String, close: String, isOpen: Boolean },
    friday: { open: String, close: String, isOpen: Boolean },
    saturday: { open: String, close: String, isOpen: Boolean },
    sunday: { open: String, close: String, isOpen: Boolean }
  },
  currency: {
    type: String,
    default: 'IDR',
    enum: ['IDR', 'USD', 'EUR', 'MYR', 'SGD']
  },
  theme: {
    primaryColor: { type: String, default: '#007bff' },
    secondaryColor: { type: String, default: '#6c757d' },
    fontFamily: { type: String, default: 'Inter' },
    layout: { type: String, default: 'grid', enum: ['grid', 'list'] }
  },
  storageUsed: {
    type: Number,
    default: 0
  },
  storageLimit: {
    type: Number,
    default: 100 * 1024 * 1024
  },
  productLimit: {
    type: Number,
    default: 50
  },
  monthlyVisits: {
    type: Number,
    default: 0
  },
  seoSettings: {
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
    ogImage: String
  },
  analytics: {
    googleAnalyticsId: String,
    facebookPixelId: String
  },
  paymentMethods: [{
    type: String,
    enum: ['whatsapp', 'bank_transfer', 'cod', 'stripe', 'paypal', 'midtrans']
  }],
  bankAccounts: [{
    bankName: String,
    accountName: String,
    accountNumber: String,
    swiftCode: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  totalSales: {
    type: Number,
    default: 0
  },
  totalRevenue: {
    type: Number,
    default: 0
  },
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

storeSchema.index({ subdomain: 1 });
storeSchema.index({ customDomain: 1 });
storeSchema.index({ owner: 1 });
storeSchema.index({ isActive: 1 });

storeSchema.methods.getPublicUrl = function() {
  if (this.customDomain) {
    return `https://${this.customDomain}`;
  }
  return `https://${this.subdomain}.${process.env.APP_DOMAIN || 'toko-digital.com'}`;
};

storeSchema.methods.canUploadFile = function(fileSize) {
  return (this.storageUsed + fileSize) <= this.storageLimit;
};

module.exports = mongoose.model('Store', storeSchema);