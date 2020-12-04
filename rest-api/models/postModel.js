const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    postName: {
        type: String,
        required: true
    },
    subscribers: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    comments: [{
        type: ObjectId,
        ref: "comment"
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('post', postSchema);