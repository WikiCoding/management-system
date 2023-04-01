const db = require('../../db/db');

const getHolidays = async (req, res) => {
  try {
    const holidaysQuery = 'SELECT proj_holidays FROM projects WHERE proj_title=$1';

    const data = await db.query(holidaysQuery, [req.params.proj_title]);

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports = getHolidays;