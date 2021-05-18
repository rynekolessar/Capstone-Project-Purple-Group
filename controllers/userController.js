const User = require('../models/User');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('./../utilities/appError');
const factory = require('./handlerFactory');
 
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // Error if user POSTS password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates!'), 400);
  }

  // Filter out unwanted field names
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     user: updatedUser
  //   }
  // });

  res.json(updatedUser);
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  // res.status(204).json({
  //   status: 'success',
  //   data: null
  // });

  res.json(null);
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead.'
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);

// Do NOT update passwords with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
