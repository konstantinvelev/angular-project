const { compare } = require('bcrypt');
const { postModel } = require('../models');
const commentModel = require('../models/commentModel');
const userModel = require('../models/userModel');

function getposts(req, res, next) {
    postModel.find()
        .populate('userId')
        .then(posts => res.json(posts))
        .catch(next);
}

function getpost(req, res, next) {
    const postId = req.params.id;

    postModel.findById(postId)
        .populate('comments')
        .populate({
            path: 'comments',
            populate: {
                path: 'userId'
            }
        })
        .populate('userId')
        .then(post => res.json(post))
        .catch(next);

}

function createpost(req, res, next) {
    const { title, imageUrl, description } = req.body;
    const { _id: userId } = req.user;
    // 
    postModel.create({ title, imageUrl, description, userId })
        .then((post) => {
            userModel.updateOne({ _id: userId }, { $push: { posts: post._id } })
                .then((post) => res.status(200).json(post));
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const postId = req.params.id;
    const { _id: userId } = req.body;

    postModel.findByIdAndUpdate({ _id: postId }, { $addToSet: { likes: userId } }, { new: true })
        .then(updatedpost => {
            res.status(200).json(updatedpost)
        })
        .catch(next);
}


function deletepost(req, res, next) {
    const postId = req.params.id;
    const { id: userId } = req.user;

    Promise.all([
            postModel.findOneAndDelete({ _id: postId }),
            commentModel.deleteMany({ "postId": postId }),
            userModel.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } }),
        ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function editpost(req, res, next) {
    const postId = req.params.id;
    const { title, imageUrl, description } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the comment, the comment will not be updated
    postModel.findOneAndUpdate({ _id: postId, userId }, { title: title, imageUrl: imageUrl, description: description }, { new: true })
        .then(updatedpost => {
            if (updatedpost) {
                res.status(200).json(updatedpost);
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

module.exports = {
    getposts,
    editpost,
    createpost,
    deletepost,
    getpost,
    subscribe,
}