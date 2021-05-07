// model/Reveiw.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
    updated_date: {
		type: Date,
		default: Date.now
	}
});
module.exports = Review = mongoose.model('review', reviewSchema);