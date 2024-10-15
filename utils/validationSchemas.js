const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  pseudo: Joi.string().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  pseudo: Joi.string(),
  password: Joi.string().min(6)
});

const createTrainSchema = Joi.object({
  name: Joi.string().required(),
  start_station: Joi.string().required(),
  end_station: Joi.string().required(),
  time_of_departure: Joi.date().required()
});

const updateTrainSchema = Joi.object({
  name: Joi.string(),
  start_station: Joi.string(),
  end_station: Joi.string(),
  time_of_departure: Joi.date()
});

const createStationSchema = Joi.object({
  name: Joi.string().required(),
  city: Joi.string().required()
});

const updateStationSchema = Joi.object({
  name: Joi.string(),
  city: Joi.string()
});

const createTicketSchema = Joi.object({
  train: Joi.string().required(),
  date: Joi.date().required()
});

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
  createTrainSchema,
  updateTrainSchema,
  createStationSchema,
  updateStationSchema,
  createTicketSchema
};
