const multer = require('multer');
const sharp = require('sharp');
const Game = require('./../models/Game');
const catchAsync = require('./../utilities/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utilities/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload an image.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

module.exports.uploadGameImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 }
]);


// Middleware
module.exports.aliasTopGames = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-averageRating';
  req.query.fields = 'title,ratingsAverage,genre,platform,';
  next();
};

module.exports.getAllGames = factory.getAll(Game);
module.exports.getGame = factory.getOne(Game, { path: 'reviews' });
module.exports.createGame = factory.createOne(Game);
module.exports.updateGame = factory.updateOne(Game);
module.exports.deleteGame = factory.deleteOne(Game);


