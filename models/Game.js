// models/Game.js

const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	platform: {
		type: String,
		required: true
	},
	genre: {
		type: String
	},
	release_date: {
		type: Date
	},
	description: {
		type: String
	},
	game_studio: {
		type: String
	},
	average_rating: {
		type: Number,
		min: 1,
        max: 5
	},
	updated_date: {
		type: Date,
		default: Date.now
	}
});

GameSchema.virtual('reviews', {
	ref: 'Review',
	foreignField: 'game',
	localField: '_id'
});

GameSchema.index({
	average_rating: 1
});

module.exports = Game = mongoose.model('game', GameSchema);