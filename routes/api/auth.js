const express = require('express');

const auth = require('../../controllers/auth');

const router = express.Router();

router.route('/auth/signin').post(auth.signin);

router.route('/auth/signout').get(auth.signout);

module.exports = router;
