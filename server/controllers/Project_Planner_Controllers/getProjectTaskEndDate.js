const db = require('../../db/db');

const getProjTaskEndDate = async (req, res) => {
  try {
    const tasksQuery = 'SELECT * FROM project_tasks WHERE id_proj_tasks=$1';

    const result = await db.query(tasksQuery, [req.params.id_proj_tasks]);

    res.status(200).send(result.rows);
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports = getProjTaskEndDate;