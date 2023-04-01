const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../db/db');

const user1 = [1, "Tiago", "technician", "tiago@mail.com", bcrypt.hashSync('123', 8), "manager@mail.com", jwt.sign({ id: 1 }, 'thisismysecret')];

const user2 = [2, "Manager", "manager", "manager@mail.com", bcrypt.hashSync('123', 8), "", jwt.sign({ id: 2 }, 'thisismysecret')];

const task1 = [1, "Task 1", 0, 1, new Date()]

const setupDatabase = async () => {
  await db.query('DELETE FROM users')
  await db.query('DELETE FROM tasks')
  await db.query('DELETE FROM users WHERE email="castro@mail.com"')
  await db.query('INSERT INTO users (id, username, position, email, password, manager_email, token) VALUES (?,?,?,?,?,?,?)', user1
  )
  await db.query('INSERT INTO users (id, username, position, email, password, manager_email, token) VALUES (?,?,?,?,?,?,?)', user2
  )
  await db.query('INSERT INTO tasks (idtasks, task, completed, userId, createdAt) VALUES(?,?,?,?,?)', task1)

};

module.exports = {
  setupDatabase, user1, user2
}