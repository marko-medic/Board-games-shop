const bcrypt = require("bcryptjs");

const _cryptPassword = async password =>
  bcrypt.hash(password, bcrypt.genSaltSync(8), null);

const _validatePassword = async (password, hash) =>
  bcrypt.compare(password, hash);

module.exports = {
  cryptPassword: _cryptPassword,
  validatePassword: _validatePassword
};
