const express = require('express');
const router = express.Router();
const { createPost, likePost, getAllUsersCommentingPosts } = require('../controller/postsController');

router.route('/').post(createPost);
router.route('/:postId/:username').patch(likePost);
router.route('/getCommenters/:postId').get(getAllUsersCommentingPosts);

module.exports = router;
