//const { Pool } = require('pg');
const pg = require('pg');

// const db = new Pool({
//   host: '127.0.0.1',
//   user: 'postgres',
//   password: 'postgres',
//   port: 5432,
//   database: 'tasks'
// })

const conString = process.env.DB_URL
const db = new pg.Client(conString)

db.connect((err) => {
  if (err) {
    throw err
  } else {
    console.log('Connected to db');
  }
})

module.exports = db;