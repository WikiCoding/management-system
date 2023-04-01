const db = require('../../db/db');

const addTask = async (req, res) => {
  //:id represents the id of the user that is creating the task
  try {
    const taskData = { task: req.body.task, userId: req.userId };

    const taskQuery =
      `INSERT INTO tasks (task, userid) VALUES ($1, $2)`;

    const values = [taskData.task, taskData.userId];

    await db.query(taskQuery, values);

    res.status(201).send('Created task');

  } catch (err) {
    res.status(400).send('Could not add task');
  }
}

module.exports = addTask;