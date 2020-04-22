const bcrypt = require('bcrypt');
const User = require('../users/user.schema');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const createToken = async (login, pass) => {
  const user = await User.findOne({ login });

  if (user && (await bcrypt.compare(pass, user.password))) {
    const token = await jwt.sign(
      { id: user.id, login: user.login },
      JWT_SECRET_KEY
    );

    return token;
  }
  return false;
};

module.exports = { createToken };
