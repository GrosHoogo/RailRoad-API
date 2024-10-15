const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const validate = require('../middleware/adminAuth');
const { registerSchema, loginSchema, updateUserSchema } = require('../utils/validationSchemas');

router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);
router.get('/me', auth, userController.getProfile);
router.patch('/me', auth, validate(updateUserSchema), userController.updateProfile);
router.delete('/me', auth, userController.deleteProfile);

module.exports = router;
