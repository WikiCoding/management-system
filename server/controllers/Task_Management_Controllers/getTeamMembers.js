// EXTRA
const db = require('../../db/db');

const getTeamMembers = async (req, res) => {
  try {
    const users = "SELECT * FROM users WHERE manager_email=$1";

    const result = await db.query(users, [req.email])

    //console.table(result);
    res.status(200).send(result.rows[0])
  } catch (err) {
    res.status(404).send(err.details);
  }

}

module.exports = getTeamMembers;