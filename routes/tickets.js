const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const auth = require('../middleware/auth');
const employeeAuth = require('../middleware/employeeAuth');
const validate = require('../middleware/adminAuth');
const { createTicketSchema } = require('../utils/validationSchemas');

router.post('/book', auth, validate(createTicketSchema), ticketController.bookTicket);
router.patch('/validate/:id', auth, employeeAuth, ticketController.validateTicket);
router.get('/my-tickets', auth, ticketController.getMyTickets);

module.exports = router;
