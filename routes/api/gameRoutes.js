const express = require('express');
const reviewRouter = require('./reviewRoutes');
const router = express.Router();

// Load Game model
const Game = require('../../models/Game');

router.use('/:id/reviews', reviewRouter);

// @route GET api/games/test
// @description tests games route
// @access Public
router.get('/test', (req, res) => res.send('game route testing!'));

// @route GET api/games
// @description Get all games
// @access Public
router.get('/', (req, res) => {
  Game.find().populate('reviews')
    .then(games => res.json(games))
    .catch(err => res.status(404).json({ nogamesfound: 'No Games found' }));
});

// @route GET api/games/:id
// @description Get single game by id
// @access Public
router.get('/:id', (req, res) => {
  Game.findById(req.params.id).populate('reviews')
    .then(game => res.json(game))
    .catch(err => res.status(404).json({ nogamefound: 'No Game found' }));
});

// @route GET api/games
// @description add/save game
// @access Public
router.post('/', (req, res) => {
  Game.create(req.body)
    .then(game => res.json({ msg: 'Game added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this game' }));
});


// @route GET api/games/:id
// @description Update game
// @access Public
router.put('/:id', (req, res) => {
  Game.findByIdAndUpdate(req.params.id, req.body)
    .then(game => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/games/:id
// @description Delete game by id
// @access Public
router.delete('/:id', (req, res) => {
  Game.findByIdAndRemove(req.params.id, req.body)
    .then(game => res.json({ mgs: 'Game entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such Game' }));
});

module.exports = router;
