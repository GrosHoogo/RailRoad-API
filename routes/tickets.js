const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createTicketSchema } = require('../utils/validationSchemas');

router.post('/', auth, validate(createTicketSchema), ticketController.bookTicket);
router.get('/', auth, ticketController.getMyTickets);
router.get('/:id', auth, ticketController.getTicket);
router.delete('/:id', auth, ticketController.cancelTicket);
router.patch('/:id/validate', auth, ticketController.validateTicket);

module.exports = router;
