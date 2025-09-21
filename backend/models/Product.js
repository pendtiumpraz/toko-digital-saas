const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'Electronics', 'Fashion', 'Food & Beverages', 'Health & Beauty',
      'Home & Living', 'Books & Stationery', 'Sports & Outdoors',
      'Toys & Games', 'Automotive', 'Services', 'Digital Products', 'Other'
    ]
  },
  subCategory: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    min: [0, 'Price cannot be negative']
  },
  comparePrice: {
    type: Number,
    min: [0, 'Compare price cannot be negative']
  },
  cost: {
    type: Number,
    min: [0, 'Cost cannot be negative'],
    default: 0
  },
  profit: {
    type: Number,
    default: function() {
      return this.price - this.cost;
    }
  },
  profitMargin: {
    type: Number,
    default: function() {
      if (this.price === 0) return 0;
      return ((this.price - this.cost) / this.price) * 100;
    }
  },
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  barcode: {
    type: String,
    sparse: true
  },
  stock: {
    type: Number,
    required: [true, 'Please enter stock quantity'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  trackInventory: {
    type: Boolean,
    default: true
  },
  lowStockAlert: {
    type: Number,
    default: 5
  },
  weight: {
    value: { type: Number, min: 0 },
    unit: { type: String, enum: ['g', 'kg', 'lb', 'oz'], default: 'kg' }
  },
  dimensions: {
    length: { type: Number, min: 0 },
    width: { type: Number, min: 0 },
    height: { type: Number, min: 0 },
    unit: { type: String, enum: ['cm', 'm', 'in', 'ft'], default: 'cm' }
  },
  images: [{
    url: { type: String, required: true },
    alt: String,
    isPrimary: { type: Boolean, default: false },
    source: { type: String, enum: ['upload', 'drive', 'external'], default: 'upload' }
  }],
  videos: [{
    url: { type: String, required: true },
    title: String,
    source: { type: String, enum: ['youtube', 'vimeo', 'upload'], default: 'youtube' },
    thumbnail: String
  }],
  variants: [{
    name: { type: String, required: true },
    options: [{
      value: { type: String, required: true },
      price: Number,
      stock: Number,
      sku: String,
      image: String
    }]
  }],
  tags: [String],
  seo: {
    metaTitle: String,
    metaDescription: String,
    slug: {
      type: String,
      unique: true,
      lowercase: true
    }
  },
  shipping: {
    required: { type: Boolean, default: true },
    freeShipping: { type: Boolean, default: false },
    shippingClass: String
  },
  visibility: {
    type: String,
    enum: ['visible', 'hidden', 'scheduled'],
    default: 'visible'
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  sold: {
    type: Number,
    default: 0
  },
  rating: {
    average: { type: Number, min: 0, max: 5, default: 0 },
    count: { type: Number, default: 0 }
  },
  aiGeneratedContent: {
    landingPage: String,
    marketingCopy: String,
    generatedAt: Date
  },
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
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

productSchema.index({ store: 1, isActive: 1 });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ 'seo.slug': 1 });
productSchema.index({ tags: 1 });
productSchema.index({ name: 'text', description: 'text' });

productSchema.pre('save', function(next) {
  if (this.price && this.cost) {
    this.profit = this.price - this.cost;
    this.profitMargin = this.price > 0 ? ((this.price - this.cost) / this.price) * 100 : 0;
  }

  if (!this.seo.slug && this.name) {
    this.seo.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  next();
});

productSchema.methods.isInStock = function() {
  if (!this.trackInventory) return true;
  return this.stock > 0;
};

productSchema.methods.reduceStock = function(quantity) {
  if (!this.trackInventory) return true;

  if (this.stock < quantity) {
    return false;
  }

  this.stock -= quantity;
  this.sold += quantity;
  return true;
};

module.exports = mongoose.model('Product', productSchema);