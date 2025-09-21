const express = require('express');
const router = express.Router();
const { generateWhatsAppLink, generateOrderMessage, generateProductInquiryMessage } = require('../utils/whatsapp');
const Store = require('../models/Store');
const Product = require('../models/Product');

router.post('/generate-link', async (req, res) => {
  try {
    const { storeId, productId, type = 'inquiry' } = req.body;

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    if (productId) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      const message = generateProductInquiryMessage(product, store);
      const whatsappLink = generateWhatsAppLink(store.whatsappNumber, message);

      return res.json({
        success: true,
        data: {
          link: whatsappLink,
          phoneNumber: store.whatsappNumber,
          message
        }
      });
    }

    const defaultMessage = `Halo, saya ingin bertanya tentang produk di ${store.name}`;
    const whatsappLink = generateWhatsAppLink(store.whatsappNumber, defaultMessage);

    res.json({
      success: true,
      data: {
        link: whatsappLink,
        phoneNumber: store.whatsappNumber,
        message: defaultMessage
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.post('/checkout-link', async (req, res) => {
  try {
    const { storeId, items, customerInfo } = req.body;

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    let message = `🛍️ *PESANAN BARU*\n`;
    message += `Dari: ${store.name}\n\n`;

    message += `📦 *Detail Pesanan:*\n`;
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (product) {
        const subtotal = product.price * item.quantity;
        total += subtotal;

        message += `• ${product.name}\n`;
        message += `  Qty: ${item.quantity} x Rp ${product.price.toLocaleString('id-ID')}\n`;
        message += `  Subtotal: Rp ${subtotal.toLocaleString('id-ID')}\n\n`;
      }
    }

    message += `💰 *Total: Rp ${total.toLocaleString('id-ID')}*\n\n`;

    if (customerInfo) {
      message += `👤 *Data Pembeli:*\n`;
      if (customerInfo.name) message += `Nama: ${customerInfo.name}\n`;
      if (customerInfo.phone) message += `Telepon: ${customerInfo.phone}\n`;
      if (customerInfo.address) message += `Alamat: ${customerInfo.address}\n`;
      if (customerInfo.notes) message += `\n📝 *Catatan:*\n${customerInfo.notes}\n`;
    }

    message += `\n✨ Terima kasih telah berbelanja!`;

    const whatsappLink = generateWhatsAppLink(store.whatsappNumber, message);

    res.json({
      success: true,
      data: {
        link: whatsappLink,
        phoneNumber: store.whatsappNumber,
        message,
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;