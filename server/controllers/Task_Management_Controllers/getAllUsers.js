const db = require('../../db/db');

const getAllUsers = async (req, res) => {
  try {
    const users = 'SELECT * FROM users';
    //every manager will be able to see all items from the users table, including himself.
    //Added another route just to filter by team members

    await db.query(users)
    //console.table(result);
    res.status(200).send(result)

  } catch (err) {
    res.status(404).send(err.details);
  }
}


module.exports = getAllUsers;