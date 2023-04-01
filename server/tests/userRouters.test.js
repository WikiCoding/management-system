const request = require('supertest');
const app = require('../app');
const { user1, user2, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

describe('userRouters', () => {
  //LOGIN
  test('Should login existing user', async () => {
    await request(app).post('/login').send({
      email: 'tiago@mail.com',
      password: '123'
    }).expect(200)
  });

  test('Should not login non-existent user', async () => {
    await request(app).post('/login').send({
      email: 't@t.com',
      password: '1245859532'
    }).expect(404)
  });

  test('Should not login with wrong password', async () => {
    await request(app).post('/login').send({
      email: 'tiago@mail.com',
      password: '12458'
    }).expect(401)
  });

  //REGISTER
  test('Should register a new technician', async () => {
    await request(app).post('/register').send({
      username: 'Castro',
      position: 'technician',
      email: 'castro@mail.com',
      password: '123',
      managerEmail: 'manager@mail.com',
    }).expect(201);
  });

  test('Should register a new manager', async () => {
    await request(app).post('/register').send({
      username: 'Sword',
      position: 'manager',
      email: 'sw@mail.com',
      password: '123',
      managerEmail: 'manager@mail.com',
      adminPW: 'mysql'
    }).expect(201);
  });

  test('Should not register a manager without Admin Password', async () => {
    await request(app).post('/register').send({
      username: 'Sword',
      position: 'manager',
      email: 'sw@mail.com',
      password: '123',
      managerEmail: 'manager@mail.com',
    }).expect(401);
  });

  //GETTING ALL USERS
  test('Manager should see all technicians/users', async () => {
    await request(app).get('/users').set('Authorization', `Bearer ${user2[6]}`).expect(200)
  })

  test('Technician should not see all users', async () => {
    await request(app).get('/users').set('Authorization', `Bearer ${user1[6]}`).expect(401)
  })

})


