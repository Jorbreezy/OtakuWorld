const { Pool } = require('pg');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: 'OtakuWorld',
  password: DB_PASSWORD,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
