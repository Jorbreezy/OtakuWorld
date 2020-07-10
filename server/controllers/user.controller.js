const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

        const token = jwt.sign({ user: username }, process.env.SECRET);
        res.cookie('token', token, { httpOnly: true });

        return next();
      });
    });
  },
  register: (req, res, next) => {
    const { password, username } = req.body;
    const queryString = 'SELECT * FROM users WHERE username = $1';
    // search for any rows in database where username exists

    db.query(queryString, [username], (err, data) => {
      if (err) {
        return res.status(400).json({ message: 'Error occured in register' });
      }

      if (data.rows.length > 0) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // hash pasword with bcrypt
      return bcrypt.hash(password, 10, (berr, hashedPassword) => {
        if (berr) {
          return res.status(409).json({ message: 'Error while hashing user\'s password' });
        }

        const queryArr2 = [username, hashedPassword];
        const queryStr = 'INSERT INTO users (username, password) VALUES($1, $2)';

        // stores username and hashed password in table in database
        return db.query(queryStr, queryArr2, (qerr) => {
          if (qerr) {
            return res.status(400).json({ message: 'Error occured in register' });
          }

          const token = jwt.sign({ user: username }, process.env.SECRET);
          res.cookie('token', token, { httpOnly: true });

          return next();
        });
      });
    });
  },
};

module.exports = userController;
