const request = require('supertest');
const app = require('../server');
const Train = require('../models/Train');
const User = require('../models/User');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Train.deleteMany();
  await User.deleteMany();
});

describe('Train API', () => {
  test('Should create a new train', async () => {
    const admin = new User({
      email: 'admin@example.com',
      pseudo: 'adminuser',
      password: 'adminpass123',
      role: 'admin'
    });
    await admin.save();
    const token = admin.generateAuthToken();

    const response = await request(app)
      .post('/api/trains')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Express 1',
        start_station: 'Station A',
        end_station: 'Station B',
        time_of_departure: new Date()
      })
      .expect(201);

    const train = await Train.findById(response.body._id);
    expect(train).not.toBeNull();

    expect(response.body).toMatchObject({
      name: 'Express 1',
      start_station: 'Station A',
      end_station: 'Station B'
    });
  });

  test('Should get all trains', async () => {
    await Train.create([
      { name: 'Train 1', start_station: 'A', end_station: 'B', time_of_departure: new Date() },
      { name: 'Train 2', start_station: 'C', end_station: 'D', time_of_departure: new Date() }
    ]);

    const response = await request(app)
      .get('/api/trains')
      .send()
      .expect(200);

    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[1]).toHaveProperty('start_station');
  });
});
