const catchAsync = require('../utilities/catchAsync');
const AppError = require('./../utilities/appError');
const APIFeatures = require('./../utilities/ApiFeatures');

module.exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    // res.status(204).json({
    //   status: 'success',
    //   data: null
    // });

    res.json(null);

  });

module.exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    // res.status(200).json({
    //   status: 'success',
    //    data: {
    //     data: doc
    //    }
    // });

    res.json(doc);

  });

  module.exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    // res.status(201).json({
    //   status: 'success',
    //   data: { data: newDoc }
    // });

    res.json(newDoc);

  });

  module.exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     data: doc
    //   }
    // });

    res.json(doc);

  });

  module.exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.gameId) filter = { game: req.params.gameId };
    if (req.params.userId) filter = { user: req.params.userId };

    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const docs = await features.query;

    // SEND QUERY
    // res.json({
    //   status: 'success',
    //   results: docs.length,
    //   data: {
    //     docs
    //   }
    // });

    res.json(docs);

  });
