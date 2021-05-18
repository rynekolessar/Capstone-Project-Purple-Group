const mongoose = require('mongoose');
const slugify = require('slugify');

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slug: String,
  platform: {
    type: String,
    required: true
  },
  genre: {
    type: String
  },
  releaseDate: {
    type: Date
  },
  description: {
    type: String
  },
  gameStudio: {
    type: String
  },
  averageRating: {
    type: Number,
    min: 1,
    max: 5,
    set: val => Math.round(val * 10) / 10
  },
  quantityRatings: {
    type: Number,
    default: 0
  },
  imageCover: {
    type: String
  },
  images: [String],
  updated_date: {
    type: Date,
    default: Date.now
  }
});

GameSchema.virtual('reviews', {
  ref: 'reviews',
  foreignField: 'game',
  localField: '_id'
});

GameSchema.index({
  average_rating: 1
});

GameSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});


module.exports = Game = mongoose.model('games', GameSchema);