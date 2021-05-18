const Review = require('../models/Review');
const factory = require('./handlerFactory');

module.exports.setGameUserIds = (req, res, next) => {
  if (!req.body.game) req.body.game = req.params.gameId;
  if (!req.body.game) req.body.game = req.user.id;
  next();
};

module.exports.getAllReviews = factory.getAll(Review);
module.exports.getReview = factory.getOne(Review);
module.exports.createReview = factory.createOne(Review);
module.exports.updateReview = factory.updateOne(Review);
module.exports.deleteReview = factory.deleteOne(Review);
