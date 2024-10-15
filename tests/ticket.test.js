const request = require('supertest');
const app = require('../server');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Train = require('../models/Train');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Ticket.deleteMany();
  await User.deleteMany();
  await Train.deleteMany();
});

describe('Ticket API', () => {
  test('Should book a ticket', async () => {
    const user = new User({
      email: 'user@example.com',
      pseudo: 'testuser',
      password: 'testpass123'
    });
    await user.save();
    const token = user.generateAuthToken();

    const train = new Train({
      name: 'Express 1',
      start_station: 'Station A',
      end_station: 'Station B',
      time_of_departure: new Date()
    });
    await train.save();

    const response = await request(app)
      .post('/api/tickets/book')
      .set('Authorization', `Bearer ${token}`)
      .send({
        train: train._id,
        date: new Date()
      })
      .expect(201);

    const ticket = await Ticket.findById(response.body._id);
    expect(ticket).not.toBeNull();

    expect(response.body).toMatchObject({
      user: user._id.toString(),
      train: train._id.toString(),
      validated: false
    });
  });

  test('Should validate a ticket', async () => {
    const employee = new User({
      email: 'employee@example.com',
      pseudo: 'employeeuser',
      password: 'employeepass123',
      role: 'employee'
    });
    await employee.save();
    const token = employee.generateAuthToken();

    const user = new User({
      email: 'user@example.com',
      pseudo: 'testuser',
      password: 'testpass123'
    });
    await user.save();

    const train = new Train({
      name: 'Express 1',
      start_station: 'Station A',
      end_station: 'Station B',
      time_of_departure: new Date()
    });
    await train.save();

    const ticket = new Ticket({
      user: user._id,
      train: train._id,
      date: new Date(),
      validated: false
    });
    await ticket.save();

    const response = await request(app)
      .patch(`/api/tickets/validate/${ticket._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200);

    expect(response.body.validated).toBe(true);
  });
});
