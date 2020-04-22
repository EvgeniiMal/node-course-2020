const { UNAUTHORIZED } = require('http-status-codes');
const { JWT_SECRET_KEY } = require('../common/config');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.sendStatus(UNAUTHORIZED);
  }
  const bearer = req.headers.authorization.split(' ')[1];
  try {
    await jwt.verify(bearer, JWT_SECRET_KEY);
  } catch (error) {
    return res.sendStatus(UNAUTHORIZED);
  }

  next();
};

module.exports = { authMiddleware };
