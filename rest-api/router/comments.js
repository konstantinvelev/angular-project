const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { commentController } = require('../controllers');

// middleware that is specific to this router

router.post('/create', auth(), commentController.createcomment);
router.get('/all/:id', auth(), commentController.getcomments);
router.put('/edit/:id', auth(), commentController.editcomment);
router.put('/like/:id', auth(), commentController.like);
router.get('/delete/:id', auth(), commentController.deletecomment);

module.exports = router