const request = require('supertest');
const app = require('../server');
const TrainStation = require('../models/TrainStation');
const User = require('../models/User');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await TrainStation.deleteMany();
  await User.deleteMany();
});

describe('Train Station API', () => {
  test('Should create a new train station', async () => {
    const admin = new User({
      email: 'admin@example.com',
      pseudo: 'adminuser',
      password: 'adminpass123',
      role: 'admin'
    });
    await admin.save();
    const token = admin.generateAuthToken();

    const response = await request(app)
      .post('/api/stations')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Central Station')
      .field('open_hour', '06:00')
      .field('close_hour', '23:00')
      .attach('image', 'tests/testImage.jpg')
      .expect(201);

    const station = await TrainStation.findById(response.body._id);
    expect(station).not.toBeNull();

    expect(response.body).toMatchObject({
      name: 'Central Station',
      open_hour: '06:00',
      close_hour: '23:00'
    });
    expect(response.body.image).toBeDefined();
  });

  test('Should get all train stations', async () => {
    await TrainStation.create([
      { name: 'Station 1', open_hour: '05:00', close_hour: '22:00', image: 'image1.jpg' },
      { name: 'Station 2', open_hour: '06:00', close_hour: '23:00', image: 'image2.jpg' }
    ]);

    const response = await request(app)
      .get('/api/stations')
      .send()
      .expect(200);

    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[1]).toHaveProperty('open_hour');
  });
});
