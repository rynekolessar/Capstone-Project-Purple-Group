const User = require('../models/User');
const errorHandler = require('../helpers/dbErrorHandler');

module.exports.registerUser = function registerUser(req, res, next) {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.status(200).json({
      message: 'New user registered successfully!'
    });
  });
};

module.exports.findUserById = function findUserById(req, res, next, id) {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user found with that credentials!'
      });
    }
    req.profile = user;
    next();
  });
};

module.exports.findUserProfile = function findUserProfile(req, res) {
  req.profile.hashedPassword = undefined;
  req.profile.salt = undefined; ``
  return res.json(req.profile);
};

module.exports.deleteUser = function deleteUser(req, res, next) {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    deletedUser.hashedPassword = undefined;
    user.salt = undefined;
    res.json(user);
  });
};
