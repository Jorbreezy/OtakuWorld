// Update with your config settings.
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DATABASE, DB_PORT,
} = process.env;

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: DATABASE,
      user: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
    },
    pool: { min: 0, max: 10 },
    migrations: { directory: path.join(__dirname, '/server/db/migrations') },
    seeds: { directory: path.join(__dirname, '/server/db/seeds') },
  },
};
