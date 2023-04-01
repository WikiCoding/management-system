const db = require('../../db/db');

const getUserTasks = async (req, res) => {
  try {
    const getTasksQuery =
      `SELECT * FROM tasks WHERE userid=$1`;

    if (req.userId !== parseInt(req.params.id)) return res.status(401).send('Unauthorized');

    const result = await db.query(getTasksQuery, [parseInt(req.params.id)]);

    res.status(200).send(result.rows);

  } catch (err) {
    res.status(400).send(err.details);
  }
}

module.exports = getUserTasks;