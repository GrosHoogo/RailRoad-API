const Joi = require('joi');

exports.registerSchema = Joi.object({
  email: Joi.string().email().required(),
  pseudo: Joi.string().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'employee', 'admin')
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

exports.updateUserSchema = Joi.object({
  email: Joi.string().email(),
  pseudo: Joi.string(),
  password: Joi.string().min(6)
});

exports.createTrainSchema = Joi.object({
  name: Joi.string().required(),
  start_station: Joi.string().required(),
  end_station: Joi.string().required(),
  time_of_departure: Joi.date().required()
});

exports.updateTrainSchema = Joi.object({
  name: Joi.string(),
  start_station: Joi.string(),
  end_station: Joi.string(),
  time_of_departure: Joi.date()
});

exports.createStationSchema = Joi.object({
  name: Joi.string().required(),
  open_hour: Joi.string().required(),
  close_hour: Joi.string().required()
});

exports.updateStationSchema = Joi.object({
  name: Joi.string(),
  open_hour: Joi.string(),
  close_hour: Joi.string()
});

exports.createTicketSchema = Joi.object({
  train: Joi.string().required(),
  date: Joi.date().required()
});
