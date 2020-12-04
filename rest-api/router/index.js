const router = require('express').Router();
const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');
const likes = require('./likes');
const test = require('./test');

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);
router.use('/likes', likes);
router.use('/test', test);

module.exports = router;