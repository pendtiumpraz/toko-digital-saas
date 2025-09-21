# Toko Digital SaaS Platform

Platform SaaS lengkap untuk membuat dan mengelola toko online dengan fitur AI, integrasi WhatsApp, dan manajemen keuangan.

## 🚀 Fitur Utama

### 📦 Manajemen Produk
- Upload gambar produk dengan batas storage sesuai paket
- Embed video dari YouTube
- Embed gambar dari Google Drive atau sumber eksternal
- Manajemen stok otomatis
- Kategori dan varian produk

### 💬 Integrasi WhatsApp
- Redirect otomatis ke WhatsApp untuk pemesanan
- Konfigurasi nomor WhatsApp per toko
- Chat real-time antara toko dan customer

### 💰 Manajemen Keuangan
- Tracking penjualan dan profit
- Export laporan ke Excel
- Grafik analitik
- Perhitungan margin keuntungan otomatis

### 🎯 Subscription & Pricing
- **Free Plan**: 10 produk, 100MB storage
- **Starter**: Rp 99.000/bulan - 100 produk, 1GB storage
- **Professional**: Rp 299.000/bulan - 1000 produk, 5GB storage, custom domain
- **Enterprise**: Rp 999.000/bulan - Unlimited produk, 50GB storage, AI features
- Free trial 14 hari untuk semua paket

### 🌐 Domain Management
- Subdomain gratis (namatoko.toko-digital.com)
- Custom domain support (Professional & Enterprise)
- SSL otomatis

### 🤖 AI Features (Enterprise)
- AI Landing Page Generator
- Marketing copy generator
- Product description optimization

### 🏪 Multi-Tenant Architecture
- Setiap toko memiliki login terpisah
- Dashboard terpisah per toko
- Multiple stores support (sesuai paket)

## 🛠️ Tech Stack

### Backend
- Node.js + Express.js
- MongoDB (Database)
- JWT Authentication
- Socket.io (Real-time chat)
- Multer (File upload)
- Nodemailer (Email)
- WhatsApp Web.js
- Stripe (Payment)

### Frontend
- React + TypeScript
- Vite (Build tool)
- Tailwind CSS
- React Router
- React Query
- Chart.js
- React Hook Form

## 📋 Prerequisites

- Node.js v18+
- MongoDB
- npm atau yarn

## 🔧 Installation

### 1. Clone Repository
```bash
git clone https://github.com/pendtiumpraz/toko-digital-saas.git
cd toko-digital-saas
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env dengan konfigurasi Anda
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```

### 4. Konfigurasi Environment Variables

Edit file `backend/.env` dengan konfigurasi:

```env
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/toko-digital

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token

# Stripe
STRIPE_SECRET_KEY=your-stripe-key

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

## 🚀 Running the Application

### Development Mode

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Akses aplikasi di:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Production Mode

```bash
# Build frontend
cd frontend
npm run build

# Start backend
cd ../backend
npm start
```

## 📁 Project Structure

```
toko-digital/
├── backend/
│   ├── controllers/     # Request handlers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/          # Utility functions
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   └── utils/      # Helper functions
│   └── public/         # Static files
└── README.md
```

## 🔒 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password

### Stores
- `GET /api/store` - Get user's stores
- `GET /api/store/:id` - Get store details
- `PUT /api/store/:id` - Update store

### Products
- `GET /api/products/store/:storeId` - Get store products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders/store/:storeId` - Get store orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status

### Subscription
- `GET /api/subscription/plans` - Get available plans
- `GET /api/subscription/my-subscription` - Get user's subscription
- `POST /api/subscription/upgrade` - Upgrade plan

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 📝 API Documentation

API documentation tersedia di `/api/docs` setelah menjalankan server.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License

## 👥 Team

- **Developer**: pendtiumpraz
- **Email**: pendtiumpraz@gmail.com
- **GitHub**: [@pendtiumpraz](https://github.com/pendtiumpraz)

## 🆘 Support

Untuk pertanyaan dan support, silakan buat issue di GitHub atau kontak melalui email.

## 🔮 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Email marketing automation
- [ ] Inventory forecasting with AI
- [ ] Multi-language support
- [ ] Marketplace integration (Tokopedia, Shopee)
- [ ] POS (Point of Sale) system
- [ ] Loyalty program
- [ ] Affiliate system
- [ ] Advanced SEO tools

## 🙏 Acknowledgments

- React Team
- Tailwind CSS
- MongoDB Team
- All contributors and supporters

---

**Dibuat dengan ❤️ untuk membantu UMKM Indonesia go digital**