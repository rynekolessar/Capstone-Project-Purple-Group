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
	updated_date: {
		type: Date,
		default: Date.now
	}
});
module.exports = Game = mongoose.model('game', GameSchema);