const { DB_PASSWORD, DB_USER } = process.env;

const pg = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'OtakuWorld',
  },
  searchPath: ['knex', 'public'],
});

module.exports = pg;
