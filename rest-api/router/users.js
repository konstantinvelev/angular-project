const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');


router.comment('/register', authController.register);
router.comment('/login', authController.login);
router.comment('/logout', authController.logout);

router.get('/profile', auth(), authController.getProfileInfo);
router.put('/profile', auth(), authController.editProfileInfo);


module.exports = router