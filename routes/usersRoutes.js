const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    createUsers,
    getAllUsersLikingPosts,
    getAllUsersLikingCommentsPosts,
    getAllUsersCommentingPosts,
} = require('../controller/usersController');

router.route('/').get(getAllUsers).post(createUsers);
router.route('/likes/:postId').get(getAllUsersLikingPosts);


module.exports = router;
