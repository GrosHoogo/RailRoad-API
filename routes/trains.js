const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const validate = require('../middleware/adminAuth');
const { createTrainSchema, updateTrainSchema } = require('../utils/validationSchemas');

router.get('/', trainController.getAllTrains);
router.post('/', auth, adminAuth, validate(createTrainSchema), trainController.createTrain);
router.get('/:id', trainController.getTrain);
router.patch('/:id', auth, adminAuth, validate(updateTrainSchema), trainController.updateTrain);
router.delete('/:id', auth, adminAuth, trainController.deleteTrain);

module.exports = router;
