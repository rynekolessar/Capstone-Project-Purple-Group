const express = require('express');
const gameController = require('./../../controllers/gameController');
const authController = require('./../../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:gameId/reviews', reviewRouter);

router
  .route('/')
  .get(gameController.getAllGames)
  .post(
    // authController.protect,
    // authController.restrictTo('admin', 'user'),
    gameController.createGame
  );

router
  .route('/:id')
  .get(gameController.getGame)
  .patch(
    // authController.protect,
    // authController.restrictTo('admin', 'user'),
    gameController.uploadGameImages,
    gameController.updateGame
  )
  .delete(
    // authController.protect,
    // authController.restrictTo('admin', 'user'),
    gameController.deleteGame
  );

module.exports = router;

//router.param('id', gameController.checkID);
