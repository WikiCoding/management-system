const db = require('../../db/db');

const checkUserTask = async (req, res, next) => {
  try {
    const checkQuery = `SELECT * FROM tasks WHERE userid=$1`;

    const result = await db.query(checkQuery, [req.userId])

    req.tasks = result.rows;

    next();
  } catch (err) {
    res.status(404).send('Not found. ', err.details);
  }

}

module.exports = checkUserTask;