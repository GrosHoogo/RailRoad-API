const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  start_station: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TrainStation',
    required: true
  },
  end_station: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TrainStation',
    required: true
  },
  time_of_departure: { 
    type: Date, 
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Train', trainSchema);
