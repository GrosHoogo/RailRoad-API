const mongoose = require('mongoose');

const trainStationSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    unique: true
  },
  open_hour: { 
    type: String, 
    required: true
  },
  close_hour: { 
    type: String, 
    required: true
  },
  image: { 
    type: String, 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TrainStation', trainStationSchema);
