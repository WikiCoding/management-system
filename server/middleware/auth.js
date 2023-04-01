const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/db');
const validator = require('validator');

const register = async (req, res) => {
  try {
    //Hashing the password before saving at the Database
    const hashedPw = await bcrypt.hash(req.body.password, 8);

    const insertUser = "INSERT INTO users (username, email, password, manager_email, position) VALUES ($1,$2,$3,$4,$5)";

    if (req.body.position === 'manager' && req.body.adminPW !== process.env.DB_PW) {
      return res.status(401).send('Unauthorized to create manager Account')
    }

    if (!validator.isEmail(req.body.email)) {
      throw new Error('Email is invalid')
    }

    await db.query(insertUser, [req.body.username, req.body.email, hashedPw, req.body.managerEmail, req.body.position])

    res.status(201).send(`User ${req.body.username} was inserted to the db`)
  } catch (err) {
    res.status(400).send(err.detail)
  }
}

const login = async (req, res) => {
  try {
    const query = `SELECT * FROM users WHERE email = $1`

    const result = await db.query(query, [req.body.email]);

    const isMatch = await bcrypt.compare(req.body.password, result.rows[0].password)

    if (!isMatch) return res.status(401).send('Unauthorized.');

    const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET);

    res.cookie('managementapp_authToken', token).status(200)
      .send({
        message: `Logged in as ${req.body.email}`,
        token, id: result.rows[0].id,
        username: result.rows[0].username,
        email: result.rows[0].email,
        position: result.rows[0].position
      });

  } catch (err) {
    res.status(500).send(err.detail)
  }
}

const logout = (req, res) => {

  res.clearCookie("managementapp_authToken", {
    secure: true,
    sameSite: "none" //added just because most likely the client will be on another port and it would have forbbiden access
  }).status(200).send('Logged Out');
}

module.exports = { register, login, logout };