const db = require('../../db/db');

const deleteProject = async (req, res) => {
  try {
    const deleteQuery = 'DELETE FROM projects WHERE idprojs=$1';

    await db.query(deleteQuery, [req.params.id]);

    res.status(200).send('Deleted Successfully')
  } catch (err) {
    res.status(400).send(err)
  }



}

module.exports = deleteProject;