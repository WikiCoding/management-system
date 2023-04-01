const db = require('../../db/db');

const getProjTasks = async (req, res) => {
  try {
    const tasksQuery = 'SELECT * FROM project_tasks WHERE owned_by=$1 ORDER BY proj_task_end ASC';

    const result = await db.query(tasksQuery, [req.params.proj_title]);

    res.status(200).send(result.rows);
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports = getProjTasks;