const express = require('express');
const user = require('../../controllers/userController');
const auth = require('../../controllers/authController');
const router = express.Router();

router.route('/api/users').post(user.registerUser);

router
	.route('/api/users/:userId')
	.get(auth.requireSignin, user.findUserProfile)
	.delete(auth.requireSignin, auth.hasAuthorization, user.deleteUser);

router.param('userId', user.findUserById);

module.exports = router;