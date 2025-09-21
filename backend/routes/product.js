const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, checkStoreOwnership } = require('../middleware/auth');
const Product = require('../models/Product');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

router.get('/store/:storeId', async (req, res) => {
  try {
    const products = await Product.find({
      store: req.params.storeId,
      isActive: true
    }).sort('-createdAt');

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate('store');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.views += 1;
    await product.save();

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.post('/', protect, checkStoreOwnership, upload.array('images', 10), async (req, res) => {
  try {
    const productData = {
      ...req.body,
      store: req.store._id
    };

    if (req.files && req.files.length > 0) {
      productData.images = req.files.map((file, index) => ({
        url: `/uploads/products/${file.filename}`,
        isPrimary: index === 0,
        source: 'upload'
      }));
    }

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.put('/:productId', protect, checkStoreOwnership, upload.array('images', 10), async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.productId,
      store: req.store._id
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        url: `/uploads/products/${file.filename}`,
        source: 'upload'
      }));
      req.body.images = [...(product.images || []), ...newImages];
    }

    Object.assign(product, req.body);
    await product.save();

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.delete('/:productId', protect, checkStoreOwnership, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.productId,
      store: req.store._id
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;