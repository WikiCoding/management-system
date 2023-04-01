const db = require('../../db/db');

const deleteProjectTask = async (req, res) => {
  try {
    const delTaskQuery = 'DELETE FROM project_tasks WHERE id_proj_tasks=$1';

    await db.query(delTaskQuery, [req.params.id]);

    res.status(200).send('Task Deleted!');
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = deleteProjectTask;