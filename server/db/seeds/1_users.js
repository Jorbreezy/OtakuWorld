const bcrypt = require('bcryptjs');

exports.seed = (knex) => (
  // Deletes ALL existing entries
  knex('users')
    .del()
    .then(() => knex('users')
      .insert([
        { username: 'Test', password: bcrypt.hashSync('12345', 10) },
        { username: 'JMAN', password: bcrypt.hashSync('12345', 10) },
      ])));
