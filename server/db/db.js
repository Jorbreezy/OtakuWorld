const { Pool } = require('pg');

const { DB_URL } = process.env;

const PG_URI = DB_URL;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
