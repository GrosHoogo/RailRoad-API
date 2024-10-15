const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany();
});

test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/users/register')
    .send({
      email: 'test@example.com',
      pseudo: 'testuser',
      password: 'testpass123'
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      email: 'test@example.com',
      pseudo: 'testuser'
    },
    token: expect.any(String)
  });

  expect(user.password).not.toBe('testpass123');
});

test('Should login existing user', async () => {
  const user = new User({
    email: 'existing@example.com',
    pseudo: 'existinguser',
    password: 'existingpass123'
  });
  await user.save();

  const response = await request(app)
    .post('/users/login')
    .send({
      email: 'existing@example.com',
      password: 'existingpass123'
    })
    .expect(200);

  expect(response.body).toMatchObject({
    user: {
      email: 'existing@example.com',
      pseudo: 'existinguser'
    },
    token: expect.any(String)
  });
});
