const { userModel, postModel, commentModel } = require('../models');

function newcomment(content, userId, postId) {
    return commentModel.create({ content, userId, postId })
        .then(comment => {
            return Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { comments: comment._id }, $addToSet: { posts: postId } }),
                postModel.findByIdAndUpdate({ _id: postId }, { $push: { comments: comment._id } }, { new: true })
            ])
        })
}

function getLatestscomments(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    commentModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('postId userId')
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(next);
}

function createcomment(req, res, next) {
    const { content, userId, postId } = req.body;

    newcomment(content, userId, postId)
        .then(([_, updatedpost]) => res.status(200).json(updatedpost))
        .catch(next);
}

function editcomment(req, res, next) {
    const commentId = req.params.id;
    const comment = req.body.content.comment;
    const { _id: userId } = req.body.user;

    // if the userId is not the same as this one of the comment, the comment will not be updated
    commentModel.findOneAndUpdate({ _id: commentId, userId }, { content: comment }, { new: true })
        .then(updatedcomment => {
            if (updatedcomment) {
                res.status(200).json(updatedcomment);
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deletecomment(req, res, next) {
    const original = req.originalUrl;
    const arr = original.split('/');
    const queryParams = arr[4];
    const firstStep = queryParams.split('?');
    const commentId = firstStep[0];
    const secondStep = firstStep[1].split('=');
    const userId = secondStep[2];
    const thirthStep = secondStep[1].split('&');
    const postId = thirthStep[0];


    Promise.all([
            commentModel.findOneAndDelete({ _id: commentId, userId }),
            userModel.findOneAndUpdate({ _id: userId }, { $pull: { comments: commentId } }),
            postModel.findOneAndUpdate({ _id: postId }, { $pull: { comments: commentId } }),
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

function like(req, res, next) {
    const commentId = req.params.id;
    const { _id: userId } = req.body;

    console.log('like')

    commentModel.updateOne({ _id: commentId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next)
}

function getcomments(req, res, next) {
    const postId = req.params.id;

    commentModel.find()
        .populate('userId')
        .populate('postId')
        .then(comments => res.json(comments /*.where(s => s.postId == postId)*/ ))
        .catch(next);
}

module.exports = {
    getLatestscomments,
    getcomments,
    newcomment,
    createcomment,
    editcomment,
    deletecomment,
    like,
}