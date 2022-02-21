const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    comment: {
        type: String,
        trim: true,
        required: true,
    },
    commentedForPost: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, "Post Id is required"],
    },
    commentedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User Id is required"],
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Comments', CommentSchema);
