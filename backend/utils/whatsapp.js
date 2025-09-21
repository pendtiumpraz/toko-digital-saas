const formatPhoneNumber = (phone) => {
  let cleaned = phone.replace(/\D/g, '');

  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  }

  if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }

  return cleaned;
};

const generateWhatsAppLink = (phoneNumber, message) => {
  const formattedPhone = formatPhoneNumber(phoneNumber);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
};

const generateOrderMessage = (order, store, products) => {
  let message = `🛍️ *PESANAN BARU*\n`;
  message += `Dari: ${store.name}\n\n`;

  message += `📦 *Detail Pesanan:*\n`;
  products.forEach(item => {
    message += `• ${item.name}\n`;
    message += `  Qty: ${item.quantity} x Rp ${item.price.toLocaleString('id-ID')}\n`;
    message += `  Subtotal: Rp ${(item.quantity * item.price).toLocaleString('id-ID')}\n\n`;
  });

  message += `💰 *Total: Rp ${order.total.toLocaleString('id-ID')}*\n\n`;

  message += `👤 *Data Pembeli:*\n`;
  message += `Nama: ${order.customerName}\n`;
  message += `Telepon: ${order.customerPhone}\n`;

  if (order.customerAddress) {
    message += `Alamat: ${order.customerAddress}\n`;
  }

  if (order.notes) {
    message += `\n📝 *Catatan:*\n${order.notes}\n`;
  }

  message += `\n✨ Terima kasih telah berbelanja!`;

  return message;
};

const generateProductInquiryMessage = (product, store) => {
  let message = `Halo, saya tertarik dengan produk dari ${store.name}:\n\n`;
  message += `📦 *${product.name}*\n`;
  message += `💰 Harga: Rp ${product.price.toLocaleString('id-ID')}\n`;

  if (product.description) {
    message += `\n${product.description.substring(0, 100)}...\n`;
  }

  message += `\nApakah produk ini masih tersedia?`;

  return message;
};

module.exports = {
  formatPhoneNumber,
  generateWhatsAppLink,
  generateOrderMessage,
  generateProductInquiryMessage
};