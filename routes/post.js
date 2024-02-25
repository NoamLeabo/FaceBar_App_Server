const postController = require('../controllers/post');

const express = require('express')
var router = express.Router();

router.route('/')
    .post(postController.createPost)
    .get(postController.getPosts)

router.route('/:id')
    .get(postController.getPostById)
    .patch(postController.updatePost)
    .delete(postController.deletePost)

module.exports = router;
