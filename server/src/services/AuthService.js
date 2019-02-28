var jwt = require('jsonwebtoken');

const privatKey = 'very-secret-private-key';

const AuthService = {
  getUser(tokenHeader) {
    if (!tokenHeader) {
      return {};
    }

    const token = tokenHeader.replace('Bearer ', '');
    const user = jwt.verify(token, privatKey);
    
    return user;
  },
  getJwtToken(user) {
    return jwt.sign(user, privatKey);
  }
};

module.exports = {
  AuthService
};
