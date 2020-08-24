const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knexDb = require('../db/knexDb');

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  return knexDb('users')
    .select('*')
    .where({ username })
    .first()
    .then((user) => {
      if (!user) return res.status(406).json({ message: 'Invalid Username or password' });

      return bcrypt.compare(password, user.password)
        .then((result) => {
          if (!result) return res.status(406).json({ message: 'Invalid Username or password' });

          const token = jwt.sign({ id: user.id }, process.env.SECRET);
          res.cookie('token', token, { httpOnly: true });

          return next();
        });
    })
    .catch((err) => next(err));
};

exports.register = (req, res, next) => {
  const { password, username } = req.body;

  return knexDb('users')
    .select('*')
    .where({ username })
    .first()
    .then((user) => {
      if (user) return res.status(409).json({ message: 'User already exists' });

      return bcrypt.hashSync(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: 'Error while hashing user\'s password' }); // change message
        }

        return knexDb('users')
          .insert({ username, password: hashedPassword })
          .returning('id')
          .then((result) => {
            const token = jwt.sign({ id: result[0] }, process.env.SECRET);
            res.cookie('token', token, { httpOnly: true });

            return next();
          })
          .catch(() => res.status(400).json({ message: 'Unexpected Error occured' })); // change message
      });
    })
    .catch(() => res.status(400).json({ message: 'Error occured in register' })); // change message
};

exports.signOut = (req, res, next) => {
  res.clearCookie('token');
  return next();
};
