const postController = require("../controllers/post");

const express = require("express");
const { isLoggedIn } = require("../controllers/tokens");
var router = express.Router();

router.route("/").post(postController.createPost).get(postController.getPosts);
// .get(isLoggedIn, postController.getPosts);

router
  .route("/:id")
  .get(isLoggedIn, postController.getPostById)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
