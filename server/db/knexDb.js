const {
  DB_PASSWORD, DB_USER, CLIENT, DB_HOST, DATABASE,
} = process.env;

const pg = require('knex')({
  client: CLIENT,
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DATABASE,
  },
  searchPath: ['knex', 'public'],
});

module.exports = pg;
