const db = require('../../db/db');

const getProjectByTitle = async (req, res) => {
  try {
    const projectsQuery = 'SELECT * FROM projects WHERE proj_title=$1';

    const data = await db.query(projectsQuery, [req.params.proj_title]);

    res.status(200).send(data.rows);
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = getProjectByTitle;