const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { postController, commentController } = require('../controllers');

// middleware that is specific to this router

router.get('/all', auth(), postController.getposts);
router.post('/create', auth(), postController.createpost);
router.get('/details/:id', auth(), postController.getpost);
router.get('/delete/:id', auth(), postController.deletepost);

// router.post('/:postId', auth(), commentController.createcomment);
// router.put('/:postId', auth(), postController.subscribe);
// router.put('/:postId/comments/:commentId', auth(), commentController.editcomment);

// router.get('/my-trips/:id/reservations', auth(), postController.getReservations);

module.exports = router