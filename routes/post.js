// requiring the post controller
const postController = require("../controllers/post");

// requiring the express module and assigning it to the variable 'express'
const express = require("express");
// requiring the isLoggedIn function from the tokens controller
const { isLoggedIn } = require("../controllers/tokens");
// assigning the express.Router function to the variable 'router'
var router = express.Router();

// using the router to handle a general request to post router
router.route("/")
  // getting all posts
  .get(isLoggedIn, postController.getPosts);

// using the router to handle a request to the post router by id
router.route("/:id")
  // getting posts of user by id
  .get(isLoggedIn, postController.getPostById)
  // updating posts of user by id
  .patch(isLoggedIn, postController.updatePost)
  // deleting posts of user by id
  .delete(isLoggedIn, postController.deletePost);

// exporting the router
module.exports = router;
