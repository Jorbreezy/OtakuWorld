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
  register: (req, res, next) => {
    const { username, password } = req.body;
    const queryString = 'SELECT * FROM users WHERE username = $1';
    // search for any rows in database where username exists
    db.query(queryString, [username], (err, data) => {
      if (err) {
        return next({
          log: 'An error has occurred in createUser',
          status: 400,
          err: { err },
        });
      }

      if (data.rows.length > 0) {
        return next({
          log: 'User already exists',
          status: 409,
          err: { err },
        });
      }

      // hash pasword with bcrypt
      return bcrypt.hash(password, 10, (berr, hashedPassword) => {
        if (berr) {
          return next({
            log: 'Error when hashing password while creatin user.',
            status: 409,
            err: { berr },
          });
        }

        const queryArr2 = [username, hashedPassword];
        const queryStr = 'INSERT INTO users (username, password) VALUES($1, $2)';
        // stores username and hashed password in table in database
        return db.query(queryStr, queryArr2, (qerr) => {
          if (qerr) {
            return next({
              log: 'An error has occurred in createUser',
              status: 400,
              err: { qerr },
            });
          }

          return next();
        });
      });
    });
  },
};

module.exports = userController;
