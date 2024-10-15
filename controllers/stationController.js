const TrainStation = require('../models/TrainStation');
const sharp = require('sharp');

exports.getAllStations = async (req, res) => {
  const { sort } = req.query;
  try {
    const stations = await TrainStation.find().sort(sort);
    res.send(stations);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createStation = async (req, res) => {
  try {
    let image;
    if (req.file) {
      try {
        const buffer = await sharp(req.file.buffer).resize({ width: 200, height: 200 }).png().toBuffer();
        image = buffer.toString('base64');
      } catch (error) {
        console.error('Error processing image:', error);
        return res.status(400).json({ message: "Error processing image", error: error.message });
      }
    }
    const station = new TrainStation({
      ...req.body,
      image
    });
    await station.save();
    res.status(201).send(station);
  } catch (error) {
    console.error('Error in createStation:', error);
    res.status(400).json({ message: "Error creating station", error: error.message });
  }
};

  

exports.getStation = async (req, res) => {
  try {
    const station = await TrainStation.findById(req.params.id);
    if (!station) {
      return res.status(404).send();
    }
    res.send(station);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateStation = async (req, res) => {
  try {
    let updateData = req.body;
    if (req.file) {
      const buffer = await sharp(req.file.buffer).resize({ width: 200, height: 200 }).png().toBuffer();
      updateData.image = buffer.toString('base64');
    }
    const station = await TrainStation.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!station) {
      return res.status(404).send();
    }
    res.send(station);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteStation = async (req, res) => {
    try {
      const station = await TrainStation.findByIdAndDelete(req.params.id);
      if (!station) {
        return res.status(404).send();
      }
      res.send(station);
    } catch (error) {
      res.status(500).send(error);
    }
  };

