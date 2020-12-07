const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    creator: { type: Types.ObjectId, ref: 'user' },
    likes: [{ type: Types.ObjectId, ref: 'user' }],

}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('comment', commentSchema);