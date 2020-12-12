const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { postController } = require('../controllers');

// middleware that is specific to this router

router.get('/all', auth(), postController.getposts);
router.post('/create', auth(), postController.createpost);
router.get('/details/:id', auth(), postController.getpost);
router.get('/delete/:id', auth(), postController.deletepost);
router.post('/edit/:id', auth(), postController.editpost);
router.put('/like/:id', auth(), postController.subscribe);

module.exports = router