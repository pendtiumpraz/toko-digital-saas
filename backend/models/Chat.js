const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  participants: [{
    type: {
      type: String,
      enum: ['customer', 'store_owner', 'admin'],
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    phone: String,
    email: String,
    avatar: String
  }],
  messages: [{
    sender: {
      type: {
        type: String,
        enum: ['customer', 'store_owner', 'admin'],
        required: true
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      name: String
    },
    message: {
      type: String,
      required: true
    },
    attachments: [{
      type: {
        type: String,
        enum: ['image', 'video', 'document', 'audio'],
        required: true
      },
      url: String,
      name: String,
      size: Number
    }],
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    isRead: {
      type: Boolean,
      default: false
    },
    readAt: Date,
    sentAt: {
      type: Date,
      default: Date.now
    },
    editedAt: Date,
    deletedAt: Date
  }],
  lastMessage: {
    text: String,
    sentAt: Date,
    senderType: String
  },
  status: {
    type: String,
    enum: ['active', 'resolved', 'archived', 'blocked'],
    default: 'active'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  tags: [String],
  notes: String,
  rating: {
    score: {
      type: Number,
      min: 1,
      max: 5
    },
    feedback: String,
    ratedAt: Date
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  source: {
    type: String,
    enum: ['website', 'whatsapp', 'facebook', 'instagram', 'email'],
    default: 'website'
  },
  isTyping: {
    customer: {
      type: Boolean,
      default: false
    },
    store: {
      type: Boolean,
      default: false
    }
  },
  unreadCount: {
    customer: {
      type: Number,
      default: 0
    },
    store: {
      type: Number,
      default: 0
    }
  },
  metadata: {
    ip: String,
    userAgent: String,
    location: {
      country: String,
      city: String
    },
    device: String,
    browser: String
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

chatSchema.index({ store: 1, status: 1 });
chatSchema.index({ 'participants.phone': 1 });
chatSchema.index({ createdAt: -1 });
chatSchema.index({ 'lastMessage.sentAt': -1 });

chatSchema.methods.addMessage = function(senderType, senderId, message, attachments = []) {
  const newMessage = {
    sender: {
      type: senderType,
      user: senderId,
      name: this.participants.find(p => p.user?.toString() === senderId?.toString())?.name
    },
    message,
    attachments,
    sentAt: new Date()
  };

  this.messages.push(newMessage);
  this.lastMessage = {
    text: message,
    sentAt: new Date(),
    senderType
  };

  if (senderType === 'customer') {
    this.unreadCount.store += 1;
  } else {
    this.unreadCount.customer += 1;
  }

  return newMessage;
};

chatSchema.methods.markAsRead = function(readerType) {
  if (readerType === 'store') {
    this.unreadCount.store = 0;
  } else {
    this.unreadCount.customer = 0;
  }

  this.messages.forEach(msg => {
    if (!msg.isRead && msg.sender.type !== readerType) {
      msg.isRead = true;
      msg.readAt = new Date();
    }
  });
};

module.exports = mongoose.model('Chat', chatSchema);