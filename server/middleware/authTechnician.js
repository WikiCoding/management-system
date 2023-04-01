const jwt = require('jsonwebtoken');
const db = require('../db/db');

const authTechnincian = async (req, res, next) => {
  try {
    let token = '';

    if (!req.header('Authorization')) {
      token = req.cookies['managementapp_authToken'];
    } else {
      token = req.header('Authorization').replace('Bearer ', '')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userLookup = `SELECT * FROM users WHERE id=$1`;

    req.userId = decoded.id;

    const result = await db.query(userLookup, [decoded.id]);

    if (result.rows[0].position !== 'manager') {
      next();
    } else {
      return res.status(401).send('Unauthorized');
    }

  } catch (err) {
    res.status(401).send({ error: 'Please authenticate.' })
  }
}

module.exports = authTechnincian