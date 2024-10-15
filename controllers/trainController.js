const Train = require('../models/Train');

exports.getAllTrains = async (req, res) => {
  const { sort, limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const trains = await Train.find()
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .populate('start_station end_station');
    res.send(trains);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createTrain = async (req, res) => {
  const train = new Train(req.body);
  try {
    await train.save();
    res.status(201).send(train);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getTrain = async (req, res) => {
  try {
    const train = await Train.findById(req.params.id).populate('start_station end_station');
    if (!train) {
      return res.status(404).send();
    }
    res.send(train);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!train) {
      return res.status(404).send();
    }
    res.send(train);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndDelete(req.params.id);
    if (!train) {
      return res.status(404).send();
    }
    res.send(train);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllTrains = async (req, res) => {
    const { sort, limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
  
    try {
      const trains = await Train.find()
        .sort(sort)
        .limit(parseInt(limit))
        .skip(skip)
        .populate('start_station end_station');
      res.status(200).json(trains);
    } catch (error) {
      console.error('Error in getAllTrains:', error);
      res.status(500).json({ message: "Error retrieving trains", error: error.message });
    }
  };
  