const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { commentController } = require('../controllers');

// middleware that is specific to this router

router.post('/create', commentController.createcomment);
router.get('/all/:id', commentController.getcomments);
router.put('/edit/:id', commentController.editcomment);
router.get('/delete/:id', commentController.deletecomment);

module.exports = router