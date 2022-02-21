const Comment = require('../model/commentsSchema');
const Post = require('../model/postSchema');
const User = require('../model/userSchema');
const { StatusCodes } = require('http-status-codes');

const createComments = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        console.log(user);
        const payload = { ...req.body, commentedBy: user._id };
        const comment = await Comment.create(payload);
        const updatedPost = await Post.findByIdAndUpdate(payload.commentedForPost, { "$addToSet": { commentedBy: user._id } })
        res.status(StatusCodes.CREATED).json(comment);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }

}

const updateLikesOnComments = async (req, res) => {
    const { username, commentId: _id } = req.params;
    try {
        const targettedComment = await Comment.findById({ _id });
        const targettedUser = await User.findOne({ username });
        const options = targettedComment.likes.includes(targettedUser._id) ? '$pull' : "$addToSet";
        const updatedComment = await Comment.findByIdAndUpdate({ _id }, { [options]: { likes: targettedUser._id } }, { new: true });
        res.status(StatusCodes.OK).json(updatedComment);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }
}

const getAllUsersLikingCommentsPosts = async (req, res) => {
    const { postId, commentId: _id } = req.params;
    try {
        const comments = await Comment.find({ commentedForPost: postId });
        const filteredCommentsLikes = comments.map((commentItem) => commentItem.likes)
        let formattedLikedArray = [];
        filteredCommentsLikes.forEach((likeArray) => {
            formattedLikedArray = [...formattedLikedArray, ...likeArray];
        });
        res.status(StatusCodes.OK).json(formattedLikedArray);
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json(error);
    }
}

module.exports = {
    createComments,
    updateLikesOnComments,
    getAllUsersLikingCommentsPosts
}
