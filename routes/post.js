const postController = require("../controllers/post");

const express = require("express");
const { isLoggedIn } = require("../controllers/tokens");
var router = express.Router();

router.route("/").get(isLoggedIn, postController.getPosts);

router
  .route("/:id")
  .get(isLoggedIn, postController.getPostById)
  .patch(isLoggedIn, postController.updatePost)
  .delete(isLoggedIn, postController.deletePost);

module.exports = router;
