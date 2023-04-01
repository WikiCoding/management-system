const jwt = require('jsonwebtoken');
const db = require('../../db/db');

const checkLogin = async (req, res) => { //to check if an user is still logged in
  try {
    const token = req.body.token;
    if (!token) return res.send('Please login')

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userLookup = `SELECT * FROM users WHERE id=$1`;

    const result = await db.query(userLookup, [decoded.id])

    req.email = result.rows[0].email;
    res.status(200).send(result.rows[0]);
  }
  catch (err) {
    res.status(400).send(err)
  }
}

module.exports = checkLogin;