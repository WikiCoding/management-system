const db = require('../../db/db');

const getAllTasks = async (req, res) => {
  //handled ONLY by manager
  try {
    const managerGetTasks =
      `SELECT * FROM tasks`

    const result = await db.query(managerGetTasks)

    res.status(200).send(result.rows)
  }
  catch (err) {
    res.status(400).send(err.details);
  }
}

module.exports = getAllTasks