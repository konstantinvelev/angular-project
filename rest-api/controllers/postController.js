const { postModel } = require('../models');
const { newcomment } = require('./commentController')

function getposts(req, res, next) {
    postModel.find()
        .populate('userId')
        .then(posts => res.json(posts))
        .catch(next);
}

function getpost(req, res, next) {
    const { postId } = req.params;

    postModel.findById(postId)
        .populate({
            path: 'comments',
            populate: {
                path: 'userId'
            }
        })
        .then(post => res.json(post))
        .catch(next);
}

function createpost(req, res, next) {
    const { title, imageUrl, description } = req.body;
    const user = req.user;

    postModel.create({ title, imageUrl, description, creator: user._id })
        .then((post) => res.status(200).json(updatedpost))
        .catch(next);
}

function subscribe(req, res, next) {
    const postId = req.params.postId;
    const { _id: userId } = req.user;
    postModel.findByIdAndUpdate({ _id: postId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedpost => {
            res.status(200).json(updatedpost)
        })
        .catch(next);
}

module.exports = {
    getposts,
    createpost,
    getpost,
    subscribe,
}