const Ticket = require('../models/Ticket');

exports.bookTicket = async (req, res) => {
  try {
    const ticket = new Ticket({
      ...req.body,
      user: req.user._id
    });
    await ticket.save();
    res.status(201).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.validateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).send();
    }
    ticket.validated = true;
    await ticket.save();
    res.send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).populate('train');
    res.send(tickets);
  } catch (error) {
    res.status(500).send(error);
  }
};
