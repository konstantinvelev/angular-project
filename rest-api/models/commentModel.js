const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: "User"
    },
    postId: {
        type: ObjectId,
        ref: "Post"
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }]
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Comment', commentSchema);