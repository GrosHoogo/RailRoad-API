const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  train: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Train', 
    required: true
  },
  date: { 
    type: Date, 
    required: true
  },
  validated: { 
    type: Boolean, 
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ticket', ticketSchema);
