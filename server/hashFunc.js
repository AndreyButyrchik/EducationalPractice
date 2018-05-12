const crypto = require('crypto');

const hashFunc = (function hashFunc() {
  const genRandomString = function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  };

  const sha512 = function sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
      salt,
      value
    };
  };

  const saltHashPassword = function saltHashPassword(userpassword) {
    const salt = genRandomString(16);
    return sha512(userpassword, salt);
  };

  return {
    sha512,
    saltHashPassword
  };
}());

module.exports = hashFunc;
