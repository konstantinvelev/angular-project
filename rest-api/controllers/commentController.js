const { userModel, postModel, commentModel } = require('../models');

function newcomment(text, userId, postId) {
    return commentModel.create({ text, userId, postId })
        .then(comment => {
            return Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { comments: comment._id }, $addToSet: { posts: postId } }),
                postModel.findByIdAndUpdate({ _id: postId }, { $push: { comments: comment._id }, $addToSet: { subscribers: userId } }, { new: true })
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
    const { postId } = req.params;
    const { _id: userId } = req.user;
    const { commentText } = req.body;

    newcomment(commentText, userId, postId)
        .then(([_, updatedpost]) => res.status(200).json(updatedpost))
        .catch(next);
}

function editcomment(req, res, next) {
    const { commentId } = req.params;
    const { commentText } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the comment, the comment will not be updated
    commentModel.findOneAndUpdate({ _id: commentId, userId }, { text: commentText }, { new: true })
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
    const { commentId, postId } = req.params;
    const { _id: userId } = req.user;

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
    const { commentId } = req.params;
    const { _id: userId } = req.user;

    console.log('like')

    commentModel.updateOne({ _id: commentId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next)
}

module.exports = {
    getLatestscomments,
    newcomment,
    createcomment,
    editcomment,
    deletecomment,
    like,
}