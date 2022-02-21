const Post = require('../model/postSchema');
const User = require('../model/userSchema');
const { StatusCodes } = require('http-status-codes');

const createPost = async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.dummy = 'DUMMY';
        res.status(StatusCodes.OK).json(newPost);
    } catch (error) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json(error);
    }
}

const likePost = async (req, res) => {
    const { postId, username } = req.params;
    try {
        const targettedPost = await Post.findById({ _id: postId });
        const targettedUser = await User.findOne({ username });
        const options = targettedPost.likes.includes(targettedUser._id) ? '$pull' : "$addToSet";
        const updatedPost = await Post.findByIdAndUpdate({ _id: postId }, { [options]: { likes: targettedUser._id } }, { new: true });
        res.status(StatusCodes.OK).json(updatedPost);
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json(error);
    }
}
const getAllUsersCommentingPosts = async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await Post.find({ _id: postId }).populate({ path: "commentedBy", model: 'User' });
        res.status(StatusCodes.OK).json(comments);
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json(error);
    }
}

module.exports = {
    createPost,
    likePost,
    getAllUsersCommentingPosts,
}
