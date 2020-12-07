const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

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
    creator: { type: Types.ObjectId, ref: 'user' },
    likes: [{ type: Types.ObjectId, ref: 'user' }],
    comments: [{ type: Types.ObjectId, ref: 'comments' }]

}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('post', postSchema);