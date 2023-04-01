const jwt = require('jsonwebtoken');
const db = require('../db/db');

const authManager = async (req, res, next) => {
  try {
    let token = '';
    if (!req.header('Authorization')) {
      token = req.cookies['managementapp_authToken'];
    } else {
      token = req.header('Authorization').replace('Bearer ', '')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userLookup = `SELECT * FROM users WHERE id=$1`;

    const result = await db.query(userLookup, [decoded.id])

    req.email = result.rows[0].email;

    if (result.rows[0].position !== 'manager') {
      return res.status(401).send('Unauthorized');
    } else {
      next();
    }
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate.' })
  }
}

module.exports = authManager