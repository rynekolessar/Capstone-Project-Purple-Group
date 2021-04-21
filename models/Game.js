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
	updated_date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Game = mongoose.model('game', GameSchema);