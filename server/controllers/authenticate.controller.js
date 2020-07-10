const jwt = require('jsonwebtoken');

const verify = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    const decrypt = await jwt.verify(token, process.env.SECRET);

    res.locals.user = decrypt;

    return next();
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

module.exports = { verify };
