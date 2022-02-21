const { StatusCodes } = require('http-status-codes');
const User = require('../model/userSchema');
const Post = require('../model/postSchema');
const Comment = require('../model/commentsSchema');
const { hashPassword } = require('../utils/passwordHash');

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(StatusCodes.OK).json(allUsers);
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json(error);
    }
}

const createUsers = async (req, res) => {
    const formattedReq = { ...req.body, password: await hashPassword(req.body.password) };
    try {
        const newUser = await User.create(formattedReq);
        console.log(formattedReq);
        res.status(StatusCodes.CREATED).json({ user: newUser });
    } catch (error) {
        res.status(StatusCodes.NOT_ACCEPTABLE).send({ error });
    }
}

const getAllUsersLikingPosts = async (req, res) => {
    const { postId } = req.params;
    try {
        const posts = await Post.findById({ _id: postId }).populate("likes");
        res.status(StatusCodes.OK).json(posts.likes);
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json(error);
    }
}



module.exports = {
    getAllUsers,
    createUsers,
    getAllUsersLikingPosts,
}