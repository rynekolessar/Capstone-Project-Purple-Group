const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: false
    },
    rating: {
      type: Number,
      min: [1, 'rating cannot be below 1'],
      max: [5, 'rating cannot be above 5']
    },
    game: {
      type: mongoose.Schema.ObjectId,
      ref: 'Game',
      required: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    updated_date: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// User can only make one review for any game
reviewSchema.index(
  {
    game: 1,
    user: 1
  },
  {
    unique: true
  }
);

// Query middleware
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'users'
  });
  next();
});

// calculates the average rating
reviewSchema.statics.calcAverageRatings = async function(gameId) {
  const stats = await this.aggregate([
    {
      $match: { game: gameId }
    },
    {
      $group: {
        _id: '$game',
        nRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Game.findByIdAndUpdate(gameId, {
      quantityRatings: stats[0].nRatings,
      averageRating: stats[0].avgRating
    });
  } else {
    await Game.findByIdAndUpdate(gameId, {
      quantityRatings: 0,
      averageRating: 4.5
    });
  }
};

reviewSchema.post('save', function() {
  // this points to current review

  this.constructor.calcAverageRatings(this.game);
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function(next) {
  await this.r.constructor.calcAverageRatings(this.r.game);
});

module.exports = Review = mongoose.model('reviews', reviewSchema);