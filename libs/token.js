const jwt = require('jsonwebtoken');
const { secretKey, expiresIn } = require('../config/config.js');
const HttpAuth = require('../middlewares/auth.js');
const generateToken = async (userId, scope = HttpAuth.USER) => {
  const token = await jwt.sign({ userId, scope }, secretKey, { expiresIn });
  return token;
};

module.exports = {
  generateToken
};
