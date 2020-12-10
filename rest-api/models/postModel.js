const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: "User"
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    comments: [{
        type: ObjectId,
        ref: "Comment"
    }]

}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Post', postSchema);