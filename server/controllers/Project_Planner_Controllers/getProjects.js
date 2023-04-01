const db = require('../../db/db');

const getProjects = async (req, res) => {
  try {
    const projectsQuery = 'SELECT * FROM projects ORDER BY "proj_title" ASC';

    const data = await db.query(projectsQuery);

    res.status(200).send(data.rows);
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = getProjects;