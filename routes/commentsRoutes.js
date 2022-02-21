const express = require('express');
const router = express.Router();
const { createComments,
    updateLikesOnComments,
    getAllUsersLikingCommentsPosts
} = require('../controller/comentsController');


router.route('/:username').post(createComments);
router.route('/likes/:username/:commentId').patch(updateLikesOnComments);
router.route('/likes/:postId').get(getAllUsersLikingCommentsPosts);

module.exports = router;
