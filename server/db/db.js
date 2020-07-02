const { Pool } = require('pg');
const PG_URI = 'postgres://ydtpmvfk:TSs75C8j4ZrnM6opWzYbIB9KkLNiZm4Z@ruby.db.elephantsql.com:5432/ydtpmvfk';

const pool  = new Pool({
    connectionString: PG_URI
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
}