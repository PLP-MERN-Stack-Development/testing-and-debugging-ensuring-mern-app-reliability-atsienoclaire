const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app');
const Bug = require('../../src/models/Bug');
const User = require('../../src/models/User');
const { generateToken } = require('../../src/utils/auth');

let mongoServer;
let token;
let userId;
let bugId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  const user = await User.create({ username: 'tester', email: 'tester@example.com', password: 'password123' });
  userId = user._id;
  token = generateToken(user);

  const bug = await Bug.create({ title: 'Sample Bug', reporter: userId });
  bugId = bug._id;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Bug API', () => {
  it('creates a bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'New Bug' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('New Bug');
  });

  it('gets all bugs', async () => {
    const res = await request(app).get('/api/bugs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('updates a bug', async () => {
    const res = await request(app)
      .put(`/api/bugs/${bugId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'resolved' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('resolved');
  });

  it('deletes a bug', async () => {
    const res = await request(app)
      .delete(`/api/bugs/${bugId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
