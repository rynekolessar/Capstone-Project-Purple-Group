// models/Game.js

const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	platform: { // PlayStation, XBox, PC, etc..
		type: String,
		required: true
	},
	genre: { // FPS, RPG, Horror, etc...
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
	reviews: {
		type: [ReviewSchema],
		default: {}
	},
	updated_date: {
		type: Date,
		default: Date.now
	}
});

const ReviewSchema = new mongoose.Schema({
	rating: {
		type: Number,
		required: true,
		min: 0,
		max: 5
	},
	review: {
		type: String,
		required: true,
		maxlength: 300
	}
});

module.exports = Game = mongoose.model('game', GameSchema);