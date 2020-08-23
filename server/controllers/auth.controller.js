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
      if (!user) res.status(406).json({ message: 'User not found!' });

      return bcrypt.compare(password, user.password)
        .then(async (result) => {
          if (!result) return res.status(401).json({ error: 'Invalid Username or password' });

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
          return res.status(409).json({ message: 'Error while hashing user\'s password' });
        }

        return knexDb('users')
          .insert({ username, password: hashedPassword })
          .returning('id')
          .then((result) => {
            const token = jwt.sign({ id: result[0] }, process.env.SECRET);
            res.cookie('token', token, { httpOnly: true });

            return next();
          })
          .catch(() => res.status(400).json({ message: 'Unexpected Error occured' }));
      });
    })
    .catch(() => res.status(400).json({ message: 'Error occured in register' }));
};

exports.signOut = (req, res, next) => {
  try {
    res.clearCookie('token');

    return next();
  } catch (err) {
    return next(err);
  }
};
