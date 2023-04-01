const db = require('../../db/db');

const createProject = async (req, res) => {
  try {
    const createProjQuery = 'INSERT INTO projects (proj_title, proj_start, proj_holidays) VALUES ($1, $2, $3)';

    await db.query(createProjQuery, [req.body.projTitle, req.body.projStart, req.body.projHolidays]);

    res.status(201).send('Created Project')
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = createProject;