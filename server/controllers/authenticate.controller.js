const jwt = require('jsonwebtoken');

exports.decodeUser = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    const decrypt = await jwt.verify(token, process.env.SECRET);

    res.locals.user = decrypt;
  } catch (err) { /* I don't care */ }

  return next();
};

exports.verifyUser = (req, res, next) => {
  const { user } = res.locals;
  if (user) return next();

  return res.status(401).json({ message: 'User Not authorized' });
};
