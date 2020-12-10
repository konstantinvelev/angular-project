const { compare } = require('bcrypt');
const { postModel } = require('../models');
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
    const postId = req.params.postId;
    const { _id: userId } = req.user;
    postModel.findByIdAndUpdate({ _id: postId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedpost => {
            res.status(200).json(updatedpost)
        })
        .catch(next);
}


function deletepost(req, res, next) {
    const postId = req.params.id;
    const { _id: userId } = req.user;

    Promise.all([
            postModel.findOneAndDelete({ _id: postId }),
            userModel.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } }),
        ])
        .then(([deletedOne, _]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

module.exports = {
    getposts,
    createpost,
    deletepost,
    getpost,
    subscribe,
}