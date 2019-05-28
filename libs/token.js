const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config.js');
const generateToken = async (userId,scope = 2) => {
  const token = await jwt.sign({ userId,scope}, secretKey, {expiresIn:60*60*24});
  return token;
};


module.exports = {
  generateToken
};