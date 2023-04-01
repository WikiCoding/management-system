const db = require('../../db/db');

const deleteTask = async (req, res) => {
  //Manager privilege ONLY
  try {
    const taskDelete = `DELETE FROM tasks WHERE idtasks=$1`;

    await db.query(taskDelete, [parseInt(req.params.id)]);

    // if (result.affectedRows == 0) {
    //   return res.status(404).send('Task not found');
    // }

    res.status(200).send('Task deleted');
  } catch (err) {
    res.status(400).send('Could not delete. ', err.details);
  }


}

module.exports = deleteTask;