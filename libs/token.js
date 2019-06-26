const jwt = require('jsonwebtoken');
const { secretKey, expiresIn } = require('../config/config.js');
const generateToken = async (userId) => {
  const token = await jwt.sign({ userId }, secretKey, { expiresIn });
  return token;
};

module.exports = {
  generateToken
};
