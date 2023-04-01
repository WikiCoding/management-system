const db = require('../../db/db');

const getUserFromTaskUserId = async (req, res) => {
  try {
    const getTasksQuery =
      'SELECT * FROM users INNER JOIN tasks ON users.id = tasks.userid'

    const result = await db.query(getTasksQuery);

    res.status(200).send(result.rows);

  } catch (err) {
    res.status(400).send(err.details);
  }
}

module.exports = getUserFromTaskUserId;