const db = require('../../db/db');

const updateProjectTaskCompleted = async (req, res) => {
  try {
    const completeQuery = 'UPDATE project_tasks SET proj_task_completed=$1 WHERE id_proj_tasks=$2';

    const updateTo = req.body.update;

    await db.query(completeQuery, [updateTo, parseInt(req.params.id)]);

    res.status(200).send('Updated');
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports = updateProjectTaskCompleted;