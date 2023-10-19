require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (user) => {
  return jwt.sign({ user }, process.env.tokenKey, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};