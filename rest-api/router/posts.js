const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { postController, commentController } = require('../controllers');

// middleware that is specific to this router

router.get('/all', postController.getposts);
router.post('/create', auth(), postController.createpost);

// router.get('/:postId', postController.getpost);
// router.post('/:postId', auth(), commentController.createcomment);
// router.put('/:postId', auth(), postController.subscribe);
// router.put('/:postId/comments/:commentId', auth(), commentController.editcomment);
// router.delete('/:postId/comments/:commentId', auth(), commentController.deletecomment);

// router.get('/my-trips/:id/reservations', auth(), postController.getReservations);

module.exports = router