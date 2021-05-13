const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { jwtSecret } = require('../config/index');

module.exports.signin = function signin(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'User not found' });
    }
    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: 'Wrong Email or Password!' });
    }

    const token = jwt.sign(
      {
        _id: user._id
      },
      jwtSecret,
      {
        algorithm: 'RS256'
      }
    );

    res.cookie('t', token, {
      expire: new Date() + 9999
    });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  });
};

module.exports.signout = function signout(req, res) {
  res.clearCookie('t');
  return res.status(200).json({
    message: 'Sign out successful!'
  });
};

module.exports.requireSignin = requireSignin = expressJwt({
  secret: jwtSecret,
  userProperty: 'auth',
  algorithms: ['RS256']
});

module.exports.hasAuthorization = function hasAuthorization(req, res) {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: 'User is not authorized!'
    });
  }
};
