const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const validate = require('../middleware/validate');
const { createStationSchema, updateStationSchema } = require('../utils/validationSchemas');
const upload = require('../middleware/upload');

router.get('/', stationController.getAllStations);
router.post('/', auth, adminAuth, upload.single('image'), validate(createStationSchema), stationController.createStation);
router.get('/:id', stationController.getStation);
router.patch('/:id', auth, adminAuth, upload.single('image'), validate(updateStationSchema), stationController.updateStation);
router.delete('/:id', auth, adminAuth, stationController.deleteStation);

module.exports = router;
