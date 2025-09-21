const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  }
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/', limiter);

const authRoutes = require('./routes/auth');
const storeRoutes = require('./routes/store');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const chatRoutes = require('./routes/chat');
const subscriptionRoutes = require('./routes/subscription');
const analyticsRoutes = require('./routes/analytics');
const domainRoutes = require('./routes/domain');
const aiRoutes = require('./routes/ai');
const whatsappRoutes = require('./routes/whatsapp');

app.use('/api/auth', authRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/domain', domainRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/whatsapp', whatsappRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/toko-digital', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join-store', (storeId) => {
    socket.join(`store-${storeId}`);
  });

  socket.on('send-message', (data) => {
    io.to(`store-${data.storeId}`).emit('new-message', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.set('io', io);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});