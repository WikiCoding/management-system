const request = require('supertest');
const app = require('../app');
const { user1, user2, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

describe('Tasks related tests', () => {

  //TECHNICIAN GETTING HIS OWN TASKS
  test('Technician should see only his own tasks', async () => {
    await request(app).get('/tasks/user/2').set('Authorization', `Bearer ${user1[6]}`).expect(401)
  })

  //TASKS CREATION
  test('Technician should create a new task', async () => {
    await request(app).post('/tasks/add').send({
      task: 'Hello',
      completed: 0,
      userId: user1[0]
    }).set('Authorization', `Bearer ${user1[6]}`).expect(201);
  })

  test('Manager should not create a new task', async () => {
    await request(app).post('/tasks/add').send({
      task: 'Do not add',
      completed: 0,
      userId: user2[0]
    }).set('Authorization', `Bearer ${user2[6]}`).expect(401);
  })

  //TASKS UPDATE COMPLETED
  test('Technician should complete a task', async () => {
    await request(app).patch('/tasks/completion/1').send({
      completed: 1,
    }).set('Authorization', `Bearer ${user1[6]}`).expect(200);
  })

  test('Manager should not complete a task', async () => {
    await request(app).patch('/tasks/completion/1').send({
      completed: 1,
    }).set('Authorization', `Bearer ${user2[6]}`).expect(401);
  })

  //TASKS UPDATE DESCRIPTION
  test('Technician should update task description', async () => {
    await request(app).patch('/tasks/description/1').send({
      task: 'Changed Task Description',
    }).set('Authorization', `Bearer ${user1[6]}`).expect(200);
  })

  test('Manager should not update task description', async () => {
    await request(app).patch('/tasks/description/1').send({
      task: 'Changed Task Description',
    }).set('Authorization', `Bearer ${user2[6]}`).expect(401);
  })

  //TASKS DELETE
  test('Technician should not delete task', async () => {
    await request(app).delete('/tasks/delete/1').set('Authorization', `Bearer ${user1[6]}`).expect(401);
  })

  test('Manager should delete task', async () => {
    await request(app).delete('/tasks/delete/1').set('Authorization', `Bearer ${user2[6]}`).expect(200);
  })
})