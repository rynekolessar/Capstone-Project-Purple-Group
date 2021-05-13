const express = require('express');
const reviewController = require('../../controllers/reviewController');
const authController = require('../../controllers/authController');

const router = express.Router({ mergeParams: true });

/* TODO: reviewRoutes
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.requireSignin,
    reviewController.setGameUserIds,
    reviewController.createReview
  );
*/