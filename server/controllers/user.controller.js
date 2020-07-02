const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const db = require('../db/db');

const userController = {
  login: (req, res, next) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username=$1';

    db.query(query, [username], (err, data) => {
      if (err) return next(err);
      const results = data.rows;

      if (!results.length) {
        return res.status(406).json({ message: 'User not found!' });
      }

      return bcrypt.compare(password, data.rows[0].password).then(async (result) => {
        if (!result) return res.status(401).json({ error: 'Invalid Username or password' });

        res.locals.username = username;
        return next();
      });
    });
  },
};

module.exports = userController;
